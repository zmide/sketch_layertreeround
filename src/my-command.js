var sketch = require("sketch");

var document = sketch.getSelectedDocument();

var selectedLayers = document.selectedLayers;
var selectedCount = selectedLayers.length;

if (selectedCount === 0) {
  // console.log('未选中图层…')
  sketch.UI.message("💁未选中图层，请选择一个你想处理的图层…");
} else {
  sketch.UI.getInputFromUser(
    "😋请输入副本之间的间距：",
    {
      initialValue: 50,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return;
      } else if (parseInt(value)) {
        // console.log('Selected layers:',selectedLayers.layers[0].parent);
        var spacing = parseInt(value) || 50;
        const a = selectedLayers.layers[0];
        const name = a.name;
        var w = a.frame.width;
        var h = a.frame.height;
        var x = a.frame.x;
        var y = a.frame.y;
        for (let i = (w < h ? w : h) - spacing; i >= 0; i -= spacing) {
          a.duplicate();

          //     if(x <= 0) x += spacing / 2; else x -= spacing / 2;
          //     if(y <= 0) y += spacing / 2; else y -= spacing / 2;

          x += spacing / 2;
          y += spacing / 2;

          a.frame.x = x;
          a.frame.y = y;
          a.frame.width = w -= spacing;
          a.frame.height = h -= spacing;
          a.name = name + "_" + i;
          // console.log(i);
        }

        sketch.UI.message("✌️处理成功，如果遇到问题请联系开发者");
      } else {
        sketch.UI.message("👀可能你输入的不是数字。");
      }
    }
  );
}
