class Field {

    constructor(height, width) {
        this.height = height
        this.width = width
        this.field = new Array(height * width)

        for (let i = 0; i < width * height; i++) {
            this.field[i] = Cell.EMPTY
        }
        for (let i = 0; i < width; i++) {
            this.setCell(i, 0, Cell.WALL)
            this.setCell(i, height - 1, Cell.WALL)
        }
        for (let i = 0; i < height; i++) {
            this.setCell(0, i, Cell.WALL)
            this.setCell(width - 1, i, Cell.WALL)
        }
    }

    getCell(x, y) {
        if (x == this.playerX && y == this.playerY) {
            return Cell.PLAYER
        } else {
            return this.field[y * this.width + x]
        }
    }

    setCell(x, y, value) {
        this.field[y * this.width + x] = value
    }

    setPlayerPosition(x, y) {
        this.playerX = x
        this.playerY = y
    }

    isInBound(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height    
    }
}

class Player {

    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class EscapeGame {

    constructor(height, width) {
        this.field = new Field(height, width)
        this.player = new Player(2, 2)
        this.updatePlayerPosition()
        this.onChanged = function () { }
    }

    render(millis) {

    }

    movePlayer(direction) {
        if (this.tryMovePlayer(direction)) {
            this.updatePlayerPosition()
            this.onChanged.call()
        }
    }

    getField() {
        return this.field
    }

    updatePlayerPosition() {
        this.field.setPlayerPosition(this.player.x, this.player.y)
    }

    tryMovePlayer(direction) {
        var pos = getNextPosition(this.player.x, this.player.y, direction)
        if (!this.field.isInBound(pos.x, pos.y)) {
            return false
        }
        if (this.field.getCell(pos.x, pos.y) == Cell.EMPTY) {
            this.player.x = pos.x
            this.player.y = pos.y
            return true
        }
        return false
    }
}

function getNextPosition(x, y, direction) {
    switch (direction) {
        case MovementDirection.UP:
            return { x: x, y: y + 1 }
        case MovementDirection.LEFT:
            return { x: x - 1, y: y }
        case MovementDirection.DOWN:
            return { x: x, y: y - 1 }
        case MovementDirection.RIGHT:
            return { x: x + 1, y: y }
    }
}

var MovementDirection = {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3
}

var Cell = {
    EMPTY: 0,
    WALL: 1,
    PLAYER: 2
}
