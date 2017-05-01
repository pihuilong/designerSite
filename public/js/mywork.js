$(function(){
	$(".typeMenu").each(function(i,item){
		var typeID = $(this).data("typeid");
		var $content = $("#da-thumbs");
		$(this).click(function(){
			$._ajax({
				url : "/home/towork",
				data : {"typeID":typeID}
			}).then(function(html){
				$content.html(html);
			})
		})
	});
	
});
