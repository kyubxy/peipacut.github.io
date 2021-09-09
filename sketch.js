var bg;
var logo;
var font

class link {
  constructor (x, y, text, url, size = 25, hc = color(76,73,255)) {
    this.x = x
    this.y = y
    this.text = text
    this.url = url 
    this.hovercol = hc
    this.size = size
  }

  setX (value) {
    this.x = value
  }

  draw () {

    push()
    textFont (font)
    textSize (this.size)

    this.hover = mouseX > this.x && mouseX < this.x + textWidth (this.text) && mouseY > this.y - textAscent () && mouseY < this.y

    if (this.hover) {
      this.col = this.hovercol
    }
    else {
      this.col = color(255)
    }

    fill (this.col)
    text (this.text, this.x, this.y)
    pop()
  }
}

function preload () {
  bg = loadImage ("assets/bg.png")
  logo = loadImage ("assets/logo.png")
  font = loadFont ("assets/hasklig.otf")
}

var links
var credit

function setup() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth < windowHeight)
    bg.resize (0, windowHeight)
  else
    bg.resize (windowWidth, 0)

  links = []
  links.push (new link (0, windowHeight / 2 - 9 - 30, "blog", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"))
  links.push (new link (0, windowHeight / 2 - 9 - 0, "github", "https://github.com/EpicTofuu"))
  links.push (new link (0, windowHeight / 2 - 9 + 30, "donate", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 25, color (250, 117, 184)))
  links.push (new link (0, windowHeight / 2 - 9 + 60, "about", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"))
  credit = new link (10, windowHeight - 40, "powered by p5.js\nyasa 2021", "https://p5js.org/", 18, color (45))
}

offset = 0
var linex;

function draw() {
  image (bg,0,0)
  push()
  fadeSpeed = 40
  if (frameCount < fadeSpeed) {
    tint (255, (frameCount / fadeSpeed) * 255)
  }
  let target = -180
  let dx = target - offset
  offset += dx * 0.09

  strokeWeight (5)
  stroke(255) 
  let lineh = 100
  linex = windowWidth / 2 + 400 + offset
  line (linex, windowHeight / 2 + lineh, linex, windowHeight / 2 - lineh)

  image (logo, windowWidth / 2 - logo.width / 2 + offset, windowHeight / 2 - logo.height / 2)
  pop()

  for (var i = 0; i < links.length; i++) {
    let l = links[i]
    l.setX (linex + 30)
    l.draw()
  }

  if (mouseY > windowHeight - 100)
    credit.draw()
}

function mouseClicked () {
  for (var i = 0; i < links.length; i++) {
    let l = links[i]
    if (l.hover)
      window.open(l.url)
  } 

  if (credit.hover)
    window.open (credit.url)
}
