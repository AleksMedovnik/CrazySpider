'use strict'

// create sprite start
class SpriteMG {
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
	}

}
// create sprite end


// explosion start
function createExplosion(explosion, w, h, spider, dx = 0, dy = 0, myX, myY) {
	if (event.pageX >= spider.x
		&& event.pageX <= spider.x + spider.w
		&& event.pageY >= spider.y
		&& event.pageY <= spider.y + spider.h) {
		myX = myX || event.pageX - canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
		myY = myY || event.pageY - canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
		explosion.push({
			x: myX - w / 2 + dx,
			y: myY - h / 2 + dy,
			w,
			h,
			animX: 0,
			animY: 0
		});
		spider.w = 0;
	}

};

function renderExplosion(explosion, explImg, w, h) {
	for (let i = 0; i < explosion.length; i++) {
		main.ctx.drawImage(
			explImg, w * Math.floor(explosion[i].animX),
			h * Math.floor(explosion[i].animY), w, h,
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
			explosion.splice(i, 1);
		}
	}
};

// explosion end

// animation object start
function renderSprite(spriteImg, segmentWidth, segmentHeight, spriteX, spriteY, spriteWidth, spriteHeight, spriteAnimX, spriteAnimY) {
	main.ctx.drawImage(
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
// animation object end