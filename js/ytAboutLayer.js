var ytAboutLayer = (function () {
	function ytAboutLayer () {
		var s = this;
		LExtends(s, LSprite, []);

		var backgroundBmp = new LBitmap(dataList["default_menu_background"]);
		backgroundBmp.scaleX = LGlobal.width / backgroundBmp.getWidth();
		backgroundBmp.scaleY = LGlobal.height / backgroundBmp.getHeight();
		s.addChild(backgroundBmp);

		s.txtLayer = new LSprite();
		s.txtLayer.y = 20;
		s.addChild(s.txtLayer);

		s.addAboutTxt();
		s.addBtn();
	}

	ytAboutLayer.prototype.addAboutTxt = function () {
		var s = this;

		var txtTemplate = new LTextField();
		txtTemplate._width = 0;
		txtTemplate._preWidth = 0;
		txtTemplate._maxWidth = LGlobal.width - 40;
		txtTemplate.x = (LGlobal.width - txtTemplate._maxWidth) * 0.5;
		txtTemplate.size = 15;
		txtTemplate.color = "white";

		var txtList = [
			"A: I wonder who the programmer of this game is?",
			"Y: Me, I'm Yuehao.",
			"A: Ok, where is the material from?",
			"Y: To be honest, the material is from the Internet. I think I need to say 'thanks' to these authors.",
			"A: And would you mind tell me some technical information about this game?",
			"Y: Not at all. This game is based on HTML5 and HTML5 game engine lufylegend.js.",
			"A: Oh~ That's interesting."
		];

		for (var k = 0; k < txtList.length; k++) {
			var t = txtList[k], tl = t.split(" ");

			var txt = txtTemplate.clone();
			txt.visible = (k == 0) ? true : false;
			s.txtLayer.addChild(txt);
			
			for (var i = 0; i < tl.length; i++) {
				var ot = txt.text;

				txt.text += tl[i];
				txt._width = txt.getWidth() - txt._preWidth;

				if (txt._width > txt._maxWidth) {
					txt._width = 0;
					txt._preWidth += txt._maxWidth;
					txt.text = ot + "\n" + tl[i];
				}

				txt.text += " ";
			}

			delete txt._width;
			delete txt._preWidth;

			txt.setWordWrap(true, 25);
			txt.width = LGlobal.width;

			txt.wind();

			txt.addEventListener(LTextEvent.WIND_COMPLETE, function (e) {
				var o = e.currentTarget,
				ind = o.parent.getChildIndex(o),
				nxtO = o.parent.getChildAt(++ind);

				if (nxtO) {
					nxtO.y = nxtO.parent.getHeight() + 15;

					nxtO.visible = true;
				}
			});
		}
	};

	ytAboutLayer.prototype.addBtn = function () {
		var s = this;

		var backTxt = new LTextField();
		backTxt.color = "white";
		backTxt.size = 20;
		backTxt.text = "Back to Menu";
		backTxt.weight = "bold";
		var backBtn = new ytButton(2, [backTxt, "center", "middle"], [0.6, 0.6]);
		backBtn.x = (LGlobal.width - backBtn.getWidth()) * 0.5;
		backBtn.y = LGlobal.height - backBtn.getHeight() - 40;
		s.addChild(backBtn);
		backBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
			addMenuInterface();

			s.remove();
		});
	};

	return ytAboutLayer;
})();