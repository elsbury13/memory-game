var memoryArray = [
  'img/1443870506.jpg', 'img/1443870506.jpg',
  'img/1443870522.jpg', 'img/1443870522.jpg',
  'img/1443870547.jpg', 'img/1443870547.jpg',
  'img/1443870558.jpg', 'img/1443870558.jpg',
  'img/1443870582.jpg', 'img/1443870582.jpg',
  'img/1443870593.jpg', 'img/1443870593.jpg',
  'img/1443870643.jpg', 'img/1443870643.jpg',
  'img/1443870656.jpg', 'img/1443870656.jpg',
  'img/1443870669.jpg', 'img/1443870669.jpg',
  'img/1443870688.jpg', 'img/1443870688.jpg',
  'img/1443870699.jpg', 'img/1443870699.jpg',
  'img/1443870713.jpg', 'img/1443870713.jpg',
  'img/1443870724.jpg', 'img/1443870724.jpg'
]
var memoryValues = []
var memoryTileIds = []
var tilesFlipped = 0
var attempts = document.getElementById('attempts')
var score = document.getElementById('score')

Array.prototype.memoryTileSuffle = function() {
  var i = this.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i+1))
    temp = this[j]
    this[j] = this[i]
    this[i] = temp;
  }
}

function newBoard() {
  tilesFilpped = 0
  attempts.innerHTML = 0
  score.innerHTML = 0
  var output = ''
  memoryArray.memoryTileSuffle()
  for (var i = 0; i < memoryArray.length; i++) {
    output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this, \'' + memoryArray[i] + '\')"></div>'
  }
  document.getElementById('memory-board').innerHTML = output
}

function memoryFlipTile(tile, val) {
  if (tile.innerHTML == '' && memoryValues.length < 2){
    tile.style.background = '#FFF';
    tile.style.background = 'url(' + val + ') no-repeat'
    tile.style.backgroundPosition = 'center'
    tile.style.backgroundSize = 'cover'
    tile.innerHTML = ''
    if (memoryValues.length == 0) {
      memoryValues.push(val)
      memoryTileIds.push(tile.id)
    } else if (memoryValues.length == 1) {
      memoryValues.push(val)
      memoryTileIds.push(tile.id)
      if (memoryValues[0] == memoryValues[1]) {
        tilesFlipped += 2
        score.innerHTML = Number(score.innerHTML) + 1;
        attempts.innerHTML = Number(attempts.innerHTML) + 1;
        // Clear both arrays
        memoryValues = []
        memoryTileIds = []
        // Check to see if the whole board is cleared
        if (tilesFlipped == memoryArray.length) {
          alert('Board cleared... generating new board')
          document.getElementById('memory-board').innerHTML = ''
          newBoard()
        }
      } else {
        function flip2Back(){
          // Flip the 2 tiles back over
          var tile1 = document.getElementById(memoryTileIds[0])
          var tile2 = document.getElementById(memoryTileIds[1])
          tile1.style.background = 'url(img/BristolBilbao.jpg) no-repeat'
          tile1.style.backgroundPosition = 'center'
          tile1.style.backgroundSize = 'cover'
          tile2.style.background = 'url(img/BristolBilbao.jpg) no-repeat'
          tile2.style.backgroundPosition = 'center'
          tile2.style.backgroundSize = 'cover'
          tile1.innerHTML = ''
          tile2.innerHTML = ''
          // Clear both arrays
          memoryValues = []
          memoryTileIds = []
          attempts.innerHTML = Number(attempts.innerHTML) + 1;
        }
        setTimeout(flip2Back, 700)
      }
    }
  }
}

newBoard()
