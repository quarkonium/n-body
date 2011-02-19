//Copyright 2011 quarkonium http://www.quarkonium.com 
//Released under the MIT License

function Partice() =
{
  this.mass: -1; 
  this.position: [-1, -1, -1]; //Evolves frame to frame
  this.velocity: [-1, -1, -1]; //Evolves frame to frame
  this.force:    [-1, -1, -1]; //Computed for each frame

  this.update = function(t)
  {
    
  };

  this.draw: function()
  {
  };

  this.addForce: function(f)
  {
    //Sum the forces
    for(i=0; i<3; i++)
    {
      this.force[i]+=f[i];
    }
  }
};
