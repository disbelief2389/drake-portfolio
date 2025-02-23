// Audio
const audio = document.getElementById("audioPlayer");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
const audioSource = audioContext.createMediaElementSource(audio);
const volumeSlider = document.getElementById('volumeSlider');
const playPauseBtn = document.getElementById('playPauseBtn');
const playlist = [
  { src: '/data/audio/deadmau5 - Everything Before.mp3', start: 135, }
];
let currentTrackIndex = 0;

audioSource.connect(gainNode);
gainNode.connect(audioContext.destination);

function fadeIn() {
  const currentTime = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, currentTime);
  gainNode.gain.linearRampToValueAtTime(1, currentTime + 0.3);
}

function fadeOut() {
  const currentTime = audioContext.currentTime;
  gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
  gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.3);
}

function prepareTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  audio.currentTime = track.start; // Set the start time here
  const trackTitle = track.src.split('/').pop().split('.')[0];
  document.getElementById('currentTrack').innerText = trackTitle;
}


playPauseBtn.addEventListener('click', function() {
  if (audio.paused) {
    if (audio.currentTime === 0) {
      // Only set the source and start time if the audio hasn't started yet
      prepareTrack(currentTrackIndex);
      audio.currentTime = playlist[currentTrackIndex].start;
    }
    audio.play();
    fadeIn();
    playPauseBtn.textContent = '❚❚';
  } else {
    fadeOut();
    setTimeout(() => {
      audio.pause();
      playPauseBtn.textContent = '▶';
    }, 300); // Wait for fade-out to complete
  }
});

audio.addEventListener('ended', function() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  audio.currentTime = 0;
  audio.play();
  fadeIn();
});

volumeSlider.addEventListener('input', function() {
  gainNode.gain.value = volumeSlider.value / 100;
});

gainNode.gain.value = volumeSlider.value / 100;
prepareTrack(currentTrackIndex);

/*
next:
- fix audio player on scroll
- optimise audio player for mobile
- add back to top button on scroll
- see if we can get some transparency animations through the text
- find an easier way to change variable names all at once
*/




// Contact details copy to clipboard
document.querySelectorAll('.contact-detail').forEach(element => {
  element.addEventListener('click', async () => {
    const text = element.textContent.trim(); // Get text (email/phone)
    
    try {
      await navigator.clipboard.writeText(text);
      showFeedback('Copied to clipboard!', element); // Show success feedback
    } catch (err) {
      showFeedback('Failed to copy', element); // Error handling
    }
  });
});

function showFeedback(message, parentElement) {
  const feedback = document.getElementById('copy-feedback');
  feedback.textContent = message;
  feedback.classList.add('show');

  // Hide after 1.5 seconds
  setTimeout(() => {
    feedback.classList.remove('show');
  }, 1500);
}



// Resize iframe
function resizeIframe(iframe) {
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}