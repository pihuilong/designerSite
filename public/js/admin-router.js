$(function(){
	var router = new Router({
		container : "#contents"
	});
	
	var indexshow = {
		url : "indexshow",
		className : "indexshow",
		render : function(){
			return $._ajax({
				url : "/admin/indexshow",
				type : "get"
			});
		}
	};
	
	var indexchange = {
		url : "indexchange",
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
						window.location.hash = "#indexshow";
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
				return false;
			})
		}
	};
	
	var resumeshow = {
		url : "resumeshow",
		className : "resumeshow",
		render : function(){
			return $._ajax({
				url : "/admin/resumeshow",
				type : "get"
			});
		},
		bind : function(){
			$("#addResume").click(function(){
				window.location.hash = "#resume/show/add";
			});
			var $resumes = $(".resumes");
			$.each($resumes, function(i,resume) {
				$(this).click(function(){
					var resumeID = $(this).data("resumeid");
					$._ajax({
						url : "/admin/resumedetail/"+resumeID,
						type : "get"
					}).then(function(html){
						$("#resumeShow").html(html);
					});
				});
			});
			return false;
		}
	};
	
	var resumeadd = {
		url : "resume/show/add",
		className : "resumeadd",
		render : function(){
			return $._ajax({
				url : "/admin/resumeadd",
				type : "get"
			});
		},
		bind : function(){
			var $message = $(".message"),
				$resumeName = $("#resumeName"),
				$username = $("#userName"),
				$gender = $("#gender"),
				$birth = $("#birth"),
				$liveSpot = $("#liveSpot"),
				$workYears = $("#workYears"),
				$highestEducation = $("#highestEducation"),
				$tel = $("#tel"),
				$email = $("#email"),
				$jobspecification = $("#jobspecification"),
				$promisingIndustry = $("#promisingIndustry"),
				$willspot = $("#willspot"),
				$jobstatus = $("#jobstatus"),
				$specializeSkill = $("#specializeSkill"),
				$workExperience = $("#workExperience"),
				$trainingExperience = $("#trainingExperience"),
				$educationExperience = $("#educationExperience"),
				$userImg = $("#userImg");
			$("form").submit(function(event){
				var event = event || window.event;
  				event.preventDefault(); // 兼容标准浏览器
  				window.event.returnValue = false; // 兼容IE6~8
				if(!$resumeName.isEmpty()){
					$message.error("警告:","简历名不能为空");
					return false;
				}
				if(!$username.isEmpty()){
					$message.error("警告:","姓名不能为空");
					return false;
				}
				if(!$birth.isEmpty()){
					$message.error("警告:","出生日期不能为空");
					return false;
				}
				if(!$liveSpot.isEmpty()){
					$message.error("警告:","所在城市不能为空");
					return false;
				}
				if(!$workYears.isEmpty()){
					$message.error("警告:","工作年限不能为空");
					return false;
				}
				if(!$tel.isEmpty()){
					$message.error("警告:","联系方式不能为空");
					return false;
				}
				if(!$email.isEmpty()){
					$message.error("警告:","Email不能为空");
					return false;
				}
				if(!$promisingIndustry.isEmpty()){
					$message.error("警告:","期望行业不能为空");
					return false;
				}
				if(!$willspot.isEmpty()){
					$message.error("警告:","意向工作城市不能为空");
					return false;
				}
				if($userImg.val()==""){
					$message.error("警告:","必须选择一张近日照片");
					return false;
				}
				
				var data = new FormData();
				data.append("username",$username.val());
				data.append("gender",$gender.val());
				data.append("birth",$birth.val());
				data.append("liveSpot",$liveSpot.val());
				data.append("workYears",$workYears.val());
				data.append("highestEducation",$highestEducation.val());
				data.append("tel",$tel.val());
				data.append("email",$email.val());
				data.append("jobspecification",$jobspecification.val());
				data.append("promisingIndustry",$promisingIndustry.val());
				data.append("willspot",$willspot.val());
				data.append("jobstatus",$jobstatus.val());
				data.append("specializeSkill",$specializeSkill.val());
				data.append("workExperience",$workExperience.val());
				data.append("trainingExperience",$trainingExperience.val());
				data.append("educationExperience",$educationExperience.val());
				data.append("userImg",$userImg.get(0).files[0]);
				data.append("resumeName",$resumeName.val());
				
				$._ajax({
					url : "/admin/resumeadd",
					data : data,
//					data : {"username":$username.val(),"gender":$gender.val(),"birth":$birth.val(),"liveSpot":$liveSpot.val(),
//							"workYears":$workYears.val(),"highestEducation":$highestEducation.val(),"tel":$tel.val(),
//							"email":$email.val(),"jobspecification":$jobspecification.val(),"promisingIndustry":$promisingIndustry.val(),
//							"willspot":$willspot.val(),"jobstatus":$jobstatus.val(),"specializeSkill":$specializeSkill.val(),
//							"workExperience":$workExperience.val(),"trainingExperience":$trainingExperience.val(),
//							"educationExperience":$educationExperience.val(),"userImg":$userImg.val(),"resumeName":$resumeName.val()},
					dataType : "json",     //服务器响应的数据类型
					processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
					contentType : false,   
					cache : false ,         //不缓存此页面
				}).then(function(obj){
					if(obj.code == 1){
						window.location.hash = "#resumeshow";
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
			});
		}
	};
	var resumechange = {
		url : "resumechange",
		className : "resumechange",
		render : function(){
			return $._ajax({
				url : "/admin/resumechange",
				type : "get"
			});
		},
		bind : function(){
			var $resumes = $(".resumes");
			$.each($resumes, function(i,resume) {
				$(this).click(function(){
					var resumeID = $(this).data("resumeid");
					window.location.hash = "#resumetochange/:"+resumeID;
				});
			});
			return false;
		}
	};
	var resumetochange = {
		url : "resumetochange/:rid",
		className : "resumetochange",
		render : function(){
			var resumeID = this.params.rid.split(":")[1];
			return $._ajax({
				url : "/admin/changeresume/"+resumeID,
				type : "get"
			});
		},
		bind : function(){
			var $message = $(".message"),
				$resumeName = $("#resumeName"),
				$username = $("#userName"),
				$gender = $("#gender"),
				$birth = $("#birth"),
				$liveSpot = $("#liveSpot"),
				$workYears = $("#workYears"),
				$highestEducation = $("#highestEducation"),
				$tel = $("#tel"),
				$email = $("#email"),
				$jobspecification = $("#jobspecification"),
				$promisingIndustry = $("#promisingIndustry"),
				$willspot = $("#willspot"),
				$jobstatus = $("#jobstatus"),
				$specializeSkill = $("#specializeSkill"),
				$workExperience = $("#workExperience"),
				$trainingExperience = $("#trainingExperience"),
				$educationExperience = $("#educationExperience"),
				$userImg = $("#userImg");
			$("form").submit(function(event){
				var event = event || window.event;
  				event.preventDefault(); // 兼容标准浏览器
  				window.event.returnValue = false; // 兼容IE6~8
				if(!$resumeName.isEmpty()){
					$message.error("警告:","简历名不能为空");
					return false;
				}
				if(!$username.isEmpty()){
					$message.error("警告:","姓名不能为空");
					return false;
				}
				if(!$birth.isEmpty()){
					$message.error("警告:","出生日期不能为空");
					return false;
				}
				if(!$liveSpot.isEmpty()){
					$message.error("警告:","所在城市不能为空");
					return false;
				}
				if(!$workYears.isEmpty()){
					$message.error("警告:","工作年限不能为空");
					return false;
				}
				if(!$tel.isEmpty()){
					$message.error("警告:","联系方式不能为空");
					return false;
				}
				if(!$email.isEmpty()){
					$message.error("警告:","Email不能为空");
					return false;
				}
				if(!$promisingIndustry.isEmpty()){
					$message.error("警告:","期望行业不能为空");
					return false;
				}
				if(!$willspot.isEmpty()){
					$message.error("警告:","意向工作城市不能为空");
					return false;
				}
				if($userImg.val()==""){
					$message.error("警告:","必须选择一张近日照片");
					return false;
				}
				
				var data = new FormData();
				data.append("username",$username.val());
				data.append("gender",$gender.val());
				data.append("birth",$birth.val());
				data.append("liveSpot",$liveSpot.val());
				data.append("workYears",$workYears.val());
				data.append("highestEducation",$highestEducation.val());
				data.append("tel",$tel.val());
				data.append("email",$email.val());
				data.append("jobspecification",$jobspecification.val());
				data.append("promisingIndustry",$promisingIndustry.val());
				data.append("willspot",$willspot.val());
				data.append("jobstatus",$jobstatus.val());
				data.append("specializeSkill",$specializeSkill.val());
				data.append("workExperience",$workExperience.val());
				data.append("trainingExperience",$trainingExperience.val());
				data.append("educationExperience",$educationExperience.val());
				data.append("userImg",$userImg.get(0).files[0]);
				data.append("resumeName",$resumeName.val());
				data.append("oldImg",$userImg.data("oldimg"));
				data.append("resumeID",$resumeName.data("resumeid"));
				
				$._ajax({
					url : "/admin/resumechange",
					data : data,
					dataType : "json",     //服务器响应的数据类型
					processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
					contentType : false,   //multipart/form-data一定要设为false,不要自己添加
					cache : false ,         //不缓存此页面
				}).then(function(obj){
					if(obj.code == 1){
						window.location.hash = "#resumeshow";
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
			});
			$("#deleteResume").click(function(){
				$._ajax({
					url : "/admin/resumedelete",
					type : "get",
					data : {resumeID:$resumeName.data("resumeid"),ImgPath:$userImg.data("oldimg")},
					dataType : "json"
				}).then(function(obj){
					if(obj.code == 1){
						$("#contents").html('<div style="color: red;text-align: center;padding-top: 180px;font-size: 18px;font-weight: bold;">删除成功，页面即将跳转,请稍后......</div>');
						setTimeout(function(){
							window.location.hash = "#resumeshow";
						},3000);
					}else{
						$message.error(null,"删除失败,请稍后再试!");
					}
				});
			});
		}
	}


	var myworkshow = {
		url : "myworkshow",
		className : "myworkshow",
		render : function(){
			return $._ajax({
				url : "/admin/myworkshow",
				type : "get"
			});
		}
	};
	
	var myworkchange = {
		url : "myworkchange",
		className : "myworkchange",
		render : function(){
			return $._ajax({
				url : "/admin/myworkchange",
				type : "get"
			});
		}
	};
	
	var businessshow = {
		url : "businessshow",
		className : "businessshow",
		render : function(){
			return $._ajax({
				url : "/admin/businessshow",
				type : "get"
			});
		}
	};
	
	var businesschange = {
		url : "businesschange",
		className : "businesschange",
		render : function(){
			return $._ajax({
				url : "/admin/businesschange",
				type : "get"
			});
		}
	};
	
	var ordershow = {
		url : "ordershow",
		className : "ordershow",
		render : function(){
			return $._ajax({
				url : "/admin/ordershow",
				type : "get"
			});
		}
	};
	
	var home = {
		url : "home",
		className : "home",
		render : function(){
			return "<div style='padding-top:10px;color:#269ECB;text-align:center'>"+
						"<h1 style='padding-top:50px'>欢迎访问管理员平台!</h1>"+
						"<p style='color:#333333'>若有任何疑问,欢迎发送邮件至开发者邮箱:<i style='color:red'> pihuilong@qq.com</i> </p>"+
					"</div>";
		}
	}


	router.push(indexchange).push(indexshow)
	.push(resumeshow).push(resumechange).push(resumetochange)
	.push(myworkshow).push(myworkchange)
	.push(businessshow).push(businesschange)
	.push(ordershow).push(resumeadd).push(home).setDefault('home').init();
	
	
});
