var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy,boyImg;
var backgroundImg;
var ground, invisibleGround;
var obstaclesGroup,obstacleImg;
var score;
var gameOver,gameOverImg;

function preload(){
  boyImg = loadImage("cycle.png");
  obstacleImg = loadImage("stone.png");
  backgroundImg = loadImage("background.jpg");
  gameOverImg = loadImage("game over.jpg");
}

function setup() {
  createCanvas(600, 200);


  ground = createSprite(300,30);
  ground.addImage(backgroundImg);
  ground.scale = 2;
  ground.x = ground.width /2;
  boy = createSprite(10,160);
  boy.addImage(boyImg);
  boy.scale = 0.2;
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  gameOver = createSprite(100,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.1;
  obstaclesGroup = createGroup();
  score = 0;
}

function draw() {
  camera.x = boy.x;
 background(255);
  fill(0);
  noStroke();
  textSize(10);
  text("Score: "+ score, 230,20);
  if(gameState === PLAY){
    gameOver.visible = false;
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
    }
    boy.velocityY = boy.velocityY + 0.8
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     gameOver.visible = true;
      ground.velocityX = 0;
      boy.velocityX = 0;   
    obstaclesGroup.setLifetimeEach(-1);   
     obstaclesGroup.setVelocityXEach(0);
   }
  boy.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,160);
   obstacle.addImage(obstacleImg);
   obstacle.velocityX = -(6 + score/100);  
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}
