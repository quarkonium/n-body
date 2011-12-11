function Simulator()
{
  this.lable_height = [50, 70, 90];
  this.PIx2 = Math.PI*2;
  //this.G = 6.67428 * Math.pow(10, -11);

  this.G = 6.67428;

  this.X_MAX = [false, false, false];
  this.Y_MAX = [false, false, false];

  //Particle initial values
  this.NUMBER_OF_PARTICLES = 9;
  this.colours = ['#FFC02B', '#A60000', '#200772', '#007046', '#FFC02B', '#A60000', '#200772', '#007046', '#FFC02B'];

  this.initial_positions = [[100.0, 100.0, 0.0], [300.0, 250.0, 0.0],[200.0, 100.0, 0.0 ], [100.0, 300.0, 0.0], [300.0, 50.0, 0.0], [200.0, 10.0, 0.0 ], [100.0, 10.0, 0.0], [30.0, 25.0, 0.0],[20.0, 100.0, 0.0 ]];
  this.initial_velocities = [[8.0, 0.0, 0], [0.0, 0.0, 0.0],[0.0, 8.0, 0.0 ], [8.0, 0.0, 0], [0.0, 0.0, 0.0], [0.0, 8.0, 0.0 ], [8.0, 0.0, 0], [0.0, 0.0, 0.0],[0.0, 8.0, 0.0 ]];
  this.mass = [110.0, 200.0, 60.0, 30.0, 100.0, 40.0, 60.0, 50.0, 10.0];
  this.particles = [];

  this.mySel = null;
  this.canvasValid=true;
  this.fps = 50; // frames per second
  this.delta_t = 5/this.fps;
  this.canvas = null; // canvas DOM object
  this.context = null; // canvas context

  this.init = function() 
  {
    this.canvas=document.getElementById("simulatorCanvas");
    if(this.canvas.getContext)
    {
      this.context=this.canvas.getContext("2d");

      this.canvas.onselectstart = function () { return false; }

      var s_ = this;
      setInterval(function() { s_.draw(); }, this.delta_t);

      //Initialise the particles
      for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
      {
        this.addParticle(this.initial_positions[i], this.initial_velocities[i], this.mass[i]);
      }

      //Draw all particles with their initial positions
      this.draw_particles();
    }
  }

  this.forces = function()
  {
    //Calculate the forces acting on each particle due to the others
    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var delta_r = [0, 0, 0]; 
      var mod_delta_r_square = [0, 0, 0];
      var fij = [0, 0, 0];

      //Calculate the force on pi due to the pj
      var ri=this.particles[i].getR();

      for(var j=0; j<this.NUMBER_OF_PARTICLES; j++)
      {
        if(j!=i)
        {
          var rj=this.particles[j].getR();

          delta_r[0] = rj[0] - ri[0];
          delta_r[1] = rj[1] - ri[1];

          mod_delta_r_square[0] = delta_r[0] * delta_r[0];
          mod_delta_r_square[1] = delta_r[1] * delta_r[1];

          var mod_delta_r = Math.sqrt(mod_delta_r_square[0] + mod_delta_r_square[1]);
          fij[0] += this.G * this.particles[j].getM() * this.particles[i].getM() * delta_r[0] / (mod_delta_r*mod_delta_r*mod_delta_r);
                          

          fij[1] += this.G * this.particles[j].getM() * this.particles[i].getM() 
                          * delta_r[1] / (mod_delta_r*mod_delta_r*mod_delta_r);
        }
          
        this.particles[i].addForce(fij);
      }
    }
  }

  this.acceleration_rk4 = function(x_i, factor)
  {
    var acc_i = [];
    if(this.NUMBER_OF_PARTICLES == 1)
    {
      return [[0, 0, 0]];
    }

    //Calculate the forces acting on each particle due to the others
    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var delta_r = [0.0, 0.0, 0.0];
      var mod_delta_r_square = [0.0, 0.0, 0.0];
      var aij = [0.0, 0.0, 0.0];
      var ri_new = [0.0, 0.0, 0.0]; 

      var ri = this.particles[i].getR();
      ri_new[0] = ri[0] + x_i[i][0] * factor;
      ri_new[1] = ri[1] + x_i[i][1] * factor;

      for(var j=0; j<this.NUMBER_OF_PARTICLES; j++)
      {
        if(j!=i)
        {
          var rj_new = [0.0, 0.0, 0.0];
          var rj = this.particles[j].getR();

          rj_new[0] = rj[0] + x_i[j][0] * factor;
          rj_new[1] = rj[1] + x_i[j][1] * factor;

          delta_r[0] = rj_new[0] - ri_new[0];
          delta_r[1] = rj_new[1] - ri_new[1];

          mod_delta_r_square[0] = delta_r[0] * delta_r[0];
          mod_delta_r_square[1] = delta_r[1] * delta_r[1];

          var mod_delta_r = Math.sqrt(mod_delta_r_square[0] + mod_delta_r_square[1]);
          aij[0] += this.G * this.particles[j].getM()
                          * delta_r[0] / (mod_delta_r*mod_delta_r*mod_delta_r);

          aij[1] += this.G * this.particles[j].getM()
                          * delta_r[1] / (mod_delta_r*mod_delta_r*mod_delta_r);

        }
      }
      acc_i.push(aij);
    }

    return acc_i;
  }

  this.draw = function() 
  {
    var k1x_i = [];
    var k1v_i = [];
    var k2x_i = [];
    var k2v_i = [];
    var k3x_i = [];
    var k3v_i = [];
    var k4x_i = [];
    var k4v_i = [];

    var initial_x_i = [];

    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var initial_x = [0.0, 0.0, 0.0];
      initial_x_i.push(initial_x);
    }

    var acc = this.acceleration_rk4(initial_x_i, 1.0);

    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var vn =  this.particles[i].getV();

      var k1v = [0.0, 0.0, 0.0];
      k1v[0] = acc[i][0] * this.delta_t;
      k1v[1] = acc[i][1] * this.delta_t;
      k1v_i.push(k1v);

      var k1x = [0.0, 0.0, 0.0];
      k1x[0] = vn[0] * this.delta_t;
      k1x[1] = vn[1] * this.delta_t;
      k1x_i.push(k1x);
    }

    acc = this.acceleration_rk4(k1x_i, 0.5);

    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var k2v = [0.0, 0.0, 0.0];
      k2v[0] = acc[i][0] * this.delta_t;
      k2v[1] = acc[i][1] * this.delta_t;
      k2v_i.push(k2v);

      var k2x = [0.0, 0.0, 0.0];
      k2x[0] = (this.particles[i].getV()[0] + k1v_i[i][0] * 0.5) * this.delta_t;
      k2x[1] = (this.particles[i].getV()[1] + k1v_i[i][1] * 0.5) * this.delta_t;
      k2x_i.push(k2x);
    }

    acc = this.acceleration_rk4(k2x_i, 0.5);

    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var k3v = [0.0, 0.0, 0.0];
      k3v[0] = acc[i][0] * this.delta_t;
      k3v[1] = acc[i][1] * this.delta_t;
      k3v_i.push(k3v);

      var k3x = [0.0, 0.0, 0.0];
      k3x[0] = (this.particles[i].getV()[0] + k2v_i[i][0] * 0.5) * this.delta_t;
      k3x[1] = (this.particles[i].getV()[1] + k2v_i[i][1] * 0.5) * this.delta_t;
      k3x_i.push(k3x);
    }

    acc = this.acceleration_rk4(k3x_i, 1.0);

    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var k4v = [0.0, 0.0, 0.0];
      k4v[0] = acc[i][0] * this.delta_t;
      k4v[1] = acc[i][1] * this.delta_t;
      k4v_i.push(k4v);

      var k4x = [0.0, 0.0, 0.0];
      k4x[0] = (this.particles[i].getV()[0] + k3v_i[i][0] * 1.0) * this.delta_t;
      k4x[1] = (this.particles[i].getV()[1] + k3v_i[i][1] * 1.0) * this.delta_t;
      k4x_i.push(k4x);
    }

    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var r_new = [0.0, 0.0, 0.0];
      var v_new = [0.0, 0.0, 0.0];

      r_new[0] = this.particles[i].getR()[0] + (1/6.0) * (k1x_i[i][0] + 2.0 * k2x_i[i][0] + 2.0 * k3x_i[i][0] + k4x_i[i][0]);
      r_new[1] = this.particles[i].getR()[1] + (1/6.0) * (k1x_i[i][1] + 2.0 * k2x_i[i][1] + 2.0 * k3x_i[i][1] + k4x_i[i][1]);

      v_new[0] = this.particles[i].getV()[0] + (1/6.0) * (k1v_i[i][0] + 2.0 * k2v_i[i][0] + 2.0 * k3v_i[i][0] + k4v_i[i][0]);
      v_new[1] = this.particles[i].getV()[1] + (1/6.0) * (k1v_i[i][1] + 2.0 * k2v_i[i][1] + 2.0 * k3v_i[i][1] + k4v_i[i][1]);

      var radius = this.particles[i].getRadius();
      if(r_new[0] <  radius || r_new[0] > this.canvas.width - radius)
      {
        v_new[0] = -1*v_new[0]*0.5;

        if(r_new[0] < radius)
        {
          r_new[0] += radius - r_new[0];
        }
        else if(r_new[0] > this.canvas.width -radius)
        {
          r_new[0] -= radius - (this.canvas.width - r_new[0]);
        }
      }

      if(r_new[1] < radius || r_new[1] > this.canvas.height - radius)
      {
        v_new[1] = -1*v_new[1]*0.5;

        if(r_new[1] < radius)
        {
          r_new[1] += radius - r_new[1];
        }
        else if(r_new[1] > this.canvas.height -radius)
        {
          r_new[1] -= radius - (this.canvas.height - r_new[1]);
        }
      }

      this.particles[i].setR(r_new);
      this.particles[i].setV(v_new);
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
    for(var i=0; i<this.NUMBER_OF_PARTICLES; i++)
    {
      var r = this.particles[i].getR();

      this.context.beginPath();
      this.context.arc(r[0], r[1], this.particles[i].getRadius(), 0, this.PIx2, true);
      this.context.closePath();
      this.context.fillStyle = this.colours[i];
      this.context.fill();
    }
  }
}
