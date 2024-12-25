const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
let audio1 = new Audio(base64string2);
const audioctx = new AudioContext();

//audio1.src = "nocturne.mp3"
button1.addEventListener("click", function(){
    audio1.play();
    audio1.currentTime=0;

    audio1.addEventListener("playing",function(){
        console.log("playing");
    })
    audio1.addEventListener("volumechange",function(){
        console.log("changed volume");
    })

})
button2.addEventListener("click", function(){
    audio1.pause();
})
button3.addEventListener("click", playsound);
function playsound(){
    const oscillator = audioctx.createOscillator();
}