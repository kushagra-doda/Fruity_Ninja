var Play = 1;
var End = 0;
var gameState=1;
var bgblock,bgblockImg;
var goldenSword,goldenSwordImg,Special;
var sword,fruit,bomb,fruitGroup,killerGroup,score,rotation,randomFruit,position,SpecialFruit,SpecialFruitImg;
var invisibleline1,invisibleline2;
var swordImage,fruit1,fruit2,fruit3,fruit4,fruit5,bombImage,lives1,lives2,lives3,inducer,livesimage,livesimage2,livesimage3,line1,gameOver,gameOverImage;
var gameOverSound ,knifeSwoosh,gameOverImage,backgroundSound;

function preload(){
  bgblockImg = loadImage("bg.jpg");
  SpecialFruit = loadImage("special fruit.png");
  goldenSwordImg = loadImage("golden.png");
  swordImage = loadImage("sword.png");
  bombImage = loadImage("bomb.png");
  fruit1 = loadImage("pineapple.png");
  fruit2 = loadImage("pomegranate.png");
  fruit3 = loadImage("orange.png");
  fruit4 = loadImage("apple.png");
  fruit5 = loadImage("watermelon.png");
  livesimage = loadImage("lives.jpg");
  livesimage2 = loadImage("lives copy.jpg");
  livesimage3 = loadImage("lives copy 2.jpg");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("game-over-sound-effect.mp3");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  backgroundSound = loadSound("song.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  backgroundSound.play();
   
  bgblock = createSprite(width/2,height/2,width,height);
  bgblock.addImage(bgblockImg);
  bgblock.depth - 10;

  // Creating the sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7;
  
  // Set collider for sword
  sword.setCollider("rectangle",0,0,sword.width,sword.height);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  killerGroup=createGroup();
  
}

function draw() {
  
  // Setting the background
  background(0);

  if(gameState === Play){
    
    //Call fruits and Enemy function
    
    Fruits();
    Bombs();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    gameOver = createSprite(width/2,height/2,10,10);

    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score = score + 2;
    }

    if(killerGroup.isTouching(sword)){
     gameState = End;
     gameOver.visible = true;
    }

    drawSprites();
  }

  if(gameState === End){
    textSize(100);
    stroke(10);
    fill("red");
    text("GAME OVER",width/2-300,height/2);
    fruitGroup.destroyEach();
    killerGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    killerGroup.setVelocityXEach(0);
    sword.x = 200;
    sword.y = 200;
  }

  textSize(30);
  stroke(10);
  fill("red");
  text("Score :- "+ score,width/2-75,60);

}


function Bombs(){
  if(World.frameCount % 200 === 0){
    killer = createSprite(400,200,20,20);
    killer.addAnimation("moving",bombImage);
    killer.scale = 0.2;
    killer.x = Math.round(random(0,width-0));
    killer.y = Math.round(random(height-0,height-0));
    killer.velocityY = -(20+(score/5));
    killer.setLifetime = 50;
    killer.scale = 0.5;
    
    killerGroup.add(killer);
  }
}

function Fruits(){
  if(World.frameCount % 40 === 0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=400;
    fruit.velocityY=-(15+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruit.velocityY= -(15+(score/4));
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     rotation = Math.round(random(1,5));
    if (rotation === 1) {
      fruit.addImage(fruit1);
    } else if (rotation == 2) {
      fruit.addImage(fruit2);
    } else if (rotation == 3) {
      fruit.addImage(fruit3);
    } else if (rotation == 4) {
      fruit.addImage(fruit4);
    } else {
      fruit.addImage(fruit5);
    }

    fruit.x = Math.round(random(0,width-0));
    fruit.y = Math.round(random(height-0,height-0));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
  
 
}
