function randomOf(num1, num2, num3) {
var rndm = Math.random() * 100;
if (rndm > 0 && rndm <= 10) {
  return num3;
}
if (rndm > 10 && rndm <= 50) {
  return num2;
}
if (rndm > 50) {
  return num1;
}
}

var sprite = {
  x: cv.width / 2,
  y: cv.height / 2,
  width: 50,
  height: 50
}

var map = {
  x: 0,
  y: 0,
  width: 50 * 50,
  height: 50 * 50
}

var mapGenerated = false;

var origin = {
x: 0,
y: 0
};

var centerOfMap = {
x: 0,
y: 0
};

function Tile(x, y, type) {
this.tileX = x;
this.tileY = y;
this.x = (x * 50);
this.y = (y * 50);
this.width = 50;
this.height = 50;
this.tsX = type;
this.tsY = 0;
this.image = bg.image;
}

function House(x, y, type) {
this.tileX = x;
this.tileY = y;
this.x = (x * 50);
this.y = (y * 50);
this.width = 50;
this.height = 50;
this.tsX = type;
this.tsY = 0;
this.image = houseSprite.image;
}

var tiles = [];

var xBlocks = 0;
var yBlocks = 0;
var blocksGenerated = 0;

function generateWorld() {
if (mapGenerated) return;
xBlocks ++;
if (yBlocks < 50) {tiles.push(new Tile(xBlocks, yBlocks, randomOf(0, 16, 17)));}
  if (xBlocks > 50 && yBlocks < 50) {
    yBlocks ++;
    xBlocks = 0;
  }
if (yBlocks > 49) {
mapGenerated = true;
}
if (yBlocks < 49) {
blocksGenerated ++;
}
}

setInterval(generateWorld, 1);

function loadSave() {
for (var i=0; i<tiles.length; i++) {
tiles[i].tsX = document.getElementById("savedataText").value.split(",")[i];
}
game.money = parseInt(document.getElementById("savedataText").value.split(",")[tiles.length]);
game.pop = parseInt(document.getElementById("savedataText").value.split(",")[tiles.length + 1]);

if (document.getElementById("savedataText").value.split(",")[tiles.length + 2]) game.started = true;
if (!document.getElementById("savedataText").value.split(",")[tiles.length + 2]) game.started = false;

if (document.getElementById("savedataText").value.split(",")[tiles.length + 3]) game.popHasRisen = true;
if (!document.getElementById("savedataText").value.split(",")[tiles.length + 3]) game.popHasRisen = false;

if (document.getElementById("savedataText").value.split(",")[tiles.length + 4]) game.over = true;
if (!document.getElementById("savedataText").value.split(",")[tiles.length + 4]) game.over = false;

inventory.lumber = parseInt(document.getElementById("savedataText").value.split(",")[tiles.length + 5]);
inventory.food = parseInt(document.getElementById("savedataText").value.split(",")[tiles.length + 6]);
month.dayOf = parseInt(document.getElementById("savedataText").value.split(",")[tiles.length + 7]);
month.num = parseInt(document.getElementById("savedataText").value.split(",")[tiles.length + 8]);

game.villname = "" + document.getElementById("savedataText").value.split(",")[tiles.length + 9] + "";
document.title = document.getElementById("savedataText").value.split(",")[tiles.length + 9] + " - VillageQuest";
game.over = false;
}
