class Unit {

    constructor(imgPath, w, h) {
        var self = this
        this.ready = false
        this.image = new Image()
        this.image.onload = function() {
            self.ready = true
        }
        this.image.src = imgPath
        this.x = 0
        this.y = 0
        this.width = w
        this.height = h
    }

    render(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

// create canvas
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 512
canvas.height = 512

// background image
var bgReady = false
var bgImage = new Image()
bgImage.onload = function () {
    bgReady = true
}
bgImage.src = "images/image.png"

var hero = new Unit("images/hero.png", 32, 32)

var tileSize = 64;
var game = new EscapeGame(canvas.width / tileSize, canvas.height / tileSize)
var field = game.getField()

function renderField() {
    for (var i = 0; i < field.height; ++i)
    for (var j = 0; j < field.width; ++j)
    {
        var y = i * tileSize;
        var x = j * tileSize;

        var cell = field.getCell(j, i)
        if (cell === Cell.WALL) {
            ctx.fillRect(x, y, tileSize, tileSize);
        }
        else {
            ctx.rect(x, y, tileSize, tileSize);
        }
        ctx.stroke();
    }
}

var reset = function () {
    hero.x = canvas.width / 2
    hero.y = canvas.height / 2
}

var render = function () {
    
    if (hero.ready) {
        hero.render(ctx)
    }
}

var main = function () {
    var now = Date.now()
    var delta = now - then

    //update(delta / 1000)
    render()
    then = now

    window.requestAnimationFrame(main)
}

var then = Date.now()

window.onload = function(){
    document.body.appendChild(canvas)
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0)
    }
    renderField()
    reset()
    main()
}