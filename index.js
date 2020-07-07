const canvas = document.getElementById('cobrinea')
const startBtn = document.getElementById('start-game')
// renderiza o conteúdo do canvas e trata o arquivo em plano 2D
const context = canvas.getContext('2d') 
// 32 pixels por quadrado
const box = 32 

const snake = [{
    x: 8 * box,
    y: 8 * box,
}]

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = 'right'

const createBackground = () => {
    context.fillStyle = '#43AA8B'

    // Altura e largura de 16 pro quadrado
    context.fillRect(0, 0, 16 * box, 16 * box)
}

const createSnake = () => {
    let i
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = '#254441'
        // margin-left, margin-bottom, largura, altura
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

const createFood = () => {
    context.fillStyle = '#DB504A'
    context.fillRect(food.x, food.y, box, box)
}

const updateDirection = (event) => {
    if (event.keyCode === 37 && direction !== 'right') {
        direction = 'left'
    }

    if (event.keyCode === 38 && direction !== 'down') {
        direction = 'up'
    }

    if (event.keyCode === 39 && direction !== 'left') {
        direction = 'right'
    }

    if (event.keyCode === 40 && direction !== 'up') {
        direction = 'down'
    }
}

document.addEventListener('keydown', updateDirection)

const startGame = () => {
    if (snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    let i
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(game(startGame))
            alert('GAME OVER!')
            let replay = confirm('Vai encarar outra?')
            replay === true ? document.location.reload(true) : alert('Obrigada por jogar!')
        }
    }

    createBackground()
    createSnake()
    createFood()
    
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    // Coordenadas da cobrinea
    if (direction === 'right') {
        snakeX += box
    }

    if (direction === 'left') {
        snakeX -= box
    }

    if (direction === 'up') {
        snakeY -= box
    }

    if (direction === 'down') {
        snakeY += box
    }

    if (snakeX !== food.x || snakeY !== food.y) {
        snake.pop()
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    snake.unshift(newHead)
}

const game = (fn) => setInterval(fn, 100)

startBtn.addEventListener('click', () => {
    game(startGame)
    canvas.style.display = 'flex'
    startBtn.style.display = 'none'
})



