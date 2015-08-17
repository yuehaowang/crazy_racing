var ytCarLayer = (function () {
	function ytCarLayer (carIndex) {
		var s = this;
		LExtends(s, LSprite, []);

		s.frameIndex = 0;
		s.frameMaxIndex = 70;

		s.carBmpd = dataList["cars_atlas"];

		s.indexToBmpdPropertiesList = null;

		s.car = null;

		s.initIndexToBmpdPropertiesList();

		s.addCar("player", carIndex, 0);
	}

	ytCarLayer.prototype.initIndexToBmpdPropertiesList = function () {
		var s = this, w = s.carBmpd.width, h = s.carBmpd.height;

		var l = LGlobal.divideCoordinate(w, h, 3, 5);

		s.indexToBmpdPropertiesList = {
			"player" : [
				l[0][0],
				l[1][0],
				l[1][3],
				l[0][3]
			],
			"obstacle" : [
				l[0][1],
				l[0][2],
				l[0][4],
				l[1][1],
				l[1][2],
				l[1][4],
				l[2][0],
				l[2][2],
				l[2][3],
				l[2][4]
			]
		};
	};

	ytCarLayer.prototype.addCar = function(group, index, pi, speed) {
		var s = this;

		var data = s.indexToBmpdPropertiesList[group][index];
		var car = new ytCar(s.carBmpd, data, pi);
		s.addChild(car);

		if (group == "player" && !s.car) {
			s.car = car;
			s.car.y = LGlobal.height - s.car.getHeight() - 20;
			s.car.addShape(LShape.RECT, [0, 18, s.car.getWidth(), 80]);
		} else {
			car.y = -200;
			car.speed = speed;

			if (index != 0 && index != 4) {
				car.addShape(LShape.RECT, [0, 18, s.car.getWidth(), 80]);
			}else if (index == 4) {
				car.addShape(LShape.RECT, [0, 0, s.car.getWidth(), 115]);
			}
		}
	};

	ytCarLayer.prototype.loop = function () {
		var s = this;

		s.changeObstacleCarPosition();

		s.addObstacleCar();

		return s.checkHit();
	};

	ytCarLayer.prototype.changeObstacleCarPosition = function () {
		var s = this, rml = new Array();

		for (var k = 1, l = s.numChildren; k < l; k++) {
			var o = s.getChildAt(k);

			if (o) {
				o.y += o.speed;

				if (Math.random() < 0.02) {
					if (!o.changeDirTween) {
						var toPosition = Math.round(Math.random()),
						cDir = o.dir,
						canMove = true,
						oSh = o.shapes.slice(0);

						o.x = o.roadPositionList[toPosition];

						o.clearShape();

						for (var j = 0; j < l; j++) {
							var oO = s.getChildAt(j), oOSh = oO.shapes.slice(0);

							if (oO.objectIndex == o.objectIndex) {
								continue;
							}

							oO.clearShape();

							if (j == 0) {
								var ox = oy = 60,
								ow = oO.getWidth() + ox * 2, 
								oh = oO.getHeight() + oy * 2;

								oO.addShape(LShape.RECT, [-ox, -oy, ow, oh]);
							}

							var hr = o.hitTestObject(oO);

							oO.shapes = oOSh;

							if (hr) {
								canMove = false;

								break;
							}
						}

						o.shapes = oSh;

						o.x = o.roadPositionList[cDir];

						if (canMove) {
							o.moveTo(toPosition, 1);
						}
					}
				}

				if (o.y >= LGlobal.height) {
					rml.push(o);
				}
			}
		}

		for (var i = 0, l = rml.length; i < l; i++) {
			rml[i].destroy();
		}
	};

	ytCarLayer.prototype.addObstacleCar = function () {
		var s = this;

		if (s.frameIndex++ > s.frameMaxIndex) {
			var l = s.indexToBmpdPropertiesList["obstacle"],
			index = Math.round(Math.random() * (l.length - 1)),
			pi = Math.round(Math.random()),
			speed = 5 + Math.floor(Math.random() * 3);

			s.addCar("obstacle", index, pi, speed);

			s.frameIndex = 0;
		}
	};

	ytCarLayer.prototype.checkHit = function () {
		var s = this;

		for (var k = 1, l = s.numChildren; k < l; k++) {
			var oA = s.getChildAt(k), shA = oA.shapes.slice(0);

			oA.clearShape();

			for (var i = 1; i < l; i++) {
				var oB = s.getChildAt(i), shB = oB.shapes.slice(0);

				if (oB.objectIndex == oA.objectIndex) {
					continue;
				}

				oB.clearShape();

				if (oB.speed != oA.speed && oA.hitTestObject(oB)) {
					if (oB.speed > oA.speed) {
						oB.speed = oA.speed;
					} else {
						oA.speed = oB.speed;
					}
				}

				oB.shapes = shB;
			}

			oA.shapes = shA;
		}

		if (s.car) {
			for (var j = 1, l = s.numChildren; j < l; j++) {
				var oC = s.getChildAt(j);

				if (s.car.hitTestObject(oC)) {
					var cx = s.car.x,
					cy = s.car.y,
					cw = s.car.getWidth(),
					ch = s.car.getHeight();

					s.car.destroy();

					return [true, cx, cy, cw, ch];
				}
			}
		}

		return [false];
	};

	return ytCarLayer;
})();