(function($,root){

    function audioControl(){
        this.audio = new Audio();
        this.status = 'pause';
    }

    audioControl.prototype = {

        bindEvent:function(){
            $(this.audio).on("ended",function(){
                $scope.find(".next").trigger("click");
            }) 
        },
        play:function(){
            this.audio.play();
            this.status = 'play'
        },
        pause:function(){
            this.audio.pause();
            this.status = 'pause'
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumpToplay : function(time){
            
            this.audio.currentTime = time;
            this.play();

        }   
    }

root.audioControl = audioControl;

}(window.Zepto,window.player || (window.player = {})))