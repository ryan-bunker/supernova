import seedrandom from 'seedrandom';
import './style.css';

const MAP_SIZE = 20000,
      SECTOR_SIZE = 500,
      STAR_DENSITY = 15;
let global_stars;
let global_sectors;

function generateStars() {
    seedrandom('stars! is awesome');

    const stars = [];
    const sectors = [];

    for (let sx= -MAP_SIZE/SECTOR_SIZE; sx < MAP_SIZE/SECTOR_SIZE; sx++) {
        for (let sy = -MAP_SIZE/SECTOR_SIZE; sy < MAP_SIZE/SECTOR_SIZE; sy++) {
            const count = Math.random() * 2 * STAR_DENSITY * 0.1 + STAR_DENSITY * 0.9;
            
            let sectX = sectors[sx];
            if (!sectX) {
                sectX = [];
                sectors[sx] = sectX;
            }
            let sector = sectX[sy];
            if (!sector) {
                sector = [];
                sectX[sy] = sector;
            }

            for (let i = 0; i < count; i++) {
                const x = Math.floor((Math.random() + sx) * SECTOR_SIZE);
                const y = Math.floor((Math.random() + sy) * SECTOR_SIZE);
                
                stars.push({ id: stars.length, x, y, sx, sy});
                sector.push(stars.length - 1);
            }

            for (const starIdx of sector) {
                const star = stars[starIdx];
                const avg = {x: 0, y: 0};
                for (const otherStarIdx of sector) {
                    const otherStar = stars[otherStarIdx];
                    if (star.id === otherStar.id) continue;
                    const v = {x: otherStar.x - star.x, y: otherStar.y - star.y};
                    const d = Math.sqrt(v.x * v.x + v.y * v.y);
                    avg.x += v.x / d;
                    avg.y += v.y / d;
                }
                avg.x = avg.x / (sector.length - 1);
                avg.y = avg.y / (sector.length - 1);

                star.x += avg.x * 0.5;
                star.y += avg.y * 0.5;
            }
        }
    }
    
    return { stars, sectors };
}

const mapState = {
    translateX: 0,
    translateY: 0,
    scale: 1.0,
    scalePointX: 0,
    scalePointY: 0,
};
let lastMouse = null;
let dragging = false;

function resize_canvas() {
    const canvas = document.getElementById("canvas");
    if (canvas.width  < window.innerWidth) {
        canvas.width  = window.innerWidth;
    }

    if (canvas.height < window.innerHeight) {
        canvas.height = window.innerHeight;
    }
}

function transform(point) {
    return {
        x: point.x * mapState.scale + mapState.translateX,
        y: point.y * mapState.scale + mapState.translateY
    };
}

function transformScreenToMap(point) {
    return {
        x: (point.x - mapState.translateX) / mapState.scale,
        y: (point.y - mapState.translateY) / mapState.scale
    };
}

function draw() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // project screen viewport into map coordinates
    const tlScreen = {x: 0, y: 0};
    const brScreen = {x: canvas.width, y: canvas.height};
    const tlMap = transformScreenToMap(tlScreen);
    const brMap = transformScreenToMap(brScreen);
    const sxMin = Math.floor(tlMap.x / SECTOR_SIZE);
    const syMin = Math.floor(tlMap.y / SECTOR_SIZE);
    const sxMax = Math.ceil(brMap.x / SECTOR_SIZE);
    const syMax = Math.ceil(brMap.y / SECTOR_SIZE);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "blue";
    //ctx.strokeRect(tlScreen.x, tlScreen.y, brScreen.x - tlScreen.x, brScreen.y - tlScreen.y);

    ctx.strokeStyle = "gray";
    ctx.setLineDash([10, 10]);

    for (let sx = sxMin; sx < sxMax; sx++) {
        const sectX = global_sectors[sx];
        if (!sectX) continue;

        for (let sy = syMin; sy < syMax; sy++) {
            const sectY = sectX[sy];
            if (!sectY) continue;

            const tlSect = transform({x: sx * SECTOR_SIZE, y: sy * SECTOR_SIZE});
            const brSect = transform({x: (sx+1) * SECTOR_SIZE, y: (sy+1) * SECTOR_SIZE});
            //ctx.strokeRect(tlSect.x, tlSect.y, brSect.x - tlSect.x, brSect.y - tlSect.y);

            for (const starIdx of sectY) {
                const p = global_stars[starIdx];
                const tp = transform(p);
                ctx.fillStyle = "white";
                ctx.beginPath();
                const r = 5 * mapState.scale;
                ctx.arc(tp.x, tp.y, r, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    ctx.font = "16px Courier New";
    ctx.fillStyle = "red";
    ctx.fillText(`translate: (${mapState.translateX}, ${mapState.translateY})`, 10, 16);
    ctx.fillText(`    scale: ${mapState.scale}`, 10, 32);
    ctx.fillText(` viewport: (${tlMap.x}, ${tlMap.y}), (${brMap.x}, ${brMap.y})`, 10, 48);
    ctx.fillText(`  sectors: (${sxMin}, ${syMin}), (${sxMax}, ${syMax})`, 10, 64);    
}

function body_load() {
    const canvas = document.getElementById('canvas');

    const data = generateStars();
    global_stars = data.stars;
    global_sectors = data.sectors;

    resize_canvas();
    mapState.translateX = canvas.width / 2;
    mapState.translateY = canvas.height / 2;
    draw();

    canvas.addEventListener('contextmenu', event => event.preventDefault());

    canvas.addEventListener('mousedown', (e) => {
        if (e.buttons == 2) {
            lastMouse = {x: e.clientX, y: e.clientY};
        }
    });

    canvas.addEventListener('mouseup', (e) => {
        if (lastMouse != null) {
            lastMouse = null;
            return;
        }
        //console.log(`click: (${e.clientX}, ${e.clientY})`);
        //points.push({x: e.clientX, y: e.clientY});
        //draw();
    });

    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons != 2) {
            return;
        }

        const deltaX = e.clientX - lastMouse.x;
        const deltaY = e.clientY - lastMouse.y;
        mapState.translateX += deltaX;
        mapState.translateY += deltaY;
        draw();

        lastMouse = {x: e.clientX, y: e.clientY};
    });

    canvas.addEventListener('wheel', (e) => {
        // mapState.scale = Math.max(0.05, Math.min(mapState.scale + 0.001 * e.deltaY, 3));
        // mapState.scalePointX = e.clientX;
        // mapState.scalePointY = e.clientY;
        const oldScale = mapState.scale;
        const newScale = Math.max(0.3, Math.min(mapState.scale + (mapState.scale * 0.005) * e.deltaY, 30));
        const zoomPoint = transformScreenToMap({x: e.clientX, y: e.clientY});
        const scaleDelta = newScale - oldScale;

        mapState.scale = newScale;
        mapState.translateX -= zoomPoint.x * scaleDelta;
        mapState.translateY -= zoomPoint.y * scaleDelta;
        draw();
    });
}

console.log('running...');
body_load();
