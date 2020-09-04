
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodG ,obG
var score;
var ground;
var play = 1;
var end = 0;
var gameState = play;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(200,210,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  monkey.debug = false;
  monkey.setCollider("circle",0,140,150);
  monkey.addAnimation("hurt",monkey_stop);
  
  obG = createGroup();
  FoodG = createGroup();
   
  ground = createSprite(300,280,600,96.8);
  ground.shapeColor = ("green");
  
  score = 0;
  var survivalTime = 0
  
}

function draw() {
  background("white");
  monkey.collide(ground);
  
  
  textSize(17);
  fill("black");
  text("Survival time: " + survivalTime ,250,50);
  text("Score: " + score, 500,50);
  
  if(gameState === play){
    
    survivalTime = Math.ceil(frameCount/frameRate());
  
    
    
  if(keyDown("space") && monkey.y >= 200){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  
  if(monkey.isTouching(FoodG)){
      FoodG.destroyEach();
      score = score + 10;  
  }
  if(monkey.isTouching(obG)){
     gameState = end;
  }
     spawnObstacles();
 
    
  }
  if(gameState === end){
    monkey.velocityY = 0;
    monkey.changeAnimation("hurt", monkey_stop);
    ob.velocityX = 0
    ob1.velocityX =0
    ob.lifetime = -1;
    ob1.lifetime = -1;
    text("GAME OVER",250,100);
    text("Press R to restart",245,125);
    if(keyDown("r")){
      restart();
      survivalTime = 0;
    }  
  }
  
   drawSprites()
  
 
}
function spawnObstacles(){
 if(frameCount % 80 === 0){
   giveFood()
 }
  if(frameCount % 300 === 0){
   createObstacle();
   
 }
}
function createObstacle(){
  ob = createSprite(600,215,10,10);
  ob.velocityX = -(10 + 3 * score/10);
  ob.addImage("obstacle",obstacleImage);
  ob.scale = 0.1;
  ob.debub = true;
  ob.lifetime = 60
  obG.add(ob);
  
}
function giveFood(){
  ob1 = createSprite(600,215,10,10);
  ob1.velocityX = -(6 + 3 * score/10);
  ob1.y = random(120,200);
  ob1.addImage("food",bananaImage);
  ob1.scale = 0.1;
  ob1.lifetime = 100
  FoodG.add(ob1);
  
}
function restart(){
 
 FoodG.destroyEach();
 obG.destroyEach();
 score = 0;
 gameState = play
 monkey.changeAnimation("running",monkey_running);
 frameCount = 0;
}
