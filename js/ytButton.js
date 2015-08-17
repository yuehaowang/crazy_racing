var ytButton = (function () {
	function ytButton (overStyle, contentLayerData, scale) {
		var s = this;
		LExtends(s, LSprite, []);

		var btnNormalBmpd = dataList["button_sheet"].clone();
		btnNormalBmpd.setProperties(0, 0, btnNormalBmpd.width, btnNormalBmpd.height / 3);
		var btnOverBmpd = dataList["button_sheet"].clone();
		btnOverBmpd.setProperties(0, btnOverBmpd.height / 3 * overStyle, btnOverBmpd.width, btnOverBmpd.height / 3);

		var btnNormalBmp = new LBitmap(btnNormalBmpd);
		btnNormalBmp.scaleX = scale[0] || 1;
		btnNormalBmp.scaleY = scale[1] || 1;
		var btnOverBmp = new LBitmap(btnOverBmpd);
		btnOverBmp.scaleX = scale[0] || 1;
		btnOverBmp.scaleY = scale[1] || 1;

		var contentLayer = contentLayerData[0].clone();
		if (contentLayerData[1] == "center"){
			contentLayer.x = (btnNormalBmp.getWidth() - contentLayer.getWidth()) / 2;
		}		
		if (contentLayerData[2] == "middle"){
			contentLayer.y = (btnNormalBmp.getHeight() - contentLayer.getHeight()) / 2;
		}

		var btnNormalLayer = new LSprite();
		btnNormalLayer.addChild(btnNormalBmp.clone());
		btnContentLayer = contentLayer.clone();
		btnNormalLayer.addChild(contentLayer.clone());

		var btnOverLayer = new LSprite();
		btnOverLayer.addChild(btnOverBmp.clone());
		btnOverLayer.addChild(contentLayer.clone());

		var btn = new LButton(btnNormalLayer, btnOverLayer);
		s.addChild(btn);
	}

	return ytButton;
})();