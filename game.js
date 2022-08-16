let { init, Sprite, GameLoop } = kontra;

let { canvas } = init();

let sprite = Sprite({
  x: 100,
  y: 80,
  color: "red",
  width: 20,
  height: 40,
  dx: 3,
});

let angel = Sprite({
  x: 200,
  y: 80,
  color: "white",
  width: 20,
  height: 40,
  dx: 1,
});

let loop = GameLoop({
  update: function() {
    sprite.update();
    angel.update();

    if (sprite.x > canvas.width) {
      sprite.x = -sprite.width;
    }
    if (angel.x > canvas.width) {
      angel.x = -angel.width;
    }
  },
  render: function() {
    sprite.render();
    angel.render();
  },
});

loop.start();
