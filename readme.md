# Bring Me The Horizon Hero

###### A School project

[Repository here](https://github.com/hchapela/bmth-homepage)

This is a Project we had at School (HETIC). The goal was to build a video or an audio player. I chose to make a video player and to also put it in a simple web page which could be a promotion web page for the next album of a band called Bring Me The Horizon.

The idea was brought to me by [this](https://dribbble.com/shots/5095880-Mantra-Track-Preview) dribbble project : 

So that decided my choice of colours and style

###### Will come soon
This project is not finished, I only finished the player audio (which was the thing i'll have a mark on), it will need also some other animations and the menu.

## FEATURES

###### Standard player based on youtube

You can play or pause the video by clicking the video, the button made for this purpose or pushing the spacebar.

You can go further or forward in the video with the left and right arrows of your keyboard.

You can go in fullscreen mode by using the button or double clicking the video.

You can preview where you are aiming in the seek bar by passing over it.

You can adjust the volume or mute it, the player will remember when un-muting it what was your last volume setting and put it.

## Some specifications on the code

This is the code for the preview thumbnail, which is a more advanced feature :

`
player.$seek.addEventListener('mousemove', (_event) => {
    const bounding = player.$video.getBoundingClientRect()
    const ratio = (_event.clientX - bounding.left) / bounding.width
    const translate = _event.clientX - bounding.left - 70
    const timeOver = ratio * player.$video.duration
    player.$thumbnail.currentTime = timeOver
    player.$thumbnail.style.transform = `translateX(${translate}px)`
})
`

This is how I made the scroll in the seek bar smooth :

`
player.$volume.addEventListener('mousedown', (_event) => {
    isVolumeDown = true
    updateSound(_event.clientX)
})

document.addEventListener('mousemove', (_event) => {
    if (isVolumeDown) {
        updateSound(_event.clientX)
    }
})

document.addEventListener('mouseup', (_event) => {
    isVolumeDown = false
})
`


##Conclusion

This was a very fun project to do. Also I apologyze for my english
> I'm french sorry I only speak baguette

#####Also I was wondering why Firefox was using an uppercase S in FullScreen, Any idea ?

` 
else if (player.$container.mozRequestFullScreen) {
            player.$container.mozRequestFullScreen()
            // Why mozilla choose to put an Uppercase S ?
        } 
`




