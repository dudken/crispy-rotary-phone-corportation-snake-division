export function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

export function inBounds(x, y, cols, rows) {
    return x >= 0 && x < cols && y >= 0 && y < rows;
}