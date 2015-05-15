var Game = {};

Game.fps = 50;

Game.initialize = function(){
    this.entities = [];
    this.context = document.getElementById("viewport").getContext("2d");
};

Game.draw = function(array){
  this.context.clearRect(0,0,700, 600);
  for(var i = 0; i < array.length; i++){
      array[i].draw(this.context);
  }  
};

Game.update = function(array){
    for(var i = 0; i < array.length; i++){
        array[i].update(this.context);
    }
};