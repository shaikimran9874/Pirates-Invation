class Boat{
    constructor(x,y,w,h,boatPosition,boatAnimation){
        this.body = Bodies.rectangle(x,y,w,h)
        this.w = w
        this.h = h
        this.speed = 0.05
        this.boatPosition = boatPosition
        this.animation = boatAnimation 
        this.isBroken = false
        World.add(world,this.body)

    }
    
    show(){
        var index = floor(this.speed%this.animation.length)
        push()
        translate(this.body.position.x,this.body.position.y)
        imageMode(CENTER)
        image(this.animation[index],0,this.boatPosition,this.w,this.h)    
        pop()
    }

    animate(){
        this.speed += 0.05
    }


    remove(index){

        this.animation = brokenBoatAnimation
        this.speed = 0.05
        this.w = 300
        this.h = 300
        this.isBroken = true;

        setTimeout(()=>{
            World.remove(world,boatArray[index].body);
            delete boatArray[index]
        },2000)
    }
}