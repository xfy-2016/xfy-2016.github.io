// 移动端上下滑动切换屏幕
function SlidingAction(cur_page, page_count, obj_selector) {
	this.cur_page = cur_page;
	this.page_count = page_count;
	this.obj_selector = document.querySelector(obj_selector);
};
SlidingAction.prototype = {
	constructor: SlidingAction,
	canScroll: true, //避免连续滚动
	moveDown: function () {
		//向下滑
		if (this.cur_page == +this.page_count) {
			return;
		}
		this.cur_page++;
		this.canScroll = false;
	},
	moveUp: function () {
		//向上滑
		if (this.cur_page == 1) return;
		this.cur_page--;
		this.canScroll = false;
	},
	switching: function () {
		//切换页面
		var that = this;
		that.obj_selector.setAttribute('class', 'container slide_to_' + that.cur_page);
		that.canScroll = false;
	},
	slide: function silde(offset) {
		//处理滑动事件
		if (offset > 0) {
			//向上滑
			this.moveUp();
		} else if (offset < 0) {
			//向下滑
			this.moveDown();
		}
		if (offset != 0) {
			//如果有滑动，则需要切换页面
			this.switching();
		}
	},
	touch: function touch() {
		//移动端触屏
		var that = this;
		var touchFirst_obj = null;
		var ouchLast_obj = null;
		var moveY = 0;
		EventUtil.addHandler(document, 'touchstart', function (e) {
			e = EventUtil.getEvent(e);
			touchFirst_obj = {
				startY: e.touches[0].clientY
			};
		});
		EventUtil.addHandler(document, 'touchmove', function (e) {
			e = EventUtil.getEvent(e);
			EventUtil.preventDefault(e);
			touchLast_obj = e.touches[0];
			moveY = touchLast_obj.clientY - touchFirst_obj.startY;
		});
		EventUtil.addHandler(document, 'touchend', function (e) {
			e = EventUtil.getEvent(e);
			that.slide(moveY);
		});
	},
	getAverage: function getAverage(elements, number) {
		var sum = 0;
		//from https://github.com/alvarotrigo/fullPage.js
		//taking `number` elements from the end to make the average, if there are not enought, 1
		var lastElements = elements.slice(Math.max(elements.length - number, 1));

		for (var i = 0; i < lastElements.length; i++) {
			sum = sum + lastElements[i];
		}

		return Math.ceil(sum / number);
	},
	scrollListen: function () {
		//PC端滚动
		var that = this;
		var prevTime = new Date().getTime();
		var scrollings = [];

		EventUtil.addHandler(document, 'mousewheel', function (event) {
			event = EventUtil.getEvent();
			var value = EventUtil.getWheelDelta(event);
			var delta = Math.max(-1, Math.min(1, value));
			var curTime = new Date().getTime();
			if (scrollings.length > 149) {
				scrollings.shift();
			}
			scrollings.push(Math.abs(value));

			var timeDiff = curTime - prevTime;
			prevTime = curTime;

			if (timeDiff > 200) {
				scrollings = [];
				that.canScroll = true;
			}

			var averageEnd = that.getAverage(scrollings, 10);
			var averageMiddle = that.getAverage(scrollings, 70);
			var isAccelerating = averageEnd >= averageMiddle;

			//避免连续滑动
			if (that.canScroll) {
				if (isAccelerating) {
					that.slide(delta);
				}
			}
		});
	}
};