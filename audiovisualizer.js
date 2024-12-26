//const button1 = document.getElementById("button1");
//const button2 = document.getElementById("button2");

//let audio1 = new Audio(base64string2);
let audio1 = document.getElementById("audio1")
audio1.src = base64string2;
console.log(audio1);
const audioctx = new AudioContext();

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;

container.addEventListener("click", function(){
    if (audioctx.state === "suspended") {
        audioctx.resume()
    } // to get around a browser limitation
    audio1.play();
    if (!audioSource) {
        audioSource = audioctx.createMediaElementSource(audio1);
        analyser = audioctx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioctx.destination)
    }
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvas.width/bufferLength;
    let barHeight;
    let x;

    function animate(){
        x=0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLength; i++){
            barHeight = dataArray[i];
            ctx.fillStyle = "white";
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
        requestAnimationFrame(animate);
    }
    animate();
});

// //audio1.src = "nocturne.mp3"
// button1.addEventListener("click", function(){
//     audio1.play();
//     audio1.currentTime=0;

//     audio1.addEventListener("playing",function(){
//         console.log("playing");
//     })
//     audio1.addEventListener("volumechange",function(){
//         console.log("changed volume");
//     })

// })
// button2.addEventListener("click", function(){
//     audio1.pause();
// })
// button3.addEventListener("click", playsound);
// function playsound(){
//     const oscillator = audioctx.createOscillator();
//     oscillator.connect(audioctx.destination);
//     oscillator.type="sine";
//     oscillator.start()
//     setTimeout(function(){
//         oscillator.stop()
//     },200);
// }