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
				/*if(!$aboutme.isEmpty()){
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
				}*/
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
				$display = $("#display");
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
				data.append("display",$display.val());
				
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
		},
		bind : function(){
			//设置点击分类标题显示与隐藏作品详情列表
			$(".typeName").each(function(i,typename){
				var $workItem = $(this).siblings(".workItems");
				
				var typeID = $(this).data("typeid");
				$(this).click(function(){
					if($workItem.css("display") == "none"){
						$._ajax({
							url : "/admin/workitemshow",
							type : "get",
							data : {typeID:typeID}
						}).then(function(htmls){
							$workItem.html(htmls);
							$workItem.show("fast");
						});
					}else{
						$workItem.hide("slow");
					}
				});
			});
		}
	};
	
	var myworktype = {
		url : "myworktype",
		className : "myworktype",
		render : function(){
			return $._ajax({
				url : "/admin/myworktype",
				type : "get"
			});
		},
		bind : function(){
			//添加分类
			var $typename = $("#typename"),
				$typedesc = $("#typedesc"),
				$addMsg = $(".addMsg");
				
			$("form").submit(function(){
				var event = event || window.event;
  				event.preventDefault(); // 兼容标准浏览器
  				window.event.returnValue = false; // 兼容IE6~8
  				if(!$typename.isEmpty()){
  					$addMsg.error("警告:","分类名不能为空且不能含有空格!");
  					$typename.focus();
  					return false;
  				}
  				$._ajax({
					url : "/admin/worktypeadd",
					data : {"typeName":$typename.val(),"typeDesc":$typedesc.val()},
					dataType : "json",     //服务器响应的数据类型
				}).then(function(obj){
					if(obj.code == 1){
						window.location.reload(); 
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
			});
			
			var $changeBtns = $(".btnChange"),
				$deleteBtns = $(".btnDelete");
			//删除分类
			$deleteBtns.each(function(i,item){
				var typeID = $(this).data("typeid");
				var errMsg = $(this).siblings(".errMsg");
				$(this).click(function(){
					$._ajax({
						url : "/admin/worktypedelete",
						data : {"typeID":typeID},
						dataType : "json",     //服务器响应的数据类型
					}).then(function(obj){
						if(obj.code == 1){
							window.location.reload(); 
						}else{
							errMsg.error(null,"请确保该分类下所有作品已删除!");
						}
					});
				});
			});
			
			//修改分类
			$changeBtns.each(function(i,item){
				var $changeBox = $(this).siblings(".typeModify");
				$(this).click(function(){
					$changeBox.css("top","0");
				});
			});
			var $doChanges = $(".doChanges");
			$doChanges.each(function(i,itme){
				var typeID = $(this).data("typeid"),
					$typeName = $(this).siblings(".typeNameChg"),
					$typeDesc = $(this).siblings(".typeDesChg");
				$(this).click(function(){
					$._ajax({
						url : "/admin/worktypechg",
						data : {"typeID":typeID ,"typeName":$typeName.val(),"typeDesc":$typeDesc.val()},
						dataType : "json",     //服务器响应的数据类型
					}).then(function(obj){
						if(obj.code == 1){
							rememberPos();
							window.location.reload();
						}else{
							alert("操作失败,请稍后重试!");
						}
					});
				});
			});
		}
	};

	var myworkupload = {
		url : "myworkupload",
		className : "myworkupload",
		render : function(){
			return $._ajax({
				url : "/admin/myworkupload",
				type : "get"
			});
		},
		bind : function(){
			var $worksType = $("#worksType"),
				$workName = $("#workName"),
				$workDesc = $("#workDesc"),
				$workImg = $("#workImg"),
				$workLink = $("#workLink"),
				$message = $(".message");
			//检测文件数量
			$workImg.get(0).onchange =  function(){
				if($workImg.get(0).files.length>9){
					$message.error("警告:","最多同时上传九张图片!");
				}
			};
			//表单提交
			$("form").submit(function(){
				var event = event || window.event;
  				event.preventDefault(); // 兼容标准浏览器
  				window.event.returnValue = false; // 兼容IE6~8
  				var $showIndex = $("input[name='showIndex']:checked");
  				if(!$workName.isEmpty()){
  					$message.error("警告:","作品名称不能为空且不能含有空格!");
  					$workName.focus();
  					return false;
  				}
  				if($workImg.val()==""){
  					$message.error("警告:","必须上传至少一张图片!");
  					return false;
  				}
  				
  				var data = new FormData();
  				data.append("typeID",$worksType.val());
  				data.append("workName",$workName.val());
  				data.append("workDesc",$workDesc.val());
				//data.append("workImg",$workImg.get(0).files);
  				data.append("workLink",$workLink.val());
  				data.append("showIndex",$showIndex.val());
  				var length = $workImg.get(0).files.length;
  				for(var i=0;i<length;i++){
  					data.append("workImg",$workImg.get(0).files[i]);
  				}
  				
  				$._ajax({
					url : "/admin/myworkupload",
					data : data,
					dataType : "json",     //服务器响应的数据类型
					processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
					contentType : false,   //multipart/form-data一定要设为false,不要自己添加
					cache : false ,         //不缓存此页面
				}).then(function(obj){
					if(obj.code == 1){
						window.location.hash = "#myworkshow";
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
  				
			});
		}
	}
	
	var myworkchange = {
		url : "myworkchange",
		className : "myworkchange",
		render : function(){
			return $._ajax({
				url : "/admin/myworkchange",
				type : "get"
			});
		},
		bind : function(){
			//设置点击分类标题显示与隐藏作品详情列表
			$(".typeName").each(function(i,typename){
				var $workItem = $(this).siblings(".workItems");
				
				var typeID = $(this).data("typeid");
				$(this).click(function(){
					if($workItem.css("display") == "none"){
						$._ajax({
							url : "/admin/workitemmodify",
							type : "get",
							data : {typeID:typeID}
						}).then(function(htmls){
							$workItem.html(htmls);
							$workItem.show("fast");
							//设置点击作品列表中的修改按钮时显示出修改框
							$(".btn-modify").each(function(i,btn){
								var $modify = $(this).siblings(".modify");
								$(this).click(function(){
									$modify.css("top","0");
									//设置点击修改框中的取消按钮时隐藏修改框
									$modify.children(".cancelModify").click(function(){
										$modify.css("top","390px");
										return false;
									});
									//设置点击修改框中的提交按钮时,向服务器post修改的数据
									var $workName = $modify.children(".input-group").children(".workName"),
										$workDesc = $modify.children(".input-group").children(".workDesc"),
										$workLink = $modify.children(".input-group").children(".workLink"),
										$message = $modify.children(".message");
									$modify.children(".submit").click(function(){
										var worksID = $(this).data("workid");
										var $showIndex = $modify.children(".input-group").children("input[name='showIndex']:checked");
										if(!$workName.isEmpty()){
											$message.error("警告:","作品名称不能为空且不含空格");
											$workName.focus();
											return false;
										}
										if(typeof($showIndex.val())=="undefined"){
											$message.error("警告:","请选择是否在首页展示");
											return false;
										}
										$._ajax({
											url : "/admin/workchg",
											data : {"worksID":worksID,"workName":$workName.val(),"workDesc":$workDesc.val(),"workLink":$workLink.val(),"showIndex":$showIndex.val()},
											dataType : "json"
										}).then(function(obj){
											if(obj.code == "1"){
												window.location.reload();
											}else{
												$message.error(null,"发生了一些错误,请稍后重试");
											}
										})
									})
								});
							});
							//设置点击作品列表中是删除按钮时通过后台删除该项
							$(".btn-delete").each(function(i,btn){
								var worksID = $(this).data("workid");
								var workImg = $(this).siblings(".imgBox").data("workimg");
								$(this).click(function(){
									$._ajax({
										url : "/admin/workdelete",
										data : {"worksID":worksID,"workImg":workImg},
										dataType : "json"
									}).then(function(obj){
										if(obj.code == "1"){
											window.location.reload();
										}else{
											alert("删除失败");
										}
									});
								});
							})
						});
					}else{
						$workItem.hide("slow");
					}
				});
			});

		}
	};
	
	var businesstype = {
		url : "businesstype",
		className : "businesstype",
		render : function(){
			return $._ajax({
				url : "/admin/businesstype",
				type : "get"
			});
		},
		bind : function(){
			//添加分类
			var $typename = $("#typename"),
				$typedesc = $("#typedesc"),
				$addMsg = $(".addMsg"),
				$typeimg = $("#typeLogo");
				
			$("form").submit(function(){
				var event = event || window.event;
  				event.preventDefault(); // 兼容标准浏览器
  				window.event.returnValue = false; // 兼容IE6~8
  				if(!$typename.isEmpty()){
  					$addMsg.error("警告:","分类名不能为空且不能含有空格!");
  					$typename.focus();
  					return false;
  				}
  				var data = new FormData();
  				data.append("typeName",$typename.val());
  				data.append("typeDesc",$typedesc.val());
  				data.append("typeImg",$typeimg.get(0).files[0]);
  				$._ajax({
					url : "/admin/businesstypeadd",
					data : data,
					dataType : "json",     //服务器响应的数据类型
					processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
					contentType : false,   //multipart/form-data一定要设为false,不要自己添加
					cache : false ,         //不缓存此页面
				}).then(function(obj){
					if(obj.code == 1){
						window.location.reload(); 
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
			});
			
			var $changeBtns = $(".btnChange"),
				$deleteBtns = $(".btnDelete");
			//删除分类
			$deleteBtns.each(function(i,item){
				var typeID = $(this).data("typeid"),
					oldImg = $(this).data("oldimg");
				var errMsg = $(this).siblings(".errMsg");
				$(this).click(function(){
					$._ajax({
						url : "/admin/businesstypedelete",
						data : {"typeID":typeID,"oldImg":oldImg},
						dataType : "json",     //服务器响应的数据类型
					}).then(function(obj){
						if(obj.code == 1){
							window.location.reload(); 
						}else{
							errMsg.error(null,"请确保该分类下所有作品已删除!");
						}
					});
				});
			});
			
			//修改分类
			$changeBtns.each(function(i,item){
				var $changeBox = $(this).siblings(".typeModify");
				$(this).click(function(){
					$changeBox.css("top","0");
				});
			});
			var $doChanges = $(".doChanges");
			$doChanges.each(function(i,item){
				var typeID = $(this).data("typeid"),
					oldImg = $(this).data("oldimg"),
					$typeName = $(this).siblings(".typeNameChg"),
					$newImg = $(this).siblings(".newImg"),
					$typeDesc = $(this).siblings(".typeDesChg");
				$(this).click(function(){
					var data = new FormData()
					data.append("typeID",typeID);
					data.append("oldImg",oldImg);
					data.append("typeName",$typeName.val());
					data.append("typeDesc",$typeDesc.val());
					data.append("typeImg",$newImg.get(0).files[0]);
					$._ajax({
						url : "/admin/businesstypechg",
						data : data,
						dataType : "json",     //服务器响应的数据类型
						processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
						contentType : false,   //multipart/form-data一定要设为false,不要自己添加
						cache : false ,         //不缓存此页面
					}).then(function(obj){
						if(obj.code == 1){
							rememberPos();
							window.location.reload();
						}else{
							alert("操作失败,请稍后重试!");
						}
					});
				});
			});
		}
	};
	
	var businessadd = {
		url : "businessadd",
		className : "businessadd",
		render : function(){
			return $._ajax({
				url : "/admin/businessadd",
				type : "get"
			});
		},
		bind : function(){
			var $type = $("#worksType"),
				$serviceName = $("#workName"),
				$serviceDesc = $("#workDesc"),
				$serviceImg = $("#workImg"),
				$servicePrice = $("#price"),
				$message = $(".message");
			//表单提交
			$("form").submit(function(){
				var event = event || window.event;
  				event.preventDefault(); // 兼容标准浏览器
  				window.event.returnValue = false; // 兼容IE6~8
  				if(!$serviceName.isEmpty()){
  					$message.error("警告:","服务名称不能为空且不能含有空格!");
  					$serviceName.focus();
  					return false;
  				}
  				if(!$serviceDesc.isEmpty()){
  					$message.error("警告:","服务介绍不能为空且不能含有空格!");
  					$serviceDesc.focus();
  					return false;
  				}
  				if(!$servicePrice.isEmpty()){
  					$message.error("警告:","报价不能为空!");
  					$servicePrice.focus();
  					return false;
  				}
  				
  				var data = new FormData();
  				data.append("typeID",$type.val());
  				data.append("serviceName",$serviceName.val());
  				data.append("serviceDesc",$serviceDesc.val());
				data.append("serviceImg",$serviceImg.get(0).files[0]);
  				data.append("servicePrice",$servicePrice.val());
  				
  				$._ajax({
					url : "/admin/businessadd",
					data : data,
					dataType : "json",     //服务器响应的数据类型
					processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
					contentType : false,   //multipart/form-data一定要设为false,不要自己添加
					cache : false ,         //不缓存此页面
				}).then(function(obj){
					if(obj.code == 1){
						window.location.hash = "#businessshow";
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
  				
			});
		}
	}
	
	var businessshow = {
		url : "businessshow",
		className : "businessshow",
		render : function(){
			return $._ajax({
				url : "/admin/businessshow",
				type : "get"
			});
		},
		bind : function(){
			//设置点击分类标题显示与隐藏作品详情列表
			$(".typeName").each(function(i,typename){
				var $workItem = $(this).siblings(".workItems");
				
				var typeID = $(this).data("typeid");
				$(this).click(function(){
					if($workItem.css("display") == "none"){
						$._ajax({
							url : "/admin/serviceitemshow",
							type : "get",
							data : {typeID:typeID}
						}).then(function(htmls){
							$workItem.html(htmls);
							$workItem.show("fast");
						});
					}else{
						$workItem.hide("slow");
					}
				});
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
		},
		bind : function(){
			//设置点击分类标题显示与隐藏作品详情列表
			$(".typeName").each(function(i,typename){
				var $serviceItem = $(this).siblings(".workItems");
				
				var typeID = $(this).data("typeid");
				$(this).click(function(){
					if($serviceItem.css("display") == "none"){
						$._ajax({
							url : "/admin/serviceitemmodify",
							type : "get",
							data : {typeID:typeID}
						}).then(function(htmls){
							$serviceItem.html(htmls);
							$serviceItem.show("fast");
							//设置点击作品列表中的修改按钮时显示出修改框
							$(".btn-modify").each(function(i,btn){
								var $modify = $(this).siblings(".modify");
								$(this).click(function(){
									$modify.css("top","0");
									//设置点击修改框中的取消按钮时隐藏修改框
									$modify.children(".cancelModify").click(function(){
										$modify.css("top","390px");
										return false;
									});
									//设置点击修改框中的提交按钮时,向服务器post修改的数据
									var $serviceTitle = $modify.children(".input-group").children(".workName"),
										$serviceDescription = $modify.children(".input-group").children(".workDesc"),
										$servicePrice = $modify.children(".input-group").children(".price"),
										$message = $modify.children(".message");
									$modify.children(".submit").click(function(){
										var serviceID = $(this).data("workid");
										if(!$serviceTitle.isEmpty()){
											$message.error("警告:","服务名称不能为空且不含空格");
											$serviceTitle.focus();
											return false;
										}
										if(!$serviceDescription.isEmpty()){
											$message.error("警告:","服务介绍不能为空且不含空格");
											$serviceDescription.focus();
											return false;
										}
										if(!$servicePrice.isEmpty()){
											$message.error("警告:","报价不能为空");
											$servicePrice.focus();
											return false;
										}
										$._ajax({
											url : "/admin/businesschg",
											data : {"serviceID":serviceID,"serviceTitle":$serviceTitle.val(),"serviceDescription":$serviceDescription.val(),"servicePrice":$servicePrice.val()},
											dataType : "json"
										}).then(function(obj){
											if(obj.code == "1"){
												window.location.reload();
											}else{
												$message.error(null,"发生了一些错误,请稍后重试");
											}
										})
									})
								});
							});
							//设置点击作品列表中是删除按钮时通过后台删除该项
							$(".btn-delete").each(function(i,btn){
								var serviceID = $(this).data("workid");
								var serviceLogo = $(this).siblings(".imgBox").data("workimg");
								$(this).click(function(){
									$._ajax({
										url : "/admin/businessdelete",
										data : {"serviceID":serviceID,"serviceLogo":serviceLogo},
										dataType : "json"
									}).then(function(obj){
										if(obj.code == "1"){
											window.location.reload();
										}else{
											alert("删除失败");
										}
									});
								});
							})
						});
					}else{
						$serviceItem.hide("slow");
					}
				});
			});

		}
	};
	
	var ordershow = {
		url : "ordershow/:typeid",
		className : "ordershow",
		render : function(){
			var typeid = this.params.typeid;
			return $._ajax({
				url : "/admin/ordershow/"+typeid,
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
				url : "/admin/orderdetail/"+orderid,
				type : "get"
			});
		},
		bind : function(){
			var $msg = $(".msg-box");
			$(".refresh").click(function(){
				var status = $("select[name='status']").val();
				var orderID = $(this).data("orderid");
				
				$._ajax({
					url : "/admin/orderstatus",
					data : {"status":status,"orderID":orderID},
					dataType : "json"
				}).then(function(obj){
					if(obj.code == "1"){
						window.location.reload();
					}else{
						$msg.error(null,"请稍后重试!");
					}
				})
			});
		}
	}
	
	var editbase = {
		url : "editbase",
		className : "editbase",
		render : function(){
			return $._ajax({
				url : "/admin/editbase",
				type : "get"
			});
		},
		bind : function(){
			var $portrait = $("#portrait"),
				$skill1 = $("#skill1"),
				$skill2 = $("#skill2"),
				$skill3 = $("#skill3"),
				$skill4 = $("#skill4"),
				$message = $(".message"),
				$confirm = $("#confirm");
			$confirm.click(function(){
				if($portrait.val() == ""){
					$message.error("警告:","必须选择一张形象照");
					return false;
				}
				var data = new FormData();
				data.append("portrait",$portrait.get(0).files[0]); 
				data.append("oldPortrait",$portrait.data("oldportrait"));
				data.append("skill1",$skill1.val());
				data.append("skill2",$skill2.val());
				data.append("skill3",$skill3.val());
				data.append("skill4",$skill4.val());
				$._ajax({
					url : "/admin/editbase",
					data : data,
					dataType : "json",     //服务器响应的数据类型
					processData : false,   //不将data选项传递进来的对象处理成一个查询字符串
					contentType : false,   //multipart/form-data一定要设为false,不要自己添加
					cache : false ,         //不缓存此页面
				}).then(function(obj){
					if(obj.code == 1){
						window.location.reload();
						window.location.href = "/admin/#home";
					}else{
						$message.error(null,"操作失败,请稍后重试!");
					}
				});
				return false;
			})
		}
	};
	
	var home = {
		url : "home",
		className : "home",
		render : function(){
			return "<div style='padding-top:10px;color:#269ECB;text-align:center'>"+
						"<h1 style='padding-top:50px'>欢迎访问设计师管理平台!</h1>"+
						//"<p style='color:#333333'>若有任何疑问,欢迎发送邮件至开发者邮箱:<i style='color:red'> pihuilong@qq.com</i> </p>"+
					"</div>";
		}
	}
	

	router.push(indexchange).push(indexshow)
	.push(resumeshow).push(resumechange).push(resumetochange).push(resumeadd)
	.push(myworkshow).push(myworkchange).push(myworktype).push(myworkupload)
	.push(businessshow).push(businesschange).push(businesstype).push(businessadd)
	.push(ordershow).push(orderdetail)
	.push(home).push(editbase).setDefault('home').init();
	
	
});
