var dropdown = {
  x: 0,
  y: 0,
  width: 75,
  height: 75,
  down: false,
  item: 0
}

var buyDelay1 = 10;
var buyDelay2 = 10;

function menu() {
/*
if (49 in keysDown) {dropdown.item = 0;}
if (50 in keysDown) {dropdown.item = 1;}
if (51 in keysDown) {dropdown.item = 2;}
if (52 in keysDown) {dropdown.item = 3;}
if (53 in keysDown) {dropdown.item = 4;}
if (54 in keysDown) {dropdown.item = 5;}
if (55 in keysDown) {dropdown.item = 6;}
*/
if (56 in keysDown && buyDelay1 < 1 && game.money > 9) {inventory.lumber += 30; game.money -= 10; buyDelay1 = 10;}
if (57 in keysDown && buyDelay2 < 1 && game.money > 9) {inventory.food += 100; game.money -= 10; buyDelay2 = 10;}


if (mouse.down && isNormColliding(mouse, block0)) dropdown.item = 0;
if (mouse.down && isNormColliding(mouse, block1)) dropdown.item = 1;
if (mouse.down && isNormColliding(mouse, block2)) dropdown.item = 2;
if (mouse.down && isNormColliding(mouse, block3)) dropdown.item = 3;
if (mouse.down && isNormColliding(mouse, block4)) dropdown.item = 4;
if (mouse.down && isNormColliding(mouse, block5)) dropdown.item = 5;
if (mouse.down && isNormColliding(mouse, block6)) dropdown.item = 6;
if (mouse.down && isNormColliding(mouse, block7)) dropdown.item = 7;
if (mouse.down && isNormColliding(mouse, block8)) dropdown.item = 8;
if (mouse.down && isNormColliding(mouse, block9)) dropdown.item = 9;
if (mouse.down && isNormColliding(mouse, block10)) dropdown.item = 10;
if (mouse.down && isNormColliding(mouse, block11)) dropdown.item = 11;
if (mouse.down && isNormColliding(mouse, block12)) dropdown.item = 12;
if (mouse.down && isNormColliding(mouse, block13)) dropdown.item = 13;
if (mouse.down && isNormColliding(mouse, block14)) dropdown.item = 14;
if (mouse.down && isNormColliding(mouse, block15)) dropdown.item = 15;
if (mouse.down && isNormColliding(mouse, block16)) dropdown.item = 16;
if (mouse.down && isNormColliding(mouse, block17)) dropdown.item = 17;

/*
if (81 in keysDown) {dropdown.item = 9;}
if (87 in keysDown) {dropdown.item = 10;}
if (69 in keysDown) {dropdown.item = 11;}
if (82 in keysDown) {dropdown.item = 12;}
if (84 in keysDown) {dropdown.item = 13;}
if (89 in keysDown) {dropdown.item = 14;}
if (85 in keysDown) {dropdown.item = 15;}
*/
buyDelay1 --;
buyDelay2 --;
}
setInterval(menu, 10);