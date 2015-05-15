var gameObject = function(posX, posY){
    this.x = posX;
    this.y = posY;
};

gameObject.prototype.draw = function(context){
	context.fillStyle="#5FCB83";
	context.fillRect(this.x,this.y, 20,20, "red");  
};

gameObject.prototype.update = function(context){ 
    var canvas = context.canvas
    var canWidth = canvas.width;
    var canHeight = canvas.height;
    if((this.x+1)+20<canWidth){
       this.x -= 20; 
    }    
};

