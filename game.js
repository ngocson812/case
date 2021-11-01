//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0,4,6,1],
})

// Speed identifiers
const MOVE_SPEED = 130
const JUMP_FORCE = 380
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 25

// Game logic

let isJumping = true

loadSprite('coin', 'https://i.imgur.com/wbKxhcd.png')
loadSprite('evil-shroom', 'https://i.imgur.com/KPO3fR9.png')
loadSprite('brick', 'https://i.imgur.com/pogC9x5.png')
loadSprite('block', 'https://i.imgur.com/M6rwarW.png')
loadSprite('mario', 'https://2.pixiecdn.com/sprites/162522/original.png', { sliceX: 1.2, sliceY: 1.2})
loadSprite('mushroom', 'data:image/png;base64,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')
loadSprite('surprise', 'https://i.imgur.com/gesQ1KP.png')
loadSprite('unboxed', 'https://i.imgur.com/bdrLpi6.png')
loadSprite('pipe-top-left', 'https://i.imgur.com/ReTPiWY.png')
loadSprite('pipe-top-right', 'https://i.imgur.com/hj2GK4n.png')
loadSprite('pipe-bottom-left', 'https://i.imgur.com/c1cYSbt.png')
loadSprite('pipe-bottom-right', 'https://i.imgur.com/nqQ79eI.png')

loadSprite('blue-block', 'https://i.imgur.com/fVscIbn.png')
loadSprite('blue-brick', 'https://i.imgur.com/3e5YRQd.png')
loadSprite('blue-steel', 'https://i.imgur.com/gqVoI2b.png')
loadSprite('blue-evil-shroom', 'https://i.imgur.com/SvV4ueD.png')
loadSprite('blue-surprise', 'https://i.imgur.com/RMqCc1G.png')



scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      '                                       ',
      '                                       ',
      '                                       ',
      '                                       ',
      '                                       ',
      '     %   =*=%=                         ',
      '                                       ',
      '                             -+        ',
      '                  ^  ^   ^   ()        ',
      '===============================   =====',
    ],
    [
      '£                                        £',
      '£                                        £',
      '£                                        £',
      '£                                        £',
      '£                                        £',
      '£        @@@@@@              x x  x      £',
      '£                          x x x  x      £',
      '£                        x x x x  x   -+ £',
      '£           z    z   z  x x x x x  x  () £',
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    ]
  ]

  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],
    '$': [sprite('coin'), 'coin'],
    '%': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
    '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
    '^': [sprite('evil-shroom'), solid(), 'dangerous'],
    '#': [sprite('mushroom'), solid(), 'mushroom', body(), scale(0.05)],
    '!': [sprite('blue-block'), solid(), scale(0.5)],
    '£': [sprite('blue-brick'), solid(), scale(0.5)],
    'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
    '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
    'x': [sprite('blue-steel'), solid(), scale(0.5)],

  }

  const gameLevel = addLevel(maps[level], levelCfg)

  const scoreLabel = add([
    text(score),
    pos(30, 6),
    layer('ui'),
    {
      value: score,
    }
  ])

  add([text('level ' + parseInt(level + 1) ), pos(40, 6)])
  
  function big() {
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          timer -= dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        this.scale = vec2(0.15)
        CURRENT_JUMP_FORCE = JUMP_FORCE
        timer = 0
        isBig = false
      },
      biggify(time) {
        this.scale = vec2(0.3)
        timer = time
        isBig = true
      },
    }
  }

  const player = add([
    sprite('mario'), solid(),
    scale(0.15),
    pos(30, 0),
    body(),
    big(),
    origin('bot')
  ])

  action('mushroom', function (m) {
    m.move(20, 0)
  })

  player.on("headbump", function (obj) {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
  })

  player.collides('mushroom', function (m) {
    destroy(m)
    player.biggify(6)
  })

  player.collides('coin', function (c) {
    destroy(c)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  action('dangerous', function (d) {
    d.move(-ENEMY_SPEED, 0)
  })

  player.collides('dangerous', function (d) {
    if (isJumping) {
      destroy(d)
    } else {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.action(function (){
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value})
    }
  })

  player.collides('pipe', function () {
    keyPress('down', function () {
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value
      })
    })
  })

  keyDown('left', function () {
    player.move(-MOVE_SPEED, 0)
  })

  keyDown('right', function () {
    player.move(MOVE_SPEED, 0)
  })

  player.action(function () {
    if(player.grounded()) {
      isJumping = false
    }
  })

  keyPress('space', function () {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
    }
  })
})

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width()/2, height()/ 2)])
  window.location.reload();
})

start("game", { level: 0, score: 0})
