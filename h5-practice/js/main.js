(function(){
	// 移动适配
	window.onload = window.onresize = function(){
	    pageResponse({
	        selectors : '.content',     //模块选择器，使用querySelectorAll的方法
	        mode : 'cover',     // auto || contain || cover ，默认模式为auto 
	        width : '640',      //输入页面的宽度，只支持输入数值，默认宽度为320px
	        height : '1008'      //输入页面的高度，只支持输入数值，默认高度为504px
	    });
    	// 加载完首屏图片并且移动适配脚本执行后首屏可见
    	function loadImage(url,callback) {       
    	    var img =new Image();  
    	    img.onload =function(){  
    	        img.onload =null;  
    	        callback(img);  
    	    }  
    	    img.src = url;
    	    return img;  
    	}
    	loadImage("./images/package.png", function(img){
    		loadImage("./images/p1_congratulations.png",function(img){
    			loadImage("./images/p1_bg.jpg",function(img){
    				if (img.complete) {
    					var container = document.querySelector('.container');
    					container.style.display = "block";
    				}
    			});
    		});
    	});
	}
	// 判断UA
	var UA = navigator.userAgent;
	var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/)),
		isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/)),
		isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/)),
		isMobile = !!(isIphone || isAndroid);
	var CLICK = isMobile ? "touch" : 'scroll';

	var action = new SlidingAction(1, 6, '.container');
	isMobile? action.touch():action.scrollListen();

	// 第四页弹窗部分，防止弹窗事件和滑动事件冲突
	var page4 = document.querySelector(".page4");
	var p4_more = document.querySelectorAll(".p4_comment-more");
	var p4_mask = document.querySelector(".p4_mask");
	var p4_alert = document.querySelector(".p4_alert");
	var p4_close = document.querySelector(".p4_alert-close");
	EventUtil.addHandler(p4_more[0], 'touchstart', function(e) {
		var e = EventUtil.getEvent(e);
		EventUtil.stopPropagation(e);
		page4.setAttribute('class', 'page page4 maskshow');
	});
	EventUtil.addHandler(p4_more[0], 'touchend', function(e) {
		var e = EventUtil.getEvent(e);
		EventUtil.stopPropagation(e);
	});
	EventUtil.addHandler(p4_more[1], 'touchstart', function(e) {
		var e = EventUtil.getEvent(e);
		EventUtil.stopPropagation(e);
		page4.setAttribute('class', 'page page4 maskshow');
	});
	EventUtil.addHandler(p4_more[1], 'touchend', function(e) {
		var e = EventUtil.getEvent(e);
		EventUtil.stopPropagation(e);
	});
	EventUtil.addHandler(p4_close, 'touchstart', function(e) {
		page4.setAttribute('class', 'page page4');
	});
	EventUtil.addHandler(p4_close, 'touchend', function(e) {
		var e = EventUtil.getEvent(e);
		EventUtil.stopPropagation(e);
	});
	EventUtil.addHandler(p4_alert, 'touchend', function(e) {
		var e = EventUtil.getEvent(e);
		EventUtil.stopPropagation(e);
	});
	EventUtil.addHandler(p4_mask, 'touchend', function(e) {
		var e = EventUtil.getEvent(e);
		EventUtil.stopPropagation(e);
	});
})()
