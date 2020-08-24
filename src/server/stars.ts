import Rand from 'rand-seed';
import { Vector, distanceSq } from '../2d';

export class Planet {
    id: number;
    star: Star;
    r: number;
    phi: number;
    year: number;

    get x(): number {
        const period = Math.floor(600000 * this.year);
        const phi = this.phi + ((Date.now() % period) / period) * 2 * Math.PI;
        return this.star.x + this.r * Math.cos(phi);
    }

    get y(): number {
        const period = Math.floor(600000 * this.year);
        const phi = this.phi + ((Date.now() % period) / period) * 2 * Math.PI;
        return this.star.y + this.r * Math.sin(phi);
    }
}

export class Star {
    id: number;
    x: number;
    y: number;
    sx: number;
    sy: number;
    planets: Planet[];
}

export class StarDB {
    private readonly _stars: Star[] = [];
    private readonly _sectors: number[][][] = [];
    private readonly _sectorSize: number;
    private readonly _starDensity: number;
    private readonly _rand: { next: () => number };

    constructor(seed: string, sectorSize: number, starDensity: number) {
        this._sectorSize = sectorSize;
        this._starDensity = starDensity;
        this._rand = new Rand(seed);
    }

    public getSectors(minX: number, minY: number, maxX?: number, maxY?: number): Star[][][] {
        if (maxX === undefined) maxX = minX;
        if (maxY === undefined) maxY = minY;

        const block: Star[][][] = [];
        for (let sx = minX; sx <= maxX; sx++) {
            block[sx] = [];
            for (let sy = minY; sy <= maxY; sy++) {
                block[sx][sy] = this.getSectorStars(sx, sy);
            }
        }
        return block;
    }

    private getSectorStars(sx: number, sy: number): Star[] {
        let sectX = this._sectors[sx];
        if (!sectX) {
            // we've never generated this sector column
            sectX = [];
            this._sectors[sx] = sectX;
        }

        let sector = sectX[sy];
        if (!sector) {
            // we've never generated this sector, time to do it
            sector = this.generateSector(sx, sy);
            sectX[sy] = sector;
        }

        const stars: Star[] = [];
        for (const starIdx of sector) {
            stars.push(this._stars[starIdx]);
        }
        return stars;
    }

    private generateStar(x: number, y: number): Star {
        const s = new Star();
        s.id = this._stars.length;
        s.x = x;
        s.y = y;
        s.sx = Math.floor(x / this._sectorSize);
        s.sy = Math.floor(y / this._sectorSize);
        s.planets = [];

        const counts = [0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 7];
        const planetCount = counts[Math.floor(this._rand.next() * counts.length)];
        let currentR = 10;
        for (let i = 0; i < planetCount; i++) {
            const p = new Planet();
            p.id = i;
            p.star = s;
            p.r = currentR + Math.floor(this._rand.next() * 20) + 5;
            p.phi = this._rand.next() * 2 * Math.PI;
            p.year = this._rand.next() * 0.8 + 0.2;
            currentR = p.r;
            s.planets.push(p);
        }

        this._stars.push(s);
        return s;
    }

    private generateSector(sx: number, sy: number): number[] {
        // each sector has +/-10% of _starDensity
        const count = Math.floor(this._rand.next() * 2 * this._starDensity * 0.1 + this._starDensity * 0.9);
        const sector: number[] = [];
        console.log(`Generating sector (${sx}, ${sy}) with ${count} stars`);

        // generate 'count' random stars with random positions
        for (let i = 0; i < count; i++) {
            let x: number, y: number;
            while (true) {
                x = Math.floor((this._rand.next() + sx) * this._sectorSize);
                y = Math.floor((this._rand.next() + sy) * this._sectorSize);
                let overlaps = false;
                for (const starIdx of sector) {
                    const otherStar = this._stars[starIdx];
                    const v = new Vector({ x, y }, otherStar);
                    if (distanceSq({ x, y }, otherStar) < 175 * 175) {
                        overlaps = true;
                        break;
                    }
                }
                if (!overlaps) break;
            }
            const s = this.generateStar(x, y);
            sector.push(s.id);
        }

        // now we do a little bit of gravity clumping - for each star, calculate
        // the average of all vectors to each other star in the sector, weighted
        // by distance (closer stars have more of an effect), then move the star
        // 50% of the average.
        // for (const starIdx of sector) {
        //     const star = this._stars[starIdx];
        //     const avg = { x: 0, y: 0 };

        //     for (const otherStarIdx of sector) {
        //         const otherStar = this._stars[otherStarIdx];
        //         if (star.id === otherStar.id) continue;  // skip ourselves

        //         // get vector and magnitude from star to otherStar
        //         const v = { x: otherStar.x - star.x, y: otherStar.y - star.y };
        //         const d = Math.sqrt(v.x * v.x + v.y * v.y);
        //         // add vector into running total, weight by distance
        //         avg.x += v.x / d;
        //         avg.y += v.y / d;
        //     }
        //     // calculate average
        //     avg.x = avg.x / (sector.length - 1);
        //     avg.y = avg.y / (sector.length - 1);

        //     // move our star along the average vector 50%
        //     star.x += avg.x * 0.5;
        //     star.y += avg.y * 0.5;
        // }

        return sector;
    }

    public static generateUniverse(seed: string, mapSize: number, sectorSize: number, starDensity: number): StarDB {
        const db = new StarDB(seed, sectorSize, starDensity);
        const sectorCount = mapSize / sectorSize;

        for (let sx = -sectorCount; sx < sectorCount; sx++) {
            db._sectors[sx] = [];
            for (let sy = -sectorCount; sy < sectorCount; sy++) {
                const sector = db.generateSector(sx, sy);
                db._sectors[sx][sy] = sector;
            }
        }

        return db;
    }
}