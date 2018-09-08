(function($,root){
    var curDuration;
    var frameId;
    var start;
    var lastper = 0;
    function forMin(duration){
        // duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if(minute < 10){
            minute = '0'+minute;
        }
        if(second < 10){
            second = '0'+second;
        }
        return minute + ':' + second;
    }


    function allTime(duration){
        lastper = 0;
        curDuration = duration;
        
        // duration = Math.round(duration);
        var allTime = forMin(duration);
        $scope.find('.all-time').html(allTime);
    }


    function updata(per){
       
        var curTime = Math.round(per * curDuration);
        curTime = forMin(curTime);
        $scope.find('.cur-time').html(curTime);
        var perc = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            'transform':'translateX(' + perc + ')'
        })


    }

    function start(){
         start = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastper + (curTime - start)/(curDuration * 1000);
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
                updata(percent);
            }else{
                cancelAnimationFrame(frameId)
            }
        }

        frame();

    }


    function stop(){
        var lastTime = new Date().getTime();
        lastper = lastper + (lastTime - start)/(curDuration * 1000);
        cancelAnimationFrame(frameId)
    }


root.process = {
    allTime:allTime,
    start:start,
    stop:stop
}

}(window.Zepto,window.player))