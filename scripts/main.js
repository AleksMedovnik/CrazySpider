"use strict"

window.onload = playAnimation;

const main = {};



function init() {
    main.canvas = document.getElementById('canvas');
    main.ctx = canvas.getContext('2d');

    main.canvas.width = 500;
    main.canvas.height = 300;

    main.aim = {
        x: main.canvas.width / 2,
        y: main.canvas.height / 2
    };

    main.spider = new SpriteMG(Math.random() * (main.canvas.width - 200), Math.random() * (main.canvas.height - 150), 150, 150, 0, 0, 30, './images/spider.png');
 
    main.expl = new Image();
    main.grassImg = new Image();
    main.expl.src = './images/expl.jpg';
    main.grassImg.src = './images/grass.jpg'
    main.explosion = [];

    canvas.addEventListener('click', () => createExplosion(main.explosion, 100, 100, main.spider));
    canvas.addEventListener('mousemove', setAim);

};



function animation() {
    update();
    render();
    main.anim = requestAnimationFrame(animation);
};



function render() {
    main.ctx.drawImage(main.grassImg, 0, 0, 700, 463, 0, 0, main.canvas.width, main.canvas.height);

    if (main.spider.timer > 0) {

        renderSprite(main.spider.img, 128, 128, main.spider.x, main.spider.y, main.spider.w, main.spider.h, main.spider.animX, main.spider.animY);

    }

    renderExplosion(main.explosion, main.expl, 341.3, 364);
    drawAim();
};



function update() {
    if (main.spider.timer > 0) {
        updateSprite(main.spider, 32, 8, 0.3);
        main.spider.timer--;
    } else {
        main.spider.x = Math.random() * (canvas.width - 200);
        main.spider.y = Math.random() * (canvas.height - 150);
        main.spider.timer = 30;
    }

    updateExplosion(main.explosion, 3, 2, 0.3);
};



function playAnimation() {
    init();
    animation();
};

