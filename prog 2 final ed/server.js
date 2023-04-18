var express = require("express")
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")
app.use(express.static("."));
app.get("/", function (req,res){
    res.redirect('index.html');

})

server.listen(3000,function(){
  console.log('index.html');
});


function matrixGenerate(matLength, gr, grEat,fire) {
     matrix = []
}

 matrix = matrixGenerate(20, 85, 30, 5, 10)

io.socket.emit("sent matrix",matrix)
// arrays
 grassArr = []
 grassEaterArr = []
 PredatorArr = []
 fireArr = []

// modules
 Grass = require("./grass")
 GrassEater = require("./grassEater")
 Predator = require("./predator")
 Hanter = require ("./hanter")
 Fire = require ("./fire")

// object generation


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

function draw() {
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            fill("green");
        } else if (matrix[y][x] == 0) {
            fill("#acacac");
        } else if (matrix[y][x] == 2) {
            fill("yellow");
        } else if (matrix[y][x] == 3) {
            fill("red");
        } else if (matrix[y][x] == 4) {
            fill("blue");
        }
        rect(x * side, y * side, side, side);
    }
}
for (let i = 0; i < grassArr.length; i++) {
    grassArr[i].mul()
}

for (let i = 0; i < grassEaterArr.length; i++) {
    grassEaterArr[i].eat()
}
for (let i = 0; i < PredatorArr.length; i++) {
    PredatorArr[i].eat()
}
} {
} for (let i = 0; i < fireArr.length; i++) {
fireArr[i].eat()
}

io.socket.emit("sent matrix",matrix)
