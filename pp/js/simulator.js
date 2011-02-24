function Simulator()
{
  this.particles = [];
  this.canvasValid=false;
  this.t=0; // time in ms
  this.fps = 50; // frames per second
  this.timeInterval = 1000/this.fps; // in ms
  this.canvas = null; // canvas DOM object
  this.context = null; // canvas context
  this.ghostcanvas = null; // canvas context
  this.gtx = null; // canvas context

  this.init = function() 
  {
    alert("Simulator::init");

    this.canvas=document.getElementById("simulatorCanvas");
    if(this.canvas.getContext)
    {
      this.context=this.canvas.getContext("2d");

      this.ghostcanvas = document.createElement('canvas');
      this.ghostcanvas.height = HEIGHT;
      this.ghostcanvas.width = WIDTH;
      this.gctx = ghostcanvas.getContext('2d');

      canvas.onselectstart = function () { return false; }

      setInterval(draw, 10);

      // add our events. Up and down are for dragging,
      // double click is for making new boxes
      canvas.onmousedown = myDown;
      canvas.onmouseup = myUp;
      canvas.ondblclick = myDblClick;


      //initStageObjects();
      //drawStageObjects();
      //setInterval(updateStage, timeInterval);

      // add an orange rectangle
      this.addRect(200, 200, 40, 40, '#FFC02B');
 
      // add a smaller blue rectangle
      this.addRect(25, 90, 25, 25, '#2BB8FF');

    }

  }
  
  this.invalidate = function()
  {
    this.canvasValid=false;
  }

  this.addRect = function(x,y,w,h,fill)
  {
    var p = new Particle(x,y,z,h,w,fill);
    this.particles.push(p);
    invalidate(); 
  }
}
