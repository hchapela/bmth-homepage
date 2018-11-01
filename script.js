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
}

// event listener on button
player.$play.addEventListener('click', playPauseVideo)

// event listener on whole video
player.$video.addEventListener('click', playPauseVideo)

// event lister on spacebar
window.addEventListener('keydown', (_event) => {
    const spaceBar = 32
    if (_event.keyCode == 32) {
        playPauseVideo()
    }
})

/*
END
*/



/*
//// Volume Slider
*/


player.$volume.addEventListener('click', (_event) => {
    const mouseX = _event.clientX
    const bouding = player.$seek.getBoundingClientRect()
    const volume = (mouseX - bouding.left) / bouding.width
    player.$video.volume = volume * 2
    player.$fillVolume.style.transform = `scaleX(${volume * 2})`
})

/*
END
*/

player.$seek.addEventListener('click', (_event) => {
    const mouseX = _event.clientX
    const bouding = player.$seek.getBoundingClientRect()
    const ratio = (mouseX - bouding.left) / bouding.width
    const time = ratio * player.$video.duration

    //Change state button
    if (player.$state == 'Play') {
        player.$state = 'Pause'
        player.$play.innerHTML = player.$state
    }

    player.$video.currentTime = time
    player.$video.play()
})

const loop = () => {
    window.requestAnimationFrame(loop)

    if (!player.$video.paused) {
        const scale = player.$video.currentTime / player.$video.duration
        player.$fillTime.style.transform = `scaleX(${scale})`
    }
}

const playerSetup = () => {
    loop()
}

playerSetup()