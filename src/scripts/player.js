// let player;

// const playerContainer = $(".player");
// const playerStart = $(".player__start");
// let eventsInit = () => {
//   $(".player__start").click((e) => {
//     e.preventDefault();
//     if (playerStart.hasClass("player__start--active")) {
//       player.pauseVideo();
//     } else {
//       player.playVideo();
//     }
//   });

//   $(".player__playback").click((e) => {
//     const bar = $(e.currentTarget);
//     const clickedPosition = e.originalEvent.layerX;

//     const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//     const newPlaybackPositionSec =
//       (player.getDuration() / 100) * newButtonPositionPercent;

//     $(".player__playback-line").css({
//       width: `${newButtonPositionPercent}%`,
//     });

//     player.seekTo(newPlaybackPositionSec);
//   });

//   $(".player__splash").click((e) => {
//     player.playVideo();
//   });

//   $(".player__volume").click((e) => {
//     const vBar = $(e.currentTarget);
//     const vClickedPosition = e.originalEvent.layerX;
//     const newvButtonPositionPercent = (vClickedPosition / vBar.width()) * 100;

//     $(".player__volume-button").css({
//       left: `${newvButtonPositionPercent}%`,
//     });

//     player.setVolume(newvButtonPositionPercent);
//   });
// };

// const formatTime = (timeSec) => {
//   const roundTime = Math.round(timeSec);

//   const minutes = addZero(Math.floor(roundTime / 60));
//   const seconds = addZero(roundTime - minutes * 60);

//   function addZero(num) {
//     return num < 10 ? `0${num}` : num;
//   }

//   return `${minutes} : ${seconds}`;
// };

// const onPlayerReady = () => {
//   let interval;
//   const durationSec = player.getDuration();

//   $(".player__duration-estimate").text(formatTime(durationSec));

//   if (typeof interval !== "undefined") {
//     clearInterval(interval);
//   }

//   interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100;

//     $(".player__playback-line").css({
//       width: `${completedPercent}%`,
//     });
//     $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);

//   const volumeNumber = player.getVolume();

//   $(".player__volume-button").css({
//     left: `${volumeNumber}%`,
//   });
// };

// const onPlayerStateChange = (event) => {
//   /*
//       -1 (воспроизведение видео не начато)
//       0 (воспроизведение видео завершено)
//       1 (воспроизведение)
//       2 (пауза)
//       3 (буферизация)
//       5 (видео подают реплики).
//     */
//   switch (event.data) {
//     case 1:
//       playerContainer.addClass("player--active");
//       playerStart.addClass("player__start--active");
//       break;

//     case 2:
//       playerContainer.removeClass("player--active");
//       playerStart.removeClass("player__start--active");
//       break;
//   }
// };
// const playerVolumeIcon = $(".player__volume-icon");

// $(".player__volume-icon").click((e) => {
//   if (player.getVolume() == 0) {
//     player.setVolume("100");
//     playerVolumeIcon.removeClass("muted");
//     $(".player__volume-button").css({
//       left: `100%`,
//     });
//   } else {
//     player.setVolume("0");
//     playerVolumeIcon.addClass("muted");
//     $(".player__volume-button").css({
//       left: `0%`,
//     });
//   }
// });

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     height: "rem(392)",
//     width: "rem(662)",
//     videoId: "hk3KPa6zWzo",
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange,
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 1,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0,
//     },
//   });
// }
// eventsInit();




const playerBtn = document.querySelector('.video__player-img');
const video = document.getElementById('player');
const playerPlayBtn = document.querySelector('.player__start');
const durationControl = document.getElementById('durationLevel');
const soundControl = document.getElementById('micLevel');
const soundBtn = document.getElementById('sound');

let intervalId;
let soundLevel;

video.addEventListener("loadeddata", function () {
  // document.addEventListener('DOMContentLoaded', function () {


video.addEventListener('click', playStop);

let playButtons = document.querySelectorAll('.play');

for (let i = 0; i < playButtons.length; i++) {
  playButtons[i].addEventListener('click', playStop);
}

durationControl.min = 0;
durationControl.value = 0;
durationControl.max = parseInt(video.duration);

durationControl.addEventListener('input', setVideoDuration);

soundControl.min = 0;
soundControl.max = 10;
soundControl.value = soundControl.max;
soundControl.addEventListener('input', changeSoundVolume);

soundBtn.addEventListener('click', soundOf);
video.addEventListener('ended', () => {
  playerBtn.classList.toggle('video__player-img--active');
  playerPlayBtn.classList.remove('player__start--active');
  video.currentTime = 0;
});
});
// });


function playStop() {
  playerBtn.classList.toggle('video__player-img--active');
  playerPlayBtn.classList.toggle('player__start--active');
  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 60);

  } else {
    clearInterval(intervalId);
    video.pause();

  }
}

function setVideoDuration() {
  video.currentTime = durationControl.value;
  updateDuration();
}

function updateDuration() {
  durationControl.value = video.currentTime;
  let step = video.duration / 100;
  let percent = video.currentTime / step;
  durationControl.style.background = `linear-gradient(90deg, #FF0000 0%, #FF0000 ${percent}%, #626262 ${percent}%)`;
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
  if (video.volume == 0) {
    soundBtn.classList.add("muted");
  } else {
    soundBtn.classList.remove("muted");
  }
}

function soundOf() {
  if (video.volume == 0) {
      video.volume = soundLevel;
      soundControl.value = soundLevel * 10;
      soundBtn.classList.remove("muted");
  } else {
soundLevel = video.volume;
video.volume = 0;
soundControl.value = 0;
soundBtn.classList.add("muted");
  }
}