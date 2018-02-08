/**
 * 公共模块
 */
class Common{

    /**     * 窗口大小更改事件列表     */
    private windowResizeHandlers:Function[]=[];

    /**     * 添加窗口更改监听     */
    public addResizeHandler(fun:Function):void{
        this.windowResizeHandlers.push(fun);
    }

    /**     * 移除监听     */
    public removeResizeHandler(fun:Function):void{
        for (let i = 0; i < this.windowResizeHandlers.length; i++) {
            let fun_:Function=this.windowResizeHandlers[i];
            if(fun_==fun){
                this.windowResizeHandlers.splice(i,1);
                i--;
                continue;
            }
        }
    }

    /**     * 窗口大小更改     */
    windowResize():void{
        for (let i = 0; i < this.windowResizeHandlers.length; i++) {
            let fun = this.windowResizeHandlers[i];
            if(fun){
                fun();
            }
        }
    }

    private init():void{
        /**         * 添加窗口大小更改事件         */
        window.addEventListener("resize", () => {
            this.windowResize();
        });
    }

    /**     * 单例     * @type {any}     * @private     */
    public static _instance:Common=null;
    public static getInstance():Common{
        if(!Common._instance){
            new Common();
        }
        return Common._instance;
    }
    constructor(){
        if(Common._instance){
            throw new Error("公共模块为单例");
        }
        Common._instance=this;

        this.init();
    }

}
export {Common};