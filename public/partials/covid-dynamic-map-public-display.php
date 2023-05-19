<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       deligo.pl
 * @since      1.0.0
 *
 * @package    Covid_Dynamic_Map
 * @subpackage Covid_Dynamic_Map/public/partials
 */
?>

<div id="covid-state-status-map" class="<?php if (is_page() || $fullsize == TRUE){ ?>covid-dynamic-map-container <?php } ?>">
</div>