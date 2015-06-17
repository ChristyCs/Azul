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
            //length is being set to 20 so that we don't load in everything
            for(var b =0;b<array[a].length; b++){ 
                if(array[a][b] !== null){
                //console.log("Should be drawing something")
                var object = array[a][b];
                object.draw(context); 
            }
            
            }

        }
    },
    updateforeGround: function(context){
        var array = this.getGroundArray();
        for(var a =0; a<array.length; a++){
            for(var b =0;b<array[a].length; b++){ 
                if(array[a][b] !== null){
                array[a][b].setX(array[a][b].getX-1);
                }
            }
        }
       
        //this.drawforeGround(context);
    }
};
