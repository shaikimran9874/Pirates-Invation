class Canon{
  constructor(x,y,w,h,angle){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.angle = angle

    this.canonImage = loadImage("assets/canon.png")
    this.canonBaseImg = loadImage("assets/cannonBase.png")

  }

  show(){
    if(keyIsDown(LEFT_ARROW)&& this.angle > -30){
     this.angle -= 1
    }

    if(keyIsDown(RIGHT_ARROW)&& this.angle < 70){
     this.angle += 1
    }

    push()
    translate(this.x,this.y)
    rotate(this.angle)
    imageMode(CENTER)
    image(this.canonImage,0,0,this.w,this.h)
    pop()
    
    image(this.canonBaseImg,60,3,200,200)
    noFill()

  }


}