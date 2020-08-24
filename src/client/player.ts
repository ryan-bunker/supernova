import { Star, Planet, StarsClient } from "./stars";
import { Point } from "../2d";
import { PlayerInfo } from "../server/player";
import * as _ from "lodash";

export interface Ship {
    loc: Star | Planet | Point
}

export class PlayerClient {
    private readonly _starClient: StarsClient;
    private readonly _playerDb: PlayerInfo;

    constructor(starClient: StarsClient, playerDb: PlayerInfo) {
        this._starClient = starClient;
        this._playerDb = playerDb;
    }

    get homeworld(): Planet {
        return this._starClient.getPlanet(this._playerDb.homeworld.starId, this._playerDb.homeworld.id);
    }

    get ships(): Readonly<Ship[]> {
        return _.map(this._playerDb.ships, dbShip => {
            let loc: Star | Planet | Point;
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
            return { loc };
        });
    }
}