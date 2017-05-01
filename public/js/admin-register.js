$(function(){
	var $adminName = $("#adminName"),
		$email = $("#email"),
		$secrets1 = $("#secret1"),
		$secrets2 = $("#secret2"),
		$portrait = $("#portrait"),
		$message = $(".message");
	$("form").submit(function(){
		var event = event || window.event;
		event.preventDefault(); // 兼容标准浏览器
		window.event.returnValue = false; // 兼容IE6~8
		if(!$adminName.isEmpty()){
			$message.error("警告","用户名不能为空且不能含有空格");
			$adminName.focus();
			return false;
		}
		if(!$adminName.isNolong()){
			$message.error("警告","用户名不能超过十六字符");
			$adminName.focus();
			return false;
		}
		if(!$email.isEmail()){
			$message.error("警告","邮箱格式错误");
			$email.focus();
			return false;
		}
		if(!$secrets1.isPwd()){
			$message.error("警告","必须输入6-20位密码");
			$secrets1.focus();
			return false;
		}
		if($secrets1.val()!==$secrets2.val()){
			$message.error("警告","请确保两次输入密码相同");
			$secrets2.focus();
			return false;
		}
		if($portrait.val()==""){
			$message.error("警告","请选择一张靓照");
			return false;
		}
		if(!$portrait.fileSize(1024)){
			$message.error("警告","照片大小不能超过1MB");
			return false;
		}
	
		var data = new FormData();
		data.append("adminName",$adminName.val());
		data.append("email",$email.val());
		data.append("password",$secrets1.val());
		data.append("portrait",$portrait.get(0).files[0]);
		data.append("skill1","PS/AI/AE");
		data.append("skill2","HTML/CSS/JavaScript");
		data.append("skill3","Jquery/Bootstrap/zepto");
		data.append("skill4","word/ppt/excel");
		
		$._ajax({
			url : "/register/admin",
			data : data,
			dataType : "json",     //服务器响应的数据类型
			processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
			contentType : false,   //multipart/form-data一定要设为false,不要自己添加
			cache : false ,         //不缓存此页面
		}).then(function(obj){
			if(obj.code == 1){
				window.location.href = "admin_login.html";
			}else if(obj.code == 2){
				$message.error(null,"用户名已存在！");
				$adminName.focus();
			}else if(obj.code == 3){
				$message.error(null,"该邮箱已被注册！");
				$email.focus();
			}else{
				$message.error(null,"操作失败,请稍后重试!");
			}
		});
	});
})
