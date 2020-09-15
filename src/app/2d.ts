export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
}

export class BigPoint {
    x: bigint;
    y: bigint;
    
    constructor(x: bigint = 0n, y: bigint = 0n) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

export class Vector extends Point {
    constructor(start: Point, end: Point) {
        super(end.x - start.x, end.y - start.y);
    }

    get length(): number {
        return Math.sqrt(this.lengthSq);
    }

    get lengthSq(): number {
        return this.x * this.x + this.y * this.y;
    }
}

export class Transform {
    private _offset: Point;
    public scale: number;

    constructor(x: number = 0, y: number = 0, scale: number = 1) {
        this._offset = new Point(x, y);
        this.scale = scale;
    }

    get offset(): Readonly<Point> {
        return this._offset;
    }

    translate(x: number, y: number): void {
        this._offset.x += x;
        this._offset.y += y;
    }

    translateTo(x: number, y: number): void {
        this._offset.x = x;
        this._offset.y = y;
    }

    public transform(point: Point): Point {
        return new Point(
            point.x * this.scale + this._offset.x,
            point.y * this.scale + this._offset.y);
    }
    
    public untransform(point: Point): Point {
        return new Point(
            (point.x - this._offset.x) / this.scale,
            (point.y - this._offset.y) / this.scale);
    }
}

export function distance(a: Point, b: Point): number {
    return new Vector(a, b).length;
}

export function distanceSq(a: Point, b: Point): number {
    return new Vector(a, b).lengthSq;
}