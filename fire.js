
let LivingCreature = require('./LivingCreature')

module.exports = class Fire extends LivingCreature {
    constructor(x, y) {
       super (x,y)
        this.energy = 10;
        this.directions = [];

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
       
        return super.chooseCell(character)
    }

    mul() {
        let emptyCelss = this.chooseCell(0)
        let newCell = emptyCelss[Math.floor(Math.random()*emptyCelss.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 4
            let newGr = new Fire(newX, newY)
            fireArr.push(newGr)
            this.energy = 5
        }
    }

    move() {
        this.energy--
        let emptyCelss = this.chooseCell(0)
        let newCell = emptyCelss[Math.floor(Math.random()*emptyCelss.length)]
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        let emptyCelss = this.chooseCell(2)
        let newCell = emptyCelss[Math.floor(Math.random()*emptyCelss.length)]
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 15) {
                this.mul()
            }
            for (var i in fireArr) {
                if (newX == fireArr[i].x && newY == fireArr[i].y) {
                    fireArr.splice(i,1);
                    break;
                }
            }

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}

