/**
 * 多边形
 */
import {Shape} from "./Shape";
import {Point, Vector} from "../core/Vector";
import {Projection} from "../core/Projection";

class Polygon extends Shape{
    points:Point[]=[];
    constructor(x_:number=0,y_:number=0){
        super();
        this.x=x_;
        this.y=y_;
        this.strokeStyle='blue';
        this.fillStyle='white';
    }
    getAxes(){
        let v1:Vector=new Vector();
        let v2:Vector=new Vector();
        let axes:Vector[]=[];
        for (let i = 0; i < this.points.length-1; i++) {
            v1.x=this.points[i].x;
            v1.y=this.points[i].y;
            v2.x=this.points[i+1].x;
            v2.y=this.points[i+1].y;
            axes.push(v1.edge(v2).normal());
        }
        v1.x=this.points[this.points.length-1].x;
        v1.y=this.points[this.points.length-1].y;
        v2.x=this.points[0].x;
        v2.y=this.points[0].y;
        axes.push(v1.edge(v2).normal());
        return axes;
    }

    project(axis:Vector):Projection{
        let scalars:number[]=[];
        let v:Vector=new Vector();
        this.points.forEach(function(point:Point){
            v.x=point.x;
            v.y=point.y;
            scalars.push(v.dotProduct(axis));
        });
        return new Projection(Math.min.apply(Math,scalars),Math.max.apply(Math,scalars));
    }
    
    addPoint(x_:number,y_:number):void{
        this.points.push(new Point(x_,y_));
    }
    createPath(context:CanvasRenderingContext2D){
        if(this.points.length===0)return;
        context.beginPath();
        context.moveTo(this.points[0].x,this.points[0].y);
        for (let i = 0; i < this.points.length; i++) {
            context.lineTo(this.points[i].x,this.points[i].y);
        }
        context.closePath();
    }
    move(dx_:number,dy_:number){
        for (let i = 0; i < this.points.length; i++) {
            let p: Point = this.points[i];
            p.x+=dx_;
            p.y+=dy_;
        }
    }
}

export {Polygon}