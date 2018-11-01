const player = {}

player.$container = document.querySelector('.player')
player.$video = player.$container.querySelector('video')
player.$volumeUp = player.$container.querySelector('.volume-up')
player.$volumeDown = player.$container.querySelector('.volume-down')
player.$seek = player.$container.querySelector('.seek')
player.$fill = player.$container.querySelector('.fill')
player.$state = 'Play'
player.$play = player.$container.querySelector('.play')
player.$play.innerHTML = player.$state

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

/*
////
*/

player.$volumeDown.addEventListener('click', () => {
    player.$video.volume = player.$video.volume - 0.1 < 0 ? 0 : player.$video.volume - 0.1
})

player.$volumeUp.addEventListener('click', () => {
    player.$video.volume = player.$video.volume + 0.1 > 1 ? 1 : player.$video.volume + 0.1
})

player.$seek.addEventListener('click', (_event) => {
    const mouseX = _event.clientX
    const bouding = player.$seek.getBoundingClientRect()
    const ratio = (mouseX - bouding.left) / bouding.width
    const time = ratio * player.$video.duration

    //Change state button
    if(player.$state == 'Play') {
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
        player.$fill.style.transform = `scaleX(${scale})`
    }
}

loop()
