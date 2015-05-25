function foreGround(){
    var groundArray = [];
    

}

foreGround.prototype = {
    constructor: foreGround,
    setGroundArray: function(array){
        this.groundArray = array;
    },
    getGroundArray: function(){
        return this.groundArray;

    },
    //this draws the squares
    drawforeGround: function(context){
        var array = this.getGroundArray();
        for(var a =0; a<array.length; a++){
            //checking for null because the sky gets set to null 
            if(array[a] !== null){
                var object = array[a];
                object.draw(context); 
            }

        }
    }
    
};
