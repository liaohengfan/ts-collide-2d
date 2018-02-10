import '../styles/common.less';
import '../styles/main.less';
import {Common} from "./Common";
import {Shape} from "./collide/shapes/Shape";
import {Point, Vector} from "./collide/core/Vector";
import {Polygon} from "./collide/shapes/Polygon";

/**
 * 碰撞检测demo
 * @author liaohengfan@yeah.net
 * time: 2018.02.08
 */
class Main{
    container:HTMLDivElement;
    canvas:HTMLCanvasElement;
    context:CanvasRenderingContext2D;
    resizeHandler:Function;

    shapes:Shape[]=[];
    mouseDown:Point=new Point();
    lastDrag:Point=new Point();
    shapeBeingDragged:any=undefined;
    constructor(){
        /**
         * 初始化dom
         */
        this.init();

        /**
         * 初始化监听
         */
        this.initHandlers();

        /**
         * 初始化醒状态及碰撞
         */
        this.initCollide();
    }

    /**     * 初始化事件监听     */
    initHandlers():void{
        this.canvas.addEventListener('mousedown',(e:MouseEvent)=>{
            let location:Point=this.windowToCanvas(e.clientX,e.clientY);
            this.shapes.forEach((s:Shape)=>{
                if(s.isPointInPath(this.context,location.x,location.y)){
                    this.shapeBeingDragged=s;
                    this.mouseDown.x=location.x;
                    this.mouseDown.y=location.y;
                    this.lastDrag.x=location.x;
                    this.lastDrag.y=location.y;
                }
            })
        });
        this.canvas.addEventListener('mousemove',(e:MouseEvent)=>{
            let loca:Point=null;
            let dragVector:Point=null;
            if(this.shapeBeingDragged!==undefined){
                loca=this.windowToCanvas(e.clientX,e.clientY);
                dragVector=new Point(
                    loca.x-this.lastDrag.x,
                    loca.y-this.lastDrag.y
                );
                this.shapeBeingDragged.move(dragVector.x,dragVector.y);
                this.lastDrag.x=loca.x;
                this.lastDrag.y=loca.y;
                this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.drawShapes();
                this.detectCollisions();
            }
        });
        this.canvas.addEventListener('mouseup',(e:MouseEvent)=>{
            this.shapeBeingDragged=undefined;
        });
    }

    /**     * 初始化碰撞     */
    initCollide():void{
        let polygonPoints:Array<Point[]>=[
            [
                new Point(250,150),
                new Point(250,250),
                new Point(350,250)
            ],
            [
                new Point(100,100),
                new Point(100,150),
                new Point(150,150),
                new Point(150,100)
            ],
            [
                new Point(400,100),
                new Point(380,150),
                new Point(500,150),
                new Point(520,100)
            ],
        ];
        let polygonStrokeStyles=['blue','yellow','red'];
        let polygonFillStyles=[
            'rgba(255,255,0,0.7)',
            'rgba(100,140,230,0.6)',
            'rgba(255,255,255,0.8)'
        ];
        for (let i = 0; i < polygonPoints.length; i++) {
            let polygon:Polygon=new Polygon();
            let points:Point[] = polygonPoints[i];
            polygon.strokeStyle=polygonStrokeStyles[i];
            polygon.fillStyle=polygonFillStyles[i];
            points.forEach((p:Point)=>{
                polygon.addPoint(p.x,p.y);
            });
            this.shapes.push(polygon);
        }

        this.context.shadowColor='rgba(100,140,255,.5)';
        this.context.shadowBlur=4;
        this.context.shadowOffsetX=2;
        this.context.shadowOffsetY=2;
        this.context.font='38px Arial';
        this.drawShapes();
    }

    windowToCanvas(x:number,y:number):Point{
        let bbox:ClientRect=this.canvas.getBoundingClientRect();
        return new Point(
            x-bbox.left*(this.canvas.width/bbox.width),
            y-bbox.top*(this.canvas.height/bbox.height)
        )
    }

    drawShapes(){
        this.shapes.forEach((s:Shape)=>{
            s.stroke(this.context);
            s.fill(this.context)
        })
    }

    detectCollisions(){
        let textY:number=30;
        let numShapes:number=this.shapes.length;
        let shape:Shape=null;
        if(this.shapeBeingDragged){
            for (let i = 0; i < numShapes; i++) {
                shape = this.shapes[i];
                if(shape!==this.shapeBeingDragged){
                    if(this.shapeBeingDragged.collidesWith(shape)){
                        this.context.fillStyle=shape.fillStyle;
                        this.context.fillText('Collision',20,textY);
                        textY+=40;
                    }
                }
            }
        }
    }


    init(): any {
        console.log('Collide Demo');
        this.container=document.getElementById('canvas_container') as HTMLDivElement;
        this.canvas=document.createElement('canvas') as HTMLCanvasElement;
        this.context=this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        /**         * 窗口更改监听         */
        let resizeFun:Function=()=>{
            this.resize();
        };
        this.resizeHandler=resizeFun;
        Common.getInstance().addResizeHandler(resizeFun);
        Common.getInstance().windowResize();
    }

    resize():void{
        this.canvas.width=this.container.clientWidth;
        this.canvas.height=this.container.clientHeight;
    }
}
window.onload=()=>{
    new Main();
};