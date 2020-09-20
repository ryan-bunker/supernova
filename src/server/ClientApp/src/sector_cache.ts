import { Star, StarsClient } from "./client/stars";

export class SectorCache {
    private readonly _cache: Star[][][] = [];
    private readonly _client: StarsClient;
    
    constructor(client: StarsClient) {
        this._client = client;
    }
    
    public getSector(sx: number, sy: number): Star[] {
        const cacheEntry = this.getCacheEntry(sx, sy);
        if (cacheEntry) {
            return cacheEntry;
        }
        this._client.getSectors(sx, sy).then(stars => {
            this.setCacheEntry(sx, sy, stars);
        });
        return [];
    }
    
    private getCacheEntry(sx: number, sy: number): Star[]|undefined {
        const colCache = this._cache[sx];
        if (colCache) {
            return colCache[sy];
        }
        return undefined;
    }
    
    private setCacheEntry(sx: number, sy: number, entry: Star[]) {
        let colCache = this._cache[sx];
        if (!colCache) {
            this._cache[sx] = colCache = [];
        }
        colCache[sy] = entry;
    }
}