console.log('subsidiary script has been downloaded successfully ;P')

/**
 * @var background
 * @type {string}
 * @description the canvas's filling that is kept in localStorage (remembers user's choice)
 */
let background = localStorage.getItem('background');


/**
 * @var highscoreCounter
 * @type {string}
 * @description the variable to keep track of user highscores
 */
let highscoreCounter = localStorage.getItem('highscoreCounter');


/**
 * @function fillCanvas
 * @description main function to render and adjust canvas and its content
 */
function fillCanvas(){
leftwards === true?rightwards = false:rightwards = true;  
sectionWidth = Math.floor(section.getBoundingClientRect().width);
sectionHeight = Math.floor(section.getBoundingClientRect().height); 
width = canvas.width = sectionWidth;
height = canvas.height = sectionHeight;
nav.style.marginBottom = '1rem';
footer.style.marginTop = '1rem';
  if(localStorage.getItem('background') && localStorage.getItem('userName')){
    background = localStorage.getItem('background');
    let userName = localStorage.getItem('userName');
    highscoreCounter = localStorage.getItem('highscoreCounter');
    highscoreCounter === null ? highscore.textContent = `Your highscore: 0`: highscore.textContent = `Your highscore: ${highscoreCounter}`;
    h4[2].textContent = `Player: ${userName}`;
    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.fillRect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
    color_picked_indicator.style.backgroundColor = background;
    div_localStorage_upperPanel_setup.style.display = 'none';
    btn_forget_userChoice.style.display = 'initial';
    
    }
    else{
    h4[2].textContent = 'Player: Guest';
    localStorage.removeItem('highscoreCounter');
    highscore.textContent = `Your highscore: 0`;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.fillRect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
    color_picked_indicator.style.backgroundColor = '#000';
    btn_forget_userChoice.style.display = 'none';
    div_localStorage_upperPanel_setup.style.display = 'flex';
    
   }
   if(gameStarted === false){
   show_text_to_start()
   }
  snakeHead.forEach((el)=>{
    el.drawSnake()
  })
  
  snakeArray.forEach((el)=>{
    el.drawSnake()
  })

  meal = new Obj(`rgba(${random(20,255)}, ${random(20,255)}, ${random(20,255)}, 1)`,random(10,width-10), random(10,height-10), 8, degToRad(0),degToRad(360) );
  meal.createMeal()
  }



  //fillCanvas is being callback once window has finished being loaded
  window.onload = fillCanvas;
  window.onresize = fillCanvas;

   //list of HTMLDOM elements to perform certain tasks
   const div_localStorage_upperPanel_setup = document.querySelector('#localstorage-setup-upper-panel');
   const btn_start_game = document.querySelector('#btn-start-game');
   const welcome_Div = document.querySelector('#welcome-div');
   const userChoice_input = document.querySelector('#user-name-input');
   const btn_submit_userChoice = document.querySelector('#submit-user-choice');
   const btn_forget_userChoice = document.querySelector('#forget-user-choice');
   const color_picked_indicator = document.querySelector('#color-picked-indicator');
   const gameover_div = document.querySelector('#gameover-div');
   const btn_reload = document.querySelector('#btn-reload');
   const btn_restart = document.querySelector('#btn-restart');
 
 
   userChoice_input.focus()
 
 
   
 //UI swtich to game mode
 function switch_to_Game_Mode(){
   welcome_Div.style.transform = 'translateY(-1000px)';
   welcome_Div.style.transition = 'all 1.4s ease-in-out';
   section.style.visibility = 'visible';
   }
 
 
 //series of ev.Handlers in action:
 btn_start_game.onclick = switch_to_Game_Mode;
 
 btn_submit_userChoice.addEventListener('click',()=>{
     localStorage.setItem('background', colorPicker.value);
     localStorage.setItem('userName', userChoice_input.value);
     fillCanvas()
   })
 
 btn_forget_userChoice.addEventListener('click',()=>{
     localStorage.removeItem('background');
     localStorage.removeItem('userName');
     fillCanvas()
   })
 
 
 /**
  * @function show_text_to_start
  * @description renders brief instructions for as to which btn has to be pressed to start the game
  */  
function show_text_to_start(){
  pos = {
    x: width/2,
    y: height/2
  }
  if(gameStarted === false){
  ctx.fillStyle = '#c7182f';
  ctx.beginPath();
  ctx.font = 'calc(1.6rem + 1vmin) georgia ';
  ctx.textAlign = 'center';
  ctx.closePath();
  ctx.fillText('hit D to start game', pos.x+10, pos.y-60)  
  
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.font = 'calc(1.6rem + 1vmin) georgia ';
  ctx.lineWidth = 0.4;
  ctx.textAlign = 'center';
  ctx.closePath();
  ctx.strokeText('hit D to start game', pos.x+10, pos.y-60) 
}
  else if(gameStarted === true){
  ctx.fillStyle = '#c7182f';
  ctx.beginPath();
  ctx.font = 'calc(1.6rem + 1vmin) georgia ';
  ctx.textAlign = 'center';
  ctx.closePath();
  ctx.fillText('hit WASD to start game', pos.x+10, pos.y-60)  
  
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.font = 'calc(1.6rem + 1vmin) georgia ';
  ctx.lineWidth = 0.4;
  ctx.textAlign = 'center';
  ctx.closePath();
  ctx.strokeText('hit WASD to start game', pos.x+10, pos.y-60)   
  }
  }

  btn_reload.onclick = (()=>document.location.reload());
  btn_restart.addEventListener('click',()=>{
    gameover_div.style.display = 'none';
    draw_snake_by_default()
    render()
  })
 
  
  //some audios to make game funnier
  let homer_wohoo = new Audio();
  homer_wohoo.src = 'wohoo.mp3';
  let homer_doh = new Audio();
  homer_doh.src = 'doh.mp3';
 

  

  const i_sound_off = document.querySelector('.fa-volume-up');
  const i_sound_on = document.querySelector('.fa-volume-mute');
  let audioMuted = false;
 
  i_sound_off.addEventListener('click',()=>{
    audioMuted = true;
    i_sound_on.style.display = 'flex';
    i_sound_off.style.display = 'none';
  })

  i_sound_on.addEventListener('click',()=>{
    audioMuted = false;
    i_sound_off.style.display = 'flex';
    i_sound_on.style.display = 'none';
  })

let set_IE = document.documentElement;
set_IE.setAttribute('data-useragent',  navigator.userAgent);
set_IE.setAttribute('data-platform', navigator.platform );
  

