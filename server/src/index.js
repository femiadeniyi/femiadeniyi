// Libs - Jquery, MP4Box


var events = {
    dispatchEvent(name, arg) {
        document.dispatchEvent(new CustomEvent(name, {detail: arg}))
    },
    listenToEvent(name, fn) {
        document.addEventListener(name, function (e) {
            fn(e)
        }, false)
    }
}


class VideoManager {
    videos = []
    cursor = 0
    elements
    promises

    constructor(videos) {
        this.videos = videos
        this.elements = this.videos.map(f => document.createElement("video"))
        this.promises = this.videos.map(f => fetch(f).then(f => f.arrayBuffer()))
    }

    *iter(){
        while (true) {
            this.cursor = ++this.cursor % this.videos.length
            yield this.cursor;
        }
    }

    mount(){
        var videoToMount = this.elements[this.cursor]
        var videoToUnmount = this.elements[(this.cursor + this.videos.length-1) % this.videos.length]
        videoToMount.style.zIndex = -99;
        videoToUnmount.style.zIndex = -100;
        console.log(videoToMount.style.zIndex, videoToUnmount.style.zIndex, "main should be 99")
        videoToMount.play()
    }

}

function clickme() {
    console.log(33)
}

var videoManager = new VideoManager(["./femi_comp.mp4", "./story_comp.mp4", "./racer_comp.mp4"])
const videoIter = videoManager.iter()

videoManager.elements.forEach((f, i) => {
    f.setAttribute("class", "position-absolute top-0")
    f.setAttribute("style", `object-fit: cover; width: 100vw; height: 100vh; z-index: ${-99 - i}`)
    document.body.appendChild(f)
})

function loadVideo() {

    var cursor = videoManager.cursor
    var video = videoManager.elements[cursor]
    var src = videoManager.videos[cursor]
    video.muted = true


    return fetch(src).then(f => f.blob()).then(f => {
        video.src = URL.createObjectURL(f)

        var prepareNextVideo = false
        video.ontimeupdate = (t) => {
            if (!prepareNextVideo) {
                if (video.currentTime > (video.duration / 2)) {
                    videoIter.next()
                    loadVideo()
                    prepareNextVideo = true
                }
            }
        }
        video.onended = (t) => {
            console.log("ended")

            videoManager.mount()
            video.ontimeupdate = () => {
            }
        }
    })

}

function buildVideoFromBuffer(mediaSource, videoBufferObj, resolve) {
    mediaSource.addEventListener('sourceopen', (e) => {
        console.log(e, "klop")
        var sourceBuffer = mediaSource.addSourceBuffer(videoBufferObj.codec);
        sourceBuffer.mode = "sequence"

        const pieces0 = [videoBufferObj.buff.slice(0)];
        (function appendFragments(pieces) {
            if (sourceBuffer.updating) {
                return;
            }
            pieces.forEach(piece => {
                try {
                    sourceBuffer.appendBuffer(piece);
                }
                catch (e) {
                    if (e.name !== 'QuotaExceededError') {
                        throw e;
                    }

                    // Reduction schedule: 80%, 60%, 40%, 20%, 16%, 12%, 8%, 4%, fail.
                    const reduction = pieces[0].byteLength * 0.8;
                    if (reduction / pieces0.byteLength < 0.04) {
                        throw new Error('MediaSource threw QuotaExceededError too many times');
                    }
                    const newPieces = [
                        pieces[0].slice(0, reduction),
                        pieces[0].slice(reduction, pieces[0].byteLength)
                    ];
                    pieces.splice(0, 1, newPieces[0], newPieces[1]);
                    sourceBuffer.appendBuffer(pieces);
                }
            });
        })(pieces0);
        sourceBuffer.onupdateend = () => {
            mediaSource.endOfStream()
            resolve()
        }
    });
}


function mp4Parsed(info) {
    console.log(info, 'onready');
    var codecs = [];
    console.log("is fragmented: " + info.isFragmented);
    for (var t = 0; t < info.tracks.length; ++t) {
        console.log("track #" + t + " codec string: " + info.tracks[t].codec);
        codecs.push(info.tracks[t].codec);
    }
    var codecStr = 'video/mp4; codecs="' + codecs.join(', ') + '"';
    console.log(codecStr +
        MediaSource.isTypeSupported(codecStr))
}


async function main() {
    loadVideo().then(f => {
        videoManager.mount()
    })

}

// f = blob
function resolveMp4BoxParse(resolve, f) {
    f.fileStart = 0;
    var mp4Box = new MP4Box.createFile();
    mp4Box.onReady = function onReady(info) {
        console.log(info, 'onready');
        var codecs = [];
        console.log("is fragmented: " + info.isFragmented);
        for (var t = 0; t < info.tracks.length; ++t) {
            console.log("track #" + t + " codec string: " + info.tracks[t].codec);
            codecs.push(info.tracks[t].codec);
        }
        var codecStr = 'video/mp4; codecs="' + codecs.join(', ') + '"';
        console.log(codecStr +
            MediaSource.isTypeSupported(codecStr))
        resolve({
            codec: codecStr,
            buff: f
        })
    };
    mp4Box.onError = function (e) {
    };
    mp4Box.appendBuffer(f);
}

function appendVideoBuffer(videoBufferObj, mediaSource, sb) {
    var sourceBuffer = mediaSource.addSourceBuffer(videoBufferObj.codec);
    sourceBuffer.mode = "sequence"
    sourceBuffer.appendBuffer(videoBufferObj.buff.slice(0))
    sourceBuffer.onupdateend = () => {
        console.log("raises")
        video.loop = true
        video.play()
    }
}

function onSourceOpen() {
    console.log(33)

    Promise.all(["./story_dashinit.mp4", "./racer_dashinit.mp4"].map(f => fetch(f).then(c => c.arrayBuffer()))).then(arrs => {
        return Promise.all(arrs.map(f => new Promise(resolve => resolveMp4BoxParse(resolve, f))))
    }).then(f => {
        appendVideoBuffer(f, mediaSource)


    })


}


main()
// btn.onclick = () => dispatchEvent("play")
//
// listenToEvent("play",  (e) => {
//     console.log("click")
//     video.play()
//     mediaSource.endOfStream()
//     function loop(){
//         if (!video.paused && !video.ended) {
//             const cr = routes.filter(f => video.currentTime > f.s || video.currentTime === 0 && f.s === 0).pop()
//             console.log(cr,video.currentTime)
//
//             if(cr.path !== location.pathname){
//                 history.pushState({page: 1}, "title 1", cr.path)
//             }
//
//             // if (!cr) return "current sroute unknown"
//             //
//             // if (cr.i !== getCurrentRoute().i) {
//             //     setCurrentRoute(cr)
//             // }
//
//             // if(routes.length === cr.i+1) {
//             //     console.log(routes,"rot\a",video)
//             //
//             //     setTimeout(() => {
//             //         setFinish(true)
//             //         // console.log(video,"koom")
//             //         // video.src = ""
//             //         // video.removeAttribute("src")
//             //         // video.load()
//             //     }, 3000)
//             //     // video.ended = true
//             // }
//             const canvasContext = canvas.getContext("2d")
//             if (canvasContext){
//                 canvasContext.drawImage(video, 0, 0);
//                 setTimeout(loop, 1000 / 30); // drawing at 30fps
//             }
//         }
//     }
//     video.onplay = loop
// })
