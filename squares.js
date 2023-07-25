const canvas = document.getElementById("draw")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x: undefined,
    y: undefined
}

let mouseDown = false
let isTouchEnd = false

const maxSize = 50
const minSize = 5

canvas.addEventListener("mousemove", handleMouseEvent)
canvas.addEventListener("mousedown", handleMouseEvent)
canvas.addEventListener("mouseup", handleMouseEvent)


canvas.addEventListener("touchmove", handleTouchEvent)
canvas.addEventListener("touchstart", handleTouchEvent)
canvas.addEventListener("touchend", handleTouchEvent)

function handleMouseEvent(e) {
    mouse.x = e.x
    mouse.y = e.y

    switch (e.type) {
        case "mousedown":
            mouseDown = true
            break;  
        case "mouseup": 
            mouseDown = false 
            break;  
    }
}

function handleTouchEvent(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  
    switch (e.type) {
        case "touchstart":
            mouseDown = true
            isTouchEnd = false
            break;  
        case "touchend": 
            mouseDown = false 
            isTouchEnd = true
            break;       
    }
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

let colors = ["#010221", "#0A7373", "#B7BF99", "#EDAA25", "#C43302"]

function Square(x, y, rectSide, dx, dy) {
    this.x = x
    this.y = y
    this.rectSide = rectSide
    this.dx = dx
    this.dy = dy
    this.color = colors[Math.floor(Math.random() * colors.length)]

    this.draw = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.rectSide, this.rectSide)
    }

    this.update = function() {

        const distance = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2)

        if (this.x + this.rectSide > innerWidth || this.x < 0) {
            this.dx = -this.dx
        }
    
        if (this.y + this.rectSide > innerHeight || this.y < 0) {
            this.dy = -this.dy
        }

        if (mouseDown && distance < 100) {
            const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
            this.dx = Math.cos(angle)
            this.dy = Math.sin(angle)
        } 

        this.x += this.dx
        this.y += this.dy
        
        if (distance < 50 && !isTouchEnd) {
            if (this.rectSide < maxSize) {
                this.rectSide += 1
            }
        } else {
            if (this.rectSide > minSize) {
                this.rectSide -= 1
            }
        }

        this.draw()
    }
}

let squares = []

function init() {
    squares = new Array ()
    for (let i = 0; i < 1500; i++) {
        let rectSide = 5

        let x = Math.random() * (innerWidth - rectSide*2) + rectSide
        let dx = (Math.random() - 0.5) * 2

        let y = Math.random() * (innerHeight - rectSide*2) + rectSide
        let dy = (Math.random() - 0.5) * 2

        squares.push(new Square(x, y, rectSide, dx, dy))
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < squares.length; i++) {
        squares[i].update()
    }
}

init()
animate()