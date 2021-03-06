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
    
    //Scroll
    var oldScroll = 0;
    
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
    $.playground().addGroup(plgroup, {width: 32, height: 32}).end();
    $.playground().addGroup(fggroup, {width: 32, height: 32}).end();    
    
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
    var $dvslider = $("#divSlider");

    //Collision zone
    var $colzone = $("#collision_zone"); 
    
    //Sprites
    var $spsrc = $("#sprite_src");
    var $spname = $("#sprite_name");
    var $spwidth = $("#sprite_width");
    var $spheight = $("#sprite_height");
    var $spsubmit = $("#sprite_submit");
    var $splist = $("#sprite_list");
    var $spremove = $("#sprite_remove");
    var $splayout = $("#sprite_layout");
    var $splremove = $("#sprite_lremove");
    var $spmod = $("#sprite_modify");
    var $spmodx = $("#sprite_modx");
    var $spmody = $("#sprite_mody");
    var $spmodw = $("#sprite_modw");
    var $spmodh = $("#sprite_modh");
    var $splayer = $("#sprite_layer");
    var spcur = null;
    
    //save
    var $save = $("#save");

    //--------------------------------------------------------------------------
    //---    Functions
    //--------------------------------------------------------------------------
    var resizeEventFunc = function(){
        var canPanW = ($("#canvasBlock").width());
        $playground.css("left",((canPanW-playground_width)/2.0));
        $dvslider.css("left",(canPanW-playground_width)/2.0);
        $splayout.css("left",(canPanW-playground_width)/2.0);
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
    
    var spriteListClickFunc = function(){
        console.log("here");        
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
        loadBgFunc({
            "src":$fgsrc,
            "w": $fgwidth,
            "h": $fgheight,
            "px": $fgposx,
            "py": $fgposy,
            "name": fgimg,
            "groupname": fggroup,
            "img": img_foreground            
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
        }else if(spcur != null){
            var $data = $(spcur);
            var name = $data.data("name");
            var width = $data.data("w");
            var height = $data.data("h");
            console.log($data);
            var src = $data.data("src");
            var group = $data.data("group");
            var id = Math.ceil(Math.random()*1000)+name;
            var posx = e.offsetX;
            var posy = e.offsetY;

            var img = new $.gQ.Animation({imageURL: src});
            $("#"+group).addSprite(id,{
                animation: img, 
                height: height, 
                width: width,
                posx: posx,
                posy: posy});          
           
            var div = $("<label for=widget" + id + ">Select</label>"
                    + "<input class='spriteListItem' data-sprite-id=" + id + " type='checkbox' id=widget" + id + ">");
            $("#sprite_list").append(div).trigger('create');
            
        }else if($plemouse.is(':checked')){
            $plposx.val(e.offsetX);
            $plposy.val(e.offsetY);
            $("#"+plimg).x($plposx.val());
            $("#"+plimg).y($plposy.val());
        }
        var list = $("input[type=checkbox]").filter(':checked');
        if(list.length > 0){
            $spmodx.val(e.offsetX);
            $spmody.val(e.offsetY);
        }
    });
    
    $spsubmit.on('click',function(){
        var name = $spname.val();
        var url = $spsrc.val();        
        var id = Math.ceil(Math.random()*1000)+(Math.random()*10);    
        var width = $spwidth.val();
        var height = $spheight.val();   
        var groupname = $splayer.val();//$splayer.val(); 
        console.log($splayer.val());
        var data = "data-src="+url+" data-w="+width+" data-h="+height+" data-name="+name+" data-group="+groupname+" data-is-selected=false";
        var style = "style='background-color: rgb(200,200,200); background-image:url("
                +url+"); background-size: 100%; background-position: center; overflow: auto; text-overflow: ellipsis; float: left;"
                +"width: 102px; height: 102px; padding: 2px; margin:2px'";
        var div = "<div id="+id+" "+style+" "+data+" class='spriteLayout'><p>"+name+"</p></div>";        
        $splayout.append(div);     
    }); 
    
    $splist.on('click',function(){
        if(spcur != null){
            $(spcur).css("background-color","rgb(200,200,200)");
            $(spcur).data("is-selected",false);
            spcur = null;
        }
    });
    
    $splremove.on('click',function(){
        var list = $("div.spriteLayout");  
        for(var i = 0; i < list.length; i++){
            var dv = list[i];
            if($(dv).data("is-selected")){
                $(dv).remove();
                spcur = null;
                break;
            }
        }
    });
    
    $spremove.on('click',function(){        
        var list = $("input[type=checkbox]").filter(':checked');
        for(var i = 0; i <list.length; i++){
            var $item = $(list[i]);
            var sid = $item.data("sprite-id");
            $("#"+sid).remove();
            $item.closest('div').remove();
        }
    });
    
    $spmod.on('click',function(){
        var list = $("input[type=checkbox]").filter(':checked');
        var width = $spmodw.val();
        var height = $spmodh.val();
        var x = $spmodx.val();
        var y = $spmody.val();
        for(var i = 0; i < list.length;i++){
            var $item = $(list[i]);
            var $sp = $("#"+$item.data("sprite-id"));            
            $sp.wh(width, height);
            $sp.x(x);
            $sp.y(y);
        }
    });
    
    $save.on('click',function(){
        var polygons = $colzone[0];        
        var plist = $("#"+plgroup).children();
        var pllist = [];
        for(var i = 0; i < plist.length; i++){
            var p = plist[i];           
            var x = $(p).x();
            var y = $(p).y();
            var w = $(p).w();
            var h = $(p).h();
            var url = $(p).css("background-image");
            url = url.replace(/\(|\)/g, '');
            url = url.substring(url.lastIndexOf('/')+1);
            var data = {
                "url": url, 
                "x":x,
                "y":y,
                "w":w,
                "h":h
            };
            pllist.push(data);            
        }
        
        var fglist = [];
        var flist = $("#"+fggroup).children();
        for(var i = 0; i < flist.length; i++){
            var f = flist[i];
            var x = $(f).x();
            var y = $(f).y();
            var w = $(f).w();
            var h = $(f).h();
            var url = $(f).css("background-image");
            url = url.replace(/\(|\)/g, '');
            url = url.substring(url.lastIndexOf('/')+1);
            var data = {
                "url": url, 
                "x":x,
                "y":y,
                "w":w,
                "h":h
            };            
            fglist.push(data);
        }
        
        var mglist = [];
        var mlist = $("#"+mggroup).children();
        for(var i = 0 ; i<mlist.length;i++){
            var m = mlist[i];
            var x = $(m).x();
            var y = $(m).y();
            var w = $(m).w();
            var h = $(m).h();
            var url = $(m).css("background-image");
            url = url.replace(/\(|\)/g, '');
            url = url.substring(url.lastIndexOf('/')+1);
            var data = {
                "url": url, 
                "x":x,
                "y":y,
                "w":w,
                "h":h
            };           
            mglist.push(data);                       
        }
        
        var bglist = [];
        var blist = $("#"+bggroup).children();
        for(var i = 0; i <blist.length;i++){
            var b = blist[i];
            var x = $(b).x();
            var y = $(b).y();
            var w = $(b).w();
            var h = $(b).h();
            var url = $(b).css("background-image");
            url = url.replace(/\(|\)/g, '');
            url = url.substring(url.lastIndexOf('/')+1);
            var data = {
                "url": url, 
                "x":x,
                "y":y,
                "w":w,
                "h":h
            };           
            bglist.push(data);
        }
        
        var u_max = unit_max;
        var u_min = unit_min;
        var u_start = 0;
        var data = {
            "unit_max": u_max,
            "unit_min": u_min,
            "unit_start": u_start,
            "col_zone": polygons,
            "pl_list": pllist,
            "fg_list": fglist,
            "mg_list": mglist,
            "bg_list": bglist,
            "dir_bgstep": dir_stepbg,
            "dir_mgstep": dir_stepmg,
            "dir_fgstep": dir_stepfg
        };
        var dwObj = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
         console.log(dwObj);
        $(this).attr("href","data:"+dwObj);
        $(this).attr("download","map.json");       
    });
    
    $(document).on('click', "div.spriteLayout", function () {        
        if($(this).data("is-selected")){
            $(this).css("background-color","rgb(200,200,200)");
            $(this).data("is-selected",false);
            spcur = null;
        }else{
            if(spcur != null){
                $(spcur).data("is-selected",false);
                $(spcur).css("background-color","rgb(200,200,200)");
            }
            spcur = this;
            $(spcur).css("background-color","rgb(220,255,205)");
            $(spcur).data("is-selected",true);
        }
    });
    
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();                
        var py = scroll;        
        $playground.css("top",py);        
        $dvslider.css('top',py+320);
        $splayout.css("top",(py)+400);
        // Do something
    });
    
    $(window).on('resize',function(){
        resizeEventFunc();
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
            $("#"+fggroup).x(-dir_stepfg * unit);                        
            $("#"+plgroup).x(-dir_stepmg * unit);
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
    
    $fgsrc.val("content/fground.png");
    $fgwidth.val(1000);
    $fgheight.val(320);
    $fgposx.val(0);
    $fgposy.val(0);

    $plsrc.val("content/spacedude.gif");
    $plwidth.val(40);
    $plheight.val(40);
    $plposx.val(313);
    $plposy.val(124);
    
    $bbleft.val(0);
    $bbright.val(100);
    
    $spsrc.val("content/spacedude.gif");
    $spwidth.val("50");
    $spheight.val("50");
    $spname.val("Sprite1");
    
    $spmodw.val(32);
    $spmodh.val(32);
    $spmodx.val(10);
    $spmody.val(20);
    
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
            "src":$fgsrc,
            "w": $fgwidth,
            "h": $fgheight,
            "px": $fgposx,
            "py": $fgposy,
            "name": fgimg,
            "groupname": fggroup,
            "img": img_foreground            
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


