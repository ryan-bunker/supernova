import * as _ from "lodash";
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

export class StarsClient {
    private readonly _apiClient: ApolloClient<any>;

    constructor(client: ApolloClient<any>) {
        this._apiClient = client;
    }

    async getStar(id: string): Promise<Star | undefined> {
        const result = await this._apiClient.query({
            query: gql`
                {
                    stars(where: { id: "${id}" }) {
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
        if (result.data.stars.length == 0)
            return undefined;
        const s = result.data.stars[0];
        return Object.assign(new Star(), {
            id: s.id,
            name: s.name,
            x: s.x,
            y: s.y,
            sx: s.sectorX,
            sy: s.sectorY,
            planets: _.map<any, Planet>(s.planets, (planet: any): Planet =>
                Object.assign(new Planet(), {
                    id: planet.id,
                    name: planet.name,
                    phi: planet.phi,
                    r: planet.r,
                    year: planet.year,
                    star: s
                }))
        });
    }

    async getPlanet(planetId: string): Promise<Planet | undefined> {
        const result = await this._apiClient.query({
            query: gql`
                {
                    planet(where: { id: "${planetId}" }) {
                        id
                        name
                        phi
                        r
                        year
                        star {
                            id
                            name
                            sectorX
                            sectorY
                            x
                            y
                        }
                    }
                }`
        });
        const p = result.data.planet[0];
        return Object.assign(new Planet(), {
            id: p.id,
            name: p.name,
            r: p.r,
            phi: p.phi,
            year: p.year,
            star: Object.assign(new Star(), {
                id: p.star.id,
                name: p.star.name,
                sx: p.star.sectorX,
                sy: p.star.sectorY,
                x: p.star.x,
                y: p.star.y
            })
        });
    }

    async getPlanetMeta(planetId: string): Promise<PlanetMeta | undefined> {
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
}