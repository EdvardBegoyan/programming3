var express = require("express")
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));



app.get("/", function (req, res) {
    res.redirect('index.html');

})

server.listen(3001, function () {
    console.log('server is run');
});


function matrixGenerate(matLength, gr, grEat, fire,predator,hunter) {

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

matrix = matrixGenerate(20, 12, 18,10, 7)

io.sockets.emit('sent matrix', matrix)
// arrays
grassArr = []
grassEaterArr = []
hunterArr = []
predatorArr = []
fireArr = []

// modules
Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Hunter = require("./hunter")
Fire = require("./fire")

// object generation

function createObj() {
    console.log(matrix);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let ge = new GrassEater(x, y)
                grassEaterArr.push(ge)
            } else if (matrix[y][x] == 3) {
                let p = new Predator(x, y)
                predatorArr.push(p)
            } else if (matrix[y][x] == 4) {
                let f = new Fire(x, y)
                fireArr.push(f)
            }else if (matrix[y][x] == 5){
                let h = new Hunter(x,y)
                hunterArr.push(h)
            }
        }
    }



    io.sockets.emit('sent matrix', matrix)
}


function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for ( let i in fireArr) {
        fireArr[i].eat()
    }
    for (let i in hunterArr) {
        hunterArr[i].eat()
    }
    io.sockets.emit('sent matrix', matrix)

}

setInterval(game, 300)



io.on('connection', function () {
    createObj()
})

var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
     statistics.predator = predatorArr.length;
    statistics.fire = fireArr.length;
    statistics.hunter = hunterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000);