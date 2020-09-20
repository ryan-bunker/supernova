import { Star, Planet, StarsClient, PlanetMeta } from "./stars";
import { Point } from "../2d";
import * as _ from "lodash";
import { wrap, Remote } from "comlink";
import {ApolloClient, gql} from "apollo-boost";

export interface Ship {
    loc: Star | Planet | Point
}

export class PlanetWithMeta extends Planet {
    meta: PlanetMeta;
}

type ServerWorkerAPI = Remote<import("../server/worker").ServerWorker>;

export class PlayerClient {
    private readonly _playerId: number;
    private readonly _starClient: StarsClient;
    private readonly _serverClient: Remote<ServerWorkerAPI>;
    private readonly _apiClient: ApolloClient<any>;

    constructor(playerId: number, starClient: StarsClient, worker: Worker, client: ApolloClient<any>) {
        this._playerId = playerId;
        this._starClient = starClient;
        this._serverClient = wrap<ServerWorkerAPI>(worker);
        this._apiClient = client;
    }

    async getHomeworld(): Promise<Planet> {
        return (await this.getPlanets())[0];
    }

    async getPlanets(): Promise<Readonly<PlanetWithMeta[]>> {
        const result = await this._apiClient.query({
            query: gql`
                {
                    planetMeta(where: { ownerId: ${this._playerId} }) {
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
        
        const planets = result.data.planetMeta;
        return await Promise.all(_.map(planets, async pm => {
            const p = await this._starClient.getPlanet(pm.planetId);
            const pwm = Object.assign(new PlanetWithMeta(), p!);
            pwm.meta = {
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
            return pwm;
        }))
    }

    async getShips(): Promise<Readonly<Ship[]>> {
        const result = await this._apiClient.query({
            query: gql`
                {
                    ships(where: { playerId: 1 }) {
                        id
                        playerId
                        locationStar
                        locationPlanet
                        locationPoint {
                            x y
                            sectorX sectorY
                        }
                    }
                }`
        });
        
        return Promise.all(_.map(result.data.ships, async dbShip => {
            let loc: Star | Planet | Point | undefined;
            if (dbShip.locationStar) {
                loc = await this._starClient.getStar(dbShip.locationStar);
            } else if (dbShip.locationPlanet) {
                loc = await this._starClient.getPlanet(dbShip.locationPlanet);
            } else if (dbShip.locationPoint) {
                loc = new Point(dbShip.locationPoint.x, dbShip.locationPoint.y);
            }
            if (loc === undefined) {
                throw 'location undefined';
            }
            return { loc };
        }));
    }
}