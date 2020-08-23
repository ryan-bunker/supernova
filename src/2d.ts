export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
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

    public transform(point: Point): Point {
        return {
            x: point.x * this.scale + this._offset.x,
            y: point.y * this.scale + this._offset.y
        };
    }
    
    public untransform(point: Point): Point {
        return {
            x: (point.x - this._offset.x) / this.scale,
            y: (point.y - this._offset.y) / this.scale
        };
    }
}