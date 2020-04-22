//grab the canvas id
const cvs = document.getElementById('snakeCanvas');
//lets get the drawing object by using getContext()
const ctx = cvs.getContext("2d");

//unit creation, this is for ease

const space = 32;

//getting images image

const back = new Image();
back.src="image/back-ground.png";

const foodImage = new Image();
foodImage.src="image/food.png";

//play music
const over = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

over.src="audio/dead.mp3";
eat.src="audio/eat.mp3";
up.src="audio/up.mp3";
left.src="audio/left.mp3";
right.src="audio/right.mp3";
down.src="audio/down.mp3";


//creation of snake, we make the snake an array

let snake=[];
//each body of the snake is an object with position x and y
snake[0]= {
    x : 9 * space,
    y : 10 * space,
}

//let's create food for the snake, food is an object containin random x and y position for food, 

let food = {
    x : Math.floor(Math.random()*17+1) * space,
    y : Math.floor(Math.random()*15+3) * space,
}

//our score
let score = 0;


//we need to control our snake, we need the arrow keys for this

let move;

document.addEventListener('keydown',direction);

function direction(event) {
    if (event.keyCode==37 && move!="RIGHT") {
        left.play();
        move="LEFT";
    }
    else if(event.keyCode==38 && move!="DOWN" ){
        up.play();
        move="UP";
    }
    else if(event.keyCode==39 && move!='LEFT'){
        right.play();
        move="RIGHT";
    }
    else if(event.keyCode==40 && move!="UP"){
        down.play();
        move="DOWN";
    }
    
}


//now let's draw to the canvas

function drawToCanvas() {
    //draw the back image to the ground
    ctx.drawImage(back,0,0);

    //now we loop over the snake array to draw its cells

    for (let i = 0; i < snake.length; i++) {
        //this will give our snake a red head and white body,if the condition is true the color will be red else it will be white.
        ctx.fillStyle = (i==0) ? 'red': 'white';
        
        //draw out the snake as a rectangle
        ctx.fillRect(snake[i].x,snake[i].y,space,space);

        ctx.strokeStyle = 'blue';
        ctx.strokeRect(snake[i].x,snake[i].y,space,space);

    }

    //draw the food at its random position
    ctx.drawImage(foodImage, food.x, food.y);
    

    //drawing the moving snake
    // we get head position
    let oldx= snake[0].x;
    let oldy= snake[0].y;

    //check for the direction clicked
    if(move=='LEFT') oldx -= space;
    if(move=='UP') oldy -= space;
    if(move=='RIGHT') oldx += space;
    if(move=='DOWN') oldy += space;
    

    //we want to increment the snake once it eats the food
    if(oldx == food.x && oldy == food.y){
        //increment score
        score++;

        eat.play();
        //generate new food
        food = {
            x : Math.floor(Math.random()*17+1) * space,
            y : Math.floor(Math.random()*15+3) * space,
            
        }

    }

    else{
        //remove the snake tail, i.e the last member of the snake array
        snake.pop();


    }
     // add the new head 
     let newHead={
        x:oldx,
        y:oldy
    }
    //when there is collision, lets take it, collision will occur when the hed hits any of its body
    function jam(head,array) {

        for (let i = 0; i < array.length; i++) {
            
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
            
        }
        return false
        
    }
    
    //let's set game over

    if (oldx < space || oldx > 17*space || oldy < 3*space || oldy > 17*space || jam(newHead,snake) ) {
        document.getElementById('score').innerHTML=score;
        clearInterval(play);
        cvs.style.display="none"
        document.getElementById('dead').style.display='block';
        document.getElementById('replay').style.display='block';
        
        over.play();
        
    }
    
    
    
   

    //add this new head to the begining of the snake array
    snake.unshift(newHead)

  


    //drawing score
    ctx.fillStyle = 'whitr';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2*space,1.6*space);
}

//call drawToCanvas function every 100 miilisecond

let play= setInterval(drawToCanvas,100);


function restart(){
    window.location.reload();
}