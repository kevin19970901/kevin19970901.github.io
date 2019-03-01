var keysDown = {};
window.addEventListener('keydown', function(e) {
	keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
	delete keysDown[e.keyCode];
});

var buildDelay = 10;
var moveSpeed = 200;
var buildModeOn = true;
var lightMode = "day";
var mouseMapMove = true;
var lastMouseToggle = 0;

function mouseOnScreen() {
if (
  mouse.x > 0 && mouse.y > 0 &&
  mouse.x < canvas.width &&
  mouse.y < canvas.height
) {
  return true;
}
else {return false;}
}

function updateGame(mod) {
lastMouseToggle ++;
if (32 in keysDown && mouseMapMove && lastMouseToggle > 25) {mouseMapMove = false; lastMouseToggle = 0; mouse.state = 1;}
if (32 in keysDown && !mouseMapMove && lastMouseToggle > 25) {mouseMapMove = true; lastMouseToggle = 0; mouse.state = 0;}

if ((37 in keysDown || 65 in keysDown) && mapGenerated && !game.over) {
origin.x += moveSpeed * mod; //Left
}
if ((38 in keysDown || 87 in keysDown) && mapGenerated && !game.over) {
origin.y += moveSpeed * mod; //Up
}
if ((39 in keysDown || 68 in keysDown) && mapGenerated && !game.over) {
origin.x -= moveSpeed * mod; //Right
}
if ((40 in keysDown || 83 in keysDown) && mapGenerated && !game.over) {
origin.y -= moveSpeed * mod; //Down
}

if (90 in keysDown) graphMode = true;
if (88 in keysDown) graphMode = false;

if (mouse.x > canvas.width - 100 && mapGenerated && !game.over && !isNormColliding(mouse, blockSelection) && !isNormColliding(mouse, help) && mouseMapMove) origin.x -= moveSpeed * mod;
if (mouse.y > canvas.height - 100 && mouse.y < canvas.height && mapGenerated && !game.over && !isNormColliding(mouse, blockSelection) && !isNormColliding(mouse, help) && mouseMapMove) origin.y -= moveSpeed * mod;
if (mouse.x < 100 && mapGenerated && !game.over && !isNormColliding(mouse, blockSelection) && !isNormColliding(mouse, help) && mouseMapMove) origin.x += moveSpeed * mod;
if (mouse.y < 100 && mouse.y > 0 && mapGenerated && !game.over && !isNormColliding(mouse, blockSelection) && !isNormColliding(mouse, help) && mouseMapMove) origin.y += moveSpeed * mod;

for (var i=0; i<tiles.length; i++) {
if (isColliding(mouse, tiles[i]) && !isNormColliding(mouse, blockSelection) && mouseOnScreen() && mouse.down && dropdown.item < 6 && buildModeOn && (tiles[i].tsX <= 5 || tiles[i].tsX >= 9)) {
tiles[i].tsX = dropdown.item;
}
if (isColliding(mouse, tiles[i]) && !isNormColliding(mouse, blockSelection) && mouseOnScreen() && mouse.down && dropdown.item > 8 && buildModeOn && (tiles[i].tsX <= 5 || tiles[i].tsX >= 9)) {
tiles[i].tsX = dropdown.item;
}
if (isColliding(mouse, tiles[i]) && !isNormColliding(mouse, blockSelection) && mouseOnScreen() && mouse.down && dropdown.item > 5 && dropdown.item < 9 && buildDelay < 1 && inventory.lumber > 29 && game.started && buildModeOn && (tiles[i].tsX <= 5 || tiles[i].tsX >= 9)) {
tiles[i].tsX = dropdown.item;
inventory.lumber -= 30;
buildDelay = 10;
game.pop += 5;
}
}
buildDelay --;

if (month.num > 11) {month.num = 0; month.dayOf = 1; year.num ++;} //New year

if (isColliding(mouse, waterSrc) && !game.started && mouse.down) well();
if (game.money < 0) balanceColor = "Red";
if (game.money > 0) balanceColor = "Green";

origin.x = Math.round(origin.x);
origin.y = Math.round(origin.y);
}

var game = {
  money: 500,
  pop: 0,
  started: false,
  villname: false,
  buildings: 0,
  popHasRisen: false,
  over: false
}

var bdArr = [];

var inventory = {
  lumber: 900,
  food: 750
}

function well() {
var prmpt = prompt("請為村莊命名以開始遊戲。", "希望之村");
if (prmpt != null) {game.started = true; game.villname = prmpt; document.title = game.villname + " - 放逐者傳記";}
}

var month = {
  dayOf: 1,
  num: 2
}
var months = [
31,
28,
31,
30,
31,
30,
31,
31,
30,
31,
30,
31
];
var monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
var monthStatsFood = [];
var monthStatsPop = [];
var monthStatsMoney = [];
var monthStatsMonth = [];

var year = {
  num: 2015
}

var season = 0;

function timer() {
month.dayOf ++;
if (month.dayOf > months[month.num]) {
month.num ++;
month.dayOf = 1;
monthlyTasks();
if (inventory.food < game.pop) game.pop -= 10;
}
if (month.num > 1 && month.num < 5) {season = 0;} //Spring
if (month.num > 4 && month.num < 8) {season = 1;} //Summer
if (month.num > 7 && month.num < 11) {season = 2;} //Fall
if (month.num > 10) {season = 3;} //Winter Part 1
if (month.num < 2) {season = 3;} //Winter Part 2
}
function runTimer() {
if (game.started && !game.over) {timer();}
}
setInterval(runTimer, 3000);


function monthlyTasks() {
game.money += game.pop;
if (inventory.food > game.pop) game.pop += game.buildings * 5;
inventory.food -= game.pop;
if (inventory.food < 0) {inventory.food = 0; game.over = true;}
monthStatsFood.push(inventory.food); monthStatsPop.push(game.pop); monthStatsMoney.push(game.money); monthStatsMonth.push(month.num);
if (monthStatsFood.length > 12) {monthStatsFood = []; monthStatsFood.push(inventory.food);}
if (monthStatsPop.length > 12) {monthStatsPop = []; monthStatsPop.push(game.pop);}
if (monthStatsMoney.length > 12) {monthStatsMoney = []; monthStatsMoney.push(game.money);}
if (monthStatsMonth.length > 12) {monthStatsMonth = []; monthStatsMonth.push(month.num-1);}
}