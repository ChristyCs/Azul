var groundObject = function(posX, posY, size){
    this.x = posX;
    this.y = posY;
    this.size = size;
};

groundObject.prototype.draw = function(context){
	context.fillStyle="#AD3333";
	context.fillRect((this.x*this.size),
		(this.y*this.size)+(568-16*10),
		this.size+1,this.size+1);  
};

groundObject.prototype.getX = function(){
	return this.x;
};

groundObject.prototype.setX = function(newX){
	this.x = newX;
};

groundObject.prototype.getY = function(){
	return this.y;
};

groundObject.prototype.getY = function(newY){
	this.y = newY;
};


