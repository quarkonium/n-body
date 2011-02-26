function Simulator()
{
  // The node (if any) being selected.
  // If in the future we want to select multiple objects, 
  //this will get turned into an array
  this.mySel = null;
  this.particles = [];
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

      this.addRect(20,20,5,'#FFC02B');
    }
  }

  this.draw = function() 
  {
    if(this.canvasValid == false) 
    {
      //clear(this.context);
      this.canvas.width=this.canvas.width;
 
      // Add stuff you want drawn in the background all the time here
 
      // draw all boxes
      var l = this.particles.length;
      for (i = 0; i < this.particles.length; i++) 
      {
        this.particles[i].draw(this.context, this.particles[i].fill);
      }
 
      // draw selection
      // right now this is just a stroke along the edge of the selected box
      if (this.mySel != null) 
      {
        this.context.strokeStyle = this.mySelColor;
        this.context.lineWidth = this.mySelWidth;
        this.context.strokeRect(this.mySel.x,this.mySel.y,this.mySel.w,this.mySel.h);
      }
 
      // Add stuff you want drawn on top all the time here
      this.canvasValid = true;

    }
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
    alert("invalidate");
    this.canvasValid=false;
  }

  this.addRect = function(x,y,r,fill)
  {
    var p = new Particle(x,y,r,fill);
    this.particles.push(p);
    this.invalidate(); 
  }
}
