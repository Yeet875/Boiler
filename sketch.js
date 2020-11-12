var monkey,monkey_running;
var ground,invisibleGround,groundImage;
var bananaGroup,bananaImage;
var obstaclesGroup,obstacleImage;
var score = 0;
var deaths = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  groundImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  
  
  
  
  
}







function setup() {
  createCanvas(400, 400);
  
  
  ground = createSprite(200,200,400,400);
  ground.addImage("ground",groundImage);
  ground.scale = 0.8;
  ground.x = ground.width/4;
  ground.velocityX = -4;
  
  monkey = createSprite(50,330,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  invisibleGround= createSprite(200,380,400,5);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();

  
  
  
  
  score = 0;
  
  deaths = 0;
}

function draw() {
  background(220);
  
  fill("red")
  textSize(20);   
  
if(gameState === PLAY){
   
  if(keyDown("space") && monkey.y >= 315){
    monkey.velocityY = -18;
  }
  
   monkey.velocityY = monkey.velocityY + 0.9;
  
  if(ground.x < 0){
    ground.x = ground.width/4;
  } 
  
  banana();
  obstacles();
  
  
  if(monkey.isTouching(bananaGroup)){
    monkey.scale=monkey.scale+0.02;
    bananaGroup.destroyEach();
    score = score + 1;
     }
  
  
  monkey.collide(invisibleGround);
  
  
  if(monkey.isTouching(obstaclesGroup)){
    monkey.scale = 0.1;
    score=0;
    deaths = deaths + 1;
  }
  
  switch(score){
    case 10: monkey.scale = 0.125;
        break;
        case 20: monkey.scale = 0.15;
      break;
      case 30: monkey.scale = 0.175;
      break;
      case 40: monkey.scale = 0.2;
      break;
      case 100: monkey.scale = 0.225;
      break;
      default: break;
  }
  
  
  
  if(monkey.isTouching(obstaclesGroup) && deaths>=2)
  {
    gameState = END;
    
  }
  
}
  
  if(gameState === END){
    
    ground.velocityX = 0;
    monkey.destroy();
    
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    }
  
    drawSprites();
    text("Score:"   + score,190,50);
    text ("Deaths:" + deaths,190,70);
  
}


function banana(){
  if(frameCount % 100 === 0){
   var banana = createSprite(400,200);
    banana.y = Math.round(random(120,220));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    
    banana.lifeTime = 100;
    
    bananaGroup.add(banana);
    
    
  }
}


function obstacles(){
  if(frameCount % 200 === 0){
    var stone = createSprite(400,345);
    stone.addImage(obstacleImage);
    stone.scale = 0.25   ;
    stone.velocityX = -4;
    stone.lifeTime = 100;
    

    stone.setCollider("circle",0,0,110);
    obstaclesGroup.add(stone);
  }
}

















