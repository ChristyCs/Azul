var gameObject = function(posX, posY){
    this.x = posX;
    this.y = posY;
};

gameObject.prototype.draw = function(context){
  context.fillRect(this.x,this.y, 20,20);  
};

gameObject.prototype.update = function(context){
    
    this.y += 1;
};

