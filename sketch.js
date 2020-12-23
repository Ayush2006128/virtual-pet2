//Create variables here
var happyDog,dog,img1,img2;
var database;
var foodS=20;
var feed,addFood;
var lastFed=24;
var foodobj;
var milkBottle;
function preload()
{
  img1=loadImage("Dog.png");
  img2=loadImage("happydog.png");
	//load images here
}

function setup() {
  database=firebase.database();
  console.log(database);
  createCanvas(1000, 500);
  dog=createSprite(250,250,20,20);
  dog.addImage(img1);
  dog.scale=0.3;
  
  milkBottle=new food()
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  fedTiime=database.ref('FeedTime');
  fedTiime.on("value",function(data){
    lastFed=data.val();
  }) ;
}


function draw() {  
background(0,140,25);
  drawSprites();
  //add styles here
  
  milkBottle.display();
  
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+lastFed%12+"PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed :"+lastFed +"AM",350,30);
}


fill(255);
text("food remaining"+foodS,150,100);

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('Food').update({
Food:x
  })
}
function feedDog(){
  
  dog.addImage(img2);
  foodS=foodS-1
  
  foodobj.updateFoodsStock(foodobj.getFoodsStock()-1);
  database.ref('/').update({
    Food:foodobj.getFoodsStock(),
    FeedTime:hour() 
    
  })
 
}
function addFoods(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
      })
}