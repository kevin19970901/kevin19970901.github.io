function isColliding(ob1, ob2) { // For an object and an object in the area OPS
 if (
    ob1.x < (ob2.x + ob2.width) + origin.x &&
    ob1.x + ob1.width > ob2.x + origin.x &&
    ob1.y < (ob2.y + ob2.height) + origin.y &&
    ob1.y + ob1.height > ob2.y + origin.y
  ) {
    return true;
  }
else {return false;}
}

function isNormColliding(ob1, ob2) { // For an object and an object
 if (
    ob1.x < (ob2.x + ob2.width) &&
    ob1.x + ob1.width > ob2.x  &&
    ob1.y < (ob2.y + ob2.height) &&
    ob1.y + ob1.height > ob2.y
  ) {
    return true;
  }
else {return false;}
}

function isOnScreen(obj) {
 if (
    0 < (obj.x + obj.width) + origin.x &&
    cv.width > obj.x + origin.x &&
    0 < (obj.y + obj.height) + origin.y &&
    cv.height > obj.y + origin.y
  ) {
    return true;
  }
else {return false;}
}

var mouse = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    down: false,
    state: 0
}

window.addEventListener('mousedown', function(e) {
    mouse.down = true;
});
window.addEventListener('mouseup', function(e) {
    mouse.down = false;
});
window.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX - canvas.offsetLeft;
    mouse.y = e.clientY - canvas.offsetTop;
});

var bg = {
  loaded: false,
  image: new Image(),
  width: 50,
  height: 50,
  x: 0,
  y: 0
}
bg.image.src = "textures/" + lightMode + "_tiles.png";
bg.image.onload = function() {
  bg.loaded = true;
}

var balanceColor = "Black";

var gameOverTrans = 0;

var blockNames = ["草地", "泥土", "沙地", "水域", "石磚", "紅磚", "房屋", "房屋", "房屋", "木橋", "木橋", "木橋", "木橋", "木橋", "木橋", "木橋路口", "樹木", "樹木"];
var blockColors = ["#00E000", "#974800", "#EFA677", "#00C5FF", "#B0B0B0", "#C05323", "#A95000", "#A95000", "#A95000", "#678278", "#678278", "#678278", "#678278", "#678278", "#678278", "#678278", "#0FBD00", "#02CB00"];

var helpOn = false;

var flashState = 0;
var flashAlpha = 0;

var graphMode = false;


var minimap = {
  x: 1065,
  y: 297
}


function render() {
//LOADSCREEN
if (!mapGenerated) {
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = "White";
  ctx.fillRect(cv.width / 2 - 50, cv.height / 2 - 5, 100, 10);
var loadGrad = ctx.createLinearGradient(608, 269, 608, 278);
loadGrad.addColorStop(0, "#00BF00");
loadGrad.addColorStop(1, "#008000");
ctx.fillStyle = loadGrad;
  ctx.fillRect(cv.width / 2 - 50, cv.height / 2 - 5, blocksGenerated / 25, 10);
  ctx.fillStyle = "White";
ctx.font = "12pt Arial";
ctx.textBaseline = "top";
ctx.fillText("遊戲載入進度：" + blocksGenerated / 25 + "%", cv.width / 2 - 50, cv.height / 2 + 10);
ctx.fillText(blocksGenerated + "／2500甲土地探勘中", cv.width / 2 - 50, cv.height / 2 + 25);

ctx.font = "72pt Cambria";
var titleGrad = ctx.createLinearGradient(658, 99, 658, 177);
titleGrad.addColorStop(0, "#FFD500");
titleGrad.addColorStop(1, "#665300");
ctx.fillStyle = titleGrad;
ctx.fillText("放逐者傳記", 400, 75);
}

if (!mapGenerated) return;

bg.image.src = "textures/" + lightMode + "_tiles.png";
waterSrc.image.src = "textures/" + lightMode + "_waterSrc.png";
houseSprite.image.src = "textures/" + lightMode + "_houses.png";

ctx.fillStyle = "Black";
ctx.fillRect(0, 0, cv.width, cv.height);
for (var i=0; i<tiles.length; i++) {
		if (isOnScreen(tiles[i])) {
		ctx.drawImage(
			tiles[i].image,
			tiles[i].tsX * 50,
			season * 50, 
			tiles[i].width,
			tiles[i].height,
			origin.x + (tiles[i].tileX * 50),
			origin.y + (tiles[i].tileY * 50),
			tiles[i].width,
			tiles[i].height
		);
		}
}
if (waterSrc.loaded) {
ctx.drawImage(
			waterSrc.image,
			waterSrc.type,
			season * 50, 
			waterSrc.width,
			waterSrc.height,
			waterSrc.x + origin.x,
			waterSrc.y + origin.y,
			waterSrc.width,
			waterSrc.height
		);
}

/*
for (var i=0; i<villagers.length; i++) {
  if (vllgrSprite.loaded && isOnScreen(villagers[i])) {
    ctx.drawImage(
      vllgrSprite.image,
      villagers[i].x + origin.x,
      villagers[i].y + origin.y
    );
  }
}
*/

//SELECTOR

if (flashState == 0) flashAlpha += 0.025;
if (flashState == 1) flashAlpha -= 0.025;
if (flashAlpha > 0.75) flashState = 1;
if (flashAlpha < 0.05) flashState = 0;

for (var i=0; i<tiles.length; i++) {
if (isColliding(mouse, tiles[i])) {
ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
ctx.strokeRect(tiles[i].x + origin.x, tiles[i].y + origin.y, 50, 50);
}
if (isColliding(mouse, tiles[i]) && 16 in keysDown) {
ctx.fillStyle = "Black";
ctx.font = "10pt Arial";
ctx.textBaseline = "top";
ctx.fillText("X: " + tiles[i].x, tiles[i].x + origin.x, tiles[i].y + origin.y);
ctx.fillText("Y: " + tiles[i].y, tiles[i].x + origin.x, tiles[i].y + origin.y + 12.5);
ctx.fillText(blockNames[tiles[i].tsX], tiles[i].x + origin.x, tiles[i].y + origin.y + 25);
}
}

//HUD



ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(0, 0, cv.width, 75);
ctx.strokeRect(0, 0, cv.width, 75);
ctx.strokeRect(1, 1, cv.width - 1, 73);
ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(0, 0, 75, 75);

ctx.fillStyle = "White";
ctx.fillRect(75, 0, cv.width - 75, 75);
ctx.fillStyle = "Black";
ctx.font = "12pt Arial";
ctx.textBaseline = "top";
ctx.fillText("人口：" + game.pop, 75, 5);
ctx.fillStyle = balanceColor;
ctx.fillText("存款：" + game.money + "元", 75, 20);
ctx.fillStyle = "Black";
if (helpOn) {
ctx.fillText("單擊下面的圖示更換欲建築的方塊，滑鼠左鍵放置方塊。", 75, 35);
ctx.fillText("地圖中心有一口井，點擊後命名村莊即可開始遊戲，如此一來便可建造房屋；使用方向鍵或滑鼠移動畫面。", 75, 50);
}

ctx.fillText("日期：" + year.num + "年" + monthNames[month.num] + month.dayOf + "日", 500, 5);
ctx.fillText("木材：" + inventory.lumber, 500, 20);
ctx.fillText("食物：" + inventory.food, 700, 5);
if (helpOn) {
ctx.fillText("按 8 購買木材（  30個／10元）", 850, 15);
ctx.fillText("按 9 購買食物（100個／10元）", 850, 30);
}

ctx.drawImage(
			bg.image,
			dropdown.item * 50,
			season * 50, 
			50,
			50,
			12.5,
			12.5,
			50,
			50
		);
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(0, 75, 75, 15);


ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(0, 75, 18 * 50 + 25, 87.5);

for (var i=0; i<18; i++) {
  ctx.drawImage(
			bg.image,
			i * 50,
			season * 50, 
			50,
			50,
			12.5 + (i * 50),
			100,
			50,
			50
	);
}

ctx.drawImage(
			helpButton.image,
			0,
			497
		);
		

if (mouseState.loaded) {	
	ctx.drawImage(
		mouseState.image,
		mouse.state * 50,
		0, 
		50,
		50,
		0,
		200,
		50,
		50
	);
}
if (helpOn) {
  ctx.fillStyle = "White";
  ctx.fillText("此圖案表示滑鼠可否移動地圖。", 50, 225);
  ctx.fillText("請按空白鍵開閉滑鼠移動功能。", 25, 250);
}
		
		ctx.fillStyle = "White";
ctx.fillText(blockNames[dropdown.item], 12.5, 75);
		
ctx.fillStyle = "Yellow";
ctx.font = "18pt Arial";
ctx.textBaseline = "top";
ctx.fillText("滑鼠移到問號上查看說明", 50, 497);

if (isNormColliding(mouse, help)) helpOn = true;
if (!isNormColliding(mouse, help)) helpOn = false;

if (game.over) {
gameOverTrans += 0.05;
ctx.fillStyle = "rgba(0, 0, 0, " + gameOverTrans + ")";
ctx.fillRect(0, 0, cv.width, cv.height);
ctx.fillStyle = "White";
  ctx.font = "12pt Arial";
  ctx.textBaseline = "top";
  ctx.fillText("遊戲結束，村民們餓死了。", cv.width / 2 - 50, cv.height / 2 + 10);
}

ctx.save();

if (!graphMode) return;

ctx.fillStyle = "White";
ctx.fillRect(0, 0, cv.width, cv.height);
ctx.beginPath();
ctx.moveTo(0, cv.height);
for (var i=0; i<monthStatsFood.length; i++) {
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(i * 100, 0, 2, cv.height);

ctx.lineTo(i * 100, cv.height - (monthStatsFood[i]/50));
ctx.fillStyle = "Red";
ctx.font = "10pt Arial";
ctx.textBaseline = "top";
ctx.fillText(monthStatsFood[i] + " food", i * 100, 0);
}
ctx.strokeStyle = "Red";
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(0, cv.height);
for (var i=0; i<monthStatsPop.length; i++) {
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(i * 100, 0, 2, cv.height);

ctx.lineTo(i * 100, cv.height - (monthStatsPop[i]/50));
ctx.fillStyle = "Blue";
ctx.font = "10pt Arial";
ctx.textBaseline = "top";
ctx.fillText(monthStatsPop[i] + " people", i * 100, 12);
}
ctx.strokeStyle = "Blue";
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(0, cv.height);
for (var i=0; i<monthStatsMoney.length; i++) {
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(i * 100, 0, 2, cv.height);

ctx.lineTo(i * 100, cv.height - (monthStatsMoney[i]/50));
ctx.fillStyle = "Green";
ctx.font = "10pt Arial";
ctx.textBaseline = "top";
ctx.fillText("$" + monthStatsMoney[i], i * 100, 24);
ctx.fillStyle = "Black";
ctx.fillText(monthNames[monthStatsMonth[i]], i * 100, 36);

if (Math.round((monthStatsMoney[i] - monthStatsMoney[i-1])*100 / (monthStatsMoney[i-1])) > 0) ctx.fillStyle = "Green";
if (Math.round((monthStatsMoney[i] - monthStatsMoney[i-1])*100 / (monthStatsMoney[i-1])) == 0) ctx.fillStyle = "Blue";
if (Math.round((monthStatsMoney[i] - monthStatsMoney[i-1])*100 / (monthStatsMoney[i-1])) < 0) ctx.fillStyle = "Red";

if (i > 0) {
  ctx.fillText(
    "Balance", i * 100, 48);
  ctx.fillText(
    "change: " + Math.round((monthStatsMoney[i] - monthStatsMoney[i-1])*100 / (monthStatsMoney[i-1])) + "%",
    i * 100,
    60
  );
}
}
ctx.strokeStyle = "Green";
ctx.stroke();
ctx.closePath();

ctx.restore();
}

function minmapren() {
ctx.fillStyle = "white";
ctx.fillRect(minimap.x, minimap.y, 250, 250);

for (var i=0; i<tiles.length; i++) {
ctx.fillStyle = blockColors[tiles[i].tsX];
if (mapGenerated) ctx.fillRect(minimap.x - 5 + (tiles[i].tileX * 50 / 10), minimap.y + (tiles[i].tileY * 50 / 10), 5, 5);

ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
if (mapGenerated) ctx.strokeRect(minimap.x - 5 + (origin.x * -1 / 10), minimap.y + (origin.y * -1 / 10), 131.6, 57.4);
}
}