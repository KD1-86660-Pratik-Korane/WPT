var speed = 0;
var dspeed = 0;
var intervalId;
var dropIntervalId;
var rotateIntervalId;
var rotateangle=0;
function start() {
  var car = document.getElementById("car");

  intervalId=window.setInterval(runCar, 100);
}

function runCar() {

  speed = speed + 20;
  var car = document.getElementById("car");
  car.style.marginLeft = speed + "px";
  var x=document.getElementById("x")
  
  x.value=car.style.marginLeft 
  if (car.style.marginLeft>840 + "px") 
    
    {
      window.clearInterval(intervalId)
      
      dropIntervalId=window.setInterval(dropCar, 100);
     
  }
}

function dropCar() {
  dspeed = dspeed + 20;
  var car = document.getElementById("car");
  var carText=document.getElementById("carText")
  car.style.marginTop = dspeed + "px";
  var y=document.getElementById("y")
  y.value=car.style.marginTop
  
  rotateAngle()
  if(car.style.marginTop==400 + "px"){
     
     stop()
      car.style.rotate=180 + "deg"
     carText.style.display="flex"
    window.clearInterval(dropIntervalId);
  } 
}   
function stop(){
  window.clearInterval(intervalId);
}

 function rotateAngle(){
  var car = document.getElementById("car");
  rotateangle=rotateangle+ 50
  car.style.rotate=rotateangle + "deg"
 }