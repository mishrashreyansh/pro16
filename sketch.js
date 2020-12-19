var GAMEOVER;
var PLAY;
var gameState = PLAY;
var END;
var obstacle, obstacleImage,obstacleGroup;
var monkey , monkey_running;
var banna ,bannaImage; 
var fruitGroup;
var score;
var random;
var monkey_collided;
var ground;
var survivalTime=0;
var visible;



function preload()
{
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bannaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 }



function setup() 
{
createCanvas(600,350);

monkey = createSprite(30,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(400,320,900,10);
ground.X = ground.width/6;

  
obstacleGroup = new Group(); 
fruitGroup = new Group();
  

  
  score = 0 ;
}


function draw() 
{
background("green");
 
if(gameState===PLAY)
{

if(keyDown("space") && monkey.y >= 159) 
{
monkey.velocityY = -12;

}
 monkey.velocityY = monkey.velocityY + 0.8
  
if (ground.x < 0)
{
ground.x = ground.width/2;
}
  


monkey.collide(ground);
//obstacleGroup.collide(ground);

  
stoneObstacles();
fruit();


  

stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount % 1000)
text("survival Time:"+survivalTime,150,60)  

 
if(fruitGroup.isTouching(monkey))
{

  fruitGroup.destroyEach();
  score = score+2;
}
}
  
if(obstacleGroup.isTouching(monkey))
{
   gameState=END;
   
  //GAMEOVER = visible;
   
   gameState();
}
  
fruitGroup.y = Math.round(random(80,120));



drawSprites();
text("score:"+score,250,80);
}

function stoneObstacles()
{

if(frameCount % 300 === 0) 
{
//var rand = Math.round(random(1));   
obstacle = createSprite(400,300,20,20);
obstacle.addImage(obstacleImage);
obstacle.scale = 0.1;
obstacle.velocityX = - 13;
obstacle.lifetime = 100;    
obstacleGroup.add(obstacle);




}    

}

function fruit()
{
if(frameCount % 90 === 0)
{

banna = createSprite(400,230,20,20);
banna.addImage(bannaImage);
banna.scale = 0.1;
banna.velocityX = -8;
banna.lifetime = 100;
banna.y = Math.round(random(120,200))

banna.depth = monkey.depth;
monkey.depth = monkey.depth + 1;
fruitGroup.add(banna);
}
}

function END()
{
  ground.velocityX = 0;
  monkey.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  fruitGroup.setVelocityXEach(0);
    
    //change the trex animation
  monkey.collide(obstacleGroup);
  obstacleGroup.setLifetimeEach(-1);
  fruitGroup.setLifetimeEach(-1);
  text("GAMEOVER",200,120);
  GAMEOVER = visible;
  GAMEOVER.setLifeTime = 200;
  
}





