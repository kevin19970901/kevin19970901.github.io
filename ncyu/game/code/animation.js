function SpriteAnimation(x, y, w, h, sprSrc, frames) {
this.x = x;
this.y = y;
this.width = w;
this.height = h;
this.image = new Image();
this.image.src = sprSrc;
this.frames = frames;
this.image.onload = return;
}
var currentFrame = 0;
function runAnimation(anim) {
for (var i=50; currentFrame<anim.frames; i--;) {
  if (i < 1) currentFrame ++; i = 50;
  if (currentFrame>anim.frames) break;
  ctx.drawImage(
			anim.image,
			currentFrame * anim.width,
			0,
			anim.width,
			anim.height,
			anim.x,
			anim.y,
			anim.width,
			anim.height
		);
}
}