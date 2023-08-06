let enemyShips = [];
let enemyShots = [];
let shipShots = [];
let enemyExtras = [];
let powerups = [];
let crabImg, crab2Img, crabShotImg, shipImg, shipShotImg, ramShipImg, shieldMiddleImg, shieldLeftImg, shieldRightImg, shieldDead1Img, shieldDead2Img, shieldDead3Img, shieldDead4Img, shieldDead5Img, tripleImg, triple2Img, tripleShotImg, beamShot1Img, beamShot2Img, beamShipImg, octopusImg, octopus2Img, rocketImg, rocket2Img, rocketShotImg, rocketPUImg, doublePUImg, triplePUImg, shieldPUImg, shipRocketImg, shipShield;

function preload() {
  crabImg = loadImage('Enemies/Crab.png');
  crab2Img = loadImage('Enemies/Crab2.png');
  crabShotImg = loadImage('Enemies/CrabShot.png');
  shipImg = loadImage('Player/Ship.png');
  shipShotImg = loadImage('Player/ShipShot.png');
  ramShipImg = loadImage('Enemies/Ram.png');
  shieldMiddleImg = loadImage('Enemies/ShieldMiddle.png');
  shieldLeftImg = loadImage('Enemies/ShieldLeft.png');
  shieldRightImg = loadImage('Enemies/ShieldRight.png');
  shieldDead1Img = loadImage('Enemies/ShieldDead1.png');
  shieldDead2Img = loadImage('Enemies/ShieldDead2.png');
  shieldDead3Img = loadImage('Enemies/ShieldDead3.png');
  shieldDead4Img = loadImage('Enemies/ShieldDead4.png');
  shieldDead5Img = loadImage('Enemies/ShieldDead5.png');
  tripleImg = loadImage('Enemies/Triple.png');
  triple2Img = loadImage('Enemies/Triple2.png');
  tripleShotImg = loadImage('Enemies/TripleShot.png');
  beamShipImg = loadImage('Enemies/Beam.png');
  beamShot1Img = loadImage('Enemies/BeamShot1.png');
  beamShot2Img = loadImage('Enemies/BeamShot2.png');
  octopusImg = loadImage('Enemies/Octopus.png');
  octopus2Img = loadImage('Enemies/Octopus2.png');
  rocketImg = loadImage('Enemies/Rocket.png');
  rocket2Img = loadImage('Enemies/Rocket2.png');
  rocketShotImg = loadImage('Enemies/RocketShot.png');
  rocketPUImg = loadImage('Powerup/Rocket.png');
  doublePUImg = loadImage('Powerup/Double.png');
  triplePUImg = loadImage('Powerup/Triple.png');
  shieldPUImg = loadImage('Powerup/Shield.png');
  shipRocketImg = loadImage('Player/Rocket.png');
  shipShield = loadImage('Player/ShipShield.png');
}

const game = {
  round:0,
  rounds: [
    [10,3,[0,0,0,0,0,0,0,0,0,0]],
    [10,5,[1,0,0,0,1,1,0,0,0,1]],
    [10,5,[0,0,0,2,1,1,2,0,0,0]],
    [10,7,[1,1,1,0,2,2,0,1,1,1]],
    [20,10,[0,1,2,3,0,0,3,2,1,0,0,0,0,0,0,0,0,0,0,0]],
    [20,10,[0,1,4,1,0,0,1,4,1,0,0,4,1,1,1,1,1,1,4,0]],
    [20,10,[1,2,2,2,2,2,2,2,2,1,1,5,2,2,5,5,2,2,5,1]],
    [20,15,[3,1,1,3,1,3,1,6,1,3,1,1,3,1,3,6,1,3,1,3]],
    [30,20,[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,3,3,3,2,2,2,2,3,3,3]],
    [40,15,[4,1,4,0,6,6,0,4,1,4,2,2,3,3,3,3,3,3,2,2,0,0,0,0,2,2,0,0,0,0,5,5,5,5,5,5,5,5,5,5]]
    ],
  positions: [
    [150, 25],
    [210, 25],
    [270, 25],
    [330, 25],
    [390, 25],
    [450, 25],
    [510, 25],
    [570, 25],
    [630, 25],
    [690, 25],
    [150, 85],
    [210, 85],
    [270, 85],
    [330, 85],
    [390, 85],
    [450, 85],
    [510, 85],
    [570, 85],
    [630, 85],
    [690, 85],
    [150, 145],
    [210, 145],
    [270, 145],
    [330, 145],
    [390, 145],
    [450, 145],
    [510, 145],
    [570, 145],
    [630, 145],
    [690, 145],
    [150, 205],
    [210, 205],
    [270, 205],
    [330, 205],
    [390, 205],
    [450, 205],
    [510, 205],
    [570, 205],
    [630, 205],
    [690, 205],
    [150, 265],
    [210, 265],
    [270, 265],
    [330, 265],
    [390, 265],
    [450, 265],
    [510, 265],
    [570, 265],
    [630, 265],
    [690, 265]
  ],
  displayRound() {
    stroke('white');
    text('Round ' + (this.round + 1), 10, 15);
  },
  gameOver() {
    if(player.lives <= 0) {
    game.round = 0;
    shipShots = [];
    enemyShots = [];
    enemyExtras = [];
    enemyShips = [];
    player.x = 890 / 2 - 17;
    player.y = 620 - 34;
    player.lives = 5;
    setEnemies();
    frameCount = 0;
    alien.base = 120;
    }
  },
  nextRound() {
    if (enemyShips.length === 0 && enemyShots.length === 0) {
      this.round++;
      setEnemies();
      enemyExtras = [];
      frameCount = 0;
      alien.base = 120;
    }
  },
  activate() {
    this.displayRound();
    this.gameOver();
    this.nextRound();
  }
}

const alien = {
  move: .5,
  base: 120,
  changeDir() {
    if(this.base === 240) {
      this.move = -.5;
    } else if(this.base === 0) {
      this.move = .5;
    }
    this.base += this.move;
  },
  activate() {
    this.changeDir();
  }
}

class AlienShip {
  constructor(xCoord, yCoord, idNum, wid, hei, fireChance) {
    this.x = xCoord;
    this.y = yCoord;
    this.id = idNum;
    this.width = wid;
    this.height = hei;
    this.fireProb = fireChance;
    this.alive = true;
    this.shotCount = 1;
  }
  isShot() {
    for (let i = 0; i < shipShots.length; i++) {
      let shot = shipShots[i];

      let sTop = shot.y;
      let sBottom = shot.y + shot.height;
      let sLeft = shot.x;
      let sRight = shot.x + shot.width;

      let aTop = this.y;
      let aBottom = this.y + this.height;
      let aLeft = this.x;
      let aRight = this.x + this.width;

      if (sTop < aBottom && sBottom > aTop && sLeft < aRight && sRight > aLeft) {
        this.alive = false;
        shot.alive = false;
        powerupChance(this.x, this.y);
      }
    }
  }
  move() {
    this.x += alien.move;
  }
  shoot() {
    if(this.shotCount !== 0 && enemyShots.length < game.rounds[game.round][1]) {
      let chance = Math.floor(Math.random() * 1000);
      if(chance <= this.fireProb) {
        enemyShots.push(new CrabShot(this.x + 25, this.y + 25, this.id));
        this.shotCount--;
      }
    }
  }
  ammo() {
    this.shotCount = 1;
    for(let i = 0; i < enemyShots.length; i++) {
      if(enemyShots[i].id === this.id) {
        this.shotCount--;
      }
    }
  }
}

class CrabShip extends AlienShip {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, idNum, 50, 50, 50);
    this.phase = 0;
  }
  phaseChange() {
    if(frameCount % 60 === 1) {
      this.phase++;
    }
  }
  activate() {
    this.isShot();
    this.move();
    this.shoot();
    this.ammo();
    this.phaseChange();
    if(this.phase % 2 === 0) {
      image(crabImg, this.x, this.y);
    } else {
      image(crab2Img, this.x, this.y);
    }
  }
}

class OctopusShip extends AlienShip {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, idNum, 50, 50, -2);
    this.phase = 0;
    this.lives = 3;
  }
  phaseChange() {
    if(frameCount % 60 === 1) {
      this.phase++;
    }
  }
  isShot() {
    for (let i = 0; i < shipShots.length; i++) {
      let shot = shipShots[i];

      let sTop = shot.y;
      let sBottom = shot.y + shot.height;
      let sLeft = shot.x;
      let sRight = shot.x + shot.width;

      let aTop = this.y;
      let aBottom = this.y + this.height;
      let aLeft = this.x;
      let aRight = this.x + this.width;

      if (sTop < aBottom && sBottom > aTop && sLeft < aRight && sRight > aLeft) {
        this.lives--;
        shot.alive = false;
      }
    }
    if(this.lives <= 0) {
      this.alive = false;
      powerupChance(this.x, this.y);
    }
  }
  activate() {
    this.isShot();
    this.move();
    this.phaseChange();
    if(this.phase % 2 === 0) {
      image(octopusImg, this.x, this.y);
    } else {
      image(octopus2Img, this.x, this.y);
    }
  }
}

class RamShip extends AlienShip {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, idNum, 50, 40, 10);
    this.originX = xCoord;
    this.originY = yCoord;
  }
  shoot() {
    if(this.shotCount !== 0 && enemyShots.length < game.rounds[game.round][1]) {
      let chance = Math.floor(Math.random() * 1000);
      if(chance <= this.fireProb) {
        enemyShots.push(new RamShot(this.x + 25, this.y + 25, this.id, this.originX, this.originY));
        this.shotCount--;
        this.alive = false;
      }
    }
  }
  activate() {
    this.isShot();
    this.move();
    this.shoot();
    image(ramShipImg, this.x, this.y);
  }
}
 
class ShieldShip extends AlienShip {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, idNum, 50, 50, 1);
    this.lives = 3;
    this.phase = 1;
  }
  phaseChange() {
    if(frameCount % 60 === 1) {
      this.phase++;
    }
  }
  isShot() {
    for (let i = 0; i < shipShots.length; i++) {
      let shot = shipShots[i];

      let sTop = shot.y;
      let sBottom = shot.y + shot.height;
      let sLeft = shot.x;
      let sRight = shot.x + shot.width;

      let aTop = this.y;
      let aBottom = this.y + this.height;
      let aLeft = this.x;
      let aRight = this.x + this.width;

      if (sTop < aBottom && sBottom > aTop && sLeft < aRight && sRight > aLeft) {
        this.lives--;
        shot.alive = false;
      }
    }
    if(this.lives <= 0) {
      this.alive = false;
      powerupChance(this.x, this.y);
    }
  }
  shoot() {
    if(this.shotCount !== 0 && enemyShots.length < game.rounds[game.round][1]) {
      let chance = Math.floor(Math.random() * 1000);
      if(chance <= this.fireProb) {
        enemyExtras.push(new ShieldShot(this.x + 25, this.y + 25, this.id, this.lives, this.phase));
        this.shotCount--;
        this.alive = false;
      }
    }
  }
  activate() {
    this.move();
    this.shoot();
    this.isShot();
    this.phaseChange();
    switch(this.phase % 4) {
      case 1:
        image(shieldLeftImg, this.x, this.y);
        break;
      case 2:
        image(shieldMiddleImg, this.x, this.y);
        break;
      case 3:
        image(shieldRightImg, this.x, this.y);
        break;
      case 0:
        image(shieldMiddleImg, this.x, this.y);
        break; 
    } 
  }
}

class TripleShip extends AlienShip {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, idNum, 50, 50, 20);
    this.phase = 0;
    this.lives = 4;
    this.shotCount = 3
  }
  isShot() {
    for (let i = 0; i < shipShots.length; i++) {
      let shot = shipShots[i];

      let sTop = shot.y;
      let sBottom = shot.y + shot.height;
      let sLeft = shot.x;
      let sRight = shot.x + shot.width;

      let aTop = this.y;
      let aBottom = this.y + this.height;
      let aLeft = this.x;
      let aRight = this.x + this.width;

      if (sTop < aBottom && sBottom > aTop && sLeft < aRight && sRight > aLeft) {
        this.lives--;
        shot.alive = false;
      }
    }
    if(this.lives === 1) {
      this.phase = 1;
    } else if(this.lives <= 0) {
      this.alive = false;
      powerupChance(this.x, this.y);
    }
  }
  shoot() {
    if(this.shotCount !== 0 && enemyShots.length < game.rounds[game.round][1]) {
      let chance = Math.floor(Math.random() * 1000);
      if(chance <= this.fireProb) {
        enemyShots.push(new TripleShot(this.x + 5, this.y + 45, this.id));
        enemyShots.push(new TripleShot(this.x + 21, this.y + 45, this.id));
        enemyShots.push(new TripleShot(this.x + 36, this.y + 45, this.id));
        this.shotCount -= 3;
      }
    }
  }
  ammo() {
    this.shotCount = 3;
    for(let i = 0; i < enemyShots.length; i++) {
      if(enemyShots[i].id === this.id) {
        this.shotCount--;
      }
    }
  }
  activate() {
    if(this.phase === 0) {
      this.isShot();
      this.move();
      image(tripleImg, this.x, this.y);
    } else {
      this.isShot();
      this.move();
      this.shoot();
      this.ammo();
      image(triple2Img, this.x, this.y);
    }
  }
}

class BeamShip extends AlienShip {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, idNum, 50, 49, 5);
  }
  shoot() {
    if(this.shotCount !== 0 && enemyShots.length < game.rounds[game.round][1]) {
      let chance = Math.floor(Math.random() * 1000);
      if(chance <= this.fireProb) {
        enemyExtras.push(new BeamExtra(this.x + 12, this.y + 49, this.id));
        this.shotCount--;
      }
    }
  }
  activate() {
    this.isShot();
    this.move();
    this.shoot();
    this.ammo();
    image(beamShipImg, this.x, this.y)
  }
}

class RocketShip extends AlienShip {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, idNum, 40, 45, 10);
    this.phase = 0;
  }
  shoot() {
    if(this.shotCount !== 0 && enemyShots.length < game.rounds[game.round][1]) {
      let chance = Math.floor(Math.random() * 1000);
      if(chance <= this.fireProb) {
        enemyShots.push(new RocketShot(this.x + 8, this.y + 43, this.id));
        this.shotCount--;
      }
    }
  }
  phaseChange() {
    if(frameCount % 60 === 1) {
      this.phase++;
    }
  }
  activate() {
    this.shoot();
    this.isShot();
    this.ammo();
    this.move();
    this.phaseChange();
    if(this.phase % 2 === 0) {
      image(rocketImg, this.x, this.y);
    } else {
      image(rocket2Img, this.x, this.y);
    }
  }
}

class GameShot {
  constructor(xCoord, yCoord, wid, hei) {
    this.x = xCoord;
    this.y = yCoord;
    this.width = wid;
    this.height = hei;
    this.alive = true;
  }
}

class PlayerShot extends GameShot {
  constructor(xCoord, yCoord) {
    super(xCoord, yCoord, 2, 8);
    this.speed = 10;
  }
  updatePos() {
    this.y -= this.speed;
  }
  activate() {
    this.updatePos();
    image(shipShotImg, this.x, this.y)
  }
}

class PlayerRocket extends GameShot {
  constructor(xCoord, yCoord) {
    super(xCoord, yCoord, 150, 13);
    this.speed = 15;
  }
  updatePos() {
    this.y -= this.speed;
  }
  activate() {
    this.updatePos();
    image(shipRocketImg, this.x, this.y);
  }
}

class AlienShot extends GameShot {
  constructor(xCoord, yCoord, wid, hei, idNum) {
    super(xCoord, yCoord, wid, hei);
    this.id = idNum;
  } 
}

class CrabShot extends AlienShot {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, 7, 15, idNum);
    this.speed = 5;
  }
  updatePos() {
    this.y += this.speed;
  }
  activate() {
    this.updatePos();
    image(crabShotImg, this.x, this.y);
  }
}

class RamShot extends AlienShot {
  constructor(xCoord, yCoord, idNum, xOrigin, yOrigin) {
    super(xCoord, yCoord, 50, 40, idNum);
    this.originX = xOrigin;
    this.originY = yOrigin;
    this.findPlayerX = (player.x - this.x < 0) ? ((player.x - this.x) / 50) : (player.x - this.x) / 50;
    this.findPlayerY = player.y / 50;
    this.aligned = false;
    this.alignY = this.originY / 60;
    this.startAlignment = false;
  }
  updatePos() {
    this.x += this.findPlayerX;
    this.y += this.findPlayerY;
  }
  isShot() {
    for (let i = 0; i < shipShots.length; i++) {
      let shot = shipShots[i];

      let sTop = shot.y;
      let sBottom = shot.y + shot.height;
      let sLeft = shot.x;
      let sRight = shot.x + shot.width;

      let aTop = this.y;
      let aBottom = this.y + this.height;
      let aLeft = this.x;
      let aRight = this.x + this.width;

      if (sTop < aBottom && sBottom > aTop && sLeft < aRight && sRight > aLeft) {
        this.alive = false;
        shot.alive = false;
      }
    }
  }
  realign() {
    if(this.y > 620) {
      this.y = -50;
      this.x = this.originX;
      this.aligned = true;
    }
  }
  transform() {
    if(this.startAlignment) {
      enemyShips.push(new RamShip(this.originX, this.originY, this.idNum));
      this.alive = false;
    }
  }
  startAlign() {
    if(alien.base === 120) {
      this.startAlignment = true;
    }
  }
  activate() {
    if(this.aligned) {
      this.startAlign();
      this.transform();
    } else {
      this.updatePos();
      this.isShot();
      this.realign();
    }
    image(ramShipImg, this.x, this.y);
  }
}

class ShieldShot extends AlienShot {
  constructor(xCoord, yCoord, idNum, life, phaseNum) {
    super(xCoord, yCoord, 50, 50, idNum);
    this.lives = life;
    this.findPosX = (player.x - this.x < 0) ? ((player.x - this.x) / 180) : (player.x - this.x) / 180;
    this.randomY = Math.floor(Math.random() * 200) + 300;
    this.findPosY = (this.randomY - this.y) / 180;
    this.phase = phaseNum;
  }
  updatePos() {
    this.x += this.findPosX;
    this.y += this.findPosY;
  }
  isShot() {
    for (let i = 0; i < shipShots.length; i++) {
      let shot = shipShots[i];

      let sTop = shot.y;
      let sBottom = shot.y + shot.height;
      let sLeft = shot.x;
      let sRight = shot.x + shot.width;

      let aTop = this.y;
      let aBottom = this.y + this.height;
      let aLeft = this.x;
      let aRight = this.x + this.width;

      if (sTop < aBottom && sBottom > aTop && sLeft < aRight && sRight > aLeft) {
        this.lives--;
        shot.alive = false;
      }
    }
    if(this.lives === 0) {
      this.alive = false;
    }
  }
  phaseChange() {
    if(frameCount % 60 === 1) {
      this.phase++;
    }
  }
  transform() {
    if(this.y >= this.randomY) {
      enemyExtras.push(new ShieldExtra(this.x - 25, this.y + 12.5));
      this.alive = false;
    }
  }
  activate() {
    this.updatePos();
    this.isShot();
    this.phaseChange();
    this.transform();
    switch(this.phase % 4) {
      case 1:
        image(shieldLeftImg, this.x, this.y);
        break;
      case 2:
        image(shieldMiddleImg, this.x, this.y);
        break;
      case 3:
        image(shieldRightImg, this.x, this.y);
        break;
      case 0:
        image(shieldMiddleImg, this.x, this.y);
        break; 
    }
  }
}

class TripleShot extends AlienShot {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, 10, 13, idNum);
    this.speed = 8;
  }
  updatePos() {
    this.y += this.speed;
  }
  activate() {
    this.updatePos();
    image(tripleShotImg, this.x, this.y);
  }
}

class BeamShot extends AlienShot {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, 25, 620, idNum);
    this.frameNum = frameCount;
  }
  updatePos() {
    let owner = enemyShips.findIndex(alien => alien.id === this.id);
    if(owner === -1) {
      this.alive = false;
    } else {
      this.x = enemyShips[owner].x + 12;
    }
  }
  duration() {
    if(this.frameNum + 240 <= frameCount) {
      this.alive = false;
    }
  }
  activate() {
    this.updatePos();
    this.duration();
    image(beamShot2Img, this.x, this.y)
  }
}

class RocketShot extends AlienShot {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, 23, 32, idNum);
    this.randAcc = (Math.floor(Math.random() * 5) + 1) / 5;
    this.speed = 1;
  }
  accel() {
    this.speed += this.randAcc;
  }
  updatePos() {
    this.y += this.speed;
  }
  activate() {
    this.accel();
    this.updatePos();
    image(rocketShotImg, this.x, this.y);
  }
}

class ShieldExtra {
  constructor(xCoord, yCoord) {
    this.x = xCoord;
    this.y = yCoord;
    this.width = 100;
    this.height = 25;
    this.lives = 10;
    this.alive = true;
  }
  isShot() {
    for (let i = 0; i < shipShots.length; i++) {
      let shot = shipShots[i];

      let sTop = shot.y;
      let sBottom = shot.y + shot.height;
      let sLeft = shot.x;
      let sRight = shot.x + shot.width;

      let aTop = this.y;
      let aBottom = this.y + this.height;
      let aLeft = this.x;
      let aRight = this.x + this.width;
      if (sTop < aBottom && sBottom > aTop && sLeft < aRight && sRight > aLeft) {
        this.lives--;
        shot.alive = false;
      }
    }
    if(this.lives === 0) {
      this.alive = false;
    }
  }
  activate() {
    this.isShot();
    if(this.lives > 8) {
      image(shieldDead1Img, this.x, this.y);
    } else if(this.lives > 6) {
      image(shieldDead2Img, this.x, this.y);
    } else if(this.lives > 4) {
      image(shieldDead3Img, this.x, this.y);
    } else if(this.lives > 2) {
      image(shieldDead4Img, this.x, this.y);
    } else {
      image(shieldDead5Img, this.x, this.y)
    }
  }
}

class BeamExtra extends AlienShot {
  constructor(xCoord, yCoord, idNum) {
    super(xCoord, yCoord, 25, 620, idNum);
    this.phase = 0;
    this.frameNum = frameCount;
  }
  updatePos() {
    let owner = enemyShips.findIndex(alien => alien.id === this.id);
    if(owner === -1) {
      this.alive = false;
    } else {
      this.x = enemyShips[owner].x + 12;
    }
  }
  phaseChange() {
    if(this.frameNum + 120 <= frameCount) {
      this.phase++;
      this.frameNum === frameCount;
    }
  }
  activate() {
    this.updatePos();
    if(this.phase === 0) {
      this.phaseChange();
      image(beamShot1Img, this.x, this.y);
    } else {
      this.alive = false;
      enemyShots.push(new BeamShot(this.x, this.y, this.id));
    }
  }
}

class Powerup {
  constructor(xCoord, yCoord, idNum) {
    this.x = xCoord;
    this.y = yCoord;
    this.width = 26;
    this.height = 26;
    this.id = idNum;
    this.speed = 5;
    this.power = '';
    this.alive = true;
  }
  updatePos() {
    this.y += this.speed;
  }
  isTouched() {
    let pTop = this.y;
    let pBottom = this.y + this.height;
    let pLeft = this.x;
    let pRight = this.x + this.width;

    let sTop = player.y;
    let sBottom = player.y + player.height;
    let sLeft = player.x;
    let sRight = player.x + player.width;

    if(pTop < sBottom && pBottom > sTop && pLeft < sRight && pRight > sLeft) {
      this.alive = false;
      player.power = this.power;
      player.powered = true;
    }
  }
  definePower() {
    if(this.id < 4) {
      this.power = 'rocket';
    } else if(this.id < 7) {
      this.power = 'double';
    } else if(this.id < 9) {
      this.power = 'shield';
    } else {
      this.power = 'triple';
    }
  }
  activate() {
    if(this.power === '') {
      this.definePower();
    }
    this.updatePos();
    this.isTouched();
    switch(this.power) {
      case 'rocket':
        image(rocketPUImg, this.x, this.y);
        break;
      case 'double':
        image(doublePUImg, this.x, this.y);
        break;
      case 'shield':
        image(shieldPUImg, this.x, this.y);
        break;
      case 'triple':
        image(triplePUImg, this.x, this.y);
        break;
    }
  }
}

const player = {
  x: 890 / 2 - 17,
  y: 620 - 34,
  lives: 5,
  speed: 5,
  shotCount: 2,
  shield:10,
  height: 34,
  width: 34,
  power:'',
  shooting: true,
  powered: false,
  frameNum: 0,
  isShot() {
    for (let i = 0; i < enemyShots.length; i++) {
      let shot = enemyShots[i];

      let sTop = shot.y;
      let sBottom = shot.y + shot.height;
      let sLeft = shot.x;
      let sRight = shot.x + shot.width;

      let pTop = this.y;
      let pBottom = this.y + this.height;
      let pLeft = this.x;
      let pRight = this.x + this.width;

      if (sTop < pBottom && sBottom > pTop && sLeft < pRight && sRight > pLeft) {
        if(this.power === 'shield') {
          if(this.shield > 0) {
            this.shield--;
          } else {
            this.power = '';
          }
        } else {
          this.lives--;
        }
        shot.alive = false;
      }
    }
  },
  move() {
    if (keyIsDown(37)) {
      this.x -= this.speed;
    } else if (keyIsDown(39)) {
      this.x += this.speed;
    }
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > 856) {
      this.x = 856;
    }
  },
  fire() {
    if(this.power === 'rocket') {
      if(shipShots.length < this.shotCount) {
        if(keyIsDown(32) && this.shooting) {
          this.shooting = false;
          shipShots.push(new PlayerRocket(this.x + 17, this.y));
          this.power = '';
        }
        if(!(keyIsDown(32))) {
          this.shooting = true;
        }
      }
    } else if(this.power === 'double') {
      this.shotCount = 4;
      if(shipShots.length < this.shotCount) {
        if(keyIsDown(32) && this.shooting) {
          this.shooting = false;
          shipShots.push(new PlayerShot(this.x + 5, this.y + 13));
          shipShots.push(new PlayerShot(this.x + 29, this.y + 13));
        }
        if(!(keyIsDown(32))) {
          this.shooting = true;
        }
      }
    } else if(this.power === 'triple') {
      this.shotCount = 4;
      if(shipShots.length < this.shotCount) {
        if(keyIsDown(32) && this.shooting) {
          this.shooting = false;
          shipShots.push(new PlayerShot(this.x + 5, this.y + 13));
          shipShots.push(new PlayerShot(this.x + 29, this.y + 13));
          shipShots.push(new PlayerShot(this.x + 17, this.y));
        }
        if(!(keyIsDown(32))) {
          this.shooting = true;
        }
      }
    } else {
      this.shotCount = 2;
      if(shipShots.length < this.shotCount) {
        if(keyIsDown(32) && this.shooting) {
          this.shooting = false;
          shipShots.push(new PlayerShot(this.x + 17, this.y));
        }
        if(!(keyIsDown(32))) {
          this.shooting = true;
        }
      }
    }
  },
  displayLives() {
    stroke('white');
    text('Lives: ' + this.lives, 840,15);
  },
  turnOnPower() {
    if(this.powered) {
      this.frameNum = frameCount;
      this.powered = false;
      this.shield = 10;
    }
    if(this.frameNum + 600 < frameCount) {
      this.power = '';
    }
  },
  activate() {
    this.isShot();
    this.move();
    if(this.power !== '') {
      this.turnOnPower();
    }
    this.fire();
    this.displayLives();
    if(this.power === 'shield') {
      image(shipShield, this.x, this.y);
    } else {
      image(shipImg, this.x, this.y);
    }
  }
}

function powerupChance(xCoord, yCoord) {
  let chance = Math.floor(Math.random() * 100);
  if(chance < 10) {
    powerups.push(new Powerup(xCoord, yCoord, chance));
  }
}

function setEnemies() {
  for(let i = 0; i < game.rounds[game.round][0]; i++) {
    let pos = game.positions[i];
    let dna = game.rounds[game.round][2][i];
    switch(dna) {
      case 0:
        enemyShips.push(new CrabShip(pos[0], pos[1], i));
        break;
      case 1:
        enemyShips.push(new RamShip(pos[0], pos[1], i));
        break;
      case 2:
        enemyShips.push(new ShieldShip(pos[0], pos[1], i));
        break;
      case 3:
        enemyShips.push(new TripleShip(pos[0], pos[1], i));
        break;
      case 4:
        enemyShips.push(new BeamShip(pos[0], pos[1], i));
        break;
      case 5:
        enemyShips.push(new OctopusShip(pos[0], pos[1], i));
        break;
      case 6:
        enemyShips.push(new RocketShip(pos[0], pos[1], i));
        break;
    }
  }
}

function updateEnemyShots() {
  for(let i = 0; i < enemyShots.length; i++) {
    enemyShots[i].activate();
  }
  enemyShots = enemyShots.filter(shot => shot.alive === true && shot.y < 620);
}

function updateShipShots() {
  for(let i = 0; i < shipShots.length; i++) {
    shipShots[i].activate();
  }
  shipShots = shipShots.filter(shot => shot.alive && shot.y >= 0);
}

function updateShip() {
  player.activate();
}

function updateEnemyShips() {
  for(let i = 0; i < enemyShips.length; i++) {
    enemyShips[i].activate();
  }
  enemyShips = enemyShips.filter(alien => alien.alive);
}

function updateEnemyExtras() {
  for(let i = 0; i < enemyExtras.length; i++) {
    enemyExtras[i].activate();
  }
  enemyExtras = enemyExtras.filter(alien => alien.alive);
}

function updatePowerups() {
  for(let i = 0; i < powerups.length; i++) {
    powerups[i].activate();
  }
  powerups = powerups.filter(power => power.alive);
}

function updateGame() {
  alien.activate();
  updateEnemyShots();
  updateShipShots();
  updateEnemyShips();
  updateEnemyExtras();
  updatePowerups();
  updateShip();
  game.activate();
}

function setup() {
  createCanvas(890,620);
  frameRate(60);
  setEnemies();
}

function draw() {
  background(0);
  updateGame();
}