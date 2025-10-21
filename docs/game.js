import { randInt, inBounds } from './utils.js';
import { setDirectionIfValid, lockInput, getNextDirection, unlockInput, resetInput } from './input.js';

export class SnakeGame {
    constructor(cols = 28, rows = 20, cell = 20) {
        this.cols = cols;
        this.rows = rows;
        this.cell = cell;
        this.reset();
    }

    reset() {
        this.snake = [ { x: 6, y: Math.floor(this.rows/2) }, { x:5, y: Math.floor(this.rows/2) }, { x:4, y: Math.floor(this.rows/2) } ];
        this.dir = { x: 1, y: 0 };
        resetInput();
        this.spawnFood();
        this.score = 0;
        this.over = false;
    }

    spawnFood() {
        while (true) {
            const f = { x: randInt(0, this.cols - 1), y: randInt(0, this.rows - 1) };
            if (!this.snake.some(s => s.x === f.x && s.y === f.y)) { this.food = f; return; }
        }
    }

    step() {
        if (this.over) return;
        const next = getNextDirection();
        this.dir = setDirectionIfValid(this.dir, next);
        const head = { x: this.snake[0].x + this.dir.x, y: this.snake[0].y + this.dir.y };

        // collisions
        if (!inBounds(head.x, head.y, this.cols, this.rows)) { this.over = true; return; }
        if (this.snake.some(p => p.x === head.x && p.y === head.y)) { this.over = true; return; }

        this.snake.unshift(head);
        if (this.food && head.x === this.food.x && head.y === this.food.y) {
            this.score += 1;
            this.spawnFood();
        } else {
            this.snake.pop();
        }

        unlockInput();
        lockInput();
    }

    draw(ctx) {
        // background
        ctx.fillStyle = '#071020';
        ctx.fillRect(0,0,this.cols*this.cell,this.rows*this.cell);

        // food
        if (this.food) {
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(this.food.x*this.cell+1, this.food.y*this.cell+1, this.cell-2, this.cell-2);
        }

        // snake
        for (let i = this.snake.length - 1; i >= 0; i--) {
            const p = this.snake[i];
            ctx.fillStyle = i===0 ? '#7ee787' : '#3bb26e';
            ctx.fillRect(p.x*this.cell+1, p.y*this.cell+1, this.cell-2, this.cell-2);
        }
    }
}