var ytHelpLayer = (function () {
	function ytHelpLayer () {
		var s = this;
		LExtends(s, LSprite, []);

		var backgroundBmp = new LBitmap(dataList["default_menu_background"]);
		backgroundBmp.scaleX = LGlobal.width / backgroundBmp.getWidth();
		backgroundBmp.scaleY = LGlobal.height / backgroundBmp.getHeight();
		s.addChild(backgroundBmp);

		var helpBmp = new LBitmap(dataList["help"]);
		helpBmp.y = 20;
		helpBmp.scaleX = helpBmp.scaleY = LGlobal.width / helpBmp.getWidth()
		s.addChild(helpBmp);

		s.addHelpTxt();
		s.addBtn();
	}

	ytHelpLayer.prototype.addHelpTxt = function () {
		var s = this,
		t = "Tap the X part of the screen to make the car move to the X road. \n \n (X ∈ {left, right}) \n \n Do I make sense?",
		tl = t.split(" ");

		var helpTxt = new LTextField();
		helpTxt._width = 0;
		helpTxt._preWidth = 0;
		helpTxt._maxWidth = LGlobal.width - 35;
		helpTxt.size = 15;
		helpTxt.color = "white";
		helpTxt.x = (LGlobal.width - helpTxt._maxWidth) * 0.5;
		helpTxt.y = 350;
		s.addChild(helpTxt);

		for (var i = 0; i < tl.length; i++) {
			var ot = helpTxt.text, ct = tl[i];

			helpTxt.text += ct;
			helpTxt._width = helpTxt.getWidth() - helpTxt._preWidth;

			if (helpTxt._width > helpTxt._maxWidth || ct == "\n") {
				helpTxt._width = 0;
				helpTxt._preWidth += helpTxt._maxWidth;

				if (ct != "\n") {
					helpTxt.text = ot + "\n" + ct;
				}
			}

			helpTxt.text += " ";
		}

		helpTxt.setWordWrap(true, 20);
		helpTxt.width = LGlobal.width;
	};

	ytHelpLayer.prototype.addBtn = function () {
		var s = this;

		var okTxt = new LTextField();
		okTxt.color = "white";
		okTxt.size = 20;
		okTxt.text = "Ok, I know~";
		okTxt.weight = "bold";
		var okBtn = new ytButton(2, [okTxt, "center", "middle"], [0.6, 0.6]);
		okBtn.x = (LGlobal.width - okBtn.getWidth()) * 0.5;
		okBtn.y = LGlobal.height - okBtn.getHeight() - 30;
		s.addChild(okBtn);
		okBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
			addMenuInterface();

			s.remove();
		});
	};

	return ytHelpLayer;
})();