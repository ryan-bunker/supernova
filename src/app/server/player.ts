import { Planet, StarDB, Star } from "./stars";
import { Point } from "../2d";

export type Ship = {
    loc: Star | Planet | Point
}

export class PlayerInfo {
    private readonly _planets: Planet[] = [];
    private readonly _ships: Ship[] = [];

    get homeworld(): Planet {
        return this._planets[0];
    }

    get planets(): Readonly<Planet[]> {
        return this._planets;
    }

    get ships(): Readonly<Ship[]> {
        return this._ships;
    }

    public static generatePlayer(db: StarDB): PlayerInfo {
        // look for a homeworld for the player
        const player = new PlayerInfo();
        for (let sx=0; ; sx++) {
            const [[sector]] = db.getSectors(sx, 0);
            let homestar: Star | null = null;
            let homeworld: Planet | null = null;
            for (const star of sector) {
                if (star.planets.length != 4)
                    continue;
                homestar = star;
                homeworld = star.planets[1];
                break;
            }
            if (!homestar || !homeworld) continue;

            homeworld.meta.population = 33000;
            player._planets.push(homeworld);
            for (const p of homestar.planets) {
                if (p.id === homeworld.id) continue;
                player._planets.push(p);
            }
            break;
        }
        player._ships.push({
            loc: player.homeworld
        });
        return player;
    }
}