// Simon Says Game with High Score Feature
let gameseq=[];
let userseq=[];
let btns=["yellow","red","purple","green"];
let h2=document.querySelector("h2");
let highScoreDisplay=document.createElement("h3");
highScoreDisplay.innerText="High Score: 0";
document.body.insertBefore(highScoreDisplay, document.querySelector(".btn-container"));
let started=false;
let level=0;

// Add Game Rules at the Bottom
let rules=document.createElement("div");
rules.style.border = "2px solid black";
rules.style.padding = "10px";
rules.style.marginTop = "20px";
rules.style.width = "50%";
// rules.style.backgroundColor = "#f9f9f9";
rules.style.borderRadius = "10px";
rules.style.textAlign = "left";
rules.style.display = "inline-block";
rules.innerHTML=`<h3>How to Play:</h3>
<ul>
  <li>Watch the sequence of colors flashed by the game.</li>
  <li>Repeat the sequence by clicking the buttons in the same order.</li>
  <li>The sequence gets longer with each level.</li>
  <li>If you press the wrong button, the game is over.</li>
  <li>Your score is the number of levels you complete.</li>
  <li>Try to beat the highest score!</li>
</ul>`;
document.body.appendChild(rules);
let highScore=localStorage.getItem("highScore") || 0;
highScoreDisplay.innerText=`High Score: ${highScore}`;
document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        levelUp(); 
    }
});
function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);
}
function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randcolor=btns[randIdx];
    let randbtn=document.querySelector(`.${randcolor}`);  
    gameseq.push(randcolor);
    gameflash(randbtn);
}
function checkAns(index){
    if(userseq[index]==gameseq[index]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.body.style.backgroundColor="red";
        setTimeout(()=>{ document.body.style.backgroundColor="white"; },150);
        updateHighScore();
        reset();
    }
}
function btnpress(){
    let btn=this;
    userflash(btn);
    let usercolor= btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length-1);
}
document.querySelectorAll(".btn").forEach(btn=>{
    btn.addEventListener("click",btnpress);
});
function updateHighScore(){
    if(level > highScore){
        highScore = level;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.innerText=`High Score: ${highScore}`;
    }
}
function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}
