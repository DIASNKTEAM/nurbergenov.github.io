const c = document.body.appendChild(document.createElement('canvas')).getContext('2d')
const { canvas } = c

const points = []

// Properties
const pointsCount = 100
const pointRadius = 1
const pointVelocity = 3
const maxDistBetweenPoint = 150
const maxLineWidth = 1
const renderPoints = true
const bokehBackground = true
const glow = true

//
let frame = 0

const resize = () => {
   if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
   }
}

const renderLines = (point) => {
   for (let i = 0; i < points.length; i++) {
      const _p = points[i]
      const _d = Math.sqrt((point.x - _p.x) ** 2 + (point.y - _p.y) ** 2)
      
      if (_d > maxDistBetweenPoint) continue
      
      let alpha = Math.min(1, Math.max(0, 1 - (_d / maxDistBetweenPoint)))
      
      c.save()
      c.globalAlpha = alpha
      c.lineWidth = maxLineWidth * alpha
      c.strokeStyle = `hsl(${ point.x + point.y }deg, 100%, 50%)`
      c.beginPath()
      c.moveTo(point.x, point.y)
      c.lineTo(_p.x, _p.y)
      c.stroke()
      c.restore()
   }
}

const loop = () => {
   frame++
   requestAnimationFrame(loop)
   
   resize()
   
   c.fillStyle = "#000"
   c.fillRect(0, 0, canvas.width, canvas.height)
   
   
   c.fillStyle = '#fff'
   points.forEach(point => {
      
      if (renderPoints) {
         c.beginPath()
         c.arc(point.x, point.y, pointRadius, 0, Math.PI * 2)
         c.fill()
      }
      
      point.x += point.velocity.x
      point.y += point.velocity.y
      
      if (point.x < -2) {
         point.x = 0
         point.velocity.x = -point.velocity.x
      }
      
      if (point.x > canvas.width + 2) {
         point.x = canvas.width
         point.velocity.x = -point.velocity.x
      }
      
      if (point.y < -2) {
         point.y = 0
         point.velocity.y = -point.velocity.y
      }
      
      if (point.y > canvas.height + 2) {
         point.y = canvas.height
         point.velocity.y = -point.velocity.y
      }
      
      renderLines(point)
   })
   
   c.save()
   c.globalCompositeOperation = "screen"
   c.filter = "blur(4px)"
   c.drawImage(canvas, 0, 0)
   c.restore()
   
   if (bokehBackground) {
      c.save()
      c.globalCompositeOperation = "screen"
      c.filter = "blur(20px)"
      c.scale(-1, 1)
      c.drawImage(canvas, -canvas.width, 0)
      c.restore()
   }
}

resize()

for (let i = 0; i < pointsCount; i++) {
   points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      velocity: {
         x: -pointVelocity + Math.random() * pointVelocity * 2,
         y: -pointVelocity + Math.random() * pointVelocity * 2
      }
   })
}

loop()
function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
