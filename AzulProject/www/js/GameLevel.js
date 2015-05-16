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
    var array = [];
    
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
           _self.vars.x++;
        },
        
        displayWorld: function(e, params){
            if(_self.vars.gameLoopID != params.gameID){
                return;
            }
            var gr = _self.params.CONTEXT;
            
            gr.clearRect(0, 0, _self.params.CANVAS_WIDTH,
                _self.params.CANVAS_HEIGHT);
            
            if(array.length == 0){
                gr.fillRect(_self.vars.x,0, 20,20);
            }else{                
                for(var i = 0; i < array.length; i++){
                    gr.fillRect(_self.vars.x,i*20,array[i].width, 
                        array[i].height);
                }
            }
            
        }, 
        
        loadLevel: function(fileName){
            $.getJSON(fileName, function(data) {
                var blocks = data.blocks;
                _self.vars.x = 0;
                array = blocks;
            }); 
        }
    };
});

