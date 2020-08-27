import * as server from "../server/stars";
import * as _ from "lodash";

export type MineralType = "ironium" | "boranium" | "germanium";
export type Minerals = { [mt in MineralType]: number };

export class Planet {
    id: string;
    star: Star;
    name: string;
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

export interface PlanetMeta {
    gravity: number;
    temperature: number;
    radiation: number;
    surface: Minerals;
    concentration: Minerals;
    factories: {count: number, max: number};
    mines: {count: number, max: number};
    population: number;
}

export class Star {
    id: string;
    name: string;
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
        if (s === undefined) return undefined;
        return this.mapStar(s);
    }

    getPlanet(starId: string, planetId: string): Planet|undefined {
        const s = this.getStar(starId);
        if (s === undefined) return undefined;
        return _.head(_.filter(s.planets, p => p.id == planetId));
    }

    getPlanetMeta(starId: string, planetId: string): PlanetMeta|undefined {
        const s = this._db.getStar(starId);
        if (s === undefined) return undefined;
        const p = _.head(_.filter(s.planets, p => p.id == planetId));
        if (p === undefined) return undefined;
        return p.meta;
    }

    getSectors(sxMin: number, syMin: number, sxMax?: number, syMax?: number): Star[][][] {
        if (sxMax === undefined) sxMax = sxMin;
        if (syMax === undefined) syMax = syMin;

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
        s.name = dbStar.name;
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
        p.name = dbPlanet.name;
        p.r = dbPlanet.r;
        p.phi = dbPlanet.phi;
        p.year = dbPlanet.year;
        return p;
    }
}