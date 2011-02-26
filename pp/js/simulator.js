function Simulator()
{
  this.lable_height = [50, 70, 90];
  this.PIx2 = Math.PI*2;
  this.X_MAX = [false, false, false];
  this.Y_MAX = [false, false, false];

  //Particle initial values
  this.NUMBER_OF_PARTICLES = 3;
  this.colours = ['#FFC02B', '#A60000', '#200772', '#007046'];

  this.initial_positions = [[10, 10, 0], [10, 40, 0],[10, 70, 0 ]];
  this.initial_velocities = [[0, 0, 0], [0, 0, 0],[0, 0, 0 ]];
  this.mass = [1, 3, 5];
  this.particles = [];


  this.mySel = null;
  this.canvasValid=true;
  this.t=0; // time in ms
  this.fps = 50; // frames per second
  this.timeInterval = 1000/this.fps; // in ms
  this.canvas = null; // canvas DOM object
  this.context = null; // canvas context
  this.ghostcanvas = null; // canvas context
  this.gctx = null; // canvas context

  this.init = function() 
  {
    this.canvas=document.getElementById("simulatorCanvas");
    if(this.canvas.getContext)
    {
      this.context=this.canvas.getContext("2d");

      this.ghostcanvas = document.createElement('canvas');
      this.ghostcanvas.height = this.canvas.height;
      this.ghostcanvas.width = this.canvas.width;
      this.gctx = this.ghostcanvas.getContext('2d');


      this.canvas.onselectstart = function () { return false; }

      this.canvas.onmousedown = this.myDown;
      this.canvas.onmouseup = this.myUp;
      this.canvas.ondblclick = this.myDblClick;


      //initStageObjects();
      //drawStageObjects();
      var s_ = this;
      setInterval(function() { s_.draw(); }, this.timeInterval);

      //Initialise the particles
      for(i=0; i<this.NUMBER_OF_PARTICLES; i++)
      {
        this.addParticle(this.initial_positions[i], this.initial_velocities[i], this.mass[i]);
      }

      //Draw all particles with their initial positions
      this.draw_particles();
    }
  }

  this.draw = function() 
  {
    //Calculate the new particle properties
    for(i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var x=this.particles[i].r[0];
      var y=this.particles[i].r[1];

      this.particles[i].r_previous[0]=x;
      this.particles[i].r_previous[1]=y;

      //Check the bounds
      if(x>=this.canvas.width - 5)
      {
        this.X_MAX[i]=true;
      }
      else if(x<=5)
      {
        this.X_MAX[i]=false;
      }

      if(y>=this.canvas.height - 5)
      {
        this.Y_MAX[i]=true;
      }
      else if(y<=5)
      {
        this.Y_MAX[i]=false;
      }

      if(this.X_MAX[i] == false)
      {
        this.particles[i].r[0]+=1;
      }
      else
      {
        this.particles[i].r[0]-=1;
      } 

      if(this.Y_MAX[i] == false)
      {
        this.particles[i].r[1]+=1;
      }
      else
      {
        this.particles[i].r[1]-=1;
      } 
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Draw all particles
    this.draw_particles();
  }

  this.myDown = function()
  {
    alert("myDown");
  }

  this.myUp = function()
  {
    alert("myUp");
  }

  this.myDblClick = function()
  {
    alert("myDbClick");
  }
  
  this.invalidate = function()
  {
    this.canvasValid=false;
  }

  this.addParticle = function(r0, v0, m)
  {
    var p = new Particle(r0, v0, m);
    this.particles.push(p);
  }

  this.draw_particles = function()
  {
    for(i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var r = this.particles[i].r;
      var r_prev = this.particles[i].r_previous;

      //Clear the previous position
      //this.context.clearRect(r_prev[0]-5, r_prev[1]-5, 10, 10);

      this.context.beginPath();
      this.context.arc(r[0], r[1], 5, 0, this.PIx2, true);
      this.context.closePath();
      this.context.fillStyle = this.colours[i];
      this.context.fill();
    }
  }
}
