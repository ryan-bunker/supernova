import * as seedrandom from 'seedrandom';

export type Star = {
    id: number,
    x: number,
    y: number,
    sx: number,
    sy: number,
};

export class StarDB {
    private readonly _stars: Star[] = [];
    private readonly _sectors: number[][][] = [];
    private readonly _sectorSize: number;
    private readonly _starDensity: number;

    constructor(sectorSize: number, starDensity: number) {
        this._sectorSize = sectorSize;
        this._starDensity = starDensity;
    }

    public getSectors(minX: number, minY: number, maxX: number, maxY: number): Star[][][] {
        const block: Star[][][] = [];
        for (let sx = minX; sx < maxX; sx++) {
            block[sx] = [];
            for (let sy = minY; sy < maxY; sy++) {
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
        const s = {
            id: this._stars.length,
            x, y,
            sx: Math.floor(x / this._sectorSize),
            sy: Math.floor(y / this._sectorSize)
        };
        this._stars.push(s);
        return s;
    }

    private generateSector(sx: number, sy: number): number[] {
        // each sector has +/-10% of _starDensity
        const count = Math.floor(Math.random() * 2 * this._starDensity * 0.1 + this._starDensity * 0.9);
        const sector: number[] = [];
        console.log(`Generating sector (${sx}, ${sy}) with ${count} stars`);

        // generate 'count' random stars with random positions
        for (let i = 0; i < count; i++) {
            const x = Math.floor((Math.random() + sx) * this._sectorSize);
            const y = Math.floor((Math.random() + sy) * this._sectorSize);
            const s = this.generateStar(x, y);
            sector.push(s.id);
        }

        // now we do a little bit of gravity clumping - for each star, calculate
        // the average of all vectors to each other star in the sector, weighted
        // by distance (closer stars have more of an effect), then move the star
        // 50% of the average.
        for (const starIdx of sector) {
            const star = this._stars[starIdx];
            const avg = { x: 0, y: 0 };

            for (const otherStarIdx of sector) {
                const otherStar = this._stars[otherStarIdx];
                if (star.id === otherStar.id) continue;  // skip ourselves

                // get vector and magnitude from star to otherStar
                const v = { x: otherStar.x - star.x, y: otherStar.y - star.y };
                const d = Math.sqrt(v.x * v.x + v.y * v.y);
                // add vector into running total, weight by distance
                avg.x += v.x / d;
                avg.y += v.y / d;
            }
            // calculate average
            avg.x = avg.x / (sector.length - 1);
            avg.y = avg.y / (sector.length - 1);

            // move our star along the average vector 50%
            star.x += avg.x * 0.5;
            star.y += avg.y * 0.5;
        }

        return sector;
    }

    public static generateUniverse(seed: string, mapSize: number, sectorSize: number, starDensity: number): StarDB {
        seedrandom(seed);

        const db = new StarDB(sectorSize, starDensity);
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