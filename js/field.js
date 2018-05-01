class Field {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.field = new Array(height * width);

        for (let i = 0; i < width * height; i++) {
            this.field[i] = Cell.EMPTY;
        }
        for (let i = 0; i < width; i++) {
            this.setCell(i, 0, Cell.WALL);
            this.setCell(i, height - 1, Cell.WALL);
        }
        for (let i = 0; i < height; i++) {
            this.setCell(0, i, Cell.WALL);
            this.setCell(width - 1, i, Cell.WALL);
        }

        this.setCell(2, 2, Cell.PLAYER) 
    }

    getCell(x, y) {
        return this.field[y * this.width + x]
    }

    setCell(x, y, value) {
        this.field[y * this.width + x] = value
    }
}

var Cell = {
    EMPTY: 0,
    WALL: 1,
    PLAYER: 2
}

class EscapeGame {

    constructor(height, width) {
        this.field = new Field(height, width)
    }

    render(millis) {

    }

    start() {

    }

    stop() {

    }

    getField() {
        return this.field
    }
}

function main() {
    var field = new Field(5, 5)

    var text = ""
    for (let y = 0; y < field.height; y++) {
        for (let x = 0; x < field.width; x++) {
            var cell = '';
            switch (field.getCell(x, y)) {
                case Cell.EMPTY:
                    cell = '_'
                    break;
                case Cell.WALL:
                    cell = '#'
                    break;
                case Cell.PLAYER:
                    cell = '*'
                    break;
                default:
                    break;
            }
            text += cell
        }
        text += '\n'
    }

    alert(text)
}

main()