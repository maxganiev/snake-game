
//basic vars
const section = document.querySelector('section');
let sectionWidth = Math.floor(section.getBoundingClientRect().width);
let sectionHeight = Math.floor(section.getBoundingClientRect().height);
const canvas = document.querySelector('canvas');
let width = canvas.width = sectionWidth;
let height = canvas.height = sectionHeight*3.2;
let ctx = canvas.getContext('2d');
const h4 = document.querySelectorAll('h4');
const colorPicker = document.querySelector('#color-picker');
const list = document.querySelectorAll('li');
let highscore = document.querySelector('#highscore');

//console.log(Math.floor(Number(getComputedStyle(section).getPropertyValue('height').slice(0,-2))))

function do_UI_responsive(){
sectionWidth = Math.floor(section.getBoundingClientRect().width);
sectionHeight = Math.floor(section.getBoundingClientRect().height);
width = canvas.width = sectionWidth;
height = canvas.height = sectionHeight;
fillCanvas()
snakeArray.forEach((el)=>{el.drawSnake()})
snakeHead.forEach((el)=>{el.drawSnake()})
meal.createMeal()
}





/**
 * @var counter_text
 * @type {number}
 * @description counter value is saved onto a separate variable representing DOM element for the sake of controlability (we need to apply CSS style manipulations to it as to any other DOM element)
 */
let counter_text = document.createElement('h4');



//counter to keep track of earned scored (1 eaten ball = 10 scores)
let counter = 0;
counter_text.textContent = counter;
counter_text.style.transform = 'translateX(40px)'
h4[0].appendChild(counter_text)


/**
 * @var lifes_balance
 * @type {number}
 * @description balance of lifes left; each time the snake hits itself (anywhere save the very last part of it) - life counter is being decreased by one
 */
let lifes_balance = 3;


/**
 * @function lifesLeft
 * @description update UI of lifes left each time each time the snake hits itself
 */
function lifesLeft(){
  while(list[2].firstChild){
    list[2].removeChild(list[2].firstChild)
  }
  for(let i = 0; i<lifes_balance; i++){
  let div = document.createElement('div');
  div.style.height = '20px';
  div.style.width = '30px'
  div.style.backgroundColor = '#1adb0f';
  div.style.display = 'inline-block'
  div.style.borderRight = '2px #fff solid'
  list[2].appendChild(div)
}
}

//calling the function when the game first got loaded
lifesLeft()

/**
 * @function degToRad - the function to convert radians to degrees
 * @param {Number} degrees - the number to be converted
 * @returns converted values in degrees
 */
function degToRad(degrees) {
  return degrees * Math.PI / 180;
};




/**
 * @function random - the function to randomly generate a meal's position:
 * @param {Number} min - min number in range from where to generate;
 * @param {Number} max - max number in range from where to generate;
 * @returns randomly generated number
 */
function random(min,max){
  return Math.floor(Math.random()*(max-min)+min)
}

//default coordinates of the snake
let pos = {
  x: width/2,
  y: height/2
}

/**
 * @variable dx
 * @type {number}
 * @description snake's horizontal velocity
 */
let dx = 20;

/**
 * @variable dy
 * @type {number}
 * @description snake's vertical velocity
 */
let dy = 20;




/**
 * @class Obj
 * @description the main universal object to generate everything - the snake's head, its body and a meal to be eaten
 */
class Obj{
  constructor(fillStyle,x,y,size,startAngle,endAngle,clockwise){
    this.fillStyle = fillStyle,
    this.x = x,
    this.y = y,
    this.size = size,
    this.startAngle = startAngle,
    this.endAngle = endAngle,
    this.clockwise = clockwise,
    
    //the function to draw snake's body
    this.drawSnake = function(){ 
      ctx.beginPath();
      ctx.fillStyle = fillStyle; 
      ctx.arc(this.x, this.y, this.size, this.startAngle, this.endAngle,this.clockwise);
      ctx.fill();
      ctx.closePath()
    }

    //the function to draw meal
    this.createMeal = function(){
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, this.startAngle, this.endAngle,this.clockwise);
    ctx.closePath();
    ctx.fill();
   }
  }
}

//snake's body parts
let partOne = new Obj('#1adb0f',pos.x, pos.y+20,9,degToRad(0),degToRad(360),true);
let partTWo = new Obj('#1adb0f',pos.x+20, pos.y+20,9,degToRad(0),degToRad(360),true);
let partThree = new Obj('#1adb0f',pos.x+40, pos.y+20,9,degToRad(0),degToRad(360),true);
let partFour = new Obj('#1adb0f',pos.x+60, pos.y+20,9,degToRad(0),degToRad(360),true);


/**
 * @var snakeArray
 * @type {Array}
 * @description the snake's body
 */
let snakeArray = [partOne, partTWo, partThree, partFour];
console.log(snakeArray);

/**
 * @var snake_Body_Pushed
 * @type {number}
 * @description the variable to refer snake body's first (though technically last) part that is being dynamically updated
 */
let snake_Body_Pushed = snakeArray[snakeArray.length-1]

  /**
   * @var pos_shift
   * @type {Array}
   * @description the array to get coordinates of the snake's head in relation to its snake_Body_Pushed; each number in the array determinates the position of each part of the snake's head depending on the snake's position in relation to the canvas
   */
 let pos_shift = [20,-7,20,7,34,0,20,-9,20,9,20,-9,20,9,34,-5,34,5]



/**
 * @var meal
 * @type {Object}
 * @description the snake's food that is randomly generated across the canvas per each animation frame loaded
 */
let meal = new Obj(`rgba(${random(20,255)}, ${random(20,255)}, ${random(20,255)}, 1)`,random(10,width-10), random(10,height-10), 8, degToRad(0),degToRad(360) );




/**
 * @var key
 * @type {boolean}
 * @description a pressed key status confirming a certain key has been pressed (used to prevent sticky effect and weird animation behaviour)
 */
let key = {
  w: false,
  s: false,
  a: false,
  d: false
}

/**
 * @var animate
 * @type {Function}
 * @description the var that is responsible for callback of inbuilt setInterval function
 */
let animate;

/**
 * @var t
 * @type {number}
 * @description the number that is used as animation function parameter; being decreased each time the snake eat's a meal and consequently increases the animation's speed (adds extra difficulty to the game)
 */
let t = 100;

/**
 * @var collided
 * @type {boolean}
 * @description used to detect the fact a meal was eaten; if it was - game speed's getting accelerated
 */
let collided = false;


/**
 * @function makeSnakeAlive - the main function to control the game's animation
 */

function makeSnakeAlive(){
  if(collided === true){t-=0.5; collided = false}
  if(t<=40){return t}
  clearInterval(animate)
  animate = setInterval(render,t);
}

//set of variables to prevent simulteneous movement of the snake into opposite directions (code refactoring might be considered)
let upwards = false;
let downwards = false;
let leftwards = false;
let rightwards = false;

//event handler: anonymous arrow function
window.addEventListener('keydown', (e)=>{
  //this part prevents 'sticky keys' effect and subsequent animation's weird behaviour:
  if(e.defaultPrevented || e.repeat){return}else{
  switch(e.code){
    case 'KeyW':
    if(upwards=== true){  
    key.w = true;
    key.s=key.d=key.a = false;
    downwards = false;
    rightwards = leftwards = true;
    makeSnakeAlive()
    e.stopPropagation()
    }
    break;

    case 'KeyS': 
    if(downwards === true){ 
    key.s = true;
    key.w=key.d=key.a = false;
    upwards = false;
    rightwards = leftwards = true;
    makeSnakeAlive()
    e.stopPropagation()
    }
    break;
    
    case 'KeyD':
    if(rightwards === true){ 
    key.d = true;
    key.s=key.w=key.a = false;
    leftwards = false;
    upwards = downwards = true;
    makeSnakeAlive()
    e.stopPropagation()
    }
    break;
 
    case 'KeyA':
    if(leftwards === true){ 
    key.a = true;
    key.s=key.d=key.w = false;
    rightwards = false;
    upwards = downwards = true;
    makeSnakeAlive()
    e.stopPropagation()
    }
    break;    
  }
}
})



// function to redraw the canvas each time a new animation frame is being drawn (necessary to prevent context's 'tails')
function clrCtx(){
  if(localStorage.getItem('background')){
  background = localStorage.getItem('background');
  ctx.fillStyle = background;
  ctx.beginPath();
  ctx.fillRect(0, 0, width, height);
  ctx.closePath();
  ctx.fill();
  } else{
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.fillRect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
  }
}

//main function to control snake's movement
function update(){ 
  /**
   * @var head
   * @type {Object}
   * @description the main principle of the snake game is creating a new snake's head and remove snake's tail each animation frame (well, in my case i rather do other way round - removing head and adding tail, but technically it's doesn't matter)
   */ 
  let head = new Obj('#1adb0f',snakeArray[snakeArray.length-1].x, snakeArray[snakeArray.length-1].y,9,degToRad(0),degToRad(360),true);
  snakeArray.push(head);
  snakeArray.shift()

  if(key.w === true){
    head.y<20?head.y=height:head.y-=dy;
    pos_shift = [7,-20,-7,-20,0,-34,9,-20,-9,-20,9,-20,-9,-20,5,-34,-5,-34]
  }
  else if(key.s === true){
   head.y<=height-20?head.y+=dy:head.y=0;
   pos_shift = [-7, 20, 7, 20, -0, 34, -9, 20, 9, 20, -9, 20, 9, 20, -5, 34, 5, 34]
  }
  else if(key.a === true){
    head.x<20?head.x=width:head.x-=dx;
    pos_shift = [-20,7,-20,-7,-34,0,-20,9,-20,-9,-20,9,-20,-9,-34,5,-34,-5]
  }
  else if(key.d === true){
    head.x<=width-20?head.x+=dx:head.x=0;
    pos_shift = [20,-7,20,7,34,0,20,-9,20,9,20,-9,20,9,34,-5,34,5]
  }
 
snake_Body_Pushed = snakeArray[snakeArray.length-1]

sideL = new Obj('#1adb0f',snake_Body_Pushed.x+pos_shift[0], snake_Body_Pushed.y+pos_shift[1], 8, degToRad(0),degToRad(360), true);   
sideR = new Obj('#1adb0f', snake_Body_Pushed.x+pos_shift[2], snake_Body_Pushed.y+pos_shift[3], 8, degToRad(0),degToRad(360), true);
nose = new Obj('#1adb0f', snake_Body_Pushed.x+pos_shift[4], snake_Body_Pushed.y+pos_shift[5], 11, degToRad(0),degToRad(360), true);
eyeL = new Obj('#eded05', snake_Body_Pushed.x+pos_shift[6], snake_Body_Pushed.y+pos_shift[7], 3, degToRad(0),degToRad(360), true);
eyeR = new Obj('#eded05', snake_Body_Pushed.x+pos_shift[8], snake_Body_Pushed.y+pos_shift[9], 3, degToRad(0),degToRad(360), true);
appleL = new Obj('#000', snake_Body_Pushed.x+pos_shift[10], snake_Body_Pushed.y+pos_shift[11], 1, degToRad(0),degToRad(360), true);
appleR = new Obj('#000', snake_Body_Pushed.x+pos_shift[12], snake_Body_Pushed.y+pos_shift[13], 1, degToRad(0),degToRad(360), true);
nostrilL = new Obj('#000', snake_Body_Pushed.x+pos_shift[14], snake_Body_Pushed.y+pos_shift[15], 1, degToRad(0),degToRad(360), true);
nostrilR = new Obj('#000', snake_Body_Pushed.x+pos_shift[16], snake_Body_Pushed.y+pos_shift[17], 1, degToRad(0),degToRad(360), true);

snakeHead = [sideL, sideR, nose, eyeL, eyeR, appleL, appleR,nostrilL, nostrilR];

snakeHead.forEach((el)=>{
  el.drawSnake()
})
}

/**
 * @var crashed
 * @type {boolean}
 * @description gets true if snake hits itself
 */
let crashed = false;

//vars used to indicate difference between snake's head and meal along X and Y axis
let x_dif;
let y_dif;



//main function to detect the meal that was eaten by the snake (game scores are being increased) or if the snake hits itself (snake's lifes getting decreased with final game over)
function collisionDetector(){
  x_dif = nose.x - meal.x || sideL.x - meal.x || sideR.x - meal.x;
  y_dif = nose.y - meal.y || sideL.y - meal.y || sideR.y - meal.y;
  
  //distance between snake's head and meal along X and Y axis
  distance = Math.sqrt(Math.floor(x_dif*x_dif) + Math.floor(y_dif*y_dif));
  if(Math.floor(distance<19)){
  meal = new Obj(`rgba(${random(20,255)}, ${random(20,255)}, ${random(20,255)}, 1)`,random(10,width-10), random(10,height-10), 8, degToRad(0),degToRad(360) )
  meal.createMeal()
  head = new Obj('#1adb0f',snakeArray[snakeArray.length-1].x, snakeArray[snakeArray.length-1].y,9,degToRad(0),degToRad(360),true);
  snakeArray.push(head);
  counter+=10; 
  counter_text = document.createElement('h4');
  counter_text.textContent = counter;
  while(h4[0].childNodes[1]){
    h4[0].removeChild(h4[0].childNodes[1])
  }
  h4[0].appendChild(counter_text)
  counter_text.style.transform = 'scale(2) translate(60px)';
  counter_text.style.color = '#1adb0f';
  counter_text.style.fontWeight = 'bold';
  //localStorage.setItem('highscoreCounter', counter);
  setTimeout(()=>{counter_text.style.transform = 'scale(1) translate(40px)'; counter_text.style.color = '#000'; counter_text.style.fontWeight = 'normal';},1000)
  collided = true;
  }

  
  //in-depth description of each condition:
  //1. snakeArray[snakeArray.length-1].x === snakeArray[i].x && snakeArray[snakeArray.length-1].y === snakeArray[i].y means that snake hits itself and thus its life are being decreased by one;
  //2. i!==snakeArray.length-2 - if stated i!==snakeArray.length-1, then snake's life had been decreased by one each time the snake eats meal, bcz each time snake eats meal, a new snake's part (array element) is being generated, and thus it happens as if the snake's previous head hits snake's new head, so the that's why the condition was specified this way 
  //3. i!==0 - when snake has grown too lengthy and it keeps moving across the whole canvas (say, disappears from one end of canvas and appears from an opposite), it starts 'eating itself' again and again that finally destroys the whole game; to prevent this, the exception was edded
  for(let i = 0; i<snakeArray.length-1; i++){
    if(snakeArray[snakeArray.length-1].x === snakeArray[i].x && snakeArray[snakeArray.length-1].y === snakeArray[i].y && i!==snakeArray.length-2 && i!==0){
      lifes_balance--;
      crashed = true;
    }
    }
    if(crashed === true){
      lifesLeft()
    }
    if(lifes_balance < 1){
      clearInterval(animate)
      console.log(highscoreCounter)
      if(counter > highscoreCounter){
        localStorage.setItem('highscoreCounter', counter)
        console.log('loshara')
      }
    }
}


/**
 * @function render
 * @description the main function of the game to render everything
 */
function render(){
  clrCtx();
  update()
  snakeArray.forEach((el)=>{
    el.drawSnake()
  })
  meal.createMeal()
  collisionDetector()
}


snake_Body_Pushed = snakeArray[snakeArray.length-1]

pos_shift = [20,-7,20,7,34,0,20,-9,20,9,20,-9,20,9,34,-5,34,5]

sideL = new Obj('#1adb0f',snake_Body_Pushed.x+pos_shift[0], snake_Body_Pushed.y+pos_shift[1], 8, degToRad(0),degToRad(360), true);   
sideR = new Obj('#1adb0f', snake_Body_Pushed.x+pos_shift[2], snake_Body_Pushed.y+pos_shift[3], 8, degToRad(0),degToRad(360), true);
nose = new Obj('#1adb0f', snake_Body_Pushed.x+pos_shift[4], snake_Body_Pushed.y+pos_shift[5], 11, degToRad(0),degToRad(360), true);
eyeL = new Obj('#eded05', snake_Body_Pushed.x+pos_shift[6], snake_Body_Pushed.y+pos_shift[7], 3, degToRad(0),degToRad(360), true);
eyeR = new Obj('#eded05', snake_Body_Pushed.x+pos_shift[8], snake_Body_Pushed.y+pos_shift[9], 3, degToRad(0),degToRad(360), true);
appleL = new Obj('#000', snake_Body_Pushed.x+pos_shift[10], snake_Body_Pushed.y+pos_shift[11], 1, degToRad(0),degToRad(360), true);
appleR = new Obj('#000', snake_Body_Pushed.x+pos_shift[12], snake_Body_Pushed.y+pos_shift[13], 1, degToRad(0),degToRad(360), true);
nostrilL = new Obj('#000', snake_Body_Pushed.x+pos_shift[14], snake_Body_Pushed.y+pos_shift[15], 1, degToRad(0),degToRad(360), true);
nostrilR = new Obj('#000', snake_Body_Pushed.x+pos_shift[16], snake_Body_Pushed.y+pos_shift[17], 1, degToRad(0),degToRad(360), true);

/**
 * @var snakeHead
 * @type {Array}
 * @description the snake's head consisting on 9 parts and being dynamically rendered
 */
snakeHead = [sideL, sideR, nose, eyeL, eyeR, appleL, appleR,nostrilL, nostrilR];

const externalScript = document.createElement('script');
externalScript.src = 'ui-and-memory-script.js';
externalScript.defer = true;
document.head.appendChild(externalScript);