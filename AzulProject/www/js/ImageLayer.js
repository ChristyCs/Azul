/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ImageLayer(){
    this.x = 0;
    this.y = 0;
}

ImageLayer.prototype = {
    constructor: ImageLayer,
    setImage: function(img){
        this.image = img;
    },
    getImage: function(){
        return this.image;
    },
    setX: function(newX){
        this.x = newX;
    },
    getX: function(){
        return this.x;
    },
    setY: function(newY){
        this.y = newY;
    },
    getY: function(){
        return this.y;
    }
};


