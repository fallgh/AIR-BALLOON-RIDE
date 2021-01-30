var bgImg;
var hotAirBalloon,hotAirBalloonImg;
var database,positions;

function preload()
{
 hotAirBalloonImg=loadAnimation("Images/Images/baloon1.png","Images/Images/baloon3.png","Images/Images/baloon4.png");
 bgImg=loadImage("Images/Images/bg.png");
}
function setup() 
{
 createCanvas(1500,600);

 database = firebase.database();

 hotAirBalloon = createSprite(400, 200, 50, 50);
 hotAirBalloon.addAnimation("ground",hotAirBalloonImg);
 hotAirBalloon.scale=0.5;

 var hotAirBalloonposition=database.ref('hotAirBalloon/height');
 hotAirBalloonposition.on("value",showError)
}

function draw()
{
 background(bgImg); 
 if(keyDown(LEFT_ARROW))
 {
  hotAirBalloon.x = hotAirBalloon.x -10;
 }
 else if(keyDown(RIGHT_ARROW))
 {
  hotAirBalloon.x = hotAirBalloon.x +10;
 }
 else if(keyDown(UP_ARROW))
 {
  hotAirBalloon.addAnimation("ground",hotAirBalloonImg);
  hotAirBalloon.scale=hotAirBalloon.scale -0.01;
  hotAirBalloon.y = hotAirBalloon.y -10;
 }
 else if(keyDown(DOWN_ARROW))
 {
  hotAirBalloon.addAnimation("ground",hotAirBalloonImg);
  hotAirBalloon.scale=hotAirBalloon.scale +0.01;
  hotAirBalloon.y = hotAirBalloon.y +10;
 }
 console.log(hotAirBalloonImg);
 console.log(bgImg);
 drawSprites();
}

function updateHeight(x,y)
{
database.ref('hotAirBalloon/height').set(
{
 'x' : height.x + x ,
 'y' : height.y + y
})}

function readHeight(data)
{
 height = data.val();
 hotAirBalloon.x = height.x;
 hotAirBalloon.y = height.y;    
}

function showError()
{
 console.log("error");
}