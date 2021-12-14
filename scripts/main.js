"use strict"
const gameStart = () => {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 300;

    const spiders = [];
    const spidersHP = { count: 10 };
    const explosion = [];
    let anim, game = true;

    const aim = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    for (let i = 0; i < spidersHP.count; i++) {
        spiders.push(new Spider(
            Math.random() * (canvas.width - 70) - 40,
            Math.random() * (canvas.height - 50) - 80,
            150,
            150,
            i,
            i,
            50,
            './images/spider.png',
        ));
    }

    const expl = new Image();
    expl.src = './images/expl.jpg';

    const grassImg = new Image();
    grassImg.src = './images/grass.jpg';

    canvas.addEventListener('mousemove', (e) => setAim(e, aim));
    canvas.addEventListener('click', (e) => {
        createExplosion(e, explosion, 100, 100, spiders, spidersHP);
    });

    animation();


    function animation() {
        if (game) {
            update();
            render();
            anim = requestAnimationFrame(animation);
        } else {
            const play = confirm('You Win!!! Play Again?');
            if (play) {
                gameStart();
            } else {
                cancelAnimationFrame(anim)
            }
        }
    };

    function render() {
        ctx.drawImage(grassImg, 0, 0, canvas.width, canvas.height);
        for (const spider of spiders) {
            renderSpider(ctx,
                spider.img,
                128,
                128,
                spider.x,
                spider.y,
                spider.w,
                spider.h,
                spider.animX,
                spider.animY
            );
        }
        renderExplosion(ctx, explosion, expl, 341.3, 364);
        drawAim(ctx, aim);
    };

    function update() {

        if (spidersHP.count <= 0) {
            setTimeout(() => {
                game = false;
            }, 1000);
        }
        for (const spider of spiders) {
            if (spider.timer > 0) {
                updateSpider(spider, 32, 8, 0.3);
                spider.timer--;
            } else {
                spider.x = Math.random() * (canvas.width - 70) - 40;
                spider.y = Math.random() * (canvas.height - 50) - 80;
                spider.timer = 50;
            }
        }

        updateExplosion(explosion, 3, 2, 0.3);
    };

}
window.onload = gameStart;