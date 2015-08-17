var ytPoint = (function () {
	function ytPoint () {
		var s = this;
		LExtends(s, LSprite, []);

		s.numBmpd = dataList["numbers"];

		s.frameIndex = 0;
		s.maxFrameIndex = 2;

		s.num = 0;

		s.numToBmpdPropertiesList = {
			"m" : {x : 0, y : 0, width : 105, height : 55},
			"0" : {x : 0, y : 55, width : 85, height : 80},
			"1" : {x : 250, y : 0, width : 40, height : 80},
			"2" : {x : 85, y : 215, width : 85, height : 80},
			"3" : {x : 85, y : 55, width : 85, height : 80},
			"4" : {x : 170, y : 0, width : 80, height : 80},
			"5" : {x : 0, y : 215, width : 85, height : 80},
			"6" : {x : 85, y : 135, width : 85, height : 78},
			"7" : {x : 170, y : 135, width : 85, height : 78},
			"8" : {x : 170, y : 215, width : 85, height : 80},
			"9" : {x : 0, y : 135, width : 85, height : 80}
		};

		s.update(s.num);
	}

	ytPoint.prototype.update = function () {
		var s = this,
		point = s.num + "m",
		strArray = point.split(""),
		ntbpl = s.numToBmpdPropertiesList;

		s.removeAllChild();

		for (var k = 0, l = strArray.length, bmpX = 0; k < l; k++) {
			var t = strArray[k],
			d = ntbpl[t],
			bmpd = s.numBmpd.clone();
			
			bmpd.setProperties(d.x, d.y, d.width, d.height);

			var numBmp = new LBitmap(bmpd);
			numBmp.x = bmpX;
			numBmp.scaleX = numBmp.scaleY = 0.5;
			s.addChild(numBmp);

			if (k >= l - 1) {
				numBmp.x += 10;
				numBmp.y = (s.getHeight() - numBmp.getHeight()) * 0.5;
			}

			bmpX += numBmp.getWidth();
		} 
	};

	ytPoint.prototype.loop = function () {
		var s = this;

		if (s.frameIndex++ > s.maxFrameIndex) {
			s.num++;

			s.update();

			s.frameIndex = 0;
		}
	};

	return ytPoint;
})();