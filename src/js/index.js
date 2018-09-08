var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList;
var controlIndex;
var audio = new root.audioControl();
function bindClick(){
    $scope.on("play:change",function(event,index,flag){
        audio.getAudio(songList[index].audio);
        if(audio.status == "play"||flag){
            audio.play();
            root.processor.start();
        }
        root.processor.renderAllTime(songList[index].duration)
        root.render(songList[index]);
        root.processor.updata(0);
    })
    //移动端click有300ms延迟
    $scope.on("click",".prev",function(){
        var index = controlIndex.prev();
        $scope.trigger("play:change",index);
    })
    $scope.on("click",".next",function(){
        var index = controlIndex.next();
        $scope.trigger("play:change",index);
    })
    $scope.on("click",".play",function(){
        if(audio.status == "play"){
            audio.pause();
            root.processor.stop();
        }else{
            root.processor.start();
            audio.play();
        }
        $(this).toggleClass("pause");
    })
    $scope.on("click",".list",function(){
        root.playList.show(controlIndex);
    })
}
function bindTouch(){
    var $slidePoint = $scope.find(".slider");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    //绑定拖拽事件 开始拖拽 ： 取消进度条渲染
    $slidePoint.on("touchstart",function(){
        root.processor.stop();
    }).on("touchmove",function(e){
        //计算拖拽的百分比 更新我们的当前时间和进度条
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        root.processor.updata(percent)
    }).on("touchend",function(e){
        //计算百分百 跳转播放 重新开始进度条渲染 
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1 || percent < 0){
            percent = 0;
        }
        var curDuration = songList[controlIndex.index].duration;
        var curTime = curDuration * percent;
        audio.jumpToplay(curTime);
        root.processor.start(percent);
        $scope.find(".play").addClass("pause");
    })
}
function getData(url){
    $.ajax({
        type : "GET",
        url : url,
        success : function(data){
            bindClick();
            bindTouch();
            root.playList.renderList(data);
            controlIndex = new root.controlIndex(data.length);
            songList = data;
            $scope.trigger("play:change",0);
            
        },
        error : function(){
            console.log("error")
        }
    })
}

getData("../mock/data.json")