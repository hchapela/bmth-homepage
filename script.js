/* TODO 

full screen
Previsualisation
Mozilla compatibility
Smooth dragging

*/
const player = {}

player.$container = document.querySelector('.player')
player.$video = player.$container.querySelector('video')

player.$seek = player.$container.querySelector('.seek')
player.$fillTime = player.$seek.querySelector('.fill')
player.$state = 'Play'
player.$play = player.$container.querySelector('.play')
player.$play.innerHTML = player.$state
player.$volume = player.$container.querySelector('.volume-slider')
player.$fillVolume = player.$volume.querySelector('.fill')
player.$timer = player.$container.querySelector('.timer')
player.$mute = player.$container.querySelector('.mute')
player.$mute.innerHTML = 'Mute'
player.$fullscreen = player.$container.querySelector('.fullscreen')

let fullscreen = false
let isDown = false

/*
//// Play or Pause the video
*/

//play or pause the video
const playPauseVideo = () => {
    //Change state button

    player.$state = player.$state == 'Pause' ? player.$state = 'Play' : player.$state = 'Pause'
    player.$play.innerHTML = player.$state

    // Play or Pause the video
    player.$state == 'Pause' ? player.$video.play() : player.$video.pause()

    window.setInterval(timeLeft, 1000)
}

// event listener on button
player.$play.addEventListener('click', playPauseVideo)

// event listener on whole video
player.$video.addEventListener('click', playPauseVideo)

/*
END
*/

/*
//// Volume control
*/

// Volume slider
player.$volume.addEventListener('click', (_event) => {
    const mouseX = _event.clientX
    const bouding = player.$seek.getBoundingClientRect()
    const volume = (mouseX - bouding.left) / bouding.width
    player.$video.volume = volume * 2
    player.$fillVolume.style.transform = `scaleX(${volume * 2})`
})

// Muting video
player.$mute.addEventListener('click', () => {
    player.$video.volume = (player.$video.volume) == 0 ? 0.5 : 0
    player.$fillVolume.style.transform = `scaleX(${player.$video.volume})`
    player.$mute.innerHTML = player.$mute.innerHTML == 'Mute' ? 'Muted' : 'Mute'
})


/*
END
*/


/*
//// Time Controlling
*/

const updatePlayerPosition = (mouseX) => {
    const bouding = player.$seek.getBoundingClientRect()
    const ratio = (mouseX - bouding.left) / bouding.width
    let time = ratio * player.$video.duration
    timeActualisation()
    player.$video.currentTime = time
    window.setInterval(timeLeft, 1000)
}

// Time Slider
player.$seek.addEventListener('mousedown', (_event) => {
    isDown = true
    player.$video.pause()
})

document.addEventListener('mouseup', (_event) => {
    if (player.$state == 'Pause') {
        player.$video.play()
    }
    isDown = false
})

document.addEventListener('mousemove', (_event) => {
    if (isDown) {
        updatePlayerPosition(_event.clientX)
    }
})

// Time left counter
const timeLeft = () => {
    let minutesLeft = Math.floor((player.$video.duration - player.$video.currentTime) / 60)
    let secondsLeft = Math.floor(player.$video.duration - player.$video.currentTime) % 60

    if (secondsLeft < 10) {
        secondsLeft = '0' + secondsLeft
    }

    player.$timer.innerHTML = `${minutesLeft} : ${secondsLeft}`
}

const timeActualisation = () => {
    const scale = player.$video.currentTime / player.$video.duration
    player.$fillTime.style.transform = `scaleX(${scale})`
}

// Make time slider animation soft
const loop = () => {
    window.requestAnimationFrame(loop)

    if (!player.$video.paused) {
        timeActualisation()
    }
}

// Control time with arrows

window.addEventListener('keydown', (_event) => {
    const leftArrow = 37
    const rightArrow = 39
    const spaceBar = 32
    if (_event.keyCode == leftArrow) {
        // go backward in video
        const newTime = player.$video.currentTime - 10
        player.$video.currentTime = newTime
        timeActualisation()
    } else if (_event.keyCode == rightArrow) {
        // go forward in video
        const newTime = player.$video.currentTime + 10
        player.$video.currentTime = newTime
        timeActualisation()
    } else if (_event.keyCode == spaceBar) {
        // Pause or play video on space bar
        playPauseVideo()
    }
})

// Make dragging soft


/*
END
*/

/*
//// Fullscreen
*/

const fullscreenOnStyle = () => {
    player.$video.style.height = '100%'
    player.$video.style.width = '100%'
}

const fullscreenOffStyle = () => {
    // STYLING TO DO
}


const isFullscreen = () => {
    if (!fullscreen) {
        if (player.$container.requestFullscreen) {
            player.$container.requestFullscreen()
        } else if (player.$container.webkitRequestFullscreen && !fullscreen) {
            player.$container.webkitRequestFullscreen()
        } else if (player.$container.msRequestFullscreen) {
            player.$container.msRequestFullscreen()
        } else if (player.$container.mozRequestFullScreen) {
            player.$container.mozRequestFullScreen()
        }
        // Enable fullscreen
        fullscreen = true
        // Enable fullscreen style
        fullscreenOnStyle()
    }
    // Case fullscreen
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (player.$container.mozExitFullScreen) {
            player.$container.mozExitFullScreen()
        }
        // disable fullscreen
        fullscreen = false
        // Disable fullscreen style
        fullscreenOffStyle()
    }
}

player.$fullscreen.addEventListener('click', (_event) => {
    // Case not in fullscreen
    isFullscreen()
    // Disable focus on button
    _event.target.blur()
})

player.$video.addEventListener('dblclick', () => {
    isFullscreen()
})

/*
END
*/

const playerSetup = () => {
    // Smooth seek along video
    loop()
}

playerSetup()