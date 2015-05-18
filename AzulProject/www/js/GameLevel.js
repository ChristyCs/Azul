/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var GameEngine = this.GameEngine || {};

GameEngine.Level = (function(context, SCALE){
    var WIDTH = context.canvas.width;
    var HEIGHT = context.canvas.height;
    var _self = this;
    var array = [];
    var hasLandScape = false;
    var landscape;
    
    _self.params = {
        CANVAS_WIDTH : WIDTH,
        CANVAS_HEIGHT : HEIGHT,
        CONTEXT: context,
        SCALE: SCALE
    };
    
    _self.vars = {
        gameLoopID: -1,
        frameRate: 0,        
        loadedLevel: false,
        game_loop_paused: false
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
        },
        
        displayWorld: function(e, params){
            if(_self.vars.gameLoopID != params.gameID){
                return;
            }
            var gr = _self.params.CONTEXT;
            
            gr.clearRect(0, 0, _self.params.CANVAS_WIDTH,
                _self.params.CANVAS_HEIGHT);
            
            if(hasLandScape){
                gr.drawImage(landscape,0,0);                
            }
            
        }, 
        
        loadLevel: function(fileName){
            $.getJSON(fileName, function(data) {                
                landscape = new Image(200,200);
                landscape.src = data.landscape[0].src;                
                landscape.onload = function(){
                  $(this).css('max-width', '200');
                  console.log(this);
                };               
                
                hasLandScape = true;
                
            }); 
        }
    };
});

