let w;
let columns;
let rows;
let board;
let next;
function setup() {
    createCanvas(500, 500)
    w = 20;

    columns = floor(width/w);
    rows = floor(height / w)
    board = new Array(columns);
    for (let i = 0; i< columns; i ++) {
        board[i] = new Array(rows)
    }

}


function draw() {

    background(255);
    board[2][2] = 1
    for (let i = 1; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if ((board[i][j] == 1)) fill(0)
            else fill(255);
            stroke(0);
            rect(i *w, j*w, w, w)
        }
    }
    
    
}