var ytGameLayer = (function () {
	function ytGameLayer (car, place) {
		var s = this;
		LExtends(s, LSprite, []);

		s.choosedCar = car;
		s.choosedPlace = place;

		s.speed = 15;

		s.gameOver = false;

		s.stageLayer = new LSprite();
		s.addChild(s.stageLayer);

		s.background = new ytBackground(dataList[place]);
		s.background.speed = s.speed;
		s.stageLayer.addChild(s.background);

		s.carLayer = new ytCarLayer(car);
		s.stageLayer.addChild(s.carLayer);

		s.streetView = new ytStreetView(place);
		s.streetView.speed = s.speed;
		s.stageLayer.addChild(s.streetView);

		s.overLayer = new LSprite();
		s.addChild(s.overLayer);

		s.point = new ytPoint();
		s.point.x = s.point.y = 10;
		s.overLayer.addChild(s.point);

		s.pauseBtn = null;

		s.addPauseBtn();

		s.fadeIn();

		s.stageLayer.addEventListener(LMouseEvent.MOUSE_UP, s.mouseUp);
		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	ytGameLayer.prototype.fadeIn = function () {
		var s = this;

		var fadeLayer = new LSprite();
		fadeLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "black");
		fadeLayer.alpha = 1;
		s.overLayer.addChild(fadeLayer);

		LTweenLite.to(fadeLayer, 3, {
			alpha : 0,
			ease : Sine.easeIn,
			onComplete : function (o) {
				o.remove();
			}
		});
	};

	ytGameLayer.prototype.addPauseBtn = function () {
		var s = this,
		bmpd = dataList["button_pause_sheet"],
		list = LGlobal.divideCoordinate(bmpd.width, bmpd.height, 3, 1);

		var d = list[0][0];
		var normalBmpd = bmpd.clone();
		normalBmpd.setProperties(d.x, d.y, d.width, d.height);

		d = list[1][0];
		var overBmpd = bmpd.clone();
		overBmpd.setProperties(d.x, d.y, d.width, d.height);

		d = list[2][0];
		var downBmpd = bmpd.clone();
		downBmpd.setProperties(d.x, d.y, d.width, d.height);

		var normalBmp = new LBitmap(normalBmpd);
		var overBmp = new LBitmap(overBmpd);
		var downBmp = new LBitmap(downBmpd);

		s.pauseBtn = new LButton(normalBmp, overBmp, downBmp, downBmp.clone());
		s.pauseBtn.pause = false;
		s.pauseBtn.x = LGlobal.width - s.pauseBtn.getWidth();
		s.overLayer.addChild(s.pauseBtn);

		s.pauseBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
			s.pauseBtn.pause = !s.pauseBtn.pause;

			if (s.pauseBtn.pause) {
				s.pauseBtn.setState(LButton.STATE_DISABLE);
				s.pauseBtn.mouseEnabled = true;
			} else {
				s.pauseBtn.setState(LButton.STATE_ENABLE);
			}

			if (s.carLayer) {
				for (var i = 0, l = s.carLayer.numChildren; i < l; i++) {
					var o = s.carLayer.getChildAt(i), t = o.changeDirTween;
					
					if (t) {
						if (s.pauseBtn.pause) {
							t.pause();
						} else {
							t.resume();
						}
					}
				}
			}
		});
	};

	ytGameLayer.prototype.mouseUp = function (e) {
		var s = e.currentTarget.parent;

		if (!s.carLayer || !s.carLayer.car) {
			return;
		}

		if (s.pauseBtn && s.pauseBtn.pause) {
			return;
		}

		if (e.offsetX < LGlobal.width / 2) {
			s.carLayer.car.moveTo(0);
		} else {
			s.carLayer.car.moveTo(1);
		}
	};

	ytGameLayer.prototype.loop = function (e) {
		var s = e.currentTarget;

		if (s.gameOver) {
			return;
		}

		if (s.pauseBtn && s.pauseBtn.pause) {
			return;
		}
		
		if (s.streetView) {
			s.streetView.loop();
		}

		if (s.background) {
			s.background.loop();
		}

		if (s.carLayer) {
			var r = s.carLayer.loop();

			s.gameOver = r[0];

			if (s.gameOver) {
				s.pauseBtn.mouseEnabled = false;
				s.pauseBtn.setCursorEnabled(false);

				LTweenLite.removeAll();

				var explosion = new ytExplosion();
				explosion.x = r[1] - (explosion.getWidth() - r[3]) / 2;
				explosion.y = r[2] - (explosion.getHeight() - r[4]) / 2;
				s.overLayer.addChild(explosion);

				explosion.addEventListener(ytExplosion.EVENT_PLAY_OVER, function () {
					var resultBox = new ytResultBox(s.point.num);
					resultBox.x = (LGlobal.width - resultBox.getWidth()) / 2;
					resultBox.y = (LGlobal.height - resultBox.getHeight()) / 2;
					s.overLayer.addChild(resultBox);

					resultBox.addEventListener(ytResultBox.EVENT_CLICK_BUTTON, function (e) {
						if (e.msg == 0) {
							addGameInterface(s.choosedCar, s.choosedPlace);
						} else if (e.msg == 1) {
							addMenuInterface();
						} else if (e.msg == 2) {
							addOptionInterface();
						}

						s.remove();
					});
				});

				return;
			}
		}

		if (s.point) {
			s.point.loop();
		}
	};

	return ytGameLayer;
})();