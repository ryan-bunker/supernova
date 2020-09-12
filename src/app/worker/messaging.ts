import { Point } from "../2d";

export interface GetStarResponse {
    id: string;
    name: string;
    x: number;
    y: number;
    sx: number;
    sy: number;
    planets: {
        id: string;
        name: string;
        r: number;
        phi: number;
        year: number;
    }[];
}

export interface GetPlanetResponse {
    id: string;
    starId: string;
    name: string;
    r: number;
    phi: number;
    year: number;
}

export interface GetPlanetMetaResponse {
    gravity: number;
    temperature: number;
    radiation: number;
    surface: Record<"ironium" | "boranium" | "germanium", number>;
    concentration: Record<"ironium" | "boranium" | "germanium", number>;
    factories: {count: number, max: number};
    mines: {count: number, max: number};
    population: number;
}

export interface StarLocation {
    type: 'Star';
    id: string;
}
export interface PlanetLocation {
    type: 'Planet';
    starId: string;
    id: string;
}
export interface PointLocation extends Point {
    type: 'Point';
}
export type Location = StarLocation | PlanetLocation | PointLocation;

export interface GetShipResponse {
    loc: Location;
}

export type GetSectorsResponse = GetStarResponse[];