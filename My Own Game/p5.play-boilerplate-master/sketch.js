var Zombie, ZombieImg;
var player, playerImg, playerShootingImg;
var bg, bgImg;
var enemyGroup;
var h1, h2,h3;
var h1Img, h2Img, h3Img
var bullets = 10, bulletGroup, bullet
var gameState = "fight"
var life = 3
var score = 0;
var loseSd, winingSd, expSd
function preload()
{
 playerImg=loadImage("assets/shooter_2.png");
 ZombieImg=loadImage("assets/zombie.png");
 playerShootingImg=loadImage("assets/shooter_3.png");
 bgImg=loadImage("assets/bg.jpeg");
 h1Img=loadImage("assets/heart_1.png");
 h2Img=loadImage("assets/heart_2.png");
 h3Img=loadImage("assets/heart_3.png");

 loseSd = loadSound("assets/lose.mp3");
 winingSd = loadSound("assets/win.mp3");
 expSd = loadSound ("assets/explosion.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale=1.1;

  player=createSprite(displayWidth-1150,displayHeight-300,50,50);
  player.addImage(playerImg);
  player.scale=0.65;

  h1=createSprite(displayWidth-200,50,20,20);
  h1.addImage(h1Img);
  h1.scale=0.4;

  h2=createSprite(displayWidth-242,50,20,20);
  h2.addImage(h2Img);
  h2.scale=0.4;

  h3=createSprite(displayWidth-283,50,20,20);
  h3.addImage(h3Img);
  h3.scale=0.4;

  enemyGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
    
  background(255,255,255);

  if(gameState === "fight"){
    
    if(keyDown("UP_ARROW")){
      player.y-=30;
    }

    if(keyDown("DOWN_ARROW")){
      player.y+=30;
    }

    if(keyWentDown("SPACE")){
      player.addImage(playerShootingImg);
      expSd.play();

      bullet = createSprite(displayWidth-1150,player.y-55,20,10);
      bullet.velocityX = 30
      bulletGroup.add(bullet);

      bullets = bullets - 1;

      player.depth = bullet.depth
      player.depth = player.depth +2
    }

    if(keyWentUp("SPACE")) {
      player.addImage(playerImg)
    }


    enemy();


    for(var i = 0; i < enemyGroup.length; i++){
      if(player.isTouching(enemyGroup[i])){
        enemyGroup[i].destroy();
        life -= 1;
      }  
    }

    for(var i = 0; i < enemyGroup.length; i++){
      if(bulletGroup.isTouching(enemyGroup[i])){
        enemyGroup[i].destroy();
        bulletGroup.destroyEach();
        score +=5;
      }  
    }

    

    if(life === 1){
      h2.visible = false;
      h1.visible = true;
      h3.visible = false;
    }

    if(life === 2){
      h2.visible = true;
      h1.visible = false;
      h3.visible = false;
    }

    if(life === 3){
      h2.visible = false;
      h1.visible = false;
      h3.visible = true;
    }

    if(bullets === 0){
      gameState = "bullet"
      loseSd.play();
    }

    if(life === 0){
      gameState = "lost"
      
    }

    if(score === 20){
      gameState = "win"
      winingSd.play();
    }
    drawSprites();

    textSize(30)
    fill(27, 245, 7)
    text("Score: "+ score,displayWidth-1000,displayHeight/2-370 )
  
    text("Bullets: "+ bullets, displayWidth-800, displayHeight/2-370);

    text("Life: "+ life, displayWidth-600, displayHeight/2-370);
  
  }

    

 

  else if(gameState === "bullet"){
    textSize(50)
    background("black")
    fill("red");
    text("You ran out of Bullets",505,410);
    player.destroy();
    bulletGroup.destroyEach();
    enemyGroup.destroyEach();
  }

  if(gameState === "lost"){
    console.log("lost")
    background("black")
    textSize(50);
    fill("red");
    text("Game is Over Thanks for playing",505,410);
    player.destroy();
    bulletGroup.destroyEach();
    enemyGroup.destroyEach();
  }

   if(gameState === "win"){
    textSize(50);
    background("black")
    fill("Yellow");
    text("You won the Game!!",570,410);
    player.destroy();
    bulletGroup.destroyEach();
    enemyGroup.destroyEach();
  }
  
  

}

function enemy() {
  if(frameCount % 150 === 0){
  Zombie=createSprite(random(1100,1500),random(600,400),50,50);
  Zombie.addImage(ZombieImg);
  Zombie.scale=0.27;
  Zombie.velocityX = -10 
  Zombie.lifetime = 1000
  enemyGroup.add(Zombie)
}
  
}
