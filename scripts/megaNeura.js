'use strict'
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
		this.hp = true;
	}

}

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

function createExplosion(e, explosion, w, h, spider) {

	const eX = e.pageX - canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
	const eY = e.pageY - canvas.getBoundingClientRect().y - document.documentElement.scrollTop;

	if (eX >= spider.x
		&& eX <= spider.x + spider.w
		&& eY >= spider.y
		&& eY <= spider.y + spider.h) {
		explosion.push({
			x: eX - w / 2,
			y: eY - h / 2,
			w,
			h,
			animX: 0,
			animY: 0
		});
		spider.w = 0; 
		setTimeout(() => {
			spider.hp = false;
		}, 1000);
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
};

function renderSprite(ctx, spriteImg, segmentWidth, segmentHeight, spriteX, spriteY, spriteWidth, spriteHeight, spriteAnimX, spriteAnimY) {
	ctx.drawImage(
		spriteImg, segmentWidth * Math.floor(spriteAnimX),
		segmentHeight * Math.floor(spriteAnimY), segmentWidth, segmentHeight,
		spriteX, spriteY, spriteWidth, spriteHeight
	);
};

function updateSprite(sprite, gor, vert, vel = 1) {
	sprite.animX += vel;
	if (sprite.animX >= gor) {
		sprite.animY++;
		sprite.animX = 0;
	}
	if (sprite.animY >= vert) {
		sprite.animY = 0;
	}
};

function setAim(event, aim) {
	aim.x = event.pageX - canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
	aim.y = event.pageY - canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
}