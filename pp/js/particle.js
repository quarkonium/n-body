//Copyright 2011 quarkonium http://www.quarkonium.com 
//Released under the MIT License

function Particle(r0, v0, m)
{
  this.r_previous = [-1, -1]; 

  this.r=r0; 
  this.v=v0; 
  this.mass=m; 

  this.update = function(t)
  {
    
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
