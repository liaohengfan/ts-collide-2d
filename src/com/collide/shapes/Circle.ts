import {Shape} from "./Shape";
import {Point, Vector} from "../core/Vector";

/**
 * 圆形
 */
class Circle extends Shape {
    public radius: number = 0;

    constructor(x_: number, y_: number, radius_: number) {
        super();
        this.x = x_;
        this.y = y_;
        this.radius = radius_;
    }

    collidesWith(s: Shape): boolean {
        let point: Point,
            length: number = 0,
            min: number = 1000,
            v1: Vector = null,
            v2: Vector,
            edge: any,
            perpendicular: any,
            normal: any,
            axes: Vector[] = s.getAxes(),
            distance: number;
        if(axes==undefined){
            distance=Math.sqrt(Math.pow(s.x-this.x,2)+Math.pow(s.y-this.y,2));
            let cir:Circle=(s as Circle);
            return distance<Math.abs(this.radius+cir.radius);
        }else{
            //return polygonWith
        }
        return false;
    }
}