function Simulator()
{
  this.lable_height = [50, 70, 90];
  this.PIx2 = Math.PI*2;
  this.G = 6.67428 * Math.pow(10, -11);

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
      var delta_r = [0, 0, 0]; 
      var mod_delta_r_square = [0, 0, 0];
      var fij = [0, 0, 0];

      var r=this.particles[i].r;
      var v=this.particles[i].v;

      for(j=0; j<this.NUMBER_OF_PARTICLES; j++)
      {
        if(j!=i)
        {
          var rj=this.particles[j].r;

          delta_r[0] = r[0] - rj[0];
          delta_r[1] = r[1] - rj[1];

          mod_delta_r_square[0] = delta_r[0] * delta_r[0];
          mod_delta_r_square[1] = delta_r[1] * delta_r[1];

          var mod_delta_r = Math.sqrt(mod_delta_r_square[0] + mod_delta_r_square[1]);
          var fij[0] = -1 * this.G * this.particles[j].m * this.particles[i].m 
                          * delta_r[0] / (mod_delta_r*mod_delta_r*mod_delta_r);

          var fij[1] = -1 * this.G * this.particles[j].m * this.particles[i].m 
                          * delta_r[1] / (mod_delta_r*mod_delta_r*mod_delta_r);
          
        }
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

      this.context.beginPath();
      this.context.arc(r[0], r[1], 5, 0, this.PIx2, true);
      this.context.closePath();
      this.context.fillStyle = this.colours[i];
      this.context.fill();
    }
  }

  this.acceleration = function()
  {
    
  }
}
