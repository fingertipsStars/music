// 实现渲染
var $scope = $(document.body);
(function($,root){
    
    function getInfo(info){

        var html = '  <div class="song-name">'+ info.song+'</div>'+
        '<div class="singer-name">'+info.singer +'</div>' +
        '<div class="album-name">'+ info.album+'</div>'

        $scope.find('.song-info').html(html);
    }

    function getImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img,$scope);
            $scope.find('.song-img img').attr('src',src);
        }
    }


    function isLike(boolean){
        if(boolean){
            $scope.find('.like').addClass('liking')
        }else{
            $scope.find('.like').removeClass('liking')
            
        }
    }
    root.render = function(data){
        getInfo(data);
        getImg(data.image);
        isLike(data.isLike);
    };

}(window.Zepto,window.player || (window.player = {})))
// 通过window.player 暴露函数接口