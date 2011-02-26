//Copyright 2011 quarkonium http://www.quarkonium.com 
//Released under the MIT License

function Particle(x,y,r,fill)
{
  //TEST
  this.x = x;
  this.y = y;
  this.r = r;
  this.fill = fill; 

  this.mass=-1; 
  //this.position = [-1, -1, -1]; //Evolves frame to frame
  //this.velocity = [-1, -1, -1]; //Evolves frame to frame
  //this.force = [-1, -1, -1]; //Computed for each frame

  this.update = function(t)
  {
    
  }

  this.draw = function(ctx, fill)
  {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = fill; 
    ctx.fill();
  }

  this.addForce = function(f)
  {
    //Sum the forces
    for(i=0; i<3; i++)
    {
      //this.force[i]+=f[i];
    }
  }
}
