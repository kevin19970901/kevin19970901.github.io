var vllgrSprite = {
  loaded: false,
  image: new Image()
}
vllgrSprite.image.src = "textures/villager.png";
vllgrSprite.image.onload = function() {vllgrSprite.loaded = true;};

function Villager(x, y) {
this.x = x;
this.y = y;
this.width = 3;
this.height = 6;
}

var villagers = [];

function vllgrspawn() {
/*
if (villagers.length < game.pop) {
  villagers.push(
    new Villager(
      50 + Math.round(Math.random() * 500),
      Math.round(Math.random() * 500)
    )
  );
}
*/
}