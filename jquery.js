var playing = false;
var score;
var trialsleft;
var fruits = ['bug1', 'bug2', 'bug3', 'bug4', 'bug5', 'bug6', 'bug7', 'mosquito1','mosquito2'];
var step;
var action; //used for setInterval
$(function(){
    
    //click on start reset button
$("#startreset").click(function(){

    //we are playing
    if(playing == true){
        //reload page
        location.reload();

    }

    else{

        //we are not playing
        playing = true; //game initiated

        //set score to 0
        score = 0;
        $("#scorevalue").html(score);

        //show trials left
        $("#trialsleft").show();
        trialsleft = 3;
        
      

        addHearts();

        //hide game over box
        $("#gameOver").hide();
        
        //change button text to reset game
        $("#startreset").html("Reset Game");


        //start sending fruits
        startAction();
    }
});
    

    
//slice a fruit
$("#fruit1").mouseover(function(){
    
    score = score + 1;
    
    $("#scorevalue").html(score);//update score
    
    //document.getElementById("slicesound").play();//
    
    $("#slicesound")[0].play();//play sound
    
    //stop fruit 
    stopAction();
    
     //hide fruit
    $("#fruit1").hide("explode", 500);
    
    //send new fruit
    startAction();
 
    
});

function addHearts(){
    $("#trialsleft").empty();
    for(i=0; i<trialsleft; i++){
             
                $("#trialsleft").append('<img src="images/heart.png" class="life">');
                
            }
}

function startAction(){
   
    
    //generate a fruit
   $("#fruit1").show();
    chooseFruit();
    
   $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50});
    //random position
    
    //generate a random step
    step = 1 + Math.round(5*Math.random()); //change step
    
    
    
    action = setInterval(function(){
        
        //move the fruit down by one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            
            //check if we have trails left
            if(trialsleft >  1){
               
                 //generate a fruit
   $("#fruit1").show();
   chooseFruit();
   $("#fruit1").css({'left':Math.random(550*Math.random()), 'top':-50});
    
    //random position
    
    //generate a random step
    step = 1 + Math.round(5*Math.random());//change step
                
                //reduce trials by one
                trialsleft --;
                
                //populate trialsleft box
                addHearts();
               
               } else { //game over
                   
                   playing = false; // we are not playing anymore
                   
                   $("#startreset").html("Start Game"); //change button to Start Game
                   
                   $("#gameOver").show();
                   $("#gameOver").html('<p>Game Over!</p><p> Your score is  ' + score + '</p>');
                   
                   $("#trialsleft").hide();
                   
                   stopAction();
               }
            
        }
    }, 10);
}


//generate a random fruit
function chooseFruit()
{
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(8*Math.random())] + '.png');
}

//Stop dropping fruits
function stopAction()
{
    clearInterval(action);
    $("#fruit1").hide();
}
    

});