$(function(){
	$(".typeMenu").each(function(i,item){
		var typeID = $(this).data("typeid");
		var $content = $("#da-thumbs");
		$(this).click(function(){
			$._ajax({
				url : "/home/toservice",
				data : {"typeID":typeID}
			}).then(function(html){
				$content.fadeIn("fast");
				$content.html(html);
				
				//绑定业务逻辑
				$(".order").each(function(i,item){
					var $orderBox = $(this).parent().siblings(".order-info-box");
					var $close = $orderBox.children().children(".fa-close");
					var $confirm = $close.siblings(".do-order");
					var $amount = $($close.siblings(".input-group").get(0)).children(".amount");
					var $description = $($close.siblings(".input-group").get(1)).children("textarea");
					var $total = $close.siblings(".total");
					var $msg = $close.siblings(".msg");
					var customerID = $(".navbar-brand").data("customerid");
					$(this).click(function(){
						//显示订单填写
						if(customerID == -1){
							window.location.href = "/customer_login.html";
							return false;
						}
						$orderBox.css("transform","translateX(0%)");
						//填写完订单并点击提交按钮
						$confirm.click(function(){
							var amount = $amount.val(),
								description = $description.val(),
								serviceID = $confirm.data("serviceid");
								adminID = $(".navbar-brand").data("adminid"),
								orderTime = new Date();
							if(amount==""){
								$msg.warning(null,"请输入数量！");
								$amount.focus();
								return false;
							}
							$._ajax({
								url :　"/home/order",
								data : {"amount":amount,"orderDesc":description,"serviceID":serviceID,
										"adminID":adminID,"customerID":customerID,"orderTime":orderTime},
								dataType : "json"
							}).then(function(obj){
								if(obj.success == "1"){
									$msg.info("恭喜:","预约成功!");
								}else{
									$msg.error(null,"请稍后重试!");
								}
							});
						});
					});
					//隐藏订单填写
					$close.click(function(){
						$orderBox.css("transform","translateX(100%)");
					});
					//当输入数量时,计算总价
					$amount.bind("input propertychange",function(){
						var price = $amount.data("price");
						var amount = $amount.val();
						var totalprice = parseInt(price)*amount;
						$total.html("参考总价："+"<i style='color:red;'>&yen;"+totalprice+"</i>");
					});
				})
			})
		})
	});
	
});