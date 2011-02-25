//Copyright 2011 quarkonium http://www.quarkonium.com 
//Released under the MIT License

function Particle(x,y,w,h,fill)
{
  //TEST
  this.x = x;
  this.y = y;
  this.w = w; // default width and height?
  this.h = h;
  this.fill = fill; 

  this.mass=-1; 
  //this.position = [-1, -1, -1]; //Evolves frame to frame
  //this.velocity = [-1, -1, -1]; //Evolves frame to frame
  //this.force = [-1, -1, -1]; //Computed for each frame
  alert("Particle");

  this.update = function(t)
  {
    
  }

  this.draw = function(ctx, fill)
  {
    alert("Particle::draw");
    ctx.fillStyle = fill; 
    ctx.fillRect(this.x, this.y, this.w, this.h);
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
