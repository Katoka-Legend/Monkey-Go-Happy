var backgroundMusic;
var ground,groundImage;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var gameState = "start";
var score = 0;
var survivaltime = 0;

function preload(){
  
 monkey_running =loadAnimation("Monkey/sprite_0.png","Monkey/sprite_1.png","Monkey/sprite_2.png","Monkey/sprite_3.png","Monkey/sprite_4.png","Monkey/sprite_5.png","Monkey/sprite_6.png","Monkey/sprite_7.png","Monkey/sprite_8.png");
  
  // monkey_collided = loadImage ("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
 
  groundImage = loadImage("ground.jpg");
  
}

function setup() {
  
  createCanvas(1200,1200)
  
  monkey = createSprite(30,800,0,0);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.5;

  ground = createSprite(400,2000,10,1400);
  ground.addImage(groundImage);
  ground.scale = 10;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
 
}


function draw() {
  background("lightblue")
  
    ground.velocityX = -4;
   if (ground.x < 100){
      ground.x = 1200;
   }
   if(gameState !== "end"){
     spawnBananas();
     spawnObstacles();
     
    }
  if(gameState == "end"){
    textSize (50);
    text("Game Over",600,600);
      
    textSize (50);
    text("Press 'r' to restart",600,650);

  }
    if (keyDown("space") && monkey.y >= 200){
      monkey.velocityY = -10;
    }
    
    monkey.velocityY = monkey.velocityY + 0.3;
    
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 5;
    }
    
    survivaltime = Math.round(frameCount/frameRate())
    
   if (monkey.isTouching(obstacleGroup)){
  
     obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    

     ground.velocityX = 0;
     monkey.velocityY = 0
     gameState = "end"
    
    
     survivaltime = 0;
     
    if (keyDown ("r")){
      reset();
    }
   }
  
  monkey.collide(ground);
  
  drawSprites();
  
   
  textSize (50);
  text("Bananas collected : "+ score,80,40);
  
  textSize (50);
  text("Survival Time : " + survivaltime,80,100)

  }
 
function spawnBananas(){
  if (frameCount % 80 === 0){
 var banana = createSprite (700,Math.round(random (200,600)) ,10,10 );
 banana.addImage (bananaImage);
  banana.scale = 0.25;
    
  banana.velocityX = -4;
    
banana.lifetime = 250;
    
    bananaGroup.add (banana);
  }
}

function spawnObstacles(){
  if (frameCount % 200 === 0){
    var obstacle = createSprite (680,1000 ,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale= 0.5;
    
    obstacle.velocityX = -4;
    
    obstacle.lifetime = 250;
    
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
  survivaltime = 0;
  gameState = "start"
}