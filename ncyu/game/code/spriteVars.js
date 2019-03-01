var waterSrc = {
  loaded: false,
  image: new Image(),
  width: 50,
  height: 50,
  x: 1250,
  y: 1250,
  type: 0
}
waterSrc.image.src = "textures/" + lightMode + "_waterSrc.png";
waterSrc.image.onload = function() {
  waterSrc.loaded = true;
}

var houseSprite = {
  loaded: false,
  image: new Image(),
  width: 50,
  height: 50,
  type: 0
}
houseSprite.image.src = "textures/" + lightMode + "_houses.png";
houseSprite.image.onload = function() {
  houseSprite.loaded = true;
}

var helpButton = {
  loaded: false,
  image: new Image(),
  width: 50,
  height: 50
}
helpButton.image.src = "textures/helpButton.png";
helpButton.image.onload = function() {
  helpButton.loaded = true;
}

var mouseState = {
  loaded: false,
  image: new Image(),
  width: 50,
  height: 50
}
mouseState.image.src = "textures/mouseMoveStates.png";
mouseState.image.onload = function() {
  mouseState.loaded = true;
}