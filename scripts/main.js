"use strict"

import {
    Spider, createExplosion, renderSpider, setAim,
    renderExplosion, random, updateSpider, updateExplosion, drawAim
} from "./megaNeura.js";

const gameStart = () => {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 300;

    const spiders = [];
    const explosion = [];
    let game = true;

    const aim = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    for (let i = 0; i < 10; i++) {
        spiders.push(new Spider(
            random(-50, canvas.width - 100),
            random(-50, canvas.height - 150),
            150,
            150,
            i,
            0,
            './images/spider.png',
            35 + i,
        ));
    }

    const expl = new Image();
    expl.src = './images/expl.jpg';

    const grassImg = new Image();
    grassImg.src = './images/grass.jpg';

    canvas.addEventListener('mousemove', (e) => setAim(e, aim));
    canvas.addEventListener('click', (e) => {
        createExplosion(e, explosion, 100, 100, spiders);
    });

    animation();


    function animation() {
        if (game) {
            update();
            render();
            requestAnimationFrame(animation);
        } else {
            const play = confirm('You Won!!! Play Again?');
            if (play) gameStart();
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

        if (spiders.length === 0) {
            setTimeout(() => {
                game = false;
            }, 1000);
        }
        for (let i = 0; i < spiders.length; i++) {
            if (spiders[i].timer > 0) {
                updateSpider(spiders[i], 32, 8, 0.3);
                spiders[i].timer--;
            } else {
                spiders[i].x = random(-50, canvas.width - 100);
                spiders[i].y = random(-50, canvas.height - 150);
                spiders[i].timer = 35 + i;
            }
        }

        updateExplosion(explosion, 3, 2, 0.3);
    };

}
window.onload = gameStart;