import * as server from "../server/stars";
import * as _ from "lodash";

export class Planet {
    id: string;
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
    id: string;
    x: number;
    y: number;
    sx: number;
    sy: number;
    planets: Planet[];
}

export class StarsClient {
    private readonly _db: server.StarDB;

    constructor(db: server.StarDB) {
        this._db = db;
    }

    getStar(id: string): Star|undefined {
        const s = this._db.getStar(id);
        if (s === undefined)
            return undefined;
        return this.mapStar(s);
    }

    getPlanet(starId: string, planetId: string): Planet|undefined {
        const s = this.getStar(starId);
        return _.head(_.filter(s.planets, p => p.id == planetId));
    }

    getSectors(sxMin: number, syMin: number, sxMax: number, syMax: number): Star[][][] {
        const stars = this._db.getSectors(sxMin, syMin, sxMax, syMax);
        const result: Star[][][] = [];
        for (let sx=sxMin; sx<=sxMax; sx++) {
            result[sx] = [];
            for (let sy=syMin; sy<=syMax; sy++) {
                result[sx][sy] = _.map(stars[sx][sy], dbStar => this.mapStar(dbStar));
            }
        }
        return result;
    }

    private mapStar(dbStar: server.Star): Star {
        const s = new Star();
        s.id = dbStar.id;
        s.x = dbStar.x;
        s.y = dbStar.y;
        s.sx = dbStar.sx;
        s.sy = dbStar.sy;
        s.planets = _.map(dbStar.planets, dbPlanet => this.mapPlanet(s, dbPlanet));
        return s;
}

    private mapPlanet(star: Star, dbPlanet: server.Planet): Planet {
        const p = new Planet();
        p.id = dbPlanet.id;
        p.star = star;
        p.r = dbPlanet.r;
        p.phi = dbPlanet.phi;
        p.year = dbPlanet.year;
        return p;
    }
}