var ytBackground = (function () {
	function ytBackground (bitmapData) {
		var s = this;
		LExtends(s, LSprite, []);

		s.speed = 0;

		s.placeBmp = new LBitmap(bitmapData);
		s.placeBmp.scaleX = LGlobal.width / s.placeBmp.getWidth();
		s.placeBmp.scaleY = s.placeBmp.scaleX;

		s.addInitBackground();
	}

	ytBackground.prototype.addInitBackground = function () {
		var s = this;

		while (s.getHeight() < LGlobal.height) {
			var bg = s.placeBmp.clone();
			bg.y = s.getHeight();
			s.addChild(bg);
		}
	};

	ytBackground.prototype.loop = function () {
		var s = this, rml = new Array();

		if (s.startY() >= 0) {
			var bg = s.placeBmp.clone();
			bg.y = s.startY() - bg.getHeight();
			s.addChild(bg);
		}

		for (var i = 0, l = s.numChildren; i < l; i++) {
			var o = s.getChildAt(i);
			
			if (o) {
				o.y += s.speed;

				if (o.y > LGlobal.height) {
					rml.push(o);
				}
			}
		}

		for (var k = 0, l = rml.length; k < l; k++) {
			rml[k].remove();
		}
	};

	return ytBackground;
})();