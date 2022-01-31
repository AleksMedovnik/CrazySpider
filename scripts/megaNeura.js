'use strict'

function getCoords(event) {
	let x = event.pageX - canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
	let y = event.pageY - canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
	return [x, y];
}

export function checkHit(e, spiders) {
	const [eX, eY] = getCoords(e);
	for (let i = 0; i < spiders.length; i++) {
		const spider = spiders[i];
		if (eX >= spider.x + 60
			&& eX <= spider.x + (spider.w - 60)
			&& eY >= spider.y + 60
			&& eY <= spider.y + (spider.h - 40)) {
			spiders.splice(i--, 1);
		}
	}
}

export function random(min, max) {
	return min + Math.random() * (max - min);
}


// Spider
export class Spider {
	constructor(x, y, w, h, animX, animY, src, timer) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.animX = animX;
		this.animY = animY;
		this.img = new Image();
		this.img.src = src;
		this.timer = timer;
	}

}

export function renderSpider(
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

export function updateSpider(sprite, hor, vert, vel = 1) {
	sprite.animX += vel;
	if (sprite.animX >= hor) {
		sprite.animY++;
		sprite.animX = 0;
	}
	if (sprite.animY >= vert) {
		sprite.animY = 0;
	}
};


// Aim
export function drawAim(ctx, aim) {
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

export function setAim(event, aim) {
	[aim.x, aim.y] = getCoords(event);
}

// Exploslon
export function createExplosion(e, explosion, w, h) {
	const [eX, eY] = getCoords(e);
	explosion.push({
		x: eX - w / 2,
		y: eY - h / 2,
		w,
		h,
		animX: 0,
		animY: 0
	})
};

export function renderExplosion(ctx, explosion, explImg, w, h) {
	for (let i = 0; i < explosion.length; i++) {
		ctx.drawImage(
			explImg, w * Math.floor(explosion[i].animX),
			h * explosion[i].animY, w, h,
			explosion[i].x, explosion[i].y, explosion[i].w, explosion[i].h
		);
	};
};

export function updateExplosion(explosion, gor, vert, vel = 1) {
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