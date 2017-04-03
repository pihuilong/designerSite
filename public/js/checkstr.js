~function(){
    $.fn.extend({
        isEmpty : function(){
            var noEmpty = /^\S+$/;
            return noEmpty.test(this.val());
        },
        isEmail : function(){
            var email = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
            return email.test(this.val());
        }
    });
    
    $.fn.extend({
        warning : function(title,content){
            var title = title || "警告";
            var content = content || "出现了一点状况！";
            var html = '<div class="alert alert-warning alert-dismissable">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
                        '<strong>${title}!</strong>&nbsp;&nbsp; ${content}' +
                       '</div>'
            var $html =$(html.replace("${title}",title).replace("${content}",content)).css("display","none");
            $(this).html($html);
            $html.clearQueue().delay(200).fadeIn("slow").delay(2000).fadeOut("slow");
            return $(this);
        },
        error : function(title,content){
            var title = title || "错误";
            var content = content || "发生了一些错误！";
            var html = '<div class="alert alert-danger alert-dismissable">'+
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
                        '<strong>${title}!</strong>&nbsp;&nbsp; ${content}' +
                       '</div>';
            var $html =$(html.replace("${title}",title).replace("${content}",content)).css("display","none");
            $(this).html($html);
            $html.clearQueue().delay(200).fadeIn("slow").delay(2000).fadeOut("slow");
            return $(this);
        },
        info : function(title,content){
            var title = title || "通知";
            var content = content || "有新的通知！";
            var html = '<div class="alert alert-info alert-dismissable">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                        '<strong>${title}!</strong>&nbsp;&nbsp; ${content}' +
                       '</div>';
            var $html =$(html.replace("${title}",title).replace("${content}",content)).css("display","none");
            $(this).html($html);
            $html.clearQueue().delay(200).fadeIn("slow").delay(2000).fadeOut("slow");
            return $(this);
        }
    });

    /*
    *对cookie的操作
    */
    $.extend({
        getCookie : function(key){
            var cookie = decodeURIComponent(document.cookie);  //解决特殊符号在URL中的显示
            var index = cookie.indexOf(key);
            if(index == -1){
                return "";
            }
            var start = index + key.length + 1;
            var end = cookie.indexOf(";",start);
            if(end == -1){
                return cookie.slice(start);
            }else{
                return cookie.slice(start,end);
            }
        }
    });

}();

/*
对Ajax的二次封装
*/
~function(){
    $._ajax = function( option ){
        var _option = extend(option,{
            type : "post",
            dataType : "text"  //服务器响应的数据类型为“text”
        });
        $("#anini").fadeIn("fast");
        return $.ajax(_option).fail(function(err){
            if( err.status == 404){
                window.location.href = "/404.html";
            }
            if( err.status == 500 ){
                window.location.href = "/500.html";
            }
        }).always(function(){
            $("#anini").fadeOut("fast");
        });
    }

    function extend(source,target){
        for(var key in source){
            target[key] = source[key];
        }
        return target;
    }
}();

