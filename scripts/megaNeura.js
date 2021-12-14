'use strict'

function getCoords(event) {
	let x = event.pageX - canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
	let y = event.pageY - canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
	return [x, y];
}

function checkHit(eX, eY, sprite) {
	if (eX >= sprite.x + 60
		&& eX <= sprite.x + (sprite.w - 60)
		&& eY >= sprite.y + 60
		&& eY <= sprite.y + (sprite.h - 40)) {
		return true;
	}
	return false;
}


// Spider
class Spider {
	constructor(x, y, w, h, animX, animY, timerAnim, src) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.animX = animX;
		this.animY = animY;
		this.timerAnim = timerAnim;
		this.img = new Image();
		this.img.src = src;
		this.timer = 30;
		this.hp = true;
	}

}

function renderSpider(
	ctx,
	spriteImg,
	segmentWidth,
	segmentHeight,
	spriteX,
	spriteY,
	spriteWidth,
	spriteHeight,
	spriteAnimX,
	spriteAnimY
) {
	ctx.drawImage(
		spriteImg,
		segmentWidth * Math.floor(spriteAnimX),
		segmentHeight * spriteAnimY,
		segmentWidth,
		segmentHeight,
		spriteX,
		spriteY,
		spriteWidth,
		spriteHeight
	);
};

function updateSpider(sprite, gor, vert, vel = 1) {
	sprite.animX += vel;
	if (sprite.animX >= gor) {
		sprite.animY++;
		sprite.animX = 0;
	}
	if (sprite.animY >= vert) {
		sprite.animY = 0;
	}
};


// Aim
function drawAim(ctx, aim) {
	ctx.save();

	ctx.fillStyle = 'rgba(219, 20, 20, 1)';
	ctx.strokeStyle = 'rgba(219, 20, 20, 1)';
	ctx.lineWidth = 2;


	ctx.beginPath();
	ctx.arc(aim.x, aim.y, 2, 0, 2 * Math.PI);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(aim.x - 50, aim.y - 15);
	ctx.lineTo(aim.x - 50, aim.y - 25);
	ctx.lineTo(aim.x - 35, aim.y - 25);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(aim.x + 50, aim.y - 15);
	ctx.lineTo(aim.x + 50, aim.y - 25);
	ctx.lineTo(aim.x + 35, aim.y - 25);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(aim.x + 50, aim.y + 15);
	ctx.lineTo(aim.x + 50, aim.y + 25);
	ctx.lineTo(aim.x + 35, aim.y + 25);
	ctx.stroke();

	ctx.moveTo(aim.x - 35, aim.y + 25);
	ctx.beginPath();
	ctx.lineTo(aim.x - 50, aim.y + 25);
	ctx.lineTo(aim.x - 50, aim.y + 15);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(aim.x - 30, aim.y);
	ctx.lineTo(aim.x - 50, aim.y);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(aim.x + 30, aim.y);
	ctx.lineTo(aim.x + 50, aim.y);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(aim.x, aim.y - 15);
	ctx.lineTo(aim.x, aim.y - 25);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(aim.x, aim.y + 15);
	ctx.lineTo(aim.x, aim.y + 25);
	ctx.stroke();

	ctx.restore();
}

function setAim(event, aim) {
	[aim.x, aim.y] = getCoords(event);
}

// Exploslon
function createExplosion(e, explosion, w, h, spiders, spidersHP) {

	const [eX, eY] = getCoords(e);
	for (const spider of spiders) {
		if (checkHit(eX, eY, spider)) {
			explosion.push({
				x: eX - w / 2,
				y: eY - h / 2,
				w,
				h,
				animX: 0,
				animY: 0
			});
			spider.w = 0;
			spidersHP.count--;
		}
	}

};

function renderExplosion(ctx, explosion, explImg, w, h) {
	for (let i = 0; i < explosion.length; i++) {
		ctx.drawImage(
			explImg, w * Math.floor(explosion[i].animX),
			h * explosion[i].animY, w, h,
			explosion[i].x, explosion[i].y, explosion[i].w, explosion[i].h
		);
	};
};

function updateExplosion(explosion, gor, vert, vel = 1) {
	for (let i = 0; i < explosion.length; i++) {
		explosion[i].animX += vel;
		if (explosion[i].animX >= gor) {
			explosion[i].animY++;
			explosion[i].animX = 0;
		}
		if (explosion[i].animY >= vert) {
			explosion.splice(i--, 1);
		}
	}
}