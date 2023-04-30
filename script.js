var sockets = io()
 side = 30

function setup() {
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}

sockets.on("Winter", function (data) {
    weath = data;
})
sockets.on("Summer", function (data) {
    weath = data;
})
sockets.on("Spring", function (data) {
    weath = data;
})
sockets.on("Autumn", function (data) {
    weath = data;
})
 var weath = "spring";
function nkarel(matrix) {
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (weath == "spring") {
                    fill("darkgreen");
                }
                else if (weath == "summer") {
                    fill("#79a83b");
                }
                else if (weath == "autumn") {
                    fill("#ff8453");
                }
                if (weath == "winter") {
                    fill("#ffffff");
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("deepskyblue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
           
            rect(x * side, y * side, side, side);

        }
    }
}

sockets.on('send matrix', nkarel);

function Winter() {
    sockets.emit("winter");
}
function Summer() {
    sockets.emit("summer");
}
function Spring() {
    sockets.emit("spring");
}
function Autumn() {
    sockets.emit("autumn");
}
function AddGrass(){
    sockets.emit("addGrass");
}
function AddGrassEater(){
    sockets.emit("addGrassEater");
}
function KillAll(){
    sockets.emit("killAll");
}
function AddPredator(){
    sockets.emit("addPredator");
}
function AddFire(){
    sockets.emit("addFire");
}function AddHunter(){
    sockets.emit("addHunter");
}

function changeColor(matrix) {
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
}

sockets.on('sent matrix',changeColor)