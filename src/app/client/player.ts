import { Star, Planet, StarsClient, PlanetMeta } from "./stars";
import { Point } from "../2d";
import * as _ from "lodash";
import { wrap, Remote } from "comlink";

export interface Ship {
    loc: Star | Planet | Point
}

export class PlanetWithMeta extends Planet {
    meta: PlanetMeta;
}

type ServerWorkerAPI = Remote<import("../server/worker").ServerWorker>;

export class PlayerClient {
    private readonly _starClient: StarsClient;
    private readonly _serverClient: Remote<ServerWorkerAPI>;

    constructor(starClient: StarsClient, worker: Worker) {
        this._starClient = starClient;
        this._serverClient = wrap<ServerWorkerAPI>(worker);
    }

    async getHomeworld(): Promise<Planet> {
        const serverHw = await this._serverClient.getHomeworld();
        const hw = await this._starClient.getPlanet(serverHw.starId, serverHw.id);
        if (hw === undefined) {
            throw `Player homeworld is undefined (starId: ${serverHw.starId}, planetId: ${serverHw.id})`;
        }
        return hw;
    }

    async getPlanets(): Promise<Readonly<PlanetWithMeta[]>> {
        return await Promise.all(_.map(await this._serverClient.getPlanets(), async dbPlanet => {
            const p = await this._starClient.getPlanet(dbPlanet.starId, dbPlanet.id);
            const meta = await this._starClient.getPlanetMeta(dbPlanet.starId, dbPlanet.id);
            const pwm = Object.assign(new PlanetWithMeta(), p!);
            pwm.meta = meta!;
            return pwm;
        }));
    }

    async getShips(): Promise<Readonly<Ship[]>> {
        return Promise.all(_.map(await this._serverClient.getShips(), async dbShip => {
            let loc: Star | Planet | Point | undefined;
            switch (dbShip.loc.type) {
                case 'Star':
                    loc = await this._starClient.getStar(dbShip.loc.id);
                    break;
                case 'Planet':
                    loc = await this._starClient.getPlanet(dbShip.loc.starId, dbShip.loc.id);
                    break;
                case 'Point':
                    loc = new Point(dbShip.loc.x, dbShip.loc.y);
                    break;
            }
            if (loc === undefined) {
                throw 'location undefined';
            }
            return { loc };
        }));
    }
}