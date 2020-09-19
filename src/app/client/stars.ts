import * as _ from "lodash";
import { GetStarResponse,  GetPlanetMetaResponse } from "../worker/messaging";
import { wrap, Remote } from "comlink";
import {ApolloClient, gql} from "apollo-boost";

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
    factories: { count: number, max: number };
    mines: { count: number, max: number };
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

type ServerWorkerAPI = Remote<import("../server/worker").ServerWorker>;

export class StarsClient {
    private readonly _client: Remote<ServerWorkerAPI>;
    private readonly _apiClient: ApolloClient<any>;

    constructor(worker: Worker, client: ApolloClient<any>) {
        this._client = wrap<ServerWorkerAPI>(worker);
        this._apiClient = client;
    }

    async getStar(id: string): Promise<Star | undefined> {
        const resp = await this._client.getStar(id);
        if (resp === undefined) return undefined;
        return StarsClient.mapStar(resp);
    }

    async getPlanet(starId: string, planetId: string): Promise<Planet | undefined> {
        const s = await this.getStar(starId);
        if (s === undefined) return undefined;
        return _.head(_.filter(s.planets, p => p.id == planetId));
    }

    async getPlanetMeta(starId: string, planetId: string): Promise<PlanetMeta | undefined> {
        const result = await this._apiClient.query({
            query: gql`
                {
                    planetMeta(where: { planetId: "${planetId}" }) {
                        planetId
                        gravity
                        temperature
                        radiation
                        surface {
                            ironium
                            boranium
                            germanium
                        }
                        concentration {
                            ironium
                            boranium
                            germanium
                        }
                        factories
                        mines
                        population
                    }
                }`
        });
        const pm = result.data.planetMeta[0];
        return {
            gravity: pm.gravity,
            temperature: pm.temperature,
            radiation: pm.radiation,
            surface: {
                ironium: pm.surface.ironium,
                boranium: pm.surface.boranium,
                germanium: pm.surface.germanium
            },
            concentration: {
                ironium: pm.concentration.ironium,
                boranium: pm.concentration.boranium,
                germanium: pm.concentration.germanium
            },
            factories: { count: pm.factories, max: 0 },
            mines: { count: pm.mines, max: 0 },
            population: pm.population
        };
    }

    async getSectors(sxMin: number, syMin: number, sxMax?: number, syMax?: number): Promise<Star[]> {
        if (sxMax === undefined) sxMax = sxMin;
        if (syMax === undefined) syMax = syMin;

        const result = await this._apiClient.query({
            query: gql`
                {
                    sectors(sxMin: ${sxMin}, syMin: ${syMin}, sxMax: ${sxMax}, syMax: ${syMax}) {
                        id
                        name
                        sectorX
                        sectorY
                        x
                        y
                        planets {
                            id
                            name
                            phi
                            r
                            year
                        }
                    }
                }`
        });
        return _.map<any, Star>(result.data.sectors, (sector: any): Star => ({
            id: sector.id,
            name: sector.name,
            x: sector.x,
            y: sector.y,
            sx: sector.sectorX,
            sy: sector.sectorY,
            planets: _.map<any, Planet>(sector.planets, (planet: any): Planet =>
                Object.assign(new Planet(), {
                    id: planet.id,
                    name: planet.name,
                    phi: planet.phi,
                    r: planet.r,
                    year: planet.year,
                    star: sector
                }))
        }));
    }

    private static mapStar(dbStar: GetStarResponse): Star {
        const s = new Star();
        s.id = dbStar.id;
        s.name = dbStar.name;
        s.x = dbStar.x;
        s.y = dbStar.y;
        s.sx = dbStar.sx;
        s.sy = dbStar.sy;
        s.planets = _.map(dbStar.planets, dbPlanet => {
            const p = new Planet();
            p.id = dbPlanet.id;
            p.star = s;
            p.name = dbPlanet.name;
            p.r = dbPlanet.r;
            p.phi = dbPlanet.phi;
            p.year = dbPlanet.year;
            return p;
        });
        return s;
    }

    private static mapPlanetMeta(meta: GetPlanetMetaResponse): PlanetMeta {
        return {
            gravity: meta.gravity,
            temperature: meta.temperature,
            radiation: meta.radiation,
            surface: meta.surface,
            concentration: meta.concentration,
            factories: meta.factories,
            mines: meta.mines,
            population: meta.population
        };
    }
}