// Define the scroll functions
function nextCard(container, scrollDistance) {
	container.scrollBy({ left: scrollDistance, behavior: "smooth" });
}

function previousCard(container, scrollDistance) {
	container.scrollBy({ left: -scrollDistance, behavior: "smooth" });
}

document.querySelectorAll("fieldset.grid").forEach((fieldset) => {
	// Grab the elements specific to this fieldset:
	const container = fieldset.querySelector(".projects-container");
	const prevButton = fieldset.querySelector(".chevron-buttons .prev-btn");
	const nextButton = fieldset.querySelector(".chevron-buttons .next-btn");

	// Check if essential elements exist; if not, log an error.
	if (!container) {
		console.error("No .projects-container found in fieldset", fieldset.id);
		return;
	}
	if (!prevButton || !nextButton) {
		console.error("Missing chevron buttons in fieldset", fieldset.id);
		return;
	}

	// Add click event listeners and recalc tile width on each click:
	prevButton.addEventListener("click", () => {
		const tile = fieldset.querySelector(".project-tile");
		if (!tile) {
			console.error("No .project-tile found in fieldset", fieldset.id);
			return;
		}
		const tileWidth = tile.clientWidth;
		previousCard(container, tileWidth);
	});

	nextButton.addEventListener("click", () => {
		const tile = fieldset.querySelector(".project-tile");
		if (!tile) {
			console.error("No .project-tile found in fieldset", fieldset.id);
			return;
		}
		const tileWidth = tile.clientWidth;
		nextCard(container, tileWidth);
	});
});

// Sidebar functionality
function initializeSidebar() {
	const navbar = document.getElementById("nav-accent");
	const openBtn = document.getElementById("open-sidebar-btn");
	const closeBtn = document.getElementById("close-sidebar-btn");
	const audioControls = document.getElementById("audio-controls");
	const homeBtn = document.getElementById("home-btn");
	const aboutBtn = document.getElementById("about-btn");
	const workBtn = document.getElementById("work-btn");
	const contactBtn = document.getElementById("contact-btn");
	const blogBtn = document.getElementById("blog-btn");
	const overlay = document.getElementById("overlay");
	const currentURL = window.location.href;

	function updateButtonStates() {
		if (navbar.classList.contains("show")) {
			// when sidebar is open:
			openBtn.style.display = "none";
			closeBtn.style.display = "flex";

			if (audioControls) {
				audioControls.style.opacity = 0;
				setTimeout(() => {
					audioControls.classList.add("hidden");
				}, 300);
			}

			setTimeout(() => {
				overlay.style.opacity = 1;
				overlay.style.pointerEvents = "auto";
			});
		} else {
			// when sidebar is closed:
			openBtn.style.display = "flex";
			closeBtn.style.display = "none";

			if (audioControls) {
				audioControls.style.opacity = 1;
				setTimeout(() => {
					audioControls.classList.remove("hidden");
				}, 300);
			}

			overlay.style.opacity = 0;
			overlay.style.pointerEvents = "none";
		}
	}

	function openSidebar() {
		navbar.classList.add("show");
		updateButtonStates();
	}

	function closeSidebar() {
		navbar.classList.remove("show");
		updateButtonStates();
	}

	openBtn.addEventListener("click", openSidebar);
	closeBtn.addEventListener("click", closeSidebar);
	overlay.addEventListener("click", closeSidebar);

	if (
		currentURL.endsWith("/index.html") ||
		currentURL.endsWith("/") ||
		currentURL.includes("contact-container") ||
		currentURL.includes("projects-container") ||
		currentURL.includes("about-container")
	) {
		aboutBtn.addEventListener("click", closeSidebar);
		workBtn.addEventListener("click", closeSidebar);
		contactBtn.addEventListener("click", closeSidebar);
	}

	// Initial state setup
	updateButtonStates();
}

// Audio
const audio = document.getElementById("audioPlayer");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
const audioSource = audioContext.createMediaElementSource(audio);
// const volumeSlider = document.getElementById('volumeSlider');
const playPauseBtn = document.getElementById("playPauseBtn");
const playlist = [{ src: "/data/audio/DockedOnceMore_1.mp3", start: 0 }];
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
	const trackTitle = track.src.split("/").pop().split(".")[0];
	document.getElementById("currentTrack").innerText = trackTitle;
}

playPauseBtn.addEventListener("click", function () {
	if (audio.paused) {
		if (audio.currentTime === 0) {
			// Only set the source and start time if the audio hasn't started yet
			prepareTrack(currentTrackIndex);
			audio.currentTime = playlist[currentTrackIndex].start;
		}
		audio.play();
		fadeIn();
		playPauseBtn.textContent = "◼";
	} else {
		fadeOut();
		setTimeout(() => {
			audio.pause();
			playPauseBtn.textContent = "▶";
		}, 300); // Wait for fade-out to complete
	}
});

audio.addEventListener("ended", function () {
	currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
	audio.currentTime = 0;
	audio.play();
	fadeIn();
});

// volumeSlider.addEventListener('input', function() {
//   gainNode.gain.value = volumeSlider.value / 100;
// });

// gainNode.gain.value = volumeSlider.value / 100;
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
document.querySelectorAll(".contact-detail").forEach((element) => {
	element.addEventListener("click", async () => {
		const text = element.textContent.trim(); // Get text (email/phone)

		try {
			await navigator.clipboard.writeText(text);
			showFeedback("Copied to clipboard!", element); // Show success feedback
		} catch (err) {
			showFeedback("Failed to copy", element); // Error handling
		}
	});
});

function showFeedback(message, parentElement) {
	const feedback = document.getElementById("copy-feedback");
	feedback.textContent = message;
	feedback.classList.add("show");

	// Hide after 1.5 seconds
	setTimeout(() => {
		feedback.classList.remove("show");
	}, 1500);
}

// Resize iframe
function resizeIframe(iframe) {
	iframe.style.height =
		iframe.contentWindow.document.body.scrollHeight + "px";
}
