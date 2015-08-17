var ytExplosion = (function () {
	function ytExplosion () {
		var s = this,
		bmpd = dataList["explosion"].clone(),
		list = LGlobal.divideCoordinate(bmpd.width, bmpd.height, 4, 4);
		LExtends(s, LAnimationTimeline, [bmpd, list]);

		s.bitmap.rotate = 90;
		
		s.scaleX = s.scaleY = 1.5;

		s.speed = 1;

		s.currentLabel = 0;

		s.setLabel(0, 0, 0, 1, false);
		s.setLabel(1, 1, 0, 1, false);
		s.setLabel(2, 2, 0, 1, false);
		s.setLabel(3, 3, 0, 1, false);
		s.setLabel(4, 3, 2, -1, false);
		s.setLabel(5, 2, 3, -1, false);
		s.setLabel(6, 1, 3, -1, false);
		s.setLabel(7, 0, 3, -1, false);

		s.gotoAndPlay(s.currentLabel);

		s.addEventListener(LEvent.COMPLETE, function () {
			if (++s.currentLabel <= 7) {
				s.gotoAndPlay(s.currentLabel);
			} else {
				s.dispatchEvent(ytExplosion.EVENT_PLAY_OVER);

				s.remove();
			}
		});
	}

	ytExplosion.EVENT_PLAY_OVER = "event_play_over";

	return ytExplosion;
})();