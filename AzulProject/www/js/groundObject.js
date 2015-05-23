var groundObject = function(posX, posY){
    this.x = posX;
    this.y = posY;
};

groundObject.prototype.draw = function(context){
	context.fillStyle="#5FCB83";
	context.fillRect((this.x*20),(this.y*20), 20,20);  
};

// garoundObject.prototype.update = function(context){ 
//   
//       
// };

