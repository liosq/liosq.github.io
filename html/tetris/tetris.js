const ROW_LIMIT = 32,
  COL_LIMIT = 32,
  EXTEND = 3,
  BLOCKS = {
    'O': [[3, 3]],
    'T': [[2, 7, 0], [2, 3, 2], [0, 7, 2], [2, 6, 2]],
    'I': [[4, 4, 4, 4], [0, 15, 0, 0]],
    'L': [[6, 2, 2], [1, 7, 0], [4, 4, 6], [7, 4, 0]],
    'J': [[6, 4, 4], [7, 1, 0], [2, 2, 6], [4, 7, 0]],
    'Z': [[6, 3, 0], [1, 3, 2]],
    'S': [[3, 6, 0], [2, 3, 1]]
  }

let RANDSTR = '',
  BASE_ROWS,
  BASE_COLS,
  MOVING_ROW,
  MOVING_COL,
  MOVING_INFO,
  EMPTY = 0,
  RIGHT = 1,
  SPEED,
  LEFT,
  FULL,
  CELL_W,
  CELL_H,
  BLOCK_COLOR

let screen,
  screen_ctx,
  moving_cells,
  base_cells,
  cur_block,
  flash,
  game_on

$(() => {
  bindElems()
  bindEvents()
})

function bindElems() {
  screen = $('#CurrentBlocks')[0]
  screen_ctx = screen.getContext('2d')
  $('#Start').on('click', () => {
    clearInterval(flash)
    initCells()
  })
}

function bindEvents() {
  $(document).keydown(key => {
    // console.log(key.code);
    switch (key.code) {
      case 'ArrowRight':
        blockMove(false)
        break
      case 'ArrowLeft':
        blockMove(true)
        break
      case 'ArrowUp':
        blockSpin()
        break
      case 'ArrowDown':
        blockDown()
        break
      case 'KeyP':
        gamePauseOrStart()
        break
      case 'KeyR':
        clearInterval(flash)
        initCells()
        break
    }
  })
}

function initInterval() {
  return setInterval(() => {
    drawAllCells()
    blockDown()
  }, 300 * Math.log2(SPEED))
}

function initCells(rows = 16, cols = 10, speed = 2) {
  // 限制行列数
  rows = Math.min(rows, ROW_LIMIT)
  cols = Math.min(cols, COL_LIMIT)
  // 变量初始化
  for (let key in BLOCKS) {
    RANDSTR += key
  }
  moving_cells = new Array(rows + EXTEND).fill(0)
  base_cells = new Array(rows).fill(0)
  FULL = (1 << cols) - 1
  LEFT = (FULL >> 1) + 1
  BASE_ROWS = rows
  BASE_COLS = cols
  SPEED = speed
  const BOX = $('.game-content')
  screen.width = BOX.width()
  screen.height = BOX.height()
  CELL_W = BOX.width() / cols
  CELL_H = BOX.height() / rows
  // 随机生成方块
  generateBlock()
  drawAllCells()
  // 设置刷新频率
  flash = initInterval()
  game_on = true
}

function drawAllCells() {
  screen_ctx.beginPath()
  screen_ctx.clearRect(0, 0, screen.width, screen.height)
  screen_ctx.fillStyle = BLOCK_COLOR
  drawCells(moving_cells, EXTEND)
  drawCells(base_cells)
  screen_ctx.closePath()
}

function drawCells(cells, start = 0) {
  const LENGTH = cells.length
  for (let r = start; r < LENGTH; r++) {
    let c = 0
    for (let b = (FULL + 1) >> 1; b >= 1; b >>= 1) {
      if (cells[r] & b) {
        screen_ctx.fillRect(c * CELL_W, (r - start) * CELL_H, CELL_W, CELL_H)
      }
      c++
    }
  }
}

function randomColor(seed) {
  return (seed * 49297 + 9301).toString(16)
}

function generateBlock() {
  MOVING_INFO = {
    type: RANDSTR[Math.floor(Math.random() * RANDSTR.length)],
    status: 0
  }
  MOVING_COL = (BASE_COLS >> 1) - 1
  let block = BLOCKS[MOVING_INFO.type][MOVING_INFO.status].map(num => num << MOVING_COL)
  MOVING_ROW = EXTEND - block.length + 1
  if (block[block.length - 1] & base_cells[0]) {
    gameOver()
    return
  }
  block.forEach((num, index) => {
    moving_cells[index + MOVING_ROW] = num
  })
  BLOCK_COLOR = '#215496cc'
}

function blockMove(left) {
  let move = (left ? num => num << 1 : num => num >> 1)
  if (isOverEdge(moving_cells, move)) return
  for (let i = 0; i < BASE_ROWS + EXTEND; i++) {
    if (i >= EXTEND && move(moving_cells[i]) & base_cells[i - EXTEND]) return
  }
  for (let i = 0; i < BASE_ROWS + EXTEND; i++) {
    moving_cells[i] = move(moving_cells[i])
  }
  drawAllCells()
  MOVING_COL += (left << 1) - 1
}

function blockDown() {
  if (moving_cells[BASE_ROWS + EXTEND - 1] > 0) {
    toBaseBlock()
    generateBlock()
    drawAllCells()
    return
  }
  moving_cells.unshift(moving_cells.pop())
  MOVING_ROW++
  if (isCracked(moving_cells, base_cells, EXTEND)) {
    moving_cells.push(moving_cells.shift())
    toBaseBlock()
    generateBlock()
  }
  drawAllCells()
}

function toBaseBlock() {
  for (let i = 0; i < BASE_ROWS; i++) {
    base_cells[i] += moving_cells[i + EXTEND]
    moving_cells[i + EXTEND] = 0
    if (base_cells[i] === FULL) lineClear(i)
  }
}

function lineClear(index) {
  base_cells.splice(index, 1)
  base_cells.unshift(0)

}

function isCracked(cells_1, cells_2, gap_1 = 0, gap_2 = 0) {
  const LENGTH = Math.min(cells_1.length, cells_2.length)
  for (let i = 0; i < LENGTH; i++) {
    if (cells_1[i + gap_1] & cells_2[i + gap_2]) return true
  }
  return false
}

function isOverEdge(cells, move, step = 1) {
  return cells.some(num => {
    const RESULT = move(num),
      BASE = 1 << step
    return (RESULT > num ? RESULT > FULL : num % BASE > 0)
  })
}

function gameOver() {
  clearInterval(flash)
  game_on = false
  alert('游戏结束');
}

function gamePauseOrStart() {
  if (game_on) clearInterval(flash)
  else flash = initInterval()
  game_on ^= true
}

function blockSpin() {
  let blocks = BLOCKS[MOVING_INFO.type],
    block = blocks[(MOVING_INFO.status + 1) % blocks.length],
    move = (MOVING_COL > 0 ? num => num << MOVING_COL : num => num >> -MOVING_COL)
  if (MOVING_ROW < EXTEND || block === undefined || isCracked(block, base_cells, 0, MOVING_ROW - EXTEND) || isOverEdge(block, move, Math.abs(MOVING_COL))) return
  MOVING_INFO.status = (MOVING_INFO.status + 1) % blocks.length
  block.forEach((num, index) => {
    moving_cells[index + MOVING_ROW] = move(num)
  })
  drawAllCells()
}