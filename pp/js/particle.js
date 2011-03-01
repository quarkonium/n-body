//Copyright 2011 quarkonium http://www.quarkonium.com 
//Released under the MIT License

function Particle(r0, v0, m)
{
  this.r=r0; 
  this.v=v0; 
  this.mass=m; 
  this.force = [0, 0, 0];
  this.radius=Math.log(this.mass);

  this.getR = function()
  {
    return this.r;
  }

  this.getV = function()
  {
    return this.v;
  }

  this.getM = function()
  {
    return this.mass;
  }

  this.setR = function(r)
  {
    this.r = r;
  }

  this.setV = function(v)
  {
    this.v = v;
  }

  this.getRadius = function()
  {
    return this.radius;
  }

  this.addForce = function(f)
  {
    for(i=0; i<3; i++)
    {
      this.force[i]+=f[i];
    }
  }

  this.acceleration = function()
  {
    var a = [0, 0, 0];
    for(i=0; i<3; i++)
    {
      a[i]=this.force[i] / this.mass;
    }
    
    return a;
  }
}
