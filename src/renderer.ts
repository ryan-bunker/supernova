import { Transform, Point } from "./2d";
import { Star, Planet } from "./client/stars";
import { Ship } from "./client/player";

interface SectorSource {
    getSectors(sxMin: number, syMin: number, sxMax: number, syMax: number): Star[][][];
}

interface PlayerData {
    homeworld: Readonly<Planet>;
    ships: Readonly<Ship[]>;
}

const ShipPath = new Path2D('M-30.55555,40.55594    c0,-46.80785 12.93585,-116.94444 30.27778,-116.94444    c17.34193,0 30.83333,69.02548 30.83333,115.83333    c0,46.80786 -12.93585,36.94445 -30.27777,36.94445    c-17.34193,0 -30.83334,10.97452 -30.83334,-35.83334    z M-55.277758,63.055949c0,-25.16882 25.60773,-45.55556 57.22222,-45.55556c31.61449,0 57.22222,20.38674 57.22222,45.55556c0,25.16881 -23.38551,-9.44445 -55,-9.44445c-31.61448,0 -59.44444,34.61326 -59.44444,9.44445z');

export class Renderer {
    private readonly _canvas: HTMLCanvasElement;
    private readonly _sectorSize: number;
    private readonly _sectorSource: SectorSource;
    private readonly _playerData: PlayerData;
    private readonly _mapToScreen: Transform;
    private _lastMouseCoord: Point | null;
    private _lastFrame: number;

    constructor(canvas: HTMLCanvasElement, sectorSize: number, sectorSource: SectorSource, playerData: PlayerData) {
        this._canvas = canvas;
        this._sectorSize = sectorSize;
        this._sectorSource = sectorSource;
        this._playerData = playerData;
        this._mapToScreen = new Transform(0, 0, 1);

        // size the canvas to fill the entire window
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            // whenever the browser gets resized we need to update our canvas
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this.render();
        });
        window.addEventListener('contextmenu', e => e.preventDefault());
        this._canvas.addEventListener('mousedown', e => this.mouseDown(e));
        this._canvas.addEventListener('mouseup', e => this.mouseUp(e));
        this._canvas.addEventListener('mousemove', e => this.mouseMove(e));
        this._canvas.addEventListener('wheel', e => this.mouseWheel(e));
        window.addEventListener('keyup', e => this.keyUp(e));
    }

    get transform(): Transform {
        return this._mapToScreen;
    }

    public renderSectorGrid: boolean = true;
    public renderDebugText: boolean = true;

    public render(): void {
        const fps = 1000 / (Date.now() - this._lastFrame);
        this._lastFrame = Date.now();

        const ctx = this._canvas.getContext('2d');

        // project screen viewport into map coordinates
        const tlScreen = { x: 0, y: 0 };
        const brScreen = { x: this._canvas.width, y: this._canvas.height };
        const tlMap = this._mapToScreen.untransform(tlScreen);
        const brMap = this._mapToScreen.untransform(brScreen);
        const tlSect = new Point(
            Math.floor(tlMap.x / this._sectorSize),
            Math.floor(tlMap.y / this._sectorSize));
        const brSect = new Point(
            Math.ceil(brMap.x / this._sectorSize),
            Math.ceil(brMap.y / this._sectorSize));

        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        const sectors = this._sectorSource.getSectors(tlSect.x, tlSect.y, brSect.x, brSect.y);
        // alpha based on scale
        // scale [min, 0.5] -> alpha 0.0
        // scale [0.5, 2.0] -> alpha (linear)
        // scale [2.0, max] -> alpha 1.0
        const alpha = Math.max(0, Math.min((this._mapToScreen.scale - 0.5) / 1.5, 1.0));

        for (let sx = tlSect.x; sx <= brSect.x; sx++) {
            const sectX = sectors[sx];
            if (!sectX) continue;

            for (let sy = tlSect.y; sy <= brSect.y; sy++) {
                const sectY = sectX[sy];
                if (!sectY) continue;

                if (this.renderSectorGrid) {
                    ctx.strokeStyle = "gray";
                    ctx.fillStyle = "gray";
                    ctx.setLineDash([10, 10]);
                    ctx.font = "16px Courier New";

                    const tlSect = this._mapToScreen.transform({ x: sx * this._sectorSize, y: sy * this._sectorSize });
                    const brSect = this._mapToScreen.transform({ x: (sx + 1) * this._sectorSize, y: (sy + 1) * this._sectorSize });
                    ctx.strokeRect(tlSect.x, tlSect.y, brSect.x - tlSect.x, brSect.y - tlSect.y);
                    ctx.fillText(`${sx}:${sy}`, tlSect.x + 4, tlSect.y + 20);

                    ctx.setLineDash([]);
                }

                for (const star of sectY) {
                    const tp = this._mapToScreen.transform(star);
                    ctx.fillStyle = "white"; //this._playerData.homeworld.star.id === star.id ? "blue" : "white";
                    ctx.beginPath();
                    ctx.arc(tp.x, tp.y, Math.max(3, 5 * this._mapToScreen.scale), 0, 2 * Math.PI);
                    ctx.fill();

                    if (alpha > 0) {
                        for (const planet of star.planets) {
                            ctx.strokeStyle = `rgba(37, 37, 37, ${alpha})`;
                            if (this._playerData.homeworld.star.id === star.id && this._playerData.homeworld.id == planet.id) {
                                ctx.fillStyle = `rgba(0, 0, 255, ${alpha})`;
                            } else {
                                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                            }

                            // draw orbit first
                            ctx.beginPath();
                            ctx.arc(tp.x, tp.y, planet.r * this._mapToScreen.scale, 0, 2 * Math.PI);
                            ctx.stroke();
                            // now draw planet
                            ctx.beginPath();
                            const tPlanetPt = this._mapToScreen.transform(planet);
                            ctx.arc(tPlanetPt.x, tPlanetPt.y, this._mapToScreen.scale, 0, 2 * Math.PI);
                            ctx.fill();
                        }
                    }
                }
            }
        }

        if (alpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            for (const ship of this._playerData.ships) {
                if (ship.loc instanceof Planet || ship.loc instanceof Star) {
                    // ship is in orbit, so draw that
                    const orbitR = ship.loc instanceof Planet ? 5 : 10;
                    // draw orbit first
                    const tLoc = this._mapToScreen.transform(ship.loc);
                    ctx.beginPath();
                    ctx.arc(tLoc.x, tLoc.y, orbitR * this._mapToScreen.scale, 0, 2 * Math.PI);
                    ctx.stroke();
                    // now draw ship
                    const phi = ((Date.now() % 10000) / 10000) * 2 * Math.PI;
                    const shipPt = new Point(
                        ship.loc.x + orbitR * Math.cos(phi),
                        ship.loc.y + orbitR * Math.sin(phi));
                    const tPlanetPt = this._mapToScreen.transform(shipPt);
                    ctx.save();
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.translate(tPlanetPt.x, tPlanetPt.y);
                    ctx.scale(0.01 * this._mapToScreen.scale, -0.01 * this._mapToScreen.scale);
                    ctx.rotate(-phi);
                    ctx.fill(ShipPath);
                    ctx.restore();
                } else {
                    const tLoc = this._mapToScreen.transform(ship.loc);
                    ctx.save();
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.translate(tLoc.x, tLoc.y);
                    ctx.scale(0.01 * this._mapToScreen.scale, -0.01 * this._mapToScreen.scale);
                    ctx.fill(ShipPath);
                    ctx.restore();
                }
            }
        }

        if (this.renderDebugText) {
            ctx.font = "16px Courier New";
            ctx.fillStyle = "red";
            ctx.fillText(`  offset: ${this._mapToScreen.offset}`, 10, 16);
            ctx.fillText(`   scale: ${this._mapToScreen.scale.toFixed(3)}`, 10, 32);
            ctx.fillText(`viewport: ${tlMap}, ${brMap}`, 10, 48);
            ctx.fillText(` sectors: ${tlSect}, ${brSect}`, 10, 64);
            ctx.fillText(`  ${fps.toFixed(1)} FPS`, 10, 80);
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
    }

    private mouseMove(e: MouseEvent): void {
        if (!this._lastMouseCoord || e.buttons != 2) {
            return;
        }

        const deltaX = e.clientX - this._lastMouseCoord.x;
        const deltaY = e.clientY - this._lastMouseCoord.y;
        this._mapToScreen.translate(deltaX, deltaY);

        this._lastMouseCoord = new Point(e.clientX, e.clientY);
    }

    private mouseWheel(e: WheelEvent): void {
        const oldScale = this._mapToScreen.scale;
        const newScale = Math.max(0.15, Math.min(this._mapToScreen.scale + (this._mapToScreen.scale * 0.005) * -e.deltaY, 30));
        const zoomPoint = this._mapToScreen.untransform(new Point(e.clientX, e.clientY));
        const scaleDelta = newScale - oldScale;

        this._mapToScreen.scale = newScale;
        this._mapToScreen.translate(-zoomPoint.x * scaleDelta, -zoomPoint.y * scaleDelta);
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