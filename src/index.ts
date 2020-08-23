import { StarDB, Star } from './stars';
import './style.css';
import { Renderer } from './renderer';
import { Point } from './2d';

const MAP_SIZE = 1000,
      SECTOR_SIZE = 500,
      STAR_DENSITY = 15;
const db = StarDB.generateUniverse('stars! is awesome', MAP_SIZE, SECTOR_SIZE, STAR_DENSITY);

function resize_canvas() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onload = function() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const renderer = new Renderer(canvas, SECTOR_SIZE, db);
    let lastMouse: Point|null = null;
    
    resize_canvas();
    renderer.render();

    window.addEventListener('resize', () => {
        resize_canvas();
        renderer.render();
    });

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('mousedown', (e) => {
        if (e.buttons == 2) {
            lastMouse = {x: e.clientX, y: e.clientY};
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        lastMouse = null;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons != 2) {
            return;
        }

        const deltaX = e.clientX - lastMouse.x;
        const deltaY = e.clientY - lastMouse.y;
        renderer.transform.translate(deltaX, deltaY);
        renderer.render();

        lastMouse = {x: e.clientX, y: e.clientY};
    });

    canvas.addEventListener('wheel', (e) => {
        const oldScale = renderer.transform.scale;
        const newScale = Math.max(0.3, Math.min(renderer.transform.scale + (renderer.transform.scale * 0.005) * e.deltaY, 30));
        const zoomPoint = renderer.transform.untransform(new Point(e.clientX, e.clientY));
        const scaleDelta = newScale - oldScale;

        renderer.transform.scale = newScale;
        renderer.transform.translate(-zoomPoint.x * scaleDelta, -zoomPoint.y * scaleDelta);
        renderer.render();
    });
}
