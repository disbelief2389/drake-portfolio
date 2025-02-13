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

function resizeIframe(iframe) {
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}