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
    
    var layerArray = [];
    
    _self.params = {
        CANVAS_WIDTH : WIDTH,
        CANVAS_HEIGHT : HEIGHT,
        CONTEXT: context,
        SCALE: SCALE
    };
    
    _self.params.CONTEXT.scale(_self.params.SCALE
        ,_self.params.SCALE);
    
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
            for(var i = 0; i < layerArray.length; i++){
                var t = layerArray[i];                
                if(t.getX() !== undefined){                    
                    t.setX(t.getX()-(0.2*(i+i+1)));
                }
            }
            
        },
        
        displayWorld: function(e, params){
            if(_self.vars.gameLoopID != params.gameID){
                return;
            }
            var gr = _self.params.CONTEXT;
            
            gr.clearRect(0, 0, _self.params.CANVAS_WIDTH,
                _self.params.CANVAS_HEIGHT);          
            
            for(var i = 0; i < layerArray.length; i++){
                var t = layerArray[i];
                if(t.getImage !== undefined){
                    gr.drawImage(t.getImage(), t.getX(),t.getY());
                }
            }
//            if(hasLandScape){
//                gr.drawImage(landscape,0,0);                
//            }
            
        }, 
        
        loadLevel: function(filename){
            $.getJSON(filename, function(data){
                if(data.background !== undefined){
                    var imageSrc = data.background[0].src;
                    var backLayer = new ImageLayer();
                    var image = new Image();
                    image.src = imageSrc;
                    image.onload = function(){
                        console.log("Loaded Background image: "+imageSrc);
                        backLayer.setImage(this);                        
                        layerArray.push(backLayer);
                    };
                }
                if(data.middleground !== undefined){                    
                    var imageSrc = data.middleground[0].src;
                    var midLayer = new ImageLayer();
                    var image = new Image();
                    image.src = imageSrc;
                    image.onload = function(){
                        console.log("Loaded Middleground image: "+imageSrc);
                        midLayer.setImage(this);
                        layerArray.push(midLayer);
                    };
                }
            });
//            $.getJSON(fileName, function(data) {                
//                landscape = new Image(200,200);
//                landscape.src = data.landscape[0].src;                
//                landscape.onload = function(){
//                  $(this).css('max-width', '200');
//                  console.log(this);
//                };               
//                
//                hasLandScape = true;
//                
//            }); 
        }
    };
});

