/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var GameEngine = this.GameEngine || {};

GameEngine.Level = (function(canvas){
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    
    var context = canvas.getContext('2d');
    console.log(context);
    
    var _self = this;
    
    _self.params = {
        CANVAS_WIDTH : WIDTH,
        CANVAS_HEIGHT : HEIGHT,
        CANVAS: canvas,
        CONTEXT: context
    };
    _self.vars = {
        gameLoopID: -1,
        frameRate: 0,
        x: 0
    };
    return{
        init: function(gameLoopID, frameRate){
          _self.vars.gameLoopID = gameLoopID;
          _self.vars.frameRate = frameRate;
          
          _self.params.CONTEXT.clearRect(0, 0, _self.params.CANVAS_WIDTH,
            _self.params.CANVAS_HEIGHT);
          
          $('body').on('updateGame', this.updateWorld);
          $('body').bind('displayGame', this.displayWorld);
        },
        
        updateWorld: function(e, params){
            if(_self.vars.gameLoopID != params.gameID){
                return;
            }
            //console.log("UpdateMethod");
        },
        
        displayWorld: function(e, params){
            if(_self.vars.gameLoopID != params.gameID){
                return;
            }
            console.log("Render");
            _self.params.CONTEXT.clearRect(0, 0, _self.params.CANVAS_WIDTH,
                _self.params.CANVAS_HEIGHT);
//            _self.params.CONTEXT.fillRect((_self.vars.x+=1),0, 20,20, "red");
            //console.log("Render");
        }
    };
});

