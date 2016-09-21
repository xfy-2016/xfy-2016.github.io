$(function() {
	var UA = navigator.userAgent;
	var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/)),
		isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/)),
		isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/)),
		isMobile = !!(isIphone || isAndroid);
	var CLICK = isMobile ? "touch" : 'scroll';
	var part = 5; //页面有几个部分

	$("#nav-section-1").prop("checked", true);
	$("input[name='nav-section']").change(function() {
		var id = this.id.slice(-1);
		$(".container").attr("class", "container slide_to_" + id);
		if(id == part) { // 说明是最后一页,则隐蔽箭头
			$(".arrow").hide();
		} else {
			$(".arrow").show();
		}
	});

	var className = isMobile ? "mobile" : "pc";
	$("html").addClass(className);
	
	var action = new SlidingAction(1, 30, part, '.container');
	isMobile? action.touch():action.scrollListen();

});