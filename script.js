let dice = document.getElementById('dice'); //The div that will show the dice face
let faces = ['&#9856','&#9857','&#9858',"&#9859","&#9860","&#9861"]; //Array of Unicode versions of the dice faces

let player1DIV = document.querySelector('.Player1'); //These two divs are selected so I can apply highlights
let player2DIV = document.querySelector('.Player2'); //when players are 'selected'
let player1Score = document.querySelector(".player1score"); //Allows text to be input as score
let player2Score = document.querySelector(".player2score"); //Same for player 2
let totalP1Score = document.querySelector(".totalscorep1");//Allows total score input
let totalP2Score = document.querySelector(".totalscorep2");
let dicegame = document.querySelector('.diceroll'); //Button that rolls the dice
let restart = document.querySelector('.restart'); //Button that restarts the game
let replay = document.querySelector('.replay'); //Button that restarts the game after a win
let endgame = document.querySelector('.endgame'); //Div that displays upon end of game
let hold = document.querySelector('.hold'); //Button that allows player to be changed.

let currentPlayer = 0; //Current player is either assigned 0 (for p1) or 1 (for p2)
let score = 0; //score from the dice roll
let ongoingP1 = 0; //initial score for P1
let ongoingP2 = 0; //initial score for P2
let totalP1 = 0; //initial total score for P1;
let totalP2 = 0; //initial total score for P2;


player1Score.innerHTML = score; //Sets the text to display as zero
player2Score.innerHTML = score; //for both players
totalP1Score.innerHTML = score;
totalP2Score.innerHTML = score;


function initialiseGame(){ //resets the game to the initial set up
    currentPlayer = 0;
    ongoingP1 =0;
    ongoingP2 =0;
    totalP1=0;
    totalP2=0;
    score = 0;
    player1DIV.classList.remove('highlight'); //removes highlight class from the divs if previous game played
    player2DIV.classList.remove('highlight'); //removes highlight
    player1Score.innerHTML = score; //resets text to zero
    player2Score.innerHTML = score;
    totalP1Score.innerHTML = score;
    totalP2Score.innerHTML = score;
    endgame.style.display = 'none'; //hides div of the endgame
    restart.style.display = 'none'; //hides the new game button
    hold.style.display = 'none'; //hides the change player button
}

function diceRoll(){ //function that "rolls the dice"
    restart.style.display = 'block'; //makes the new game button appear after first roll
    hold.style.display = 'block'; //makes the change player button appear after first roll

    let audio = new Audio('diceroll.wav'); //inserts sound of the dice roll
    audio.currentTime = 0; //rewinds the sound (if playing already)
    audio.play(); //plays the dice roll sound

    let side = Math.floor(Math.random()*6); //creates a number from 0-5
    dice.innerHTML = faces[side]; //chooses the corresponding face from the faces array
    score = side+1; //as side is from 0-5, to make it a valid score we add one.

    if (currentPlayer == 0){ //If statement to determine who is getting the points P1 or P2
        player1DIV.classList.add('highlight'); //initially sets P1 div to highlight who is playing
        ongoingP1 = ongoingP1 + score; //increases current score by rolled score
        player1Score.innerHTML = ongoingP1; //updates the text to display current score

    } else if (currentPlayer == 1) { 
        ongoingP2 = ongoingP2 + score;
        player2Score.innerHTML = ongoingP2;
    }

    let text = document.querySelector('.text');

    //If statement to change player if a 1 is rolled;

    if (currentPlayer === 0 && score ==1){ //If it is P1
            currentPlayer = 1;
            score=0;
            ongoingP1 = score;
            player1Score.innerHTML = ongoingP1;
            player2DIV.classList.add('highlight');
            player1DIV.classList.remove('highlight');
        }
    else if (currentPlayer === 1 && score ==1){
            currentPlayer = 0;
            score=0;
            ongoingP2 = score;
            player2Score.innerHTML = ongoingP2;
            player1DIV.classList.add('highlight');
            player2DIV.classList.remove('highlight');
        }

    if (totalP1 >= 30||ongoingP1 >=30||totalP1+ongoingP1>=30){ //If a player has achieved the target score
        endgame.style.display = 'block';
        if (ongoingP1 >=30||totalP1+ongoingP1>=30){
            totalP1 = totalP1 + ongoingP1;
        }
        text.innerHTML = "WINNER" + "<br>" + "Player 1" + '<br>' + `Score:${totalP1}`;
    } else if (totalP2 >= 30||ongoingP2 >=30||totalP2+ongoingP2>=30){
        endgame.style.display = 'block';
        if(ongoingP2>=30||totalP2+ongoingP2>=30){
            totalP2 = totalP2 + ongoingP2;
        }
        text.innerHTML = "WINNER" + "<br>" + "Player 2" + '<br>' + `Score:${totalP2}`;
    }
};

function changePlayer(){ //simple function that changes the currentPlayer to the inactive player
    if (currentPlayer === 0){
        currentPlayer = 1;
        totalP1 = totalP1+ongoingP1;
        totalP1Score.innerHTML = totalP1;
        ongoingP1 =0;
        player1Score.innerHTML = ongoingP1;
        player2DIV.classList.add('highlight');
        player1DIV.classList.remove('highlight');

    } else if(currentPlayer === 1){
        currentPlayer = 0;
        totalP2 = totalP2+ongoingP2;
        totalP2Score.innerHTML = totalP2;
        ongoingP2 = 0;
        player2Score.innerHTML=ongoingP2;
        player1DIV.classList.add('highlight');
        player2DIV.classList.remove('highlight');
    }
};

dicegame.addEventListener('click',diceRoll);
restart.addEventListener('click',initialiseGame);
replay.addEventListener('click',initialiseGame);
hold.addEventListener('click',changePlayer);