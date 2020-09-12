import { StarDB, Star } from "./stars";
import { PlayerInfo } from "./player";
import Game from "./game";
import { GetStarResponse, GetSectorsResponse, GetPlanetMetaResponse, GetPlanetResponse, GetShipResponse } from "../worker/messaging";
import * as _ from "lodash";
import { expose } from "comlink";

console.log('Creating new universe...');
const starDb = StarDB.generateUniverse('stars! is awesome', Game.mapSize, Game.sectorSize, Game.starDensity);
const playerDb = PlayerInfo.generatePlayer(starDb);

function getStar(id: string): GetStarResponse | undefined {
    const s = starDb.getStar(id);
    let resp: GetStarResponse | undefined = undefined;
    if (s) {
        resp = mapStar(s);
    }
    return resp;
}

function getPlanetMeta(starId: string, planetId: string): GetPlanetMetaResponse | undefined {
    const s = starDb.getStar(starId);
    const p = _.head(_.filter(s?.planets, p => p.id == planetId));
    if (!p) return undefined;
    return {
        gravity: p.meta.gravity,
        temperature: p.meta.temperature,
        radiation: p.meta.radiation,
        surface: p.meta.surface,
        concentration: p.meta.concentration,
        factories: p.meta.factories,
        mines: p.meta.mines,
        population: p.meta.population,
    };
}

function getSectors(minX: number, minY: number, maxX?: number, maxY?: number): GetSectorsResponse {
    const sect = starDb.getSectors(minX, minY, maxX, maxY);
    let resp: GetSectorsResponse = [];
    for (const star of sect) {
        resp.push(mapStar(star));
    }
    return resp;
}

function getHomeworld(): GetPlanetResponse {
    return playerDb.homeworld;
}

function getPlanets(): Readonly<GetPlanetResponse[]> {
    return playerDb.planets;
}

function getShips(): Readonly<GetShipResponse[]> {
    const resp: GetShipResponse[] = [];
    for (const ship of playerDb.ships) {
        if ('starId' in ship.loc) {
            // planet
            resp.push({ loc: { type: 'Planet', starId: ship.loc.starId, id: ship.loc.id } });
        } else if ('id' in ship.loc) {
            // star
            resp.push({ loc: { type: 'Star', id: ship.loc.id } });
        } else {
            // point
            resp.push({ loc: { type: 'Point', ...ship.loc } });
        }
    }
    return resp;
}

const exportedFunctions = {
    getStar,
    getPlanetMeta,
    getSectors,
    getHomeworld,
    getPlanets,
    getShips
};
export type ServerWorker = typeof exportedFunctions;

expose(exportedFunctions);

// onmessage = function (e: MessageEvent) {
//     // if (e.source instanceof MessagePort || e.source instanceof ServiceWorker) {
//     //     return;
//     // }

//     console.log('Message received from main script', e);
//     const msg = e.data as { id: number } & RequestMessage;
//     switch (msg.type) {
//         case 'stars.getStar': {
//             const s = starDb.getStar(msg.starId);
//             let resp: GetStarResponse | undefined = undefined;
//             if (s) {
//                 resp = mapStar(s);
//             }
//             postMessage({ id: msg.id, payload: resp }, '*');
//             break;
//         }
//         case 'stars.getSectors': {
//             const sect = starDb.getSectors(msg.minX, msg.minY, msg.maxX, msg.maxY);
//             let resp: GetSectorsResponse | undefined = [];
//             for (const sx in sect) {
//                 resp[sx] = [];
//                 for (const sy in sect[sx]) {
//                     resp[sx][sy] = _.map(sect[sx][sy], mapStar);
//                 }
//             }
//             postMessage({ id: msg.id, payload: resp}, '*');
//             break;
//         }
//     }
// };

function mapStar(s: Star): GetStarResponse {
    return {
        id: s.id,
        name: s.name,
        x: s.x,
        y: s.y,
        sx: s.sx,
        sy: s.sy,
        planets: _.map(s.planets, p => ({
            id: p.id,
            name: p.name,
            r: p.r,
            phi: p.phi,
            year: p.year
        }))
    };
}

// (async function () {
//     for (let i = 0; i < 1000; i++) {
//         await new Promise(r => setTimeout(r, 2000));
//         console.log('ping...');
//     }
// })();

