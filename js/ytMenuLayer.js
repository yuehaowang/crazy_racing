var ytMenuLayer = (function () {
	function ytMenuLayer () {
		var s = this;
		LExtends(s, LSprite, []);

		var backgroundBmp = new LBitmap(dataList["default_menu_background"]);
		backgroundBmp.scaleX = LGlobal.width / backgroundBmp.getWidth();
		backgroundBmp.scaleY = LGlobal.height / backgroundBmp.getHeight();
		s.addChild(backgroundBmp);

		s.btnLayer = new LSprite();
		s.addChild(s.btnLayer);

		s.addBtns()
	}

	ytMenuLayer.prototype.addBtns = function () {
		var s = this;

		var txtTemplate = new LTextField();
		txtTemplate.weight = "bold";
		txtTemplate.size = "25";
		txtTemplate.color = "white";
		txtTemplate.filters = [new LDropShadowFilter(null, null, "white", 15)];

		var btnList = ["START", "HELP", "ABOUT"];

		for (var k = 0; k < btnList.length; k++) {
			var t = btnList[k];

			var txt = txtTemplate.clone();
			txt.text = t;

			var btn = new ytButton(1, [txt, "center", "middle"], [0.8, 0.8]);
			btn.y = k * (btn.getHeight() + 20);
			s.btnLayer.addChild(btn);

			if (k == 0) {
				btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
					s.remove();

					addOptionInterface();
				});
			} else if (k == 1) {
				btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
					s.remove();

					addHelpInterface();
				});
			} else if (k == 2) {
				btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
					s.remove();

					addAboutInterface();
				});
			}
		}

		s.btnLayer.x = (LGlobal.width - s.btnLayer.getWidth()) * 0.5;
		s.btnLayer.y = (LGlobal.height - s.btnLayer.getHeight()) * 0.5;
	};

	return ytMenuLayer;
})();