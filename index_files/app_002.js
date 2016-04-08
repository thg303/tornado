(function (Sample1, Ractive) {
  'use strict';

  var app = new Ractive({
    el: '#app',
    template: '#template',
    data: {
      content: 'type something...',
      lastPosition: null,
    }
  });

  var moveFunc = function (dx, dy, x, y) {
    var deltaX = x - app.data.lastPosition.x;
    var deltaY = y - app.data.lastPosition.y;
    app.data.lastPosition.x = x;
    app.data.lastPosition.y = y;
    this[0].attr({
      x: parseInt(this[0].attr().x) + deltaX,
      y: parseInt(this[0].attr().y) + deltaY
    });
  };

  app.on('addText', function () {
    var s = new Snap('#canvas');
    var groupped = new Snap(500, 400);

    var block = s.rect(50, 50, 100, 100, 20, 20);
    block.attr({
      fill: '#c2ff00',
      stroke: 'black',
      strokeWidth: 3
    });

    var text = s.text(70, 130, app.data.content);
    block.attr({
      width: (text.getBBox().width + 50),
      height: (text.getBBox().height + 50)
    });
    text.attr({
      id: 'mytext',
      'dominant-baseline': 'text-before-edge',
      x: parseInt(block.attr().x) + (block.attr().width / 2) - (text.getBBox().width / 2),
      y: parseInt(block.attr().y) + (block.attr().height / 2) - (text.getBBox().height / 2),
    });

    groupped.attr({ x: 0, y: 0});
    groupped.add(block);
    groupped.add(text);

    //because <g> does not support x or y but <svg> does
    var g = s.g(groupped);
    g.attr({
      class: 'movable',
    });

    g.drag(moveFunc,
      function (x, y) {
        app.data.lastPosition = {
          x: x,
          y: y
        };
      },
      function () {
        console.log('move stopped!');
      });

  });

  app.on('magic', function () {
    var text = new Snap('#mytext');
    console.log(text.attr());
    //text.attr({x: (parseInt(text.attr().x)+30) });
  });

  Sample1.ractives.app = app;

})(window.Sample1, Ractive);
