/** * 向量 */
class Vector{
    x:number=0;
    y:number=0;
    constructor(x_:number=0,y_:number=0){
        this.x=x_;
        this.y=y_;
    }

    /**
     * 向量的大小
     * @returns {number}
     */
    getMagnitude():number{
        return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
    }

    add(vec:Vector):Vector{
        let v:Vector=new Vector();
        v.x=this.x+vec.x;
        v.y=this.y+vec.y;
        return v;
    }

    subtract(vec:Vector):Vector{
        let v:Vector=new Vector();
        v.x=this.x-vec.x;
        v.y=this.y-vec.y;
        return v;
    }

    /**
     * 点积
     * @param {Vector} vec
     * @returns {number}
     */
    dotProduct(vec:Vector):number{
        return this.x*vec.x+this.y*vec.y;
    }


    edge(vec:Vector):Vector{
        return this.subtract(vec);
    }

    /**
     * 获取与之垂直的向量
     * @returns {Vector}
     */
    perpendicular():Vector{
        let v:Vector=new Vector();
        v.x=this.y;
        v.y=0-this.x;
        return v;
    }

    normalize():Vector{
        let v:Vector=new Vector();
        let m:number=this.getMagnitude();
        if(m!=0){
            v.x=this.x/m;
            v.y=this.y/m;
        }
        return v;
    }

    /**
     * 获取单位向量
     * @returns {Vector}
     */
    normal():Vector{
        let v:Vector=this.perpendicular();
        return v.normalize();
    }
}

/** * 点 */
class Point{
    x:number;
    y:number;
    constructor(x_:number=0,y_:number=0){
        this.x=x_;
        this.y=y_;
    }
}
export {Vector,Point}