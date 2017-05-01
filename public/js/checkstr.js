~function(){
    $.fn.extend({
        isEmpty : function(){   //不为空且不含空格
            var noEmpty = /^\S+$/;
            return noEmpty.test(this.val());
        },
        isEmail : function(){
            var email = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
            return email.test(this.val());
        },
        isNolong : function(){   //不能超过16个字符，支持中英文、数字、减号或下划线
        	var nolong = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/;
        	return nolong.test(this.val());
        },
        isPwd : function(){
        	var Pwd = /^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]){6,20}$/;
        	return Pwd.test(this.val());
        },
        fileSize : function(size){  //文件大小不超过size值返回true  单位：KB
        	var fileSize = 0;
		    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;            
		    if (isIE && !this.files) {          
		         var filePath = this.value;            
		         var fileSystem = new ActiveXObject("Scripting.FileSystemObject");   
		         var file = fileSystem.GetFile (filePath);               
		         fileSize = file.Size;         
		    }else {  
		         fileSize = this.get(0).files[0].size;     
		    } 
		    fileSize=Math.round(fileSize/1024*100)/100; //单位为KB
		    if(fileSize>=size){
//		        alert("照片最大尺寸为10KB，请重新上传!");
		        return false;
		    }else{
		    	return true;
		    }
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

//记住页面当前位置并存储
rememberPos = function () { 
	var scrollPos; 
	if (typeof window.pageYOffset != 'undefined') { 
		scrollPos = window.pageYOffset; 
	} 
	else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') { 
		scrollPos = document.documentElement.scrollTop; 
	} 
	else if (typeof document.body != 'undefined') { 
		scrollPos = document.body.scrollTop; 
	} 
	document.cookie = "scrollTop=" + scrollPos; //存储滚动条位置到cookies中 
} 

function checknum(obj){
	if(/^\d+\.?\d{0,2}$/.test(obj.value)){
    	obj.value = obj.value;
    }else{
   		obj.value = obj.value.substring(0,obj.value.length-1);
   	}
}
