(function($,root){
    function controlIndex(len){
        this.index = 0;
        this.len = len;
    }

    controlIndex.prototype = {
        next:function(){
            // index++;
            return this.getIndex(1);
        },
        prev:function(){
            // index--;
            return this.getIndex(-1);
            
        },
        getIndex:function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val)%len;
            this.index = curIndex;
            return curIndex;
        }
    }
root.controlIndex = controlIndex;

}(window.Zepto,window.player))