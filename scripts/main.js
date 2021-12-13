"use strict"
window.onload = () => {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 300;

    const aim = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    let spider = new Spider(
        Math.random() * (canvas.width - 200),
        Math.random() * (canvas.height - 150),
        150,
        150,
        0,
        0,
        30,
        './images/spider.png'
    );

    const expl = new Image();
    expl.src = './images/expl.jpg';

    const grassImg = new Image();
    grassImg.src = './images/grass.jpg';

    const explosion = [];
    let anim;

    canvas.addEventListener('mousemove', (e) => setAim(e, aim));
    canvas.addEventListener('click', (e) => {
        createExplosion(e, explosion, 100, 100, spider);
    });

    animation();


    function animation() {
        if (spider.hp) {
            update();
            render();
            anim = requestAnimationFrame(animation);
        } else {
            const play = confirm('You Win!!! Play Again?');
            if (play) {
                spider.w = 150;
                spider.hp = true;
                anim = requestAnimationFrame(animation);
            } else {
                cancelAnimationFrame(anim)
            }
        }
    };

    function render() {
        ctx.drawImage(grassImg, 0, 0, canvas.width, canvas.height);
        if (spider.timer > 0) {
            renderSprite(ctx, spider.img, 128, 128, spider.x, spider.y, spider.w, spider.h, spider.animX, spider.animY);
        }
        renderExplosion(ctx, explosion, expl, 341.3, 364);
        drawAim(ctx, aim);
    };

    function update() {
        if (spider.timer > 0) {
            updateSprite(spider, 32, 8, 0.3);
            spider.timer--;
        } else {
            // spider.x = Math.random() * (canvas.width - 200);
            // spider.y = Math.random() * (canvas.height - 150);
            spider.timer = 30;
        }
        updateExplosion(explosion, 3, 2, 0.3);
    };
}