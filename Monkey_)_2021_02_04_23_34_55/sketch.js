
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground

var PLAY =1;
var END = 0;
var gameState = PLAY
function preload(){

  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
monkey = createSprite(50,380,10,10)
monkey.addAnimation("monkey1",monkey_running)
monkey.scale = 0.1

ground = createSprite(200,380,1200,10)
ground.velocityX = -5

obstacleGroup = new Group() 
FoodGroup = new Group()

  score=0;
}



function draw() {
background("white")
text(mouseX+","+mouseY,mouseX,mouseY)
  
  text("Surivival Time: "+score,250,50)
  
  if(gameState === PLAY){
    
    score=score+Math.round(getFrameRate()/60)
     food()
spawnObstacles()
  if(keyDown("space")){
    
    monkey.velocityY = -5
    
}
 monkey.velocityY = monkey.velocityY + 0.8
  
  
if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(obstacleGroup.isTouching(monkey)){
       gameState =END;
       }
}
  if(gameState === END){
    ground.velocityX = 0
    obstacleGroup.setVelocityEach(0,0)
    FoodGroup.setVelocityEach(0,0)
     
  obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  
  }

  
  
monkey.collide(ground)
drawSprites()
}

function food(){
if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  } 
  
}
function spawnObstacles(){
 if (frameCount % 400 === 0){
   var obstacle = createSprite(350,355,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
    obstacle.addImage(obstaceImage)
 }
}