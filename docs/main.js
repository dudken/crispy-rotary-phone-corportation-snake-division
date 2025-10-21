import { SnakeGame } from './game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const msgEl = document.getElementById('msg');

const CELL = 20;
const COLS = Math.floor(canvas.width / CELL);
const ROWS = Math.floor(canvas.height / CELL);

const game = new SnakeGame(COLS, ROWS, CELL);

let tickInterval = 120; // ms
let tickId = null;

function updateScore() { scoreEl.textContent = `Score: ${game.score}`; }

function draw() {
    game.draw(ctx);
    if (game.over) {
        msgEl.classList.remove('hidden');
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, canvas.height/2 - 30, canvas.width, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '18px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over — press Space or Click to restart', canvas.width/2, canvas.height/2 + 7);
    } else {
        msgEl.classList.add('hidden');
    }
}

function tick() {
    game.step();
    updateScore();
    draw();
    if (game.over) clearInterval(tickId);
}

function start() {
    if (tickId) clearInterval(tickId);
    game.reset();
    updateScore();
    tickId = setInterval(tick, tickInterval);
    draw();
}

window.addEventListener('keydown', (e) => {
    if (game.over && e.code === 'Space') start();
});

canvas.addEventListener('click', () => { if (game.over) start(); });

start();