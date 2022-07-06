

let player;

const playerContainer = $(".player");
const playerStart = $(".player__start");
let eventsInit = () => {
    $(".player__start").click(e => {
      e.preventDefault();
      if (playerStart.hasClass("player__start--active")) {
    
    player.pauseVideo();
      } else {


        player.playVideo();
      }
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec =
          (player.getDuration() / 100) * newButtonPositionPercent;
        
        $(".player__playback-line").css({
          width: `${newButtonPositionPercent}%`
        });
        
        player.seekTo(newPlaybackPositionSec);
       });

       $(".player__splash").click(e => {
        player.playVideo();
      })
////////////////////////////////////////////////////////////////////////////
$(".player__volume").click(e => {
  const vBar = $(e.currentTarget);
  const vClickedPosition = e.originalEvent.layerX;
  const newvButtonPositionPercent = (vClickedPosition / vBar.width()) * 100;
  // const newVolumePositionSec =
  // (player.getDuration() / 100) * newButtonPositionPercent;
  $(".player__volume-button").css({
    left: `${newvButtonPositionPercent}%`
  });

  player.setVolume(newvButtonPositionPercent);
})
///////////////////////////////////////////////////////////////////////////


   };


   const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    
    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);
    
    function addZero(num) {
      return num < 10 ? `0${num}` : num;
    }
    
    return `${minutes} : ${seconds}`;
   };

   const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();
    
    $(".player__duration-estimate").text(formatTime(durationSec));
    
    if (typeof interval !== "undefined") {
      clearInterval(interval);
    }
    
    interval = setInterval(() => {
      const completedSec = player.getCurrentTime();
      const completedPercent = (completedSec / durationSec) * 100;
  
      $(".player__playback-line").css({
        width: `${completedPercent}%`
      });
      $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);

    const volumeNumber = player.getVolume();
    // const completedPercent = (completedSec / durationSec) * 100;

    $(".player__volume-button").css({
      left: `${volumeNumber}%`
    });
    // $(".player__duration-completed").text(formatTime(completedSec));
   };

  const onPlayerStateChange = event => {
    /*
      -1 (воспроизведение видео не начато)
      0 (воспроизведение видео завершено)
      1 (воспроизведение)
      2 (пауза)
      3 (буферизация)
      5 (видео подают реплики).
    */
    switch (event.data) {
      case 1:
        playerContainer.addClass("player--active");
        playerStart.addClass("player__start--active")
        break;
    
      case 2:
        playerContainer.removeClass("player--active");
        playerStart.removeClass("player__start--active")
        break;
    }
   };
   const playerVolumeIcon = $(".player__volume-icon");

   $(".player__volume-icon").click(e => {

    if (player.getVolume() == 0) {
      player.setVolume('100');
      playerVolumeIcon.removeClass("muted");
      $(".player__volume-button").css({
        left: `100%`
      });
    } else {
      player.setVolume('0');
      playerVolumeIcon.addClass("muted");
      $(".player__volume-button").css({
        left: `0%`
      });
    }
   });

    







    // const volumeNumber = player.getVolume();
    // // const completedPercent = (completedSec / durationSec) * 100;

    // $(".player__volume-button").css({
    //   left: `${volumeNumber}%`
    // });
    // // $(".player__duration-completed").text(formatTime(completedSec));

 










//    const video = document.querySelector('.video');
//    const playerVolumeIcon = document.querySelector('.player__volume-icon');
// const playerVolumeBar = document.querySelector('.player__volume');
// const playerVolumeCircle = document.querySelector('.player__volume-button');
// let startVolume = 0;
// let currentVolume;





// // звук

// const changeCirclePosition = (percent) => {
//   // playerVideoCircle.style.left = `${percent}`;
// }


// const changeVolume = (e) => {

//   const currentTarget = e.currentTarget;
//   const left = e.offsetX;

//   const soundBarWidth = parseInt(getComputedStyle(currentTarget).width);
//   console.log(left);
//   console.log(soundBarWidth);
//   console.log('soundBarwidth - left', soundBarWidth - left);


//   // const newPosition = e.pageX - left;

//   const percentValue = (left / soundBarWidth) * 100;
//   if (percentValue < 100) {
//     video.volume = percentValue / 100;
//     playerVolumeCircle.style.left = `${percentValue}%`;
//     changeCirclePosition(percentValue);
//     document.querySelector('.player__volume-bar').style.width = `${percentValue}%`;
   
//   }

// }

// const toggleSound = () => {
//   playerVolumeIcon.classList.toggle("muted");
//   if (video.volume === 0) {
//     video.volume = currentVolume;
//     playerVolumeCircle.style.left = `${currentVolume * 100}%`;
//     changeCirclePosition('currentVolume' * 100);
//   } else {
//     currentVolume = video.volume;
//     video.volume = startVolume;
//     playerVolumeCircle.style.left = `${startVolume}%`;
//     changeCirclePosition('startVolume');
//   }
// }


// playerVolumeBar.addEventListener('click', changeVolume);
// playerVolumeIcon.addEventListener('click', toggleSound);
















 function onYouTubeIframeAPIReady() {
   player = new YT.Player("yt-player", {
     height: "rem(392)",
     width: "rem(662)",
     videoId: "hk3KPa6zWzo",
     events: {
       onReady: onPlayerReady,
       onStateChange: onPlayerStateChange
     },
     playerVars: {
        controls: 0,
        disablekb: 1,
        showinfo: 0,
        rel: 0,
        autoplay: 0,
        modestbranding: 0
      }
   });
 }
 eventsInit();