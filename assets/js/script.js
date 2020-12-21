var timer = 60;



var timeLeft = function() {    
    var timeNum = document.querySelector("p[class='time']").textContent;
    setInterval(function() {
    console.log(timeNum);
}, 1000);
}
timeLeft();