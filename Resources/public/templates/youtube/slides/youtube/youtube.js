/**
 * Youtube slide.
 */

// Register the function, if it does not already exist.
if (!window.slideFunctions['youtube']) {
    window.slideFunctions['youtube'] = {
        /**
         * Setup the slide for rendering.
         * @param scope
         *   The slide scope.
         */
        setup: function setupYoutubeSlide(scope) {
            scope.theStyle = {
                width: "100%",
                height: "100%"
            };

            // Load youtube player, if not already loaded.
            if (document.getElementsByClassName('youtube-player-api').length === 0) {
                // Load the IFrame Player API code asynchronously.
                var tag = document.createElement('script');
                tag.classList.add('youtube-player-api');
                tag.src = "https://www.youtube.com/player_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
        },

        /**
         * Run the slide.
         *
         * @param slide
         *   The slide.
         * @param region
         *   The region object.
         */
        run: function runYoutubeSlide(slide, region) {
            region.itkLog.info("Running youtube slide: " + slide.title);

            // Wait fadeTime before start to account for fade in.
            region.$timeout(function () {
                if (YT && slide.options.videoId) {
                    slide.onPlayerReady = function onPlayerReady(event) {
                        event.target.playVideo();

                        if (!slide.options.sound) {
                            slide.player.mute();
                        }
                        else {
                            slide.player.unMute();
                        }
                    };

                    slide.onPlayerStateChange = function onPlayerStateChange(event) {
                        if (event.data === YT.PlayerState.ENDED) {
                            slide.player.destroy();
                            region.nextSlide();
                        }
                    };

                    slide.player = new YT.Player('youtube-player--' + slide.uniqueId, {
                        width: '100%',
                        height: '100%',
                        videoId: slide.options.videoId,
                        playerVars: { 'autoplay': 0, 'controls': 0, 'fs': 0 },
                        events: {
                            'onReady': slide.onPlayerReady,
                            'onStateChange': slide.onPlayerStateChange
                        }
                    });
                }
                else {
                    region.$timeout(function () {
                        region.nextSlide();
                    }, 1000);
                }
            }, region.fadeTime);
        }
    };
}
