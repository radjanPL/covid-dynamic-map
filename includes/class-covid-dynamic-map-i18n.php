<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       deligo.pl
 * @since      1.0.0
 *
 * @package    Covid_Dynamic_Map
 * @subpackage Covid_Dynamic_Map/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Covid_Dynamic_Map
 * @subpackage Covid_Dynamic_Map/includes
 * @author     Deligo.pl <slawomir.s@deligo.pl>
 */
class Covid_Dynamic_Map_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'covid-dynamic-map',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
