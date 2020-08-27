import { Star, Planet, StarsClient, PlanetMeta } from "./stars";
import { Point } from "../2d";
import { PlayerInfo } from "../server/player";
import * as _ from "lodash";

export interface Ship {
    loc: Star | Planet | Point
}

export class PlanetWithMeta extends Planet {
    meta: PlanetMeta;
}

export class PlayerClient {
    private readonly _starClient: StarsClient;
    private readonly _playerDb: PlayerInfo;

    constructor(starClient: StarsClient, playerDb: PlayerInfo) {
        this._starClient = starClient;
        this._playerDb = playerDb;
    }

    get homeworld(): Planet {
        const hw = this._starClient.getPlanet(this._playerDb.homeworld.starId, this._playerDb.homeworld.id);
        if (hw === undefined) {
            throw `Player homeworld is undefined (starId: ${this._playerDb.homeworld.starId}, planetId: ${this._playerDb.homeworld.id})`;
        }
        return hw;
    }

    get planets(): Readonly<PlanetWithMeta[]> {
        return _.map(this._playerDb.planets, dbPlanet => {
            const p = this._starClient.getPlanet(dbPlanet.starId, dbPlanet.id)!;
            const meta = this._starClient.getPlanetMeta(dbPlanet.starId, dbPlanet.id)!;
            const pwm = Object.assign(new PlanetWithMeta(), p);
            pwm.meta = meta;
            return pwm;
        });
    }

    get ships(): Readonly<Ship[]> {
        return _.map(this._playerDb.ships, dbShip => {
            let loc: Star | Planet | Point | undefined;
            if ("starId" in dbShip.loc) {
                // planet
                loc = this._starClient.getPlanet(dbShip.loc.starId, dbShip.loc.id);
            } else if ("id" in dbShip.loc) {
                // star
                loc = this._starClient.getStar(dbShip.loc.id);
            } else {
                // point
                loc = new Point(dbShip.loc.x, dbShip.loc.y);
            }
            if (loc === undefined) {
                throw 'location undefined';
            }
            return { loc };
        });
    }
}