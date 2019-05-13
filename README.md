# youtube-bundle
Contains a template for youtube videos.

## Installation
Add the git repository to "repositories" in `composer.json`.

<pre>
"repositories": {
    "os2display/youtube-bundle": {
      "type": "vcs",
      "url": "https://github.com/os2display/youtube-bundle"
    },
    ...
}
</pre>

Require the bundle with composer.

<pre>
composer require os2display/youtube-bundle
</pre>

Enable the bundle in `AppKernel.php`, by adding Os2DisplayYoutubeBundle to $bundles.

<pre>
new Os2Display\YoutubeBundle\Os2DisplayYoutubeBundle()
</pre>

Run os2display:core:templates:load command to load the template in the installation.
<pre>
bin/console os2display:core:templates:load
</pre>

Enable the template in the administration.
