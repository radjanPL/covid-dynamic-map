<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       deligo.pl
 * @since      1.0.0
 *
 * @package    Covid_Dynamic_Map
 * @subpackage Covid_Dynamic_Map/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Covid_Dynamic_Map
 * @subpackage Covid_Dynamic_Map/admin
 * @author     Deligo.pl <slawomir.s@deligo.pl>
 */
class Covid_Dynamic_Map_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {


		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/covid-dynamic-map-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {


		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/covid-dynamic-map-admin.js', array( 'jquery' ), $this->version, false );

	}

    public function add_menu() {
        add_options_page( 'Covid Dynamic Map', 'Covid Dynamic Map', 'manage_options', 'location-calculator', array($this,'dcm_options_page') );

    }

    public function dcm_options_page()
    {
        include( plugin_dir_path( __FILE__ ) . 'partials/covid-dynamic-map-admin-settings.php' );
    }

    public function register_settings(){
        register_setting( 'dcmSettingsPage', 'dcm_settings' );
    }

    public function register_sections()
    {
        add_settings_section(
            'dcm_pluginPage_section',
            __( 'Covid Dynamic Map', 'wordpress' ),
            array( $this, 'section_messages' ),
            'dcmSettingsPage'
        );
    }

    public function register_fields()
    {

        add_settings_field(
            'dcm_api_url',
            __( 'Api URL', 'wordpress' ),
            array($this,'render_url_field'),
            'dcmSettingsPage',
            'dcm_pluginPage_section'
        );

    }


    public function section_messages()
    {
        include( plugin_dir_path( __FILE__ ) . 'partials/covid-dynamic-map-admin-section-messages.php' );
    }

    public function render_url_field($args)
    {
        include( plugin_dir_path( __FILE__ ) . 'partials/covid-dynamic-map-admin-field-url.php' );

    }

    public function init_settings(){

    }


}
