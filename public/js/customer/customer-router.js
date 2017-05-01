$(function(){
	var router = new Router({
		container : "#contents"
	});
	
	var infochange = {
		url : "infochange",
		className : "infochange",
		render : function(){
			return $._ajax({
				url : "/customer/infochange",
				type : "get"
			});
		},
		bind : function(){
			var $portrait = $("#portrait"),
				$customerName = $("#customerName"),
				$email = $("#email"),
				$tel = $("#tel"),
				$age = $("#age"),
				$message = $(".message"),
				$confirm = $("#confirm");
			$confirm.click(function(){
			var	$sex = $("input[name='sex']:checked");
				if(!$customerName.isEmpty()){
					$message.error("警告:","姓名不能为空！");
					$customerName.focus();
					return false;
				}
				if(!$email.isEmpty()){
					$message.error("警告:","email不能为空！");
					$email.focus();
					return false;
				}
				if(!$tel.isEmpty()){
					$message.error("警告:","联系电话不能为空！");
					$tel.focus();
					return false;
				}
				var data = new FormData();
				data.append("photo",$portrait.get(0).files[0]); 
				data.append("oldPhoto",$portrait.data("oldportrait"));
				data.append("customerName",$customerName.val());
				data.append("email",$email.val());
				data.append("tel",$tel.val());
				data.append("age",$age.val());
				data.append("sex",$sex.val());
				$._ajax({
					url : "/customer/infochange",
					data : data,
					dataType : "json",     //服务器响应的数据类型
					processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
					contentType : false,   //multipart/form-data一定要设为false,不要自己添加
					cache : false ,         //不缓存此页面
				}).then(function(obj){
					if(obj.code == 1){
						window.location.reload();
						window.location.href = "/customer/#home";
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
				return false;
			})
		}
	}
	
	var ordershow = {
		url : "ordershow/:typeid",
		className : "ordershow",
		render : function(){
			var typeid = this.params.typeid;
			return $._ajax({
				url : "/customer/ordershow/"+typeid,
				type : "get"
			});
		},
		bind : function(){
			$(".showDetail").each(function(i,item){
				var orderid = $(this).data("orderid");
				$(this).click(function(){
					window.location.hash = "#orderdetail/"+orderid;
				})
			});
		}
	};
	
	var orderdetail = {
		url : "orderdetail/:orid",
		className : "orderdetail",
		render : function(){
			var orderid = this.params.orid;
			return $._ajax({
				url : "/customer/orderdetail/"+orderid,
				type : "get"
			});
		}
	}
	
	var home = {
		url : "home",
		className : "home",
		render : function(){
			return "<div style='padding-top:10px;color:#269ECB;text-align:center'>"+
						"<h1 style='padding-top:50px'>欢迎访问个人中心!</h1>"+
						//"<p style='color:#333333'>若有任何疑问,欢迎发送邮件至开发者邮箱:<i style='color:red'> pihuilong@qq.com</i> </p>"+
					"</div>";
		}
	}
	

	router.push(ordershow).push(orderdetail).push(infochange)
		.push(home).setDefault('home').init();
});
