var dog,sadDog,happyDog,database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodDog=createButton("Feed the Dog");
  foodDog.position(600,95);
  foodDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  currentTime = hour();
  
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTimeRef=database.ref('FeedTime');
  fedTimeRef.on("value",function(data){
    lastFed=data.val();
  });
  
 
  //write code to display text lastFed time here
  if(lastFed >= 12){
    //show time in PM format if lastFed greater than 12 
  }else if(lastFed == 0){
    text("Last Fed: 12 AM", 350,30)
  }else{
    //show time in AM format if lastFed less than 12
  }


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
//write code here to update food stock and last fed time
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour(),
   gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


function update(state){
  database.ref('/').update({
    gameState:state
  })
}