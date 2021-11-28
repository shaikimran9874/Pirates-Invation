const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var ground;
var backroundIMG;
var tower,towerIMG,canon,canonball;
var cannonballs = []
var boatArray = []
var boatAnimation = []
var boatSpriteData,boatSpriteSheet;
var brokenBoatAnimation = []
var brokenBoatSpriteData,brokenBoatSpriteSheet;
var isGameOver = false
var backroundMusic,WaterSound,CanonExplosion,pirateLaugh;
var waterSplashAnimation = []
var waterSplashSpriteData,waterSplashSppriteSheet;
var isLaghing = false
var score = 0

/*var marks = [8,16,24,36]
console.log(marks[1])

var marks2 = [[24,35],[14,26],[26,30],[14,20]]
console.log(marks2[2][1])
marks2.push([12,14])
console.log(marks2)*/

function preload() {
 
backroundIMG = loadImage("./assets/background.gif")
towerIMG = loadImage("./assets/tower.png")
boatSpriteData = loadJSON("assets/boats/boat.json")
boatSpriteSheet = loadImage("assets/boats/boats.png")
brokenBoatSpriteData = loadJSON("assets/boats/brockenboat.json")
brokenBoatSpriteSheet = loadImage("assets/boats/brokenBoat.png")
backroundMusic = loadSound("assets/background_music.mp3")
WaterSound = loadSound("assets/cannon_water.mp3")
CanonExplosion = loadSound("assets/cannon_explosion.mp3")
pirateLaugh = loadSound("assets/pirate_laugh.mp3")
waterSplashSpriteData = loadJSON("assets/waterSplash/waterSplash.json")
waterSplashSppriteSheet = loadImage("assets/waterSplash/water_splash.png")
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var groundPropts = {
    isStatic:true
  }

  ground = Bodies.rectangle(0,height-5,width*2,5,groundPropts)
  World.add(world,ground)

  tower = Bodies.rectangle(150,340,150,350,groundPropts)
  World.add(world,tower)
 
  angleMode(DEGREES)

  canon = new Canon(175,90,130,100,20)

  boatFrames = boatSpriteData.frames

  for(var i = 0;i<boatFrames.length;i++){
    var position = boatFrames[i].position
    var img = boatSpriteSheet.get(position.x,position.y,position.w,position.h)
    boatAnimation.push(img)
  }
  

  brokenBoatFrames = brokenBoatSpriteData.frames

  for(var x = 0;x<brokenBoatFrames.length;x++){
    var position = brokenBoatFrames[x].position
    var img = brokenBoatSpriteSheet.get(position.x,position.y,position.w,position.h)
    brokenBoatAnimation.push(img)
  }

var waterSplashFrames = waterSplashSpriteData.frames

  for(var i = 0;i<waterSplashFrames.length;i++){
    var position = waterSplashFrames[i].position
    var img = waterSplashSppriteSheet.get(position.x,position.y,position.w,position.h)
    waterSplashAnimation.push(img)
  }

}

function draw() {
  background(189);
 
  Engine.update(engine);
  
  image(backroundIMG,0,0,1200,600)
  
  if(!backroundMusic.isPlaying()){
    backroundMusic.play()
    backroundMusic.setVolume(0.1)
  }

  rect(ground.position.x,ground.position.y,width*2,5)
  
  canon.show()

  showBoats()

  
  push()
  imageMode(CENTER)
  image(towerIMG,tower.position.x,tower.position.y,150,350)
  pop()

  for(var i = 0; i<cannonballs.length;i++){
  showCanonBalls(cannonballs[i],i)
  collisionWithBoat(i)
  }


  fill("black")
  textSize(50)
  text("Score ="+score,width-100,50)
  textAlign(CENTER,CENTER)


}

function keyPressed(){
  if(keyCode === UP_ARROW){
    canonball = new CanonBall(canon.x,canon.y)
    cannonballs.push(canonball)
  }
}

function keyReleased(){
  if(keyCode === UP_ARROW){
    CanonExplosion.play()
    cannonballs[cannonballs.length-1].shoot()
  }
}



function showCanonBalls(ball,index){
  if(ball){
  ball.show()
  ball.animate()
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
      
        WaterSound.play()
        ball.remove(index)
      }
    }
}


function showBoats(){
  if(boatArray.length>0){

    if(boatArray[boatArray.length-1]===undefined || boatArray[boatArray.length-1].body.position.x<width-300){
      var positions = [-40,-60,-70,-20]
      var position = random(positions)

      boat = new Boat(width,height-100,170,170,position,boatAnimation)
      boatArray.push(boat)
    }

    for(var i = 0;i<boatArray.length;i++){
      if(boatArray[i]){
        Matter.Body.setVelocity(boatArray[i].body,{x:-1,y:0})  
        boatArray[i].show()
        boatArray[i].animate()
        var collision = Matter.SAT.collides(tower,boatArray[i].body)
        if(collision.collided && !boatArray[i].isBroken){
          if(!isLaghing && !pirateLaugh.isPlaying()){
            pirateLaugh.play()
            isLaghing = true
          }
          isGameOver = true
          gameOver()
        }
      }
      else{
        boatArray[i]
      }
    }

  }
  
  else{
    boat = new Boat(width,height-70,170,170,-80,boatAnimation)
    boatArray.push(boat)
  }
}


function collisionWithBoat(index){
  for(var x = 0;x<boatArray.length;x++){
    if(cannonballs[index]!==undefined && boatArray[x]!==undefined){
      var collision = Matter.SAT.collides(cannonballs[index].body,boatArray[x].body)

      if(collision.collided){
        score+=5
        boatArray[x].remove(x)

        World.remove(world,cannonballs[index].body)
        delete cannonballs[index]

      }

    }
  }
}


function gameOver(){
swal(
{
  title:"Game Over!",
  text:"Thanks for Playing!",
  imageUrl:"https://github.com/whitehatjr/PiratesInvasionSatgae-5.5/blob/main/assets/boat.png?raw=true",
  imageSize:"150x150",
  confirmButtonText:"Play Again"
},
function(isConfirmed){
if(isConfirmed){
location.reload()
}
}
)
}
