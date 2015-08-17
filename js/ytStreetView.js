var ytStreetView = (function () {
	function ytStreetView (place) {
		var s = this;
		LExtends(s, LSprite, []);

		s.place = place;
		
		s.speed = 0;

		s.initY = -300;

		s.frameIndex = 0;
		s.frameMaxIndex = 50;

		s.streetViewLayer = new LSprite();
		s.addChild(s.streetViewLayer);

		s.addStartStreetView();
	}

	ytStreetView.StreetViewList = {
		"street_canyon" : [
			{dx : 580, dy : 0, width : 70, height : 110, lx : 40, rx : 30},
			{dx : 580, dy : 140, width : 70, height : 70, lx : 50, rx : 40}
		],
		"street_city" : [
			{dx : 210, dy : 260, width : 180, height : 200, lx : -20, rx : -35},
			{dx : 525, dy : 530, width : 55, height : 55, lx : 10, rx : 10}
		],
		"street_desert" : [
			{dx : 455, dy : 465, width : 65, height : 110, lx : 10, rx : 10},
			{dx : 455, dy : 610, width : 70, height : 90, lx : 10, rx : 10}
		],
		"street_grass" : [
			{dx : 205, dy : 490, width : 120, height : 155, lx : -10, rx : -10},
			{dx : 360, dy : 615, width : 90, height : 90, lx : 15, rx : 5}
		],
		"street_snow" : [
			{dx : 35, dy : 530, width : 145, height : 190, lx : 0, rx : -10}
		],
		"street_water" : [
			{dx : 360, dy : 450, width : 100, height : 140, lx : 60, rx : 20},
			{dx : 210, dy : 675, width : 100, height : 100, lx : 50, rx : 20}
		]
	};

	ytStreetView.prototype.addStartStreetView = function () {
		var s = this;

		var bmpd = dataList["misc_atlas"].clone();
		bmpd.setProperties(0, 0, 520, 130);
		var bmp = new LBitmap(bmpd);
		bmp.scaleX = bmp.scaleY = 0.78;
		bmp.y = s.initY;
		s.streetViewLayer.addChild(bmp);
	};

	ytStreetView.prototype.addStreetViewAsPlace = function () {
		var s = this, streetViewList = ytStreetView.StreetViewList[s.place];

		if (streetViewList) {
			var item = streetViewList[Math.round(Math.random() * (streetViewList.length - 1))];

			var bmpd = dataList["misc_atlas"].clone();
			bmpd.setProperties(item.dx, item.dy, item.width, item.height);
			var bmp = new LBitmap(bmpd);
			bmp.scaleX = bmp.scaleY = 0.78;
			bmp.x = (Math.random() < 0.5) ? item.lx : (LGlobal.width - bmp.getWidth() - item.rx);
			bmp.y = s.initY;
			s.streetViewLayer.addChild(bmp);
		}
	};

	ytStreetView.prototype.loop = function () {
		var s = this, rml = new Array();

		for (var i = 0, l = s.streetViewLayer.numChildren; i < l; i++) {
			var o = s.streetViewLayer.getChildAt(i);
			o.y += s.speed;

			if (o.y > LGlobal.height) {
				rml.push(o);
			}
		}

		for (var k = 0, l = rml.length; k < l; k++) {
			rml[k].remove();
		}

		if (s.frameIndex++ > s.frameMaxIndex) {
			s.addStreetViewAsPlace();

			s.frameIndex = 0;
		}
	};

	return ytStreetView;
})();