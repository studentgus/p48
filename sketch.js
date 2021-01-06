var plane1Img;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var bullet_counter = 0;
var B = [];
var enemies;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
function preload(){
  bgImg = loadImage("bg.png");
  plane1Img = loadAnimation("plane1.png","plane2.png");
  enemy1 = loadAnimation("1.png","2.png","3.png","4.png","5.png");
  enemy2 = loadAnimation("1a.png","2a.png","3a.png","4a.png","5a.png");
  enemy3 = loadAnimation("1b.png","2b.png","3b.png","4b.png","5b.png");
  bullets = loadAnimation("Bullet (1).png","Bullet (2).png","Bullet (3).png","Bullet (4).png","Bullet (5).png");
  goImg = loadImage("go.png");
  resetImg = loadImage("r.png");
}

function setup(){
  createCanvas(500,500);
//background  
  bg = createSprite(250,250,20,20);
  bg.addImage(bgImg);
  bg.scale = 0.7;
  
//player
  plane = createSprite(30,150,20,20);
  plane.addAnimation("plane",plane1Img);
  plane.scale = 0.1;

  gameOver = createSprite(width/2,height/2-40,20,20);
  gameOver.addImage(goImg);
  gameOver.scale = 0.1;

  restart = createSprite(width/2,height/2,20,20);
  restart.addImage(resetImg);
  restart.scale = 0.1;
  
  enemies = new Group();
  score = 0;

}

function draw(){
  background(0);

if(gameState === PLAY) {
 
  //score = score + Math.round((frameCount/93));
  bg.velocityX = -1;
  gameOver.visible = false;
  restart.visible = false;

//infinite background
if (bg.x<0){
  bg.x = 300
}
//control for the player
plane.y = mouseY;

/*if (keyIsDown("space")){
  createBulletsinMotion();
}*/
//creating enemies
tealEnemy();
greenEnemy();
purpleEnemy();


if (bullet_counter>0){
enemies.collide(B[bullet_counter],explosion);
//score=score+1
}

if(enemies.isTouching(plane)){
  gameState = END;
}
if(gameState === END) {
  bg.velocityX = 0;
  enemies.setVelocityXEach(0);
  enemies.setLifetimeEach(-1);
  gameOver.visible = true;
  restart.visible = true;


}

}
drawSprites();
textSize(20);
fill("red");
textFont("Roboto");
stroke("red");
text ("Score: "+ score, width/2+150,30);

}

function reset(){
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  frameCount = 0;
  enemies.destroyEach();
}
function keyPressed(){
  if(gameState === PLAY) {
  if (keyCode === 32){
    createBulletsinMotion();
  }
 
  }
  if(gameState === PLAY) {
  if(keyCode === 72){
    reset();
  }
}
}
 
 function tealEnemy(){
   if (frameCount %120===0){
    e1 = createSprite(600,150,20,20);
    e1.addAnimation("enemy1",enemy1);
    e1.scale = 0.1;
    e1.velocityX = -5;
    e1.y = random(10, 400);
    e1.liftime = 600/4;
    enemies.add(e1);
   }
 }
 
 function purpleEnemy(){
  if (frameCount %100===0){
    e2 = createSprite(600,150,20,20);
    e2.addAnimation("enemy2",enemy2);
    e2.scale = 0.1;
   e2.velocityX = -4;
   e2.lifetime=600/4
   e2.y = random(10, 400);
enemies.add(e2);
  }
}

function greenEnemy(){
  if (frameCount %120===0){
    e3 = createSprite(600,150,20,20);
    e3.addAnimation("enemy3",enemy3);
    e3.scale = 0.1;  
   e3.velocityX = -4;
   e3.lifetime=600/4
   e3.y = random(10, 400);
  enemies.add(e3);
  }
}
function createBulletsinMotion() {
  bullet_counter++;
  B[bullet_counter]  = createSprite(30,150,20,20);
  B[bullet_counter].addAnimation("b",bullets);
  B[bullet_counter].scale = 0.2;
  B[bullet_counter].velocityX = 10;
  B[bullet_counter].y = plane.y;
  B[bullet_counter].lifetime = 600/10;


}

function explosion(spriteA, spriteB){
spriteA.remove();
spriteB.remove();
score= score+1;
}



