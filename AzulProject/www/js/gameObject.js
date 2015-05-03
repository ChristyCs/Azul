var gameObject = function(posX, posY){
    this.x = posX;
    this.y = posY;
};

gameObject.prototype.draw = function(context){
  context.fillRect(this.x,this.y, 20,20);  
};

gameObject.prototype.update = function(context){ 
    var canvas = context.canvas
    var canWidth = canvas.width;
    var canHeight = canvas.height;
    if((this.y+1)+20<canHeight){
       this.y += 1; 
    }    
};

