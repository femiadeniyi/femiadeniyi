var canvas = document.createElement("canvas")

document.body.appendChild(canvas)
var ctx = canvas.getContext('2d');

var audioFiles = ["drum.mp3","guitar.mp3","piano.mp3"]
var audioElements = []


var rotateState = 0
var squareColorState = ""
var rectStateXState = ""
var rectColorState = ""

ctx.fillStyle = 'gray';
ctx.rotate(11 * Math.PI / 180);

ctx.fillRect(80, 60, 140, 30);


function onTimeUpdate(audio){
    var bpm = 89
    var bps = (60/bpm)*1000

    console.log(bps*4)
    setInterval(draw,bps)

    audio.ontimeupdate = (t)=> {
        console.log(t)
    }


}

async function main(){

    // load audio elements
    await Promise.all(audioFiles.map(f => fetch("./files/"+f).then(f => f.blob()))).then(p => {
        audioElements = p.map(f => {
            var url = URL.createObjectURL(f)
            var audio = document.createElement("audio")
            audio.src = url
            return audio
        })
    })

    onTimeUpdate(audioElements[0])
    audioElements.map(f => f.play())
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(randomNumber(0,100), randomNumber(0,100), 100, 100);
}

function randomNumber(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

btn.onclick = main
ctx.font = '48px serif';
ctx.fillText('Hello world', 10, 50);

