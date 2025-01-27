// // Constants
// const background = document.getElementById('myVideo');
// const headingSection = document.getElementById("welcome-text");
// const maxBlur = 50; // Maximum blur value
// const blurFactorA = 20; // Divisor for scrollY to control blur speed
// const blurFactorB = 40;
// const transpFactorA = 20;
// const opacityThreshold = 10;
// const opacityEnd = 300;
// const audio = document.getElementById("audioPlayer");
// const audioContext = new (window.AudioContext || window.webkitAudioContext)();
// const gainNode = audioContext.createGain();
// const audioSource = audioContext.createMediaElementSource(audio);
// const volumeSlider = document.getElementById('volumeSlider');
// const playPauseBtn = document.getElementById('playPauseBtn');
// const playlist = [
//   { src: 'data/audio/deadmau5 - Everything Before.mp3', start: 135, }
// ];
// let currentTrackIndex = 0;

// // Blur and opacity by scroll
// document.addEventListener('scroll', function () {
  
//   const scrollY = window.scrollY;
//   const blurValueA = Math.min(scrollY / blurFactorA, maxBlur); // Calculate blur based on scroll
//   const blurValueB = Math.min(scrollY / blurFactorB, maxBlur);

//   if (background) {
//     background.style.filter = `blur(${blurValueA}px)`;
//   }
//   if (headingSection) {
//     headingSection.style.filter = `blur(${blurValueB}px)`;
//   }

//   // Calculate opacity
//   let opacity = 1;
//   if (scrollY >= opacityThreshold && scrollY < opacityEnd) {
//     opacity = 1 - ((scrollY - opacityThreshold) / (opacityEnd - opacityThreshold));
//   } else if (scrollY >= opacityEnd) {
//     opacity = 0;
//   }

//   if (headingSection) {
//     headingSection.style.opacity = opacity;
//   }
// });

// audioSource.connect(gainNode);
// gainNode.connect(audioContext.destination);

// function fadeIn() {
//   const currentTime = audioContext.currentTime;
//   gainNode.gain.setValueAtTime(0, currentTime);
//   gainNode.gain.linearRampToValueAtTime(1, currentTime + 0.3);
// }

// function fadeOut() {
//   const currentTime = audioContext.currentTime;
//   gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
//   gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.3);
// }

// function playTrack(index) {
//   const track = playlist[index];
//   audio.src = track.src;
//   audio.currentTime = track.start;
//   const trackTitle = track.src.split('/').pop().split('.')[0];
//   document.getElementById('currentTrack').innerText = trackTitle;
// }

// playPauseBtn.addEventListener('click', function() {
//   if (audio.paused) {
//     playTrack(currentTrackIndex);
//     audio.play();
//     fadeIn();
//     playPauseBtn.textContent = '◼';
//   } else {
//     fadeOut();
//     setTimeout(() => {
//       audio.pause();
//       playPauseBtn.textContent = '▶';
//     }, 300); // Wait for fade-out to complete (0.3 seconds)
//   }
// });

// audio.addEventListener('ended', function() {
//   currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
//   playTrack(currentTrackIndex);
//   audio.play();
//   fadeIn();
// });

// volumeSlider.addEventListener('input', function() {
//   gainNode.gain.value = volumeSlider.value / 100;
// });

// gainNode.gain.value = volumeSlider.value / 100;
// playTrack(currentTrackIndex);

// /*
// next:
// - fix audio player on scroll
// - optimise audio player for mobile
// - add back to top button on scroll
// - see if we can get some transparency animations through the text
// - find an easier way to change variable names all at once
// */

// commented out above as it is currently not in use

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