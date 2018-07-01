var brad04Layer = cc.Layer.extend({
    sprite1:null,
    sprite2:null,
    isTouch1:false,
    ctor:function () {
        this._super();

        this.sprite2 = new cc.Sprite(res.HelloWorld_png);
        this.sprite2.attr({
            x: cc.winSize.width * 1/ 2 + 40,
            y: cc.winSize.height / 2 - 20
        });
        this.addChild(this.sprite2);

        this.sprite1 = new cc.Sprite(res.HelloWorld_png);
        this.sprite1.attr({
            x: cc.winSize.width * 1/ 2 - 40,
            y: cc.winSize.height / 2 + 20
        });
        this.addChild(this.sprite1);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (e) {
                var target = e.getCurrentTarget();
                var parent = target.getParent();

                var targetRect = cc.rect(
                    target.x - target.width/2,
                    target.y - target.height/2,
                    target.width,
                    target.height
                );
                var point = new cc.Point(e.getLocationX(), e.getLocationY());
                if (cc.rectContainsPoint(targetRect,point)){
                    parent.isTouch1 = true
                    cc.log("touch 11");
                }
            },
            onMouseUp: function (e) {
                var target = e.getCurrentTarget();
                var parent = target.getParent();
                parent.isTouch1 = false;

            }
        },this.sprite1);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (e) {
                var target = e.getCurrentTarget();
                var parent = target.getParent();

                var targetRect = cc.rect(
                    target.x - target.width/2,
                    target.y - target.height/2,
                    target.width,
                    target.height
                );
                var point = new cc.Point(e.getLocationX(), e.getLocationY());
                if (cc.rectContainsPoint(targetRect,point)
                    && !parent.isTouch1){
                    cc.log("touch 22");
                }
            },
        },this.sprite2);

        return true;
    },


});

var brad04Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new brad04Layer();
        this.addChild(layer);
    }
});
