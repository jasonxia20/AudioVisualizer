//const button1 = document.getElementById("button1");
//const button2 = document.getElementById("button2");

//let audio1 = new Audio(base64string2);
let audio1 = document.getElementById("audio1")
audio1.src = base64string2;
console.log(audio1);
const audioctx = new AudioContext();

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
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
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = 5;
    let barHeight;
    let x;

    function animate(){
        x=0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});
file.addEventListener("change", function(){
    const files = this.files;
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();

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
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = 5;
    let barHeight;
    let x;

    function animate(){
        x=0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLength; i++){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i * Math.PI *2 / bufferLength);
        barHeight = dataArray[i]*2;
        const hue = i*2;
        ctx.fillStyle = "purple";
        ctx.fillRect(0, 30, barWidth, barHeight/3);
        ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";
        ctx.fillRect(0, 0, barWidth, barHeight);
        ctx.fillRect(0, barHeight+10, 10,10);
        ctx.strokeStyle = "white";
        ctx.stroke();
        x += barWidth;
        ctx.restore();
    }

    for (let i = 0; i < bufferLength; i++){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i * Math.PI *2 / bufferLength +Math.PI/2);
        barHeight = dataArray[i]*2;
        const red = barWidth*barHeight/20;
        const green = 50;
        const blue = i * barHeight/20
        ctx.fillStyle = "orange";
        ctx.fillRect(0, 30, barWidth, barHeight/2);
        ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
        ctx.fillRect(0, 0, barWidth, barHeight);
        ctx.fillRect(0, barHeight+10, 10,10);
        ctx.strokeStyle = "white";
        ctx.stroke();
        x += barWidth;
        ctx.restore();
    }
    for (let i = 0; i < bufferLength; i++){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i * Math.PI *2 / bufferLength + Math.PI);
        barHeight = dataArray[i]*2;
        const hue = i*2+100;
        ctx.fillStyle = "purple";
        ctx.fillRect(0, 30, barWidth, barHeight/3);
        ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";
        ctx.fillRect(0, 0, barWidth, barHeight);
        ctx.fillRect(0, barHeight+10, 10,10);
        ctx.strokeStyle = "white";
        ctx.stroke();
        x += barWidth;
        ctx.restore();
    }
    for (let i = 0; i < bufferLength; i++){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i * Math.PI *2 / bufferLength + 3*Math.PI/2);
        barHeight = dataArray[i]*2;
        const red = barWidth*barHeight/20;
        const green = 50;
        const blue = i * barHeight/20
        ctx.fillStyle = "purple";
        ctx.fillRect(0, 30, barWidth, barHeight/3);
        ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
        ctx.fillRect(0, 0, barWidth, barHeight);
        ctx.fillRect(0, barHeight+10, 10,10);
        ctx.strokeStyle = "white";
        ctx.stroke();
        x += barWidth;
        ctx.restore();
    }
}

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