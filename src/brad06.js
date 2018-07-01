var brad06Layer = cc.Layer.extend({
    bg:null,
    dx:10,
    man:null,
    manFrame: new Array(4),
    isRight: true,
    action:0,
    ctor:function () {
        this._super();

        //背景
        this.bg = new cc.Sprite(res.bg_png);
        this.bg.x = this.bg.width /2;
        this.bg.y = cc.winSize.height /2;
        this.addChild(this.bg);

        //把四張圖用陣列載入

        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.man_plist, res.man_png);
        var img37 = frameCache.getSpriteFrame("image37.png");
        var img38 = frameCache.getSpriteFrame("image38.png");
        var img39 = frameCache.getSpriteFrame("image39.png");
        var img40 = frameCache.getSpriteFrame("image40.png");
        this.manFrame = [img37,img38,img39,img40];


        this.man = new cc.Sprite(this.manFrame[this.action]);
        this.man.x = cc.winSize.width / 2;
        this.man.y = cc.winSize.height / 2 + 44;
        this.addChild(this.man);
        this.man.runAction(cc.flipX(this.isRight)); //左右翻轉

        //傾聽事件發生
        cc.eventManager.addListener({

            //event代表 按鍵按下的時候事件發生
            event: cc.EventListener.KEYBOARD,

            //第一個屬性
            onKeyPressed: function (keyCode,event) {
                var target = event.getCurrentTarget();
                switch(keyCode){
                    case 39:    // right
                        target.man.runAction(cc.flipX(true));
                        target.goForward();
                        break;
                    case 37:    // left
                        target.man.runAction(cc.flipX(false));
                        target.goBack();
                        break;
                }
            },
            //第二個屬性
            onKeyReleased: function (keyCode,event) {
            }
        }, this);



        return true;
    },



    goForward: function () {
        //
        if (this.bg.x + this.bg.width/2 - this.dx>= cc.winSize.width){
            this.bg.x -= this.dx;

            this.action = this.action===3?0:this.action+1;
            this.man.setSpriteFrame(this.manFrame[this.action]);
        }
    },

    goBack: function () {
        if (this.bg.x - this.bg.width/2 + this.dx <= 0){
            this.bg.x += this.dx;

            this.action = this.action==3?0:this.action+1;
            this.man.setSpriteFrame(this.manFrame[this.action]);
        }
        else{

            this.man.x


        }

    }

});

var brad06Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new brad06Layer();
        this.addChild(layer);
    }
});