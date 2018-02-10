/**
 * 形状
 */
import {Vector} from "../core/Vector";
import {Projection} from "../core/Projection";

class Shape{

    x:number=0;
    y:number=0;
    strokeStyle:string='rgba(255,253,208,0.9)';
    fillStyle:string='rgba(147,197,114,0.8)';
    constructor(){

    }

    collidesWith(s:Shape):boolean{
        let axes:any[]=this.getAxes().concat(s.getAxes());
        return !this.separationOnAxes(axes,s);
    }

    separationOnAxes(axes:Array<Vector>,s:Shape):boolean{
        for (let i = 0; i < axes.length; i++) {
            let axis = axes[i];
            let pro1:Projection=s.project(axis);
            let pro2:Projection=this.project(axis);
            if(!pro1.overlaps(pro2)){
                return true;
            }
        }
        return false;
    }

    project(axis: Vector): Projection {
        throw new Error("Method not implemented.");
    }
    getAxes():Vector[] {
        throw new Error("Method not implemented.");
    }

    move(dx: number, dy: number): any {
        throw new Error("Method not implemented.");
    }

    createPath(context:CanvasRenderingContext2D):any{
        throw new Error("Method not implemented.");
    }

    fill(context:CanvasRenderingContext2D):void{
        context.save();
        context.fillStyle=this.fillStyle;
        this.createPath(context);
        context.fill();
        context.restore();
    }

    stroke(context:CanvasRenderingContext2D):void{
        context.save();
        context.strokeStyle=this.strokeStyle;
        this.createPath(context);
        context.stroke();
        context.restore();
    }
    isPointInPath(context:CanvasRenderingContext2D,x:number,y:number):boolean{
        this.createPath(context);
        return context.isPointInPath(x,y);
    }
}
export {Shape}