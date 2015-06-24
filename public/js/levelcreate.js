/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(window).load(function(){
    
    //--------------------------------------------------------------------------
    //--- Declaratives
    //--------------------------------------------------------------------------
    var $playground = $("#playground");
    var playground_width = $playground.width();
    var playground_height = $playground.height();
    $playground.playground({height: playground_height, width:playground_width});

    //Types
    var bgimg = "bgimg";
    var mgimg = "mgimg";
    var fgimg = "fbimg";
    var plimg = "plimg";
    var bggroup = "bggroup";
    var mggroup = "mggroup";
    var fggroup = "fggroup";
    var plgroup = "plgroup";
    $.playground().addGroup(bggroup, {width: 32, height: 32}).end();
    $.playground().addGroup(mggroup, {width: 32, height: 32}).end();
    $.playground().addGroup(fggroup, {width: 32, height: 32}).end();
    $.playground().addGroup(plgroup, {width: 32, height: 32}).end().css("background","rgb(100,100,100)");
    
    var polyClass = "colPolClass";
    var lineClass = "colLinClass";

    //Images
    var img_background;
    var img_midground;
    var img_foreground;
    var img_player;

    //Steps and units
    var dir_stepfg = 4.0;
    var dir_stepmg = dir_stepfg/2.0;
    var dir_stepbg = dir_stepmg/2.0;
    var unit_max = 100;
    var unit_min = 0;
    var unit_old = 0;

    //Div Load Images
    var $bgsrc = $("#load_bgsrc");
    var $bgwidth = $("#load_bgwidth");
    var $bgheight = $("#load_bgheight");
    var $bgposx = $("#load_bgposx");
    var $bgposy = $("#load_bgposy");

    var $mgsrc = $("#load_mgsrc");
    var $mgwidth = $("#load_mgwidth");
    var $mgheight = $("#load_mgheight");
    var $mgposx = $("#load_mgposx");
    var $mgposy = $("#load_mgposy");

    var $fgsrc = $("#load_fgsrc");
    var $fgwidth = $("#load_fgwidth");
    var $fgheight = $("#load_fgheight");
    var $fgposx = $("#load_fgposx");
    var $fgposy = $("#load_fgposy");

    var $bgsubmit = $("#load_bgsubmit");

    //Player imgload
    var $plsrc = $("#pl_src");
    var $plwidth = $("#pl_width");
    var $plheight = $("#pl_height");
    var $plsubmit = $("#pl_submit");

    //Player pos
    var $plposx = $("#pl_posx");
    var $plposy = $("#pl_posy");    
    var $plemouse = $("#pl_mouse");

    //Bounds
    var $bbleft = $("#bounds_left");
    var $bbright = $("#bounds_right");
    var $bbsubmit = $("#bounds_submit");

    //Create Polygon
    var $polstart = $("#poly_start");
    var $polend = $("#poly_end");
    var pointlist = [];

    //Slider
    var $slider = $("#slider");

    //Collision zone
    var $colzone = $("#collision_zone");  

    //--------------------------------------------------------------------------
    //---    Functions
    //--------------------------------------------------------------------------
    var resizeEventFunc = function(){
        var canPanW = ($("#canvasBlock").width());
        $playground.css("left",((canPanW-playground_width)/2.0));
        $("#divSlider").css("left",(canPanW-playground_width)/2.0);
    };   

    var setBoundsFunc = function(){        
        if($bbleft.val() && $bbright.val()){
            unit_min = $bbleft.val();
            unit_max = $bbright.val();
            var prevVal = $slider.val();            
            $slider.attr("min",unit_min);           
            $slider.attr("max",unit_max);
            $slider.slider("refresh");
            if(prevVal > unit_max){
                $slider.val(unit_max);
            }else if(prevVal < unit_min){
                $slider.val(unit_min);
            }
            $slider.slider("refresh");
            $colzone.css("width",(unit_max*dir_stepfg)+playground_width);
        } 
    };

    var loadBgFunc = function(data){
        if(data.src.val()){
            var width = 2500;
            var height = 320;
            var x = 0;
            var y = 0;
            if(data.w.val() && data.h.val()){
                width = data.w.val();
                height = data.h.val();
            }
            if(data.px.val() && data.py.val()){
                x = data.px.val();
                y = data.py.val();
            }
            $("#"+data.name).remove();
            data.img = new $.gQ.Animation({imageURL: data.src.val()});
            $("#"+data.groupname).addSprite(data.name,{
                animation: data.img, 
                height: height, 
                width: width,
                posx: x,
                posy: y});           
        }       
    };   
    
    var createPolygonFunc = function(){
        if(pointlist.length>2){
            $("."+lineClass).remove();
            var pnts = "";
            for(var i = 0; i < pointlist.length; i++){
                pnts += " "+pointlist[i].x+","+pointlist[i].y;
            }
            var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
            polygon.setAttribute('class',polyClass);
            polygon.setAttribute('class','svgPoly');
            polygon.setAttribute('points', pnts);
            polygon.setAttribute('style', 'stroke:rgb(255,0,0);stroke-width:2');
            $colzone.append(polygon);
        }   
        pointlist = [];
    };
    
    //--------------------------------------------------------------------------
    //---   Jquery
    //--------------------------------------------------------------------------    
    $bgsubmit.on('click',function(){
        loadBgFunc({
            "src":$bgsrc,
            "w": $bgwidth,
            "h": $bgheight,
            "px": $bgposx,
            "py": $bgposy,
            "name": bgimg,
            "groupname": bggroup,
            "img": img_background 
        });
        loadBgFunc({
            "src":$mgsrc,
            "w": $mgwidth,
            "h": $mgheight,
            "px": $mgposx,
            "py": $mgposy,
            "name": mgimg,
            "groupname": mggroup,
            "img": img_midground            
        });                
    });
    
    $plsubmit.on('click',function(){
        loadBgFunc({
            "src": $plsrc,
            "w": $plwidth,
            "h": $plheight,
            "px": $plposx,
            "py": $plposy,
            "name": plimg,
            "groupname": plgroup,
            "img": img_player
        });      
    });
    
    $bbsubmit.on('click',function(){
        setBoundsFunc();        
    });
    
    $polstart.on('click',function(){
        if($polstart.is(':checked')){
            pointlist = [];
        }else{            
            createPolygonFunc(); 
            console.log("here");
        }       
    });
    
    $polend.on('click',function(){        
        createPolygonFunc();
    });
    
    $colzone.on('click',function(e){        
        if($polstart.is(':checked')){           
            pointlist.push({"x":e.offsetX,"y":e.offsetY});            
            if(pointlist.length > 1){                
                for(var i = 0; i < pointlist.length-1;i++){
                    var x1 = pointlist[i].x;
                    var y1 = pointlist[i].y;
                    var x2 = pointlist[i + 1].x;
                    var y2 = pointlist[i + 1].y;    
                    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                    newLine.setAttribute('class',lineClass);
                    newLine.setAttribute('x1',x1);
                    newLine.setAttribute('y1',y1);
                    newLine.setAttribute('x2',x2);
                    newLine.setAttribute('y2',y2);
                    newLine.setAttribute('style','stroke:rgb(255,0,0);stroke-width:2');
                    $colzone.append(newLine);  
                    
                }                
            }
        }else if($plemouse.is(':checked')){
            $plposx.val(e.offsetX);
            $plposy.val(e.offsetY);
            $("#"+plimg).x($plposx.val());
            $("#"+plimg).y($plposy.val());
        }        
    });
    
    $.loadCallback(function(percent){
	console.log(percent);        
    });
    
    $.playground().registerCallback(function(){
        if($slider.val() !== unit_old){
            var unit = $slider.val();
            unit_old = unit;
            $("#"+bggroup).x(-dir_stepbg * unit);
            $("#"+mggroup).x(-dir_stepmg * unit);
            //$("#foreground").x(-directionStepForeground * unit);                        
            $("#"+plgroup).x(-dir_stepfg * unit);
            $colzone.css("left", -dir_stepfg * unit);
        }       
    },60);
    
    //--------------------------------------------------------------------------
    //---    Default Values
    //--------------------------------------------------------------------------
    $bgsrc.val("content/background.png");
    $bgwidth.val(2500);
    $bgheight.val(320);
    $bgposx.val(0);
    $bgposy.val(-10); 

    $mgsrc.val("content/midground.png");
    $mgwidth.val(5000);
    $mgheight.val(320);
    $mgposx.val(0);
    $mgposy.val(30);

    $plsrc.val("content/spacedude.gif");
    $plwidth.val(40);
    $plheight.val(40);
    $plposx.val(0);
    $plposy.val(0);
    
    $bbleft.val(0);
    $bbright.val(100);    
    
    //--------------------------------------------------------------------------
    //---   Start code
    //--------------------------------------------------------------------------    
    var startFunc = function () {
        resizeEventFunc();
        setBoundsFunc();
        loadBgFunc({
            "src":$bgsrc,
            "w": $bgwidth,
            "h": $bgheight,
            "px": $bgposx,
            "py": $bgposy,
            "name": bgimg,
            "groupname": bggroup,
            "img": img_background 
        });
        loadBgFunc({
            "src":$mgsrc,
            "w": $mgwidth,
            "h": $mgheight,
            "px": $mgposx,
            "py": $mgposy,
            "name": mgimg,
            "groupname": mggroup,
            "img": img_midground            
        });
        loadBgFunc({
            "src": $plsrc,
            "w": $plwidth,
            "h": $plheight,
            "px": $plposx,
            "py": $plposy,
            "name": plimg,
            "groupname": plgroup,
            "img": img_player
        });
        $.playground().startGame();
    };startFunc();
});


