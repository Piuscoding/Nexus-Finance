const siteVideoModal = document.getElementById('siteVideoModal');
if (siteVideoModal) {
  let player;
  let lastButton = '';

  /**
   * Configuration object for YouTube video player settings and DOM elements.
   */
  const config = {
    youtube: 'player-frame-window',       // ID of the YouTube iframe element.
    btnPlay: '#player-play-button',            // Selector for the play button(s).
    btnPause: '#player-pause-button',          // Selector for the pause button.
    modalId: '#siteVideoModal',         // Selector for the modal element.
    videoQuality: 'hd720'           // Desired video quality.
  };

  /**
   * Callback function for when the YouTube IFrame API is ready.
   * Initializes the YouTube player with the specified settings and events.
   */
  function onYouTubePlayerAPIReady() {
    player = new YT.Player(config.youtube, {
      controls: 2,
      iv_load_policy: 3,
      rel: 0,
      events: {
        onReady: () => addEventListeners()
      }
    });
  }

  /**
   * Adds event listeners to the play and pause buttons, and the modal element.
   * The play button triggers video playback, the pause button pauses the video, 
   * and clicking outside the modal pauses the video as well.
   */
  function addEventListeners() {
    document.querySelectorAll(config.btnPlay).forEach(button =>
      button.addEventListener('click', handlePlayButtonClick)
    );
    document.querySelector(config.btnPause).addEventListener('click', player.pauseVideo.bind(player));
    document.querySelector(config.modalId).addEventListener('click', player.pauseVideo.bind(player));
  }

  /**
   * Handles the play button click event.
   * Loads and plays a YouTube video based on the button's data attributes.
   * If the same button is clicked consecutively, the video resumes from where it left off.
   *
   * @param {Event} event - The event object from the button click.
   */
  function handlePlayButtonClick(event) {
    const button = event.currentTarget;
    const videoId = button.getAttribute('data-video-src');

    if (lastButton === videoId) {
      player.playVideo();
    } else {
      player.loadVideoById(videoId, 0, config.videoQuality);
      lastButton = videoId;
    }
  }
}