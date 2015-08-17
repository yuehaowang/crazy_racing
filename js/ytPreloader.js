var ytPreloader = (function () {
	function ytPreloader () {
		var s = this;
		LExtends(s, LSprite, []);

		var backgroundBmp = new LBitmap(dataList["preloader_background"]);
		backgroundBmp.x = -130;
		backgroundBmp.y = -100;
		s.addChild(backgroundBmp);

		var m = 40;
		var progressBackgroundBmp = new LBitmap(dataList["preloader_bar_background"]);
		progressBackgroundBmp.scaleX = (LGlobal.width - m) / progressBackgroundBmp.getWidth();
		progressBackgroundBmp.x = m / 2;
		progressBackgroundBmp.y = LGlobal.height - progressBackgroundBmp.getHeight() - m;
		s.addChild(progressBackgroundBmp);

		s.progressBmp = new LBitmap(dataList["preloader_bar"]);
		s.progressBmp.scaleX = progressBackgroundBmp.scaleX;
		s.progressBmp.x = progressBackgroundBmp.x;
		s.progressBmp.y = progressBackgroundBmp.y;
		s.addChild(s.progressBmp);

		s.progressMask = new LSprite();
		s.progressMask.x = s.progressBmp.x;
		s.progressMask.y = s.progressBmp.y
		s.progressMask.graphics.drawRect(0, "", [0, 0, 0, s.getHeight()]);

		s.progressBmp.mask = s.progressMask;
	}

	ytPreloader.prototype.setProgress = function (p) {
		var s = this,
		pb = s.progressBmp,
		w = pb.getWidth() * (p / 100);

		s.progressMask.graphics.drawRect(0, "", [0, 0, w,pb.getHeight()]);
	};

	return ytPreloader;
})();