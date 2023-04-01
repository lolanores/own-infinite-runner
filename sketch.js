var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_stop;
var ground, invisibleGround, groundImage;
var obstacle;

var score=0;

var gameOver, restart;



function preload(){
  girl =   loadAnimation("Litlegirlbycicle.png");
  girl_stop = loadAnimation("litlegirlbicicleta.jpeg");
  obstacle = loadAnimation("obstacle.grass.png")
  groundImage = loadImage("groundbicicleta.png");
  
  
  gameOverImg = loadImage("seacaboeljuego.png");
  restartImg = loadImage("resetgame");

function setup() {
  createCanvas(600, 200);
  obstacle = createSprite(80,110,30,60);
  girl = createSprite(50,180,20,50);
  
  girl.addAnimation("cycling", girl);
  girl_stop.addAnimation("stop", girl_stop);
  girl.scale = 0.5;
  
  obstacle.addAnimation("obstacle", obstacle)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundbicicleta);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(seacaboeljuego);
  
  restart = createSprite(300,140);
  restart.addImage(resetgame);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;
}

function draw() {
  //girl.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && girl.y >= 159) {
     girl.velocityY = -12;
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   girl.collide(invisibleGround);

   spawnObstacle;
  
    if(obstacle.isTouching(girl)){
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //change the girl animation
    girl.changeAnimation("stop",girl_stop);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

  }
  

function spawnObstacle() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);

    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  girl.changeAnimation("cycling",girl);
  
 
  
  score = 0;
  
}