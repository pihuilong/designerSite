$(function(){
	var router = new Router({
		container : "#contents"
	});
	
	var indexshow = {
		url : "/indexshow",
		className : "indexshow",
		render : function(){
			return $._ajax({
				url : "/admin/indexshow",
				type : "get"
			});
		}
	};
	
	var indexchange = {
		url : "/indexchange",
		className :　"indexchange",
		render : function(){
			return $._ajax({
				url : "/admin/indexchange",
				type: "get"
			});
		},
		bind : function(){
			var $message = $(".message");
			var $aboutme = $("#aboutme");
			var $myskills = $("#myskills");
			var $mywills = $("#mywills");
			$("form").submit(function(){
				if(!$aboutme.isEmpty()){
					$message.error("警告","关于我不能为空!");
					$aboutme.focus();
					return false;
				}
				if(!$myskills.isEmpty()){
					$message.error("警告","我的经验不能为空!");
					$myskills.focus();
					return false;
				}
				if(!$mywills.isEmpty()){
					$message.error("警告","我的愿景不能为空!");
					$mywills.focus();
					return false;
				}
				$._ajax({
					url : "/admin/indexchange",
					data : {"aboutme":$aboutme.val(),"myskills":$myskills.val(),"mywills":$mywills.val()},
					dataType : "json",     //服务器响应的数据类型
				}).then(function(obj){
					if(obj.code == 1){
						window.location.hash = "#/indexshow";
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
				return false;
			})
		}
	};
	
	var resumeshow = {
		url : "/resumeshow",
		className : "resumeshow",
		render : function(){
			return $._ajax({
				url : "/admin/resumeshow",
				type : "get"
			});
		}
	};
	
	var resumechange = {
		url : "/resumechange",
		className : "resumechange",
		render : function(){
			return $._ajax({
				url : "/admin/resumechange",
				type : "get"
			});
		}
	};
	
	var myworkshow = {
		url : "/myworkshow",
		className : "myworkshow",
		render : function(){
			return $._ajax({
				url : "/admin/myworkshow",
				type : "get"
			});
		}
	};
	
	var myworkchange = {
		url : "/myworkchange",
		className : "myworkchange",
		render : function(){
			return $._ajax({
				url : "/admin/myworkchange",
				type : "get"
			});
		}
	};
	
	var businessshow = {
		url : "/businessshow",
		className : "businessshow",
		render : function(){
			return $._ajax({
				url : "/admin/businessshow",
				type : "get"
			});
		}
	};
	
	var businesschange = {
		url : "/businesschange",
		className : "businesschange",
		render : function(){
			return $._ajax({
				url : "/admin/businesschange",
				type : "get"
			});
		}
	};
	
	var ordershow = {
		url : "/ordershow",
		className : "ordershow",
		render : function(){
			return $._ajax({
				url : "/admin/ordershow",
				type : "get"
			});
		}
	};
	
	router.push(indexchange).push(indexshow)
	.push(resumeshow).push(resumechange)
	.push(myworkshow).push(myworkchange)
	.push(businessshow).push(businesschange)
	.push(ordershow).init();
});
