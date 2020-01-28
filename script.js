let w;
let columns;
let rows;
let board;
let next;
function setup() {
    createCanvas(500, 500)
    w = 20;
    i = 0;
    j = 0
    START_X = 3;
    START_Y = 13;
    END_X  = 22;
    END_Y = 13;

    columns = floor(width/w);
    rows = floor(height / w)
    board = new Array(columns);
    for (let i = 0; i < columns; i ++) {
        board[i] = new Array(rows)
    }
    // initialize the board into objects.
    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
            board[i][j] = new Node(i, j)
        }
    }
    // Set up an obstacle
    for (let i = 3; i < columns - 5; i++) {
         board[12][i].setObstacle()
    }
    //starting and ending node configuration
    board[START_X][START_Y].fill = 0
    board[END_X][END_Y].fill = 'red'
    BFS_FINDER(board, [START_X, START_Y], [END_X, END_Y])

}

function draw() {
 
    background(255);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            node = board[i][j]
            fill(node.fill);
            stroke(0);
            rect(i *w, j*w, w, w)
        }
    }
}

// Define Node object
function Node (i, j) {
    this.i == i
    this.j = j;
    this.fill = 255;
    this.start = false;
    this.visited = false;
    this.obstacle = false
}

Node.prototype.markVisited = function ()  {
    this.visited = true
}

Node.prototype.setBeginning = function() {
    this.start = true
}

Node.prototype.setEnd = function() {
    this.end = true
}

Node.prototype.setObstacle = function() {
    this.obstacle = true
    this.fill = color(0, 0, 255)
}


// breadth first search shortest path algorithm
async function BFS_FINDER(board, start, goal) {
    directions = [[-1, 0], [1, 0], [0, 1], [0, -1]]

    explored = []

    queue = [[start]]
    if (start == goal) {
        return "not much movement"
    }
    while (queue) {
        //get the first maching board
        path = queue.shift()
        
        //get the last element in the path
        box = path[path.length -1 ]
        if (!explored.includes(`${box[0]},${box[1]}`)) {
            
            // go through the possible neighbors
            for(let i = 0; i < directions.length; i++) {
                let [dx, dy] = directions[i]
                new_box_x = box[0] + dx
                new_box_y = box[1] + dy

                //check if the path is valid
                if (new_box_x >= 0 && new_box_x <= 24 && new_box_y >= 0 && new_box_y <= 24 && !board[new_box_x][new_box_y].obstacle) {
                        //set the coloring of the board
                        board[new_box_x][new_box_y].fill = 4
                        await wait(1)
                        new_path = [...path]
                        new_path.push([new_box_x, new_box_y])
                        queue.push(new_path)
  
                        if (new_box_x === goal[0] && new_box_y === goal[1]) {
                            new_path.forEach((data) => {
                                  let [dx, dy] = data
                                  nodeData = board[dx][dy]
                                  nodeData.fill = 'red'
                            })

                            return new_path
                        }
                    }
                
            }
            explored.push(`${box[0]},${box[1]}`)
            
        }
        
    }

    return  "No path was found"
     
}

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}



