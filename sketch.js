// here ,creating variables 
var dog,sadDog,happyDog,database;
var foodS,foodStock,currentTime;
var addFood;
var foodObj;
var feed,lastFed,fedTime,FeedTime;
 


function preload(){
// to load image 
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  //connecting the database to the firebase 
  database=firebase.database();
  console.log(database);
 
  // to create canvas 
  createCanvas(1000,580); 
  
  // here creating the foodobj. using food class 
  foodObj = new Food();

  // here , fetching(referring) foodstock from database 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  
  // to create dog sprite
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.20;

  // to create add food button 
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  // to create feed the dog button 
   FeedDog = createButton("Feed The Dog")
   FeedDog.position(900,95);
   FeedDog.mousePressed(feedDog);

   //here , fetching(referring) fedTime to the database 
   fedTime = database.ref('FeedTime')
   fedTime.on("value",function(data){
   lastFed = data.val();
   })

}

function draw() {
  // giving the RGB colour to the background 
  background(124,252,0);

  // making the food obj display 
  foodObj.display();

 // here , giving the text,  size and font style and RGB stroke and filling colour 
  stroke(178,34,34);
  fill(128,0,0);
  textSize(25)
  textFont("Traditional serif")

  // here giving the instructions using if else statement to show last fed time
  if(lastFed >= 12){
    text("Last Fed : " + lastFed % 12 + " PM", 30,30)
  } else if(lastFed == 0){
    text("Last Fed : 12 AM",20,20)
  } else{
    text("Last Fed : " + lastFed + " AM",30,30)
  }
     
  // to draw sprites(on the canvas)
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

// function to feed dog 
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour(),
   
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}

