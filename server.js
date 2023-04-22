var express = require("express")
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")
app.use(express.static("."));
app.get("/", function (req, res) {
    res.redirect('index.html');

})

server.listen(3000, function () {
    console.log('index.html');
});


function matrixGenerate(matLength, gr, grEat, fire) {
    matrix = []
    for (let i = 0; i < matLength; i++) {
        matrix.push([])
        for (let j = 0; j < matLength; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        } for (let i = 0; i < fire; i++) {
            let x = Math.floor(Math.random() * matLength)
            let y = Math.floor(Math.random() * matLength)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4
            }
        }
    }
    return matrix
}

matrix = matrixGenerate(20, 85, 30, 5, 10)

io.sockets.emit('sent matrix', matrix)
// arrays
grassArr = []
grassEaterArr = []
PredatorArr = []
fireArr = []

// modules
Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Hanter = require("./hanter")
Fire = require("./fire")

// object generation

function createObj() {


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                PredatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new fire(x, y)
                fireArr.push(gr)
            }
        }
    }



    io.socket.emit('sent matrix', matrix)
}


function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }
    for (let i = 0; i < PredatorArr.length; i++) {
        PredatorArr[i].eat()
    }
    for (let i = 0; i < fireArr.length; i++) {
        fireArr[i].eat()
    }
    io.sockets.emit('sent matrix', matrix)

}

setInterval(game, 300)


//

io.on('conection', function () {
    createObj()
})
//sdcffgggggdsfgdgfhfryfryry