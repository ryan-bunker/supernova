import { StarDB } from './server/stars';
import { Renderer } from './renderer';
import './style.css';

const MAP_SIZE = 1000,
      SECTOR_SIZE = 1000,
      STAR_DENSITY = 10;
const db = StarDB.generateUniverse('stars! is awesome', MAP_SIZE, SECTOR_SIZE, STAR_DENSITY);

window.onload = function() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const renderer = new Renderer(canvas, SECTOR_SIZE, db);
    renderer.render();
}
