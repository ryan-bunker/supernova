import {BigPoint, distance, Point, Transform} from "./2d";
import {Planet, Star} from "./client/stars";
import {Ship} from "./client/player";

interface SectorSource {
    getSectors(sxMin: number, syMin: number, sxMax?: number, syMax?: number): Promise<Star[]>;
}

interface PlayerData {
    getHomeworld(): Promise<Readonly<Planet>>;
    getShips(): Promise<Readonly<Ship[]>>;
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
    private readonly _mapToScreen: Transform;
    private _mapScale: number = 61_720_000_000_000;
    private _mapOffset: Point = new Point(); //50_000_000_000_000, 50_000_000_000_000);
    private readonly _onSelected: (i: SelectedItem | undefined) => void;
    private _lastMouseCoord: Point | null;
    private _lastFrame: number;
    private _selectedItem: SelectedItem | undefined;

    constructor(canvas: HTMLCanvasElement, sectorSize: number, sectorSource: SectorSource, playerData: PlayerData, onSelected: (i: SelectedItem | undefined) => void) {
        this._canvas = canvas;
        this._sectorSize = sectorSize;
        this._sectorSource = sectorSource;
        this._playerData = playerData;
        this._mapToScreen = new Transform(0, 0, 1);
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

    get transform(): Transform {
        return this._mapToScreen;
    }

    public renderSectorGrid: boolean = true;
    public renderDebugText: boolean = true;

    public async render(): Promise<void> {
        do {
            const fps = 1000 / (Date.now() - this._lastFrame);
            this._lastFrame = Date.now();

            // project screen viewport into map coordinates
            const tlScreen = { x: 0, y: 0 };
            const brScreen = { x: this._canvas.width, y: this._canvas.height };
            const tlSect = new Point(
                Math.floor(((tlScreen.x - this._mapOffset.x) * this._mapScale) / this._sectorSize),
                Math.floor(((tlScreen.y - this._mapOffset.y) * this._mapScale) / this._sectorSize));
            const brSect = new Point(
                Math.floor(((brScreen.x - this._mapOffset.x) * this._mapScale) / this._sectorSize),
                Math.floor(((brScreen.y - this._mapOffset.y) * this._mapScale) / this._sectorSize));

            // get all of our render state
            const [sectors, homeworld, ships] = await Promise.all([
                this._sectorSource.getSectors(tlSect.x, tlSect.y, brSect.x, brSect.y),
                this._playerData.getHomeworld(),
                this._playerData.getShips()
            ]);

            // wait for next frame to be ready to render
            await new Promise(window.requestAnimationFrame);

            // at this point we can't use await anymore, so put this inside its
            // own iife context to make doing so a compiler error
            (() => {
                const ctx = this._canvas.getContext('2d')!;
                ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

                const convertToAlpha = (min: number, max: number, value: number) =>
                    Math.max(0, Math.min((min - value) / (min - max), 1.0));
                
                const nameAlphaMin = 5 * this._sectorSize / this._canvas.width,
                    nameAlphaMax = this._sectorSize / this._canvas.width;
                const alpha = convertToAlpha(nameAlphaMin, nameAlphaMax, this._mapScale);
                
                const planetAlphaMin = 800_000_000_000, planetAlphaMax = 10_000_000_000;
                const planetAlpha = convertToAlpha(planetAlphaMin, planetAlphaMax, this._mapScale);
                
                if (this.renderSectorGrid) {
                    ctx.save();
                    ctx.strokeStyle = "gray";
                    ctx.fillStyle = "gray";
                    ctx.setLineDash([10, 10]);
                    ctx.font = "16px Courier New";

                    for (let x = tlSect.x; x<=brSect.x; x++) {
                        const screenX = x * this._sectorSize / this._mapScale + this._mapOffset.x;
                        ctx.moveTo(screenX, 0);
                        ctx.lineTo(screenX, this._canvas.height);
                        ctx.stroke();

                        for (let y = tlSect.y; y <= brSect.y; y++) {
                            const screenY = y * this._sectorSize / this._mapScale + this._mapOffset.y;
                            ctx.fillText(`${x}:${y}`, screenX + 4, screenY + 20);
                            if (x == tlSect.x) {
                                ctx.moveTo(0, screenY);
                                ctx.lineTo(this._canvas.width, screenY);
                                ctx.stroke();
                            }
                        }
                    }
                    ctx.restore();
                }

                for (const star of sectors) {
                    const tp = new Point(
                        Math.round(star.sx * (this._sectorSize / this._mapScale) + star.x / this._mapScale + this._mapOffset.x),
                        Math.round(star.sy * (this._sectorSize / this._mapScale) + star.y / this._mapScale + this._mapOffset.y));
                    ctx.fillStyle = "white"; //this._playerData.homeworld.star.id === star.id ? "blue" : "white";
                    ctx.beginPath();
                    const starR = Math.max(5, 1_400_000_000 / this._mapScale);
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
                        const fontSize = Math.max(12, 4 * this._mapToScreen.scale);
                        ctx.font = `14px Courier New`;
                        ctx.fillStyle = `rgba(160, 160, 255, ${alpha})`;
                        ctx.textAlign = 'center';
                        ctx.fillText(star.name, tp.x, tp.y + 18);
                    }

                    if (planetAlpha > 0) {
                        for (const planet of star.planets) {
                            ctx.strokeStyle = `rgba(128, 128, 128, ${planetAlpha})`;
                            if (homeworld.star.id === star.id && homeworld.id == planet.id) {
                                ctx.fillStyle = `rgba(0, 0, 255, ${planetAlpha})`;
                            } else {
                                ctx.fillStyle = `rgba(255, 255, 255, ${planetAlpha})`;
                            }

                            // draw orbit first
                            ctx.beginPath();
                            const orbitR = planet.r / this._mapScale;
                            ctx.arc(tp.x, tp.y, orbitR, 0, 2 * Math.PI);
                            ctx.stroke();
                            // now draw planet
                            ctx.beginPath();
                            const period = Math.floor(600000 * planet.year);
                            const phi = planet.phi + ((Date.now() % period) / period) * 2 * Math.PI;
                            const tPlanetPt = new Point(
                                tp.x + orbitR * Math.cos(phi),
                                tp.y + orbitR * Math.sin(phi));
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

                // if (alpha > 0) {
                //     ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                //     for (const ship of ships) {
                //         if (ship.loc instanceof Planet || ship.loc instanceof Star) {
                //             // ship is in orbit, so draw that
                //             const orbitR = ship.loc instanceof Planet ? 5 : 10;
                //             // draw orbit first
                //             const tLoc = this._mapToScreen.transform(ship.loc);
                //             ctx.beginPath();
                //             ctx.arc(tLoc.x, tLoc.y, orbitR * this._mapToScreen.scale, 0, 2 * Math.PI);
                //             ctx.stroke();
                //             // now draw ship
                //             const phi = ((Date.now() % 10000) / 10000) * 2 * Math.PI;
                //             const shipPt = new Point(
                //                 ship.loc.x + orbitR * Math.cos(phi),
                //                 ship.loc.y + orbitR * Math.sin(phi));
                //             const tPlanetPt = this._mapToScreen.transform(shipPt);
                //             ctx.save();
                //             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                //             ctx.translate(tPlanetPt.x, tPlanetPt.y);
                //             ctx.scale(0.01 * this._mapToScreen.scale, -0.01 * this._mapToScreen.scale);
                //             ctx.rotate(-phi);
                //             ctx.fill(ShipPath);
                //             ctx.restore();
                //         } else {
                //             const tLoc = this._mapToScreen.transform(ship.loc);
                //             ctx.save();
                //             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                //             ctx.translate(tLoc.x, tLoc.y);
                //             ctx.scale(0.01 * this._mapToScreen.scale, -0.01 * this._mapToScreen.scale);
                //             ctx.fill(ShipPath);
                //             ctx.restore();
                //         }
                //     }
                // }

                if (this.renderDebugText) {
                    ctx.font = "16px Courier New";
                    ctx.fillStyle = "red";
                    ctx.textAlign = 'left';
                    ctx.fillText(`  offset: ${this._mapOffset}`, 10, 16);
                    ctx.fillText(`   scale: ${this._mapScale}`, 10, 32);
                    ctx.fillText(`   alpha: ${alpha} (names)  ${planetAlpha} (planets)`, 10, 48);
                    ctx.fillText(` sectors: ${tlSect}, ${brSect}`, 10, 64);
                    ctx.fillText(`  ${sectors.length} stars`, 10, 80);
                    ctx.fillText(`  ${fps.toFixed(1)} FPS`, 10, 96);
                }
            })();
        } while (true);
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

        const clickMapPoint = new Point(
            (e.clientX - this._mapOffset.x) * this._mapScale,
            (e.clientY - this._mapOffset.y) * this._mapScale);
        const sx = Math.floor(clickMapPoint.x / this._sectorSize);
        const sy = Math.floor(clickMapPoint.y / this._sectorSize);
        this._sectorSource.getSectors(sx, sy).then(sectors => {
            console.log(clickMapPoint);

            for (const star of sectors) {
                let x = star.sx * (this._sectorSize / this._mapScale) + (star.x / this._mapScale) + this._mapOffset.x;
                let y = star.sy * (this._sectorSize / this._mapScale) + (star.y / this._mapScale) + this._mapOffset.y;
                let d = Math.sqrt(Math.pow(x - e.clientX, 2) + Math.pow(y - e.clientY, 2));
                if (d < 10) {
                    this.selectedItem = {type: 'Star', item: star};
                    return;
                }

                for (const planet of star.planets) {
                    const period = Math.floor(600000 * planet.year);
                    const phi = planet.phi + ((Date.now() % period) / period) * 2 * Math.PI;
                    let px = x + Math.round(planet.r / this._mapScale) * Math.cos(phi);
                    let py = y + Math.round(planet.r / this._mapScale) * Math.sin(phi);
                    d = Math.sqrt(Math.pow(px - e.clientX, 2) + Math.pow(py - e.clientY, 2));
                    if (d < 10) {
                        this.selectedItem = {type: 'Planet', item: planet};
                        return;
                    }
                }
            }
            this.selectedItem = undefined;
        });
    }

    private mouseMove(e: MouseEvent): void {
        if (!this._lastMouseCoord || e.buttons != 2) {
            return;
        }

        const deltaX = e.clientX - this._lastMouseCoord.x;
        const deltaY = e.clientY - this._lastMouseCoord.y;
        this._mapOffset = new Point(this._mapOffset.x + deltaX, this._mapOffset.y + deltaY);

        this._lastMouseCoord = new Point(e.clientX, e.clientY);
    }

    private eventId: number = 0;
    private mouseWheel(e: WheelEvent): void {
        const eventId = ++this.eventId;

        const oldScale = this._mapScale;
        const newScale = Math.max(1e10, Math.min(this._mapScale + (this._mapScale * 0.005) * e.deltaY, (this._sectorSize / this._canvas.width) * 10));
        const zoomPoint = new Point(
            (e.clientX - this._mapOffset.x) * this._mapScale,
            (e.clientY - this._mapOffset.y) * this._mapScale);
        const scaleDelta = (1 / newScale) - (1 / oldScale);
        
        const zoomSect = new Point(
            Math.floor(zoomPoint.x / this._sectorSize),
            Math.floor(zoomPoint.y / this._sectorSize));
        this._sectorSource.getSectors(zoomSect.x, zoomSect.y).then(sector => {
            if (eventId !== this.eventId) {
                return;
            }
            
            for (const star of sector) {
                let x = star.sx * (this._sectorSize / this._mapScale) + (star.x / this._mapScale) + this._mapOffset.x;
                let y = star.sy * (this._sectorSize / this._mapScale) + (star.y / this._mapScale) + this._mapOffset.y;
                let d = Math.sqrt(Math.pow(x - e.clientX, 2) + Math.pow(y - e.clientY, 2));
                //console.log(`${d} from ${star.name}`);
                if (d < 10) {
                    //console.log(`Snapping to ${star.name}`);
                    zoomPoint.x = star.sx * this._sectorSize + star.x;
                    zoomPoint.y = star.sy * this._sectorSize + star.y;
                    break;
                }
                
                // for (const planet of star.planets) {
                //     const period = Math.floor(600000 * planet.year);
                //     const phi = planet.phi + ((Date.now() % period) / period) * 2 * Math.PI;
                //     x += Math.round(planet.r / this._mapScale) * Math.cos(phi);
                //     y += Math.round(planet.r / this._mapScale) * Math.sin(phi);
                //     d = Math.sqrt(Math.pow(x - e.clientX, 2) + Math.pow(y - e.clientY, 2));
                //     if (d < 10) {
                //         zoomPoint.x = star.sx * this._sectorSize + star.x + planet.r * Math.cos(phi);
                //         zoomPoint.y = star.sy * this._sectorSize + star.y + planet.r * Math.sin(phi);
                //         break;
                //     }
                // }
            }
            
            this._mapScale = newScale;
            this._mapOffset = new Point(
                this._mapOffset.x - zoomPoint.x * scaleDelta,
                this._mapOffset.y - zoomPoint.y * scaleDelta);
        });
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