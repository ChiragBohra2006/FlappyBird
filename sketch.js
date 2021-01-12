var bird, birdAnimation;
var pipes;
var bg, bg2, bgImage, bgImage2;
var fb, fbImage;
var play, playImage;
var START = 1;
var PLAY = 2;
var END = 0;
var gameState = START;
var pipe, pipeImage, pipeGroup;
var pipe2, pipeGroup2;
var score;
var sBox, sBoxGroup;
var a;
var gameOver, gameOverImage;
var scoreBoard, scoreBoardImage;
var ok, okImage;

localStorage.HighestScore = 0;

function preload(){
  
  birdAnimation = loadAnimation("sprite_0.png", "sprite_1.png");
  bgImage = loadImage("BG.png");
  bgImage2 = loadImage("BG2.png");
  fbImage = loadImage("image-removebg-preview (1).png");
  playImage = loadImage("play.png");
  pipeImage = loadImage("Pipe.png");
  gameOverImage = loadImage("image-removebg-preview (2).png");
  scoreBoardImage = loadImage("Game over.png");
  okImage = loadImage("OK.png");
}

function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(200, 150);
  bg.addImage(bgImage);
  bg.velocityX = -3;
  bg.scale = 2;
 
  bg2 = createSprite(200, 375);
  bg2.addImage(bgImage2);
  bg2.velocityX = -4;
  bg2.scale = 1.4;
 
  play = createSprite(200, 325);
  play.addImage(playImage);
  play.scale = 0.7;
  play.visible = false;
  
  bird = createSprite(200, 200, 100, 50);
  bird.addAnimation("flappyBird", birdAnimation);
  bird.scale = 0.0275;
  
  gameOver = createSprite(193, 100, 300, 50);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  scoreBoard = createSprite(200, 200, 200, 200);
  scoreBoard.addImage(scoreBoardImage);
  scoreBoard.scale = 0.25;
  scoreBoard.visible = false;
  
  fb = createSprite(237, 150, 300, 100);
  fb.addImage(fbImage);
  fb.visible = false;
  
  ok = createSprite(200, 300, 100, 50);
  ok.addImage(okImage);
  ok.visible = false;
  
  ok.scale = 0.7;
  
  pipeGroup = new Group();
  
  pipeGroup2 = new Group();
  
  sBoxGroup = new Group();
  
  pipeGroup2.setColliderEach("rectangle", 50, 10, 20);
  
  score = 0;
  a = createSprite(600, 200, 1, 400);
  a.visible = false;
  
 
  
}

function draw() {
  background(220);
  
  if(gameState === START)
    {
      
      bg.velocityX = -3;
      bg2.velocityX = -4;
      bird.x = 200;
      bird.y = 200;
      bird.rotation = 0;
      bird.rotationSpeed = 0;
      bird.play();
      fb.visible = true;
      play.visible = true;
      gameOver.visible = false;
      scoreBoard.visible = false;
      ok.visible = false;
      pipeGroup.destroyEach();
      pipeGroup2.destroyEach();
      score = 0;
      a.x = 600;
      bird.velocityY = 0;
    }
  if(frameCount%50 === 0 && gameState === PLAY)
    {
     a.velocityX = -4
    }
  if (bird.isTouching(a))
     {
      a.x = a.x+200;
       score = score+1;
     }
 
  if(mouseIsOver(play) && mouseWentDown("left") || mouseIsOver(play) && touches.length>0 && gameState === START)
    {
      gameState = PLAY;
      touches = [];
    }
    
  

  play.setCollider("rectangle", 5,-35, 155, 130)
  

    
     
    
  
   if(gameState === PLAY)
     {
      ok.visible = false;
      play.visible = false;
      fb.visible = false;
      bird.velocityX = -4;
       
     if(bird.x<100)
    {
      bird.velocityX = 0;
    }
       
       if(keyWentDown("space") || touches.length>0)
         {
          bird.velocityY = -9;
           bird.rotation = -20;
           bird.rotationSpeed = 2;
           touches = [];
         }
       
       
      
          bird.velocityY = bird.velocityY+0.8;
       
       createPipe();
       createPipe2();
     
     
      if(pipeGroup.isTouching(bird) || pipeGroup2.isTouching(bird) || bg2.isTouching(bird) )
    {
      gameState = END;
      highScore();
    }
     
     }
       


  if(gameState === END)
    {

      pipeGroup.setVelocityXEach (0);
      pipeGroup2.setVelocityXEach (0);
      sBoxGroup.setVelocityXEach (0);
      bg.velocityX = 0;
      bg2.velocityX = 0;
      bird.velocityY = 15;
      bird.velocityX = 0;
      bird.pause();
      a.velocityX = 0;
      gameOver.visible = true;
      scoreBoard.visible = true;
      ok.visible = true;
      
          if(mouseIsOver(ok) && mouseWentDown("left") || mouseIsOver(ok) && touches.length>0)
        {
          
         gameState = START;
         touches = []; 
        }
      
      if(bird.isTouching(bg2))
        {
          bird.rotation = 90;
        }
    }

  if(bg.x<0)
    {
     bg.x = bg.width/2;
    }
  
  if(bg2.x<0)
    {
     bg2.x = bg2.width/2;
    }
  
 
  
 
    
  bird.collide(bg2);
  
drawSprites();
    
  if(gameState === PLAY)
    {
    textFont("VCR OSD Mono")
    fill ("black")
    stroke(10);
    textSize (30); 
    text(score, 195, 100);
    }
  
  if(gameState === END)
    {
       textFont("VCR OSD Mono")
       fill ("black")
       stroke(10);
       textSize(25)
       text(score,255, 195);

    
       text(localStorage.HighestScore, 265, 245)
    }


function createPipe()
{

if(frameCount%50 === 0)
  {
    pipe = createSprite(600, 200);
    pipe.addImage(pipeImage);
    pipe.velocityX = -4;
    pipe.y = Math.round(random(290,450));
    pipe.setCollider("rectangle", -3, 0, 60 ,275);
    pipeGroup.add(pipe);
    bg2.depth = pipe.depth+1;   
    bird.depth = pipe.depth+1;
    gameOver.depth = pipe.depth+1;
    scoreBoard.depth = pipe.depth+1;
    ok.depth = pipe.depth+1;
   
  }
  
      

}


function createPipe2()
{

if(frameCount%50 === 0)
  {
    pipe2 = createSprite(592, 200);
    pipe2.addImage(pipeImage);
    pipe2.rotation = 180;
    pipe2.velocityX = -4;
    pipe2.y = pipe.y-400;
    pipe2.setCollider("rectangle", -3, 0, 60 ,275)
    pipeGroup2.add(pipe2); 
    bird.depth = pipe2.depth+1;
    gameOver.depth = pipe2.depth+1;
    scoreBoard.depth = pipe2.depth+1;
    ok.depth = pipe2.depth+1;
  }
  
      

}

function highScore()
  {
    
     if(localStorage.HighestScore<score){
    localStorage.HighestScore = score;
  }
  console.log(localStorage.HighestScore);
    }
  
  }