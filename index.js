const SIZE_BLOCK = 30;
//механика
const game = {
    area: [
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x',],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x',],
        ['o', 'o', 'o', 'o', 'o', 'x', 'o', 'o', 'o', 'x',],
        ['o', 'o', 'o', 'o', 'x', 'x', 'x', 'o', 'o', 'x',],
    ],
    activeTetromino: {
        x: 3,
        y: 0,
        block: [
            ['o', 'x', 'o'],
            ['o', 'x', 'o'],
            ['x', 'x', 'o'],
        ],
        rotationIndex: 0,
        rotation: [
            [
                ['o', 'x', 'o'],
                ['o', 'x', 'o'],
                ['x', 'x', 'o'],
            ],
            [
                ['x', 'o', 'o'],
                ['x', 'x', 'x'],
                ['o', 'o', 'o'],
            ],
            [
                ['o', 'x', 'x'],
                ['o', 'x', 'o'],
                ['o', 'x', 'o'],
            ],
            [
                ['o', 'o', 'o'],
                ['x', 'x', 'x'],
                ['o', 'o', 'x'],
            ],
        ]
    },
    moveLeft(){
        if (this.checkOutPosition(this.activeTetromino.x - 1, this.activeTetromino.y)){
            this.activeTetromino.x -= 1
        }
    },
    moveRight(){
        if (this.checkOutPosition(this.activeTetromino.x + 1, this.activeTetromino.y)){
            this.activeTetromino.x += 1
        }
    },
    moveDown(){
        if (this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y + 1)){
            this.activeTetromino.y +=1
        } else {
            this.stopMove();
        }
    },
    rotateTetromino(){
        this.activeTetromino.rotationIndex = this.activeTetromino.rotationIndex < 3 ? this.activeTetromino.rotationIndex + 1 : 0;
        this.activeTetromino.block = this.activeTetromino.rotation[this.activeTetromino.rotationIndex];
        if (!this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)){
            this.activeTetromino.rotationIndex = this.activeTetromino.rotationIndex > 0 ? this.activeTetromino.rotationIndex - 1 : 3;
            this.activeTetromino.block = this.activeTetromino.rotation[this.activeTetromino.rotationIndex];
        }
    },
    get vieArea(){
        const area = JSON.parse(JSON.stringify(this.area));
        const {x, y, block} = this.activeTetromino;
        for(let i = 0; i < block.length; i++){
            const row = block[i];
            for(let j = 0; j < row.length; j++){
                if(row[j] !== 'o'){
                    area[y + i][x + j] = block[i][j]
                }
            }
        }
        return area
    },
    checkOutPosition(x, y){
        const tetromino = this.activeTetromino.block;
        for(let i = 0; i < tetromino.length; i++){
            for(let j = 0; j < tetromino[i].length; j++){
                if (tetromino[i][j] === 'o') continue;

                if (!this.area[y + i] || !this.area[y + i][x + j] || this.area[y + i][x + j] !== 'o'){
                    return false
                }
            }
        }
        return true
    },
    stopMove(){
        const {x, y, block} = this.activeTetromino;
        for(let i = 0; i < block.length; i++){
            const row = block[i];
            for(let j = 0; j < row.length; j++){
                if(row[j] !== 'o'){
                    this.area[y + i][x + j] = block[i][j]
                }
            }
        }
    }
}


//отрисовка
const container = document.querySelector('.container');

const canvas = document.createElement('canvas');
canvas.classList.add('game-area')
container.append(canvas);
canvas.width = SIZE_BLOCK * 10;
canvas.height = SIZE_BLOCK * 20;

const context = canvas.getContext('2d')

const showArea = (area) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let y = 0; y < area.length; y++){
        const line = area[y];
        for (let x = 0; x < line.length; x++){
            const block = line[x];
            if (block !== 'o'){
                context.fillStyle = 'aqua';
                context.strokeStyle = 'azure';
                context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
            }       
        }
    }
};

window.addEventListener('keydown', (event) => {
    const key = event.code;
    switch (key) {
        case 'ArrowLeft':
            game.moveLeft();
            showArea(game.vieArea)
            break;
        case 'ArrowRight':
            game.moveRight();
            showArea(game.vieArea)
            break;
        case 'ArrowDown':
            game.moveDown();
            showArea(game.vieArea)
            break;
        case 'ArrowUp':
            game.rotateTetromino();
            showArea(game.vieArea)
            break;
        case 'Enter':
            showArea(game.vieArea);
            break;
    }
});