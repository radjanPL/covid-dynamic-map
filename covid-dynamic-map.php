<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @since             1.0.0
 * @package           Covid_Dynamic_Map
 *
 * @wordpress-plugin
 * Plugin Name:       Covid Dynamic Map
 * Description:       Covid Dynamic Map
 * Version:           1.1.0
 * Author:            Deligo.pl
 * Author URI:        deligo.pl
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       covid-dynamic-map
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'COVID_DYNAMIC_MAP_VERSION', '1.1.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-covid-dynamic-map-activator.php
 */
function activate_covid_dynamic_map() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-covid-dynamic-map-activator.php';
	Covid_Dynamic_Map_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-covid-dynamic-map-deactivator.php
 */
function deactivate_covid_dynamic_map() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-covid-dynamic-map-deactivator.php';
	Covid_Dynamic_Map_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_covid_dynamic_map' );
register_deactivation_hook( __FILE__, 'deactivate_covid_dynamic_map' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-covid-dynamic-map.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_covid_dynamic_map() {

	$plugin = new Covid_Dynamic_Map();
	$plugin->run();

}
run_covid_dynamic_map();
