class CanonBall{
    constructor(x,y){
        var BallPropts = {
            isStatic : true
        }
        this.r = 30
        this.body = Bodies.circle(x,y,this.r,BallPropts)
        this.trajectory = []
        this.isSink = false
        this.Speed = 0.05
        this.BombImg = loadImage("assets/cannonball.png")
        this.Animation = [this.BombImg]
        World.add(world,this.body)
    }

    animate(){
        this.Speed+=0.05
    }

    show(){
        push()
        imageMode(CENTER)
        image(this.BombImg,this.body.position.x,this.body.position.y,30,30)
        pop()

        if(this.body.velocity.x>0&& this.body.position.x>250){
            var BombPositions = [this.body.position.x,this.body.position.y]
            this.trajectory.push(BombPositions)
        }
    
        for(var i = 0; i < this.trajectory.length; i++){
            image(this.BombImg,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }   

    }

    shoot(){
        var newAngle = canon.angle -28
        newAngle = newAngle *(3.14/180)

        var velocity = p5.Vector.fromAngle(newAngle)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{
            x:velocity.x*(180/3.14),
            y:velocity.y*(180/3.14)
        })
    }

    remove(index){
        this.isSink = true
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.Animation = waterSplashAnimation
        this.Speed = 0.05
        this.r = 150
        setTimeout(()=>{
            World.remove(world,this.body)

            delete cannonballs[index]
        },1000)
    }


}