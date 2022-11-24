var body = document.body;

var dots = document.getElementsByClassName('dot');
var dots_sec = document.getElementById('dots-sec');
var game_score = document.getElementById('game-score');
var game_start_btn = document.getElementById('game-strt-btn');
var game_stop_btn = document.getElementById('game-stop-btn');
var game_lvl_decrse_btn = document.getElementById('game-lvl-decrse');
var game_lvl_incrse_btn = document.getElementById('game-lvl-incrse');
var game_lvl_txt = document.getElementById('game-lvl-txt');
var game_cntrl = document.getElementById('game-cntrl');

var feature_sec = document.getElementById('feature-sec');
var feature_sec_txt = document.getElementById('feature-sec-txt');
var game_init = document.getElementById('game-init');
var game_hint = document.getElementById('game-hint');
var game_strt_txt = document.getElementById('game-strt-txt');

var counter = 0;
var previousDotIndex = -1; // this variable will be used to ensure that is the user clicks on the red dot many time the counter increase by 1 only
var level = "Easy";
var stop = false;
var timeOutsIndexes = [];

game_init.classList.add('game-init-ad');
game_hint.classList.add('game-hint-ad');
game_strt_txt.classList.add('game-strt-txt-ad');

async function addDotsToDotsHtmlElement(numberOfDots){
    if(dots_sec.children.length==1){ // if there is only one dot, this means that this is the first initiation of the game and dots should be added. If not, no need to add new dots
        for(i=0; i<numberOfDots; i++){
            var newDot = dots[0].cloneNode(true);
            newDot.id = i;
            dots_sec.appendChild(newDot);
        }
        //console.log(dots_sec);
    }
}

async function addClickListenersToAllDots(){
    for(i=0; i<dots.length; i++){
        dots[i].addEventListener('click', (e)=>{
            if(e.target.style.background == "red" && previousDotIndex != e.target.id ){ 
                counter++;
                //console.log(e.target.id);
                game_score.innerText = counter;
                previousDotIndex = e.target.id;
            }
        });
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

async function generateDots(numberOfIterations, durationOfShowingTheDot, timeDelayBetweenDotsShows){
    
    // disable the start button to prevent the user from re-initiating the game and generating other dots
    game_start_btn.disabled = true;
    game_lvl_decrse_btn.disabled = true;
    game_lvl_incrse_btn.disabled = true;

    for (let i=0; i<numberOfIterations; i++) {
        task(i);
    }
     //for each cycle of the loop set a time out function that will execute after (timeDelayBetweenDotsShows * i) milliseconds
    function task(i) {
        timeOutsIndexes[i] = setTimeout(function() {
        //choose 3 random dots from within the dots html element
        var dotIndexToShow_1 = getRandomInt(dots.length);
        var dotIndexToShow_2 = getRandomInt(dots.length);
        var dotIndexToShow_3 = getRandomInt(dots.length);

        //make one dots with red color which will be the required dot to press on
        dots[dotIndexToShow_1].style.background = "red";

        //show all three random dots
        dots[dotIndexToShow_1].classList.remove('hidden-dot');
        dots[dotIndexToShow_2].classList.remove('hidden-dot');
        dots[dotIndexToShow_3].classList.remove('hidden-dot');

        //then set a timeout function which will hide the 3 dots and remove the red color from the first dot after some time delay= timeDelayBetweenDotsShows
        setTimeout(() => { 
            dots[dotIndexToShow_1].style.background = "black";
            dots[dotIndexToShow_1].classList.add('hidden-dot');
            dots[dotIndexToShow_2].classList.add('hidden-dot');
            dots[dotIndexToShow_3].classList.add('hidden-dot');

            if(i==numberOfIterations-1) {
                game_start_btn.disabled = false;
                game_lvl_decrse_btn.disabled = false;
                game_lvl_incrse_btn.disabled = false;
            }

        }, durationOfShowingTheDot);
       }, timeDelayBetweenDotsShows * i);
    }
}

async function calculateNumberOfDotsBaseOnScreenSize(){
    //if screen width is less than 750px we will use the full height and width of the screen
    //we have to show the game control section and the dots section (game space) on the screen at the same time
    if(window.innerWidth < 750) {
        var gameSpaceHeight = window.innerHeight - game_cntrl.offsetHeight- 10 - 40; //10px is the margin-top of the game_cntrl, another 40px as spare for more clearance
        var gameSpaceWidth = window.innerWidth;
        numberOfDotsToAdd = (gameSpaceHeight/22) * (gameSpaceWidth/22); // each dot occupies 20px + 1px margin on each side = 22px
    }
    //if screen width is more than 750px we will use the 60% of full height and 60% of full width of the screen
    //we have to show the game control section and the dots section (game space) on the screen at the same time
    else{
        var gameSpaceHeight = window.innerHeight*0.6 - game_cntrl.offsetHeight- 10 - 40; //10px is the margin-top of the game_cntrl, another 40px as spare for more clearance
        var gameSpaceWidth = window.innerWidth * 0.6;
        numberOfDotsToAdd = (gameSpaceHeight/22) * (gameSpaceWidth/22);
    }
    return numberOfDotsToAdd;
}

async function startTheGame(numberOfDotsToAdd = 500, numberOfIterations = 20, durationOfShowingTheDot, timeDelayBetweenDotsShows){
    
    numberOfDotsToAdd = await calculateNumberOfDotsBaseOnScreenSize();
    await initiateTheGame();
    await addDotsToDotsHtmlElement(numberOfDotsToAdd);
    await addClickListenersToAllDots();

    if(level == "Easy") { 
        durationOfShowingTheDot = 1200; 
        timeDelayBetweenDotsShows = 1300;
        await changeTheColorOfDots(['black']); 
        generateDots(numberOfIterations, durationOfShowingTheDot, timeDelayBetweenDotsShows);
    }

    if(level == "Medium") { 
        //make it faster
        durationOfShowingTheDot = 1100; 
        timeDelayBetweenDotsShows = 1150; 
        await changeTheColorOfDots(['black']);
        generateDots(numberOfIterations, durationOfShowingTheDot, timeDelayBetweenDotsShows);
    }

    if(level == "Hard") { 
        //introduce new red-like colors to make confusion
        durationOfShowingTheDot = 1100; 
        timeDelayBetweenDotsShows = 1150; 
        await changeTheColorOfDots(['tomato', 'orangered', 'brown', 'tomato', 'crimson', 'indianred', 'darkred', 'tomato', 'maroon', 'crimson']);
        generateDots(numberOfIterations, durationOfShowingTheDot, timeDelayBetweenDotsShows);
    }
}

async function changeTheColorOfDots(colors){
    for(let i=0; i<dots.length-1; i++){
        var rand = getRandomInt(colors.length);
        //console.log(rand);
        dots[i].style.background = colors[rand];
    }
}

async function initiateTheGame(){
    stop = false;
    level = game_lvl_txt.innerText;
    counter = 0;
    previousDotIndex = -1;
    game_score.innerText = "0"; 
}

game_start_btn.addEventListener('click', (e)=>{
    feature_sec_txt.style.visibility = "hidden";
    startTheGame();
});

game_stop_btn.addEventListener('click', (e)=>{
    stop = true;
    game_start_btn.disabled = false;
    game_lvl_decrse_btn.disabled = false;
    game_lvl_incrse_btn.disabled = false;
    for(i=0; i<timeOutsIndexes.length; i++){
        clearTimeout(timeOutsIndexes[i]);
    }
});

game_lvl_incrse_btn.addEventListener('click', (e)=>{
    switch (game_lvl_txt.innerText) {
        case "Easy":
            game_lvl_txt.innerText = "Medium";
            level = "Medium";
            break;
        case "Medium":
            game_lvl_txt.innerText = "Hard";
            level = "Hard";
            break;
    
        default:
            break;
    }
});

game_lvl_decrse_btn.addEventListener('click', (e)=>{
    switch (game_lvl_txt.innerText) {
        case "Hard":
            game_lvl_txt.innerText = "Medium";
            level = "Medium";
            break;
        case "Medium":
            game_lvl_txt.innerText = "Easy";
            level = "Easy";
            break;
    
        default:
            break;
    }
});



