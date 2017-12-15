var guns = {
  "shotgun": {
    "clip": 8, // 8 rounds per clip
    "reload": 6, // 6s reload time
    "delay": .2, // 2s between shots
    "bullet": { // bullet behaviour
      "speed": 25, 
      "width": 5, 
      "height": 5, 
      "color": "#FFF", 
      "start": {
        "l": {"x": -25,"y":0},
        "r": {"x": -25,"y":-8}
      }
    },
    "color": "#000",
    "width": 38,
    "height": 2,
    "rects": {
      "left": [
        {x: 0, y:0, w: 5, h: 3},
        {x: 5, y:0, w: 15, h: 4},
        {x: 20, y:0, w: 7, h: 2},
        {x: 27, y:0, w: 3, h: 5},
        {x: 30, y:0, w: 8, h: 7}
      ],
      "right": [
        {x: 70, y:0, w: 5, h: 3},
        {x: 55, y:0, w: 15, h: 4},
        {x: 48, y:0, w: 7, h: 2},
        {x: 45, y:0, w: 3, h: 5},
        {x: 37, y:0, w: 8, h: 7}
      ],
    },
    "arms": {
      "left": [
        {x: 10, y: 2, w: 7, h: 3},
        {x: 20, y: 2, w: 7, h: 4},
        {x: 25, y: 5, w: 15, h: 3}
      ],
      "right": [
        {x: 58, y: 2, w: 7, h: 3},
        {x: 48, y: 2, w: 7, h: 4},
        {x: 35, y: 5, w: 15, h: 3}
      ]
    }
  },
  "pistol": {
    "clip": 8, // 8 rounds per clip
    "reload": 6, // 6s reload time
    "delay": 10, // 2s between shots
    "bullet": { // bullet behaviour
      "speed": 25, 
      "width": 5, 
      "height": 5, 
      "color": "#FFF", 
      "start": {
        "l": {"x": -25,"y":0},
        "r": {"x": -25,"y":-8}
      }
    },
    "color": "#000",
    "width": 30,
    "height": 2,
    "rects": {
      "left": [
        {x: 0, y:0, w: 6, h: 3},
        {x: 6, y:0, w: 5, h: 2},
        {x: 9, y:2, w: 2, h: 5},
        {x: 7, y:3, w: 2, h: 4}
      ],
      "right": [
        {x: 0, y:0, w: 6, h: 3},
        {x: 6, y:0, w: 5, h: 2},
        {x: 9, y:2, w: 2, h: 5},
        {x: 7, y:3, w: 2, h: 4}
      ],
    },
    "arms": {
      "left": [
        {x: 6, y: 2, w: 6, h: 4},
        {x: 12, y: 3, w: 20, h: 3},
        {x: 10, y: 0, w: 11, h: 3}
      ],
      "right": [
        {x: 6, y: 2, w: 6, h: 4},
        {x: 12, y: 3, w: 20, h: 3},
        {x: 10, y: 0, w: 11, h: 3}
      ]
    }
  }
};