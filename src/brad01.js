

var brad01Layer = cc.Layer.extend({
    sprite:null,
    drawing:null,
    isDrawing:false,
    ctor:function () {

        this._super();

        this.drawing = new cc.DrawNode();


        this.addChild(this.drawing);

        this.setupMouse();






        return true;
    },
    setupMouse: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            lastX: -1,
            lasyY: -1,
            onMouseDown: function (e) {
                var target = e.getCurrentTarget();
                target.isDragging = true;
                this.lastX = e.getLocationX();
                this.lasyY = e.getLocationY();
            },
            onMouseUp: function (e) {
                var target = e.getCurrentTarget();
                target.isDragging = false;
            },
            onMouseMove: function (e) {
                var target = e.getCurrentTarget();
                if (!target.isDragging) return;
                var x = e.getLocationX(), y = e.getLocationY();
                target.drawing.drawSegment(
                    cc.p(this.lastX,this.lasyY),
                    cc.p(x,y),
                    2, cc.color(255,0,0));
                this.lastX = x; this.lasyY = y;
            }


        },this);

    },

});

var brad01Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new brad01Layer();
        this.addChild(layer);
    }
});

