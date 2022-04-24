export class Controller{
    constructor(game, view){
        this.game = game;
        this.view = view;
    }
    init(codeKey){
        window.addEventListener('keydown', event => {
            console.log(1)
            if (event.code === codeKey){
                this.view.init();
                this.start();
            }
        });
    }
    start(){
        this.view.showArea(this.game.vieArea);

        this.game.createUpdatePanels(this.view.createBlockScore(), this.view.createBlockNextTetromino())

        const tick = () => {
            const time = (1100 - 100 * this.game.level)
            if (this.game.gameOver) {
                this.game.showResult(this.view.endTetris());
                window.addEventListener('keydown', (event) => {
                    if (event.code == 'Enter'){
                        window.location.reload()
                    }
                });
                return
            }
            setTimeout(() => {
                this.game.moveDown();
                this.view.showArea(this.game.vieArea);
                tick();
            }, time > 100 ? time : 100);
        }

        tick();

        window.addEventListener('keydown', (event) => {
            const key = event.code;
            switch (key) {
                case 'ArrowLeft':
                    this.game.moveLeft();
                    this.view.showArea(this.game.vieArea)
                    break;
                case 'ArrowRight':
                    this.game.moveRight();
                    this.view.showArea(this.game.vieArea)
                    break;
                case 'ArrowDown':
                    this.game.moveDown();
                    this.view.showArea(this.game.vieArea)
                    break;
                case 'ArrowUp':
                    this.game.rotateTetromino();
                    this.view.showArea(this.game.vieArea)
                    break;
            }
        });
    }
}