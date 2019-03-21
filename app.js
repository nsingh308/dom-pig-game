/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, gamePlaying;


init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){  
        var dice = Math.floor(Math.random()*6 +1);
        var domDice =document.querySelector('.dice');
        domDice.style.display='block';
        domDice.src='dice-'+dice+'.png';
        
        var scoreDom = document.querySelector('#score-'+activePlayer);
        var currentDom = document.querySelector('#current-'+activePlayer);    
        var current_score= currentDom.textContent;
        
        if(dice !==1){
            //add score
            roundScore += dice;
            scoreDom.textContent = roundScore;
            
        }else{
            //next round
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click',function(){
    
    if(gamePlaying){  
        var currentDom = document.querySelector('#current-'+activePlayer);
        var domDice =document.querySelector('.dice');
        scores[activePlayer] += roundScore;
        currentDom.textContent=scores[activePlayer];

        if(scores[activePlayer]>=10){
            
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.getElementById('name-'+activePlayer).textContent='Winner !';
            domDice.style.display='none';   
            gamePlaying=false;
            
        }else{
            nextPlayer();
        }
    }
    
});
document.querySelector('.btn-new').addEventListener('click',init);


function nextPlayer(){
    var scoreDom = document.querySelector('#score-'+activePlayer);
    var domDice =document.querySelector('.dice');
    scoreDom.textContent = '0';
    roundScore =0;
    activePlayer = activePlayer===0?1:0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    domDice.style.display='none';
}


function init(){
    
    scores= [0,0];
    activePlayer=0;
    roundScore=0;
    gamePlaying= true;

    document.querySelector('.dice').style.display='none';
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
}