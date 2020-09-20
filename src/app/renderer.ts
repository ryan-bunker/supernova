import {Point} from "./2d";
import {Planet, Star} from "./client/stars";
import {Ship} from "./client/player";

interface SectorSource {
    getSector(sx: number, sy: number): Star[];
}

interface PlayerData {
    getHomeworld(): Readonly<Planet>;

    getShips(): Readonly<Ship[]>;
}

export interface SelectedPlanet {
    type: 'Planet';
    item: Planet;
}

export interface SelectedStar {
    type: 'Star';
    item: Star;
}

export interface SelectedShip {
    type: 'Ship';
    item: Ship;
}

export type SelectedItem = SelectedPlanet | SelectedStar | SelectedShip;

const ShipPath = new Path2D('M-30.55555,40.55594    c0,-46.80785 12.93585,-116.94444 30.27778,-116.94444    c17.34193,0 30.83333,69.02548 30.83333,115.83333    c0,46.80786 -12.93585,36.94445 -30.27777,36.94445    c-17.34193,0 -30.83334,10.97452 -30.83334,-35.83334    z M-55.277758,63.055949c0,-25.16882 25.60773,-45.55556 57.22222,-45.55556c31.61449,0 57.22222,20.38674 57.22222,45.55556c0,25.16881 -23.38551,-9.44445 -55,-9.44445c-31.61448,0 -59.44444,34.61326 -59.44444,9.44445z');

export class Renderer {
    private readonly _canvas: HTMLCanvasElement;
    private readonly _sectorSize: number;
    private readonly _sectorSource: SectorSource;
    private readonly _playerData: PlayerData;
    private _mapScale = 1 / 61_720_000_000_000;
    private _mapOffset = new Point();
    private readonly _onSelected: (i: SelectedItem | undefined) => void;
    private _lastMouseCoord: Point | null;
    private _lastFrame: number;
    private _selectedItem: SelectedItem | undefined;

    constructor(canvas: HTMLCanvasElement, sectorSize: number, sectorSource: SectorSource, playerData: PlayerData, onSelected: (i: SelectedItem | undefined) => void) {
        this._canvas = canvas;
        this._sectorSize = sectorSize;
        this._sectorSource = sectorSource;
        this._playerData = playerData;
        this._onSelected = onSelected;
        this._selectedItem = undefined;

        // size the canvas to fill the entire window
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            // whenever the browser gets resized we need to update our canvas
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this.render();
        });
        this._canvas.addEventListener('contextmenu', e => e.preventDefault());
        this._canvas.addEventListener('mousedown', e => this.mouseDown(e));
        this._canvas.addEventListener('mouseup', e => this.mouseUp(e));
        this._canvas.addEventListener('mousemove', e => this.mouseMove(e));
        this._canvas.addEventListener('wheel', e => this.mouseWheel(e));
        window.addEventListener('keyup', e => this.keyUp(e));
    }

    get selectedItem(): SelectedItem | undefined {
        return this._selectedItem;
    }

    set selectedItem(item: SelectedItem | undefined) {
        this._selectedItem = item;
        this._onSelected(item);
    }

    public renderSectorGrid: boolean = true;
    public renderDebugText: boolean = true;

    private toScreen(mapPt: { sx: number, sy: number, x: number, y: number }): Point {
        const {sx, sy, x, y} = mapPt;
        const screenSectorSize = this._sectorSize * this._mapScale;
        return new Point(
            sx * screenSectorSize + x * this._mapScale + this._mapOffset.x,
            sy * screenSectorSize + y * this._mapScale + this._mapOffset.y);
    }

    private screenToSector(screenPt: { x: number, y: number }): Point {
        const screenSectorSize = this._sectorSize * this._mapScale;
        return new Point(
            Math.floor(screenPt.x / screenSectorSize - this._mapOffset.x / screenSectorSize),
            Math.floor(screenPt.y / screenSectorSize - this._mapOffset.y / screenSectorSize));
    }

    private toMap(screenPt: { x: number, y: number }): Point {
        const {x: screenX, y: screenY} = screenPt;
        return new Point(
            (screenX - this._mapOffset.x) / this._mapScale,
            (screenY - this._mapOffset.y) / this._mapScale);
    }

    private getOrbitalXY(arg: { r: number, phi: number, year: number }, t: number, offset?: { x: number, y: number }): Point {
        let {r, phi, year} = arg;
        offset = offset || {x: 0, y: 0};
        const period = Math.floor(600000 * year);
        phi += ((t % period) / period) * 2 * Math.PI;
        return new Point(
            offset.x + r * this._mapScale * Math.cos(phi),
            offset.y + r * this._mapScale * Math.sin(phi));
    }

    private getEntityNearestToPoint(point: Point, maxD: number): SelectedItem | undefined {
        const sector = this.screenToSector(point);
        const stars = this._sectorSource.getSector(sector.x, sector.y);

        for (const star of stars) {
            const {x, y} = this.toScreen(star);
            let d = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
            console.log(`Checking ${star.name} - ${d}`);
            if (d < maxD) {
                console.log("**SELECTED**");
                return {type: 'Star', item: star};
            }

            for (const planet of star.planets) {
                const {x: px, y: py} = this.getOrbitalXY(planet, Date.now(), {x, y});
                d = Math.sqrt(Math.pow(px - point.x, 2) + Math.pow(py - point.y, 2));
                console.log(`Checking ${planet.name} - ${d}`);
                if (d < maxD) {
                    console.log("**SELECTED**");
                    return {type: 'Planet', item: planet};
                }
            }
        }
        return undefined;
    }

    public render() {
        const fps = 1000 / (Date.now() - this._lastFrame);
        this._lastFrame = Date.now();

        // project screen viewport into map coordinates
        const tlSect = this.screenToSector({x: 0, y: 0});
        const brSect = this.screenToSector({x: this._canvas.width, y: this._canvas.height});

        // get all of our render state
        // const [sectors, homeworld, ships] = await Promise.all([
        //     this._sectorSource.getSectors(tlSect.x, tlSect.y, brSect.x, brSect.y),
        //     this._playerData.getHomeworld(),
        //     this._playerData.getShips()
        // ]);

        const ctx = this._canvas.getContext('2d')!;
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        const convertToAlpha = (min: number, max: number, value: number) =>
            Math.max(0, Math.min((min - value) / (min - max), 1.0));

        const nameAlphaMin = 1 / (5 * Number(this._sectorSize) / this._canvas.width),
            nameAlphaMax = 1 / (Number(this._sectorSize) / this._canvas.width);
        const alpha = convertToAlpha(nameAlphaMin, nameAlphaMax, Number(this._mapScale));

        const planetAlphaMin = 7e-14, planetAlphaMax = 1e-11;
        const planetAlpha = convertToAlpha(planetAlphaMin, planetAlphaMax, Number(this._mapScale));

        if (this.renderSectorGrid) {
            ctx.save();
            ctx.strokeStyle = "gray";
            ctx.fillStyle = "gray";
            ctx.setLineDash([10, 10]);
            ctx.font = "16px Courier New";

            for (let sx = tlSect.x; sx <= brSect.x; sx++) {
                const {x} = this.toScreen({sx, x: 0, sy: 0, y: 0});
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, this._canvas.height);
                ctx.stroke();

                for (let sy = tlSect.y; sy <= brSect.y; sy++) {
                    const {y} = this.toScreen({sx: 0, x: 0, sy, y: 0});
                    ctx.fillText(`${sx}:${sy}`, x + 4, y + 20);
                    if (sx == tlSect.x) {
                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        ctx.lineTo(this._canvas.width, y);
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();
        }

        let starCount = 0;
        for (let sx = tlSect.x; sx <= brSect.x; ++sx) {
            for (let sy = tlSect.y; sy <= brSect.y; ++sy) {
                const sectors = this._sectorSource.getSector(sx, sy);
                starCount += sectors.length;
                for (const star of sectors) {
                    const tp = this.toScreen(star);
                    ctx.fillStyle = "white"; //this._playerData.homeworld.star.id === star.id ? "blue" : "white";
                    ctx.beginPath();
                    const starR = Math.max(3, Number(1_400_000_000 * this._mapScale));
                    ctx.arc(tp.x, tp.y, starR, 0, 2 * Math.PI);
                    ctx.fill();

                    if (this._selectedItem && this._selectedItem.type == "Star" && this._selectedItem.item.id == star.id) {
                        ctx.save();
                        ctx.strokeStyle = "red";
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.arc(tp.x, tp.y, 10, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.restore();
                    }

                    if (alpha > 0) {
                        ctx.font = `14px Courier New`;
                        ctx.fillStyle = `rgba(160, 160, 255, ${alpha})`;
                        ctx.textAlign = 'center';
                        ctx.fillText(star.name, tp.x, tp.y + 18);
                    }

                    if (planetAlpha > 0) {
                        ctx.strokeStyle = `rgba(128, 128, 128, ${planetAlpha})`;
                        const homeworld = this._playerData.getHomeworld();
                        for (const planet of star.planets) {
                            if (homeworld.star.id === star.id && homeworld.id == planet.id) {
                                ctx.fillStyle = `rgba(60, 60, 255, ${planetAlpha})`;
                            } else {
                                ctx.fillStyle = `rgba(255, 255, 255, ${planetAlpha})`;
                            }

                            // draw orbit first
                            ctx.beginPath();
                            const orbitR = planet.r * this._mapScale;
                            ctx.arc(tp.x, tp.y, orbitR, 0, 2 * Math.PI);
                            ctx.stroke();
                            // now draw planet
                            ctx.beginPath();
                            const tPlanetPt = this.getOrbitalXY(planet, Date.now(), tp);
                            ctx.arc(tPlanetPt.x, tPlanetPt.y, 3, 0, 2 * Math.PI);
                            ctx.fill();

                            if (this._selectedItem && this._selectedItem.type == "Planet" && this._selectedItem.item.id == planet.id) {
                                ctx.save();
                                ctx.strokeStyle = "red";
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(tPlanetPt.x, tPlanetPt.y, 10, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.restore();
                            }
                        }
                    }
                }

                if (planetAlpha > 0) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${planetAlpha})`;
                    ctx.strokeStyle = `rgba(128, 128, 128, ${planetAlpha})`;
                    for (const ship of this._playerData.getShips()) {
                        if (ship.loc instanceof Planet || ship.loc instanceof Star) {
                            // ship is in orbit, so draw that
                            let tLoc: Point;
                            const orbitR = 4 * 42_164_000_000 * this._mapScale;
                            if (ship.loc instanceof Star) {
                                tLoc = this.toScreen(ship.loc);
                            } else {
                                const starLoc = this.toScreen(ship.loc.star);
                                tLoc = this.getOrbitalXY(ship.loc, Date.now(), starLoc);
                            }
                            // draw orbit first
                            ctx.beginPath();
                            ctx.arc(tLoc.x, tLoc.y, orbitR, 0, 2 * Math.PI);
                            ctx.stroke();
                            // now draw ship
                            const phi = ((Date.now() % 10000) / 10000) * 2 * Math.PI;
                            const shipPt = new Point(
                                tLoc.x + orbitR * Math.cos(phi),
                                tLoc.y + orbitR * Math.sin(phi));
                            ctx.save();
                            ctx.fillStyle = `rgba(255, 255, 255, ${planetAlpha})`;
                            ctx.translate(shipPt.x, shipPt.y);
                            ctx.scale(Math.min(0.2, 1e9 * this._mapScale), Math.max(-0.2, -1e9 * this._mapScale));
                            ctx.rotate(-phi);
                            ctx.fill(ShipPath);
                            ctx.restore();
                        } else {
                            // const tLoc = this._mapToScreen.transform(ship.loc);
                            // ctx.save();
                            // ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                            // ctx.translate(tLoc.x, tLoc.y);
                            // ctx.scale(0.01 * this._mapToScreen.scale, -0.01 * this._mapToScreen.scale);
                            // ctx.fill(ShipPath);
                            // ctx.restore();
                        }
                    }
                }
            }
        }

        if (this.renderDebugText) {
            ctx.font = "16px Courier New";
            ctx.fillStyle = "red";
            ctx.textAlign = 'left';
            ctx.fillText(`  offset: (${this._mapOffset.x}, ${this._mapOffset.y})`, 10, 16);
            ctx.fillText(`   scale: ${this._mapScale}`, 10, 32);
            ctx.fillText(`   alpha: ${alpha} (names)  ${planetAlpha} (planets)`, 10, 48);
            ctx.fillText(` sectors: [${tlSect.x}, ${tlSect.y}], [${brSect.x}, ${brSect.y}]`, 10, 64);
            ctx.fillText(`  ${starCount} stars`, 10, 80);
            ctx.fillText(`  ${fps.toFixed(1)} FPS`, 10, 96);
        }

        window.requestAnimationFrame(() => this.render());
    }

    private mouseDown(e: MouseEvent): void {
        if (e.buttons == 2) {
            this._lastMouseCoord = new Point(e.clientX, e.clientY);
        }
    }

    private mouseUp(e: MouseEvent): void {
        this._lastMouseCoord = null;

        if (e.button !== 0) {
            // only handle left clicks
            return;
        }

        this.selectedItem = this.getEntityNearestToPoint(new Point(e.clientX, e.clientY), 10);
    }

    private mouseMove(e: MouseEvent): void {
        if (!this._lastMouseCoord || e.buttons != 2) {
            return;
        }

        const deltaX = e.clientX - this._lastMouseCoord.x;
        const deltaY = e.clientY - this._lastMouseCoord.y;
        this._mapOffset.x += deltaX;
        this._mapOffset.y += deltaY;

        this._lastMouseCoord = new Point(e.clientX, e.clientY);
    }

    private mouseWheel(e: WheelEvent): void {
        const oldScale = this._mapScale;
        let newScale = this._mapScale + (this._mapScale * 0.005) * -e.deltaY;
        if (newScale > (1 / 1e10)) {
            newScale = 1 / 10_000_000_000;
        } else if (newScale < 1 / (10 * (this._sectorSize / this._canvas.width))) {
            newScale = 1 / (10 * (this._sectorSize / this._canvas.width));
        }

        let zoomPoint = new Point(e.clientX, e.clientY);
        const snapEntity = this.getEntityNearestToPoint(new Point(e.clientX, e.clientY), 10);
        if (snapEntity && snapEntity.type == 'Star') {
            zoomPoint = this.toScreen(snapEntity.item);
            console.log(`Snapping to ${snapEntity.item.name} @ ${zoomPoint}`);
        }

        this._mapScale = newScale;
        this._mapOffset = new Point(
            zoomPoint.x * (1 - newScale / oldScale) + this._mapOffset.x * (newScale / oldScale),
            zoomPoint.y * (1 - newScale / oldScale) + this._mapOffset.y * (newScale / oldScale));
    }

    private keyUp(e: KeyboardEvent): void {
        switch (e.code) {
            case 'KeyG':
                this.renderSectorGrid = !this.renderSectorGrid;
                break;
            case 'KeyX':
                this.renderDebugText = !this.renderDebugText;
                break;
        }
    }
}