/**
 * 投影
 */
class Projection{
    min:number;
    max:number;
    constructor(min_:number=0,max_:number=0){
        this.min=min_;
        this.max=max_;
    }

    /**
     * 投影是否重叠
     * @param {Projection} pro
     */
    overlaps(pro:Projection){
        return this.max>pro.min&&pro.max>this.min;
    }
}
export {Projection}