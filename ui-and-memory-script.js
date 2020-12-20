//canvas filling options (when the game's just loaded)

/**
 * @var background
 * @type {string}
 * @description the canvas's filling that is kept in localStorage (remembers user's choice)
 */

//this variable has to be declared in Global scope as clrCtx() has to have an access to it 
let background = localStorage.getItem('background');
let highscoreCounter = localStorage.getItem('highscoreCounter');
function fillCanvas(){
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
    div_localStorage_setup.style.display = 'none';
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
    div_localStorage_setup.style.display = 'flex';
   }

  snakeHead.forEach((el)=>{
    el.drawSnake()
  })
  
  snakeArray.forEach((el)=>{
    el.drawSnake()
  })

  meal.createMeal()
  }



  //fillCanvas is being callback once window has finished being loaded
  window.onload = fillCanvas;
  window.onresize = do_UI_responsive;

  const div_localStorage_setup = document.querySelector('#localstorage-setup');
  const btn_start_game = document.querySelector('#btn-start-game');
  const welcome_Div = document.querySelector('#welcome-div');
  const userChoice_input = document.querySelector('#user-name-input');
  const btn_submit_userChoice = document.querySelector('#submit-user-choice');
  const btn_forget_userChoice = document.querySelector('#forget-user-choice');
  const color_picked_indicator = document.querySelector('#color-picked-indicator');

  userChoice_input.focus()

  
  function updateUI(){
    welcome_Div.style.transform = 'translateY(-1000px)';
    welcome_Div.style.transition = 'all 1.4s ease-in-out';
    section.style.visibility = 'visible';
    rightwards = true;
  }


  btn_start_game.onclick = updateUI;

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