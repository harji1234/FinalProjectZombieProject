var shooter
var zombie
var zombieImg
var shooterImg
var shotterImg2
var bg
var bulletImg
var bullet
var zombieGroup
var bulletGroup
var kills=0
var health=100
var gameState=1
var gunshot
var die
//var visibility=255
function preload() {
  bg=loadImage("background.jpg")
  shooterImg=loadAnimation("s1.png")
  shooterImg2=loadAnimation("s2.png","s3.png")
  zombieImg=loadAnimation("z1.png","z2.png")
  bulletImg=loadImage("bullet.png")
  gunshot=loadSound("gunshot.mp3")
  die=loadSound("die.mp3")
}
function setup() {
  createCanvas(800,400);
  shooter=createSprite(50,300,50,50)
  shooter.addAnimation("standing",shooterImg)
  shooter.addAnimation("walking",shooterImg2)
  shooter.scale=0.2
  bulletGroup= new Group()
  zombieGroup= new Group()
}

function draw() {
  background(bg);  
  drawSprites();
  textSize(25)
  fill("Red")
  text("Kills:"+ kills,700,40)
  textSize(25)
  fill("Green")
  text("Health:"+ health,30,40)
  if(gameState===1) {

  
  if(keyWentDown(RIGHT_ARROW)) {
    shooter.changeAnimation("walking",shooterImg2)
    shooter.x+=10
  }
  if(keyWentUp(RIGHT_ARROW)) {
    shooter.changeAnimation("standing",shooterImg)
  }
  spawnZombie();
  if(keyDown("space")) {
    gunshot.play();
    spawnBullet();
  }
  for(var i=0;i<bulletGroup.length;i++) {
    if(bulletGroup.isTouching(zombieGroup)) {
      zombieGroup.get(i).tint="rgba(255,255,255,0.5)"
      zombieGroup.get(i).lifetime=15
      die.play();
      kills+=1
      //tint(0,visibility)
      //image(zombieImg,zombieGroup.get(i).x,zombieGroup.get(i).)
      bulletGroup.destroyEach()
    }
  }
  for(var i = 0; i < zombieGroup.length; i++) {
    if(zombieGroup.isTouching(shooter)) {
      decreaseHealth();
      zombieGroup.get(i).destroy();
    }
  }
  if(health===0) {
    gameState=0;
  }
}
if(gameState===0) {
  reset();
}
  //visibility-=5
}
function reset() {
  fill("Black")
  textSize(40)
  stroke("Black")
  strokeWeight(3.5)
  text("You Have Failed To Save The Earth",100,200)
}
function spawnZombie() {
  if(frameCount%150===0) {
    zombie=createSprite(width,300,50,50)
    zombie.addAnimation("walking",zombieImg)
    zombie.velocityX=-2
    zombie.scale=0.2
    zombieGroup.add(zombie)
    zombie.lifetime=350
  }
}
function spawnBullet() {
  bullet=createSprite(10,10,10,10)
  bullet.x=shooter.x+45
  bullet.y=shooter.y-20
  bullet.velocityX=3
  bullet.addImage(bulletImg)
  bullet.scale=0.04
  bulletGroup.add(bullet)
  bullet.lifetime=250
}
function decreaseHealth() {
  health-=10
}

