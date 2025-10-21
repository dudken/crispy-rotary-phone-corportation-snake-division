let nextDir = { x: 1, y: 0 };
let locked = false;

export function getNextDirection() {
    return nextDir;
}

export function resetInput() {
    nextDir = { x: 1, y: 0 };
    locked = false;
}

export function unlockInput() {
    locked = false;
}

const keyMap = new Map([
    ['ArrowUp', { x: 0, y: -1 }],
    ['ArrowDown', { x: 0, y: 1 }],
    ['ArrowLeft', { x: -1, y: 0 }],
    ['ArrowRight', { x: 1, y: 0 }]
]);

window.addEventListener('keydown', (e) => {
    const k = e.key;
    if (!keyMap.has(k) || locked) return;
    const d = keyMap.get(k);
    nextDir = d;
    locked = true;
});

export function lockInput() {
    locked = true;
}

export function setDirectionIfValid(currentDir, candidate) {
    // prevent reversing directly
    if (currentDir.x + candidate.x === 0 && currentDir.y + candidate.y === 0) return currentDir;
    return candidate;
}