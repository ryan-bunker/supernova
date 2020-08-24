import { Planet, StarDB } from "./stars";

export class PlayerInfo {
    private readonly _planets: Planet[] = [];

    get homeworld(): Planet {
        return this._planets[0];
    }

    public static generatePlayer(db: StarDB): PlayerInfo {
        // look for a homeworld for the player
        const player = new PlayerInfo();
        for (let sx=0; ; sx++) {
            const [[sector]] = db.getSectors(sx, 0);
            let homeworld: Planet | null = null;
            for (const star of sector) {
                if (star.planets.length != 4)
                    continue;
                homeworld = star.planets[1];
                break;
            }
            if (!homeworld) continue;

            player._planets.push(homeworld);
            break;
        }
        return player;
    }
}