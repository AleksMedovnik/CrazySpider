function setAim(event) {
    main.aim.x = event.pageX - canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
    main.aim.y = event.pageY - canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
}
function drawAim() {
    main.ctx.save();

    main.ctx.fillStyle = 'rgba(219, 20, 20, 1)';	
	main.ctx.strokeStyle = 'rgba(219, 20, 20, 1)';
    main.ctx.lineWidth = 2;


    main.ctx.beginPath();
    main.ctx.arc(main.aim.x, main.aim.y, 2, 0, 2 * Math.PI);
    main.ctx.fill();

    main.ctx.beginPath();
    main.ctx.moveTo(main.aim.x - 50, main.aim.y - 15);
    main.ctx.lineTo(main.aim.x - 50, main.aim.y - 25);
    main.ctx.lineTo(main.aim.x - 35, main.aim.y - 25);
    main.ctx.stroke();

    main.ctx.beginPath();
    main.ctx.moveTo(main.aim.x + 50, main.aim.y - 15);
    main.ctx.lineTo(main.aim.x + 50, main.aim.y - 25);
    main.ctx.lineTo(main.aim.x + 35, main.aim.y - 25);
    main.ctx.stroke();

    main.ctx.beginPath();
    main.ctx.moveTo(main.aim.x + 50, main.aim.y + 15);
    main.ctx.lineTo(main.aim.x + 50, main.aim.y + 25);
    main.ctx.lineTo(main.aim.x + 35, main.aim.y + 25);
    main.ctx.stroke();

    main.ctx.beginPath();
    main.ctx.moveTo(main.aim.x - 35, main.aim.y + 25);
    main.ctx.lineTo(main.aim.x - 50, main.aim.y + 25);
    main.ctx.lineTo(main.aim.x - 50, main.aim.y + 15);
    main.ctx.stroke();

    main.ctx.beginPath();
    main.ctx.moveTo(main.aim.x - 30, main.aim.y);
    main.ctx.lineTo(main.aim.x - 50, main.aim.y);
    main.ctx.stroke();

    main.ctx.beginPath();
    main.ctx.moveTo(main.aim.x + 30, main.aim.y);
    main.ctx.lineTo(main.aim.x + 50, main.aim.y);
    main.ctx.stroke();

    main.ctx.beginPath();
    main.ctx.moveTo(main.aim.x, main.aim.y - 15);
    main.ctx.lineTo(main.aim.x, main.aim.y - 25);
    main.ctx.stroke();

    main.ctx.beginPath();
    main.ctx.moveTo(main.aim.x, main.aim.y + 15);
    main.ctx.lineTo(main.aim.x, main.aim.y + 25);
    main.ctx.stroke();

    main.ctx.restore();
}