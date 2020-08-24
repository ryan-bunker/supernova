import { Transform, Point } from "./2d";
import { Star } from "./server/stars";

interface SectorSource {
    getSectors(sxMin: number, syMin: number, sxMax: number, syMax: number): Star[][][];
}

export class Renderer {
    private readonly _canvas: HTMLCanvasElement;
    private readonly _sectorSize: number;
    private readonly _sectorSource: SectorSource;
    private readonly _mapToScreen: Transform;
    private _lastMouseCoord: Point|null;

    constructor(canvas: HTMLCanvasElement, sectorSize: number, sectorSource: SectorSource) {
        this._canvas = canvas;
        this._sectorSize = sectorSize;
        this._sectorSource = sectorSource;
        this._mapToScreen = new Transform(canvas.width / 2, canvas.height / 2);

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

        for (let sx = tlSect.x; sx < brSect.x; sx++) {
            const sectX = sectors[sx];
            if (!sectX) continue;

            for (let sy = tlSect.y; sy < brSect.y; sy++) {
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
                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    ctx.arc(tp.x, tp.y, 5 * this._mapToScreen.scale, 0, 2 * Math.PI);
                    ctx.fill();

                    for (const planet of star.planets) {
                        // alpha based on scale
                        // scale [min, 1.0] -> alpha 0.0
                        // scale [1.0, 2.0] -> alpha (linear)
                        // scale [2.0, max] -> alpha 1.0
                        const alpha = Math.max(0, Math.min(this._mapToScreen.scale - 1.0, 1.0));
                        ctx.strokeStyle = `rgba(37, 37, 37, ${alpha})`;
                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

                        // draw orbit first
                        ctx.beginPath();
                        ctx.arc(tp.x, tp.y, planet.r * this._mapToScreen.scale, 0, 2 * Math.PI);
                        ctx.stroke();
                        // now draw planet
                        ctx.beginPath();
                        const planetPt = new Point(
                            star.x + planet.r * Math.cos(planet.phi),
                            star.y + planet.r * Math.sin(planet.phi));
                        const tPlanetPt = this._mapToScreen.transform(planetPt);
                        ctx.arc(tPlanetPt.x, tPlanetPt.y, this._mapToScreen.scale, 0, 2 * Math.PI);
                        ctx.fill();
                    }
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
        }
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
        this.render();

        this._lastMouseCoord = new Point(e.clientX, e.clientY);
    }

    private mouseWheel(e: WheelEvent): void {
        const oldScale = this._mapToScreen.scale;
        const newScale = Math.max(0.15, Math.min(this._mapToScreen.scale + (this._mapToScreen.scale * 0.005) * e.deltaY, 30));
        const zoomPoint = this._mapToScreen.untransform(new Point(e.clientX, e.clientY));
        const scaleDelta = newScale - oldScale;

        this._mapToScreen.scale = newScale;
        this._mapToScreen.translate(-zoomPoint.x * scaleDelta, -zoomPoint.y * scaleDelta);
        this.render();
    }

    private keyUp(e: KeyboardEvent): void {
        switch (e.code) {
            case 'KeyG':
                this.renderSectorGrid = !this.renderSectorGrid;
                break;
            case 'KeyX':
                this.renderDebugText = !this.renderDebugText;
                break;
            default:
                // we don't wwant to render if any other key was pressed
                return;
        }
        this.render();
    }
}