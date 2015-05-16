/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var GameEngine = this.GameEngine || {};

GameEngine.GameLoop = (function(FRAME_PER_SECOND){
    var _self = this;
    
    _self.params = {
        'MAX_REFRESH_RATE' : (1000 / 2 / FRAME_PER_SECOND)
    };
    
    _self.vars = {
        'start_game_time' : new Date().getTime(),
        'skip_milliseconds' : (1000 / FRAME_PER_SECOND),
        'is_running' : false,
        'next_game_tick' : 0,
        'last_paused_at' : 0,
        'all_paused_time' : 0
    };
    
    _self.gameloop = function(){
        _self.pauseCount();
        
        if(_self.vars.is_running){
           var gameStartTick = _self.vars.start_game_time - 
                   _self.vars.all_paused_time;
           var currentGameTick = new Date().getTime() - gameStartTick;
           
           if( currentGameTick > _self.vars.next_game_tick){
               _self.countRealFPS();
               _self.updateGame(currentGameTick);
               _self.displayGame(currentGameTick);
               _self.vars.next_game_tick = _self.vars.skip_milliseconds *
                       (Math.floor(currentGameTick/_self.vars.skip_milliseconds)+1);
           }
           
            setTimeout(function(){
                _self.gameloop();
            }, _self.params.MAX_REFRESH_RATE);
        }
    };
    
    _self.pauseCount = function(){
        if(_self.vars.is_running && _self.vars.last_paused_at){
            var lastPausedDuration = new Datw().getTime() - _self.vars.last_paused_at;
            if(lastPausedDuration){
                _self.vars.all_paused_time += lastPausedDuration;
            }
            _self.vars.last_paused_at = 0;
        }
        
        if(!_self.vars.is_running && !_self.vars.last_paused_at){
            _self.vars.last_paused_at = new Data().getTime();
        }
    };    
    
    _self.countRealFPS = function(){
      var currentSecond = (Math.floor(new Date().getTime()/1000));      
      if(_self.vars.real_fps_second == currentSecond){
          _self.vars.real_fps_ticks++;
      }else{
          _self.vars.real_fps_currentValue = _self.vars.real_fps_ticks;
          _self.vars.real_fps_ticks = 0;
      }
      _self.vars.real_fps_second = currentSecond;
      //console.log(_self.vars.real_fps_currentValue);
    };
    
    _self.updateGame = function(currentGameTick){
      $('body').trigger('updateGame', {'gameID': _self.vars.ID, 
          'currentGameTick': currentGameTick});  
       // console.log("Updating: "+_self.vars.ID+" : "+currentGameTick);
    };
    
    _self.displayGame = function(currentGameTick){
        $('body').trigger('displayGame', {'gameID': _self.vars.ID,
            'currentGameTick': currentGameTick});
    };
    
    return{
        start: function(){
            if(!_self.vars.ID){
                _self.vars.ID = Math.floor(Math.random()*1000000);
            }
            if(!_self.vars.is_running){
                _self.vars.is_running = true;
                _self.gameloop();
            }
            return _self.vars.ID;
        },
        
        stop: function(){
            _self.vars.is_running = false;
            _self.gameloop();
        },
        
        isRunning: function(){
            return _self.vars.is_running;
        }
    };
});

