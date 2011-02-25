function Simulator()
{
  // The node (if any) being selected.
  // If in the future we want to select multiple objects, 
  //this will get turned into an array
  this.mySel = null;
  this.particles = [];
  this.canvasValid=false;
  this.t=0; // time in ms
  this.fps = 50; // frames per second
  this.timeInterval = 1000/this.fps; // in ms
  this.canvas = null; // canvas DOM object
  this.context = null; // canvas context
  this.ghostcanvas = null; // canvas context
  this.gctx = null; // canvas context

  this.init = function() 
  {
    alert("Simulator::init");

    this.canvas=document.getElementById("simulatorCanvas");
    if(this.canvas.getContext)
    {
      this.context=this.canvas.getContext("2d");

      this.ghostcanvas = document.createElement('canvas');
      this.ghostcanvas.height = 400;
      this.ghostcanvas.width = 400;
      this.gctx = this.ghostcanvas.getContext('2d');


      this.canvas.onselectstart = function () { return false; }

      //this.setInterval(draw, 10);


      // add our events. Up and down are for dragging,
      // double click is for making new boxes
      this.canvas.onmousedown = this.myDown;
      this.canvas.onmouseup = this.myUp;
      this.canvas.ondblclick = this.myDblClick;

      alert("test");

      //initStageObjects();
      //drawStageObjects();
      //setInterval(updateStage, timeInterval);

      // add an orange rectangle
      this.addRect(200, 200, 40, 40, '#FFC02B');
 
      // add a smaller blue rectangle
      this.addRect(25, 90, 25, 25, '#2BB8FF');
    }
  }

  function draw() 
  {
    if(canvasValid == false) 
    {
      clear(ctx);
 
      // Add stuff you want drawn in the background all the time here
 
      // draw all boxes
      var l = boxes.length;
      for (var i = 0; i < l; i++) 
      {
        drawshape(ctx, boxes[i], boxes[i].fill);
      }
 
      // draw selection
      // right now this is just a stroke along the edge of the selected box
      if (mySel != null) 
      {
        this.context.strokeStyle = mySelColor;
        this.context.lineWidth = mySelWidth;
        this.context.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
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
    this.canvasValid=false;
  }

  this.addRect = function(x,y,w,h,fill)
  {
    alert("addRect");
    //var p = new Particle(x,y,z,h,w,fill);
    var p = new Particle();
    this.particles.push(p);
    this.invalidate(); 
  }
}
