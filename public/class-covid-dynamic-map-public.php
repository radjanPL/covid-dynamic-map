<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       deligo.pl
 * @since      1.0.0
 *
 * @package    Covid_Dynamic_Map
 * @subpackage Covid_Dynamic_Map/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Covid_Dynamic_Map
 * @subpackage Covid_Dynamic_Map/public
 * @author     Deligo.pl <slawomir.s@deligo.pl>
 */
class Covid_Dynamic_Map_Public {

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
     * @var array $registered_scripts  Array of registered plugin-related scripts
     */
	protected $registered_scripts = [];

    /**
     * @var array $registered_styles  Array of registered plugin-related styles
     */
	protected $registered_styles = [];

    /**
     * @var array $cov_data Additional plugin settings
     *
     * @property {number} htmlFontSize - The calculated font size for the HTML document
     * @property {string} mapUrl - The base url where map images are stored
     * @property {string} apiUrl - The base url for the calculator API
     * @property {string} fontFamily - Font family for the theme
     * @property {string} primaryColor - Primary color for the theme
     * @property {string} secondaryColor - Secondary color for the theme
     * @property {string} primaryHeaderText - Primary Header text for calculator
     * @property {string} numberLabelColor - Color of input labels
     * @property {string} radioColor - Checked state color of radio buttons
     * @property {string} sliderColor - Primary color that slider uses
     *
     */

	protected $cov_data = [];

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

        wp_register_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/covid-dynamic-map-public.css', array(), $this->version, 'all' );
        $this->registered_styles[] = $this->plugin_name;
	}

    /**
     * Add shortcode
     */
    public function register_shortcodes() {

        add_shortcode( 'covidmap', array( $this, 'render_covidmap' ) );
    }

    /**
     * Add init tasks
     */
    public function setup_init() {

        add_filter( 'script_loader_tag', function( $tag, $handle ) {
            if ( ! preg_match( '/^dcm-/', $handle ) ) { return $tag; }
            return str_replace( ' src', ' async defer src', $tag );
        }, 10, 2 );

    }

    /**
     * Render calc code
     */
    public function render_covidmap($atts)
    {
        $fullsize = FALSE;

        foreach ($this->registered_styles as $registered_style) {
            wp_enqueue_style( $registered_style );
        }

        foreach ($this->registered_scripts as $registered_script) {
            wp_enqueue_script($registered_script);
        }

        $this->cov_data['htmlFontSize'] =  12;
        $this->cov_data['primaryHeaderText'] =  "";
        $this->cov_data['primaryColor'] =  "#cc262a";

        $settings = get_option( 'dcm_settings' );

        if($settings !== FALSE){
            if (isset($settings['dcm_api_url']) && !empty($settings['dcm_api_url'])) {
                $this->cov_data['apiUrl'] = $settings['dcm_api_url'];
            }
        }


        if(isset($atts['fullsize'])){
            $fullsize = TRUE;
        }

        wp_add_inline_script( 'dcm-main', 'window.cov_data='.json_encode($this->cov_data).';' );

        ob_start();
        include( plugin_dir_path( __FILE__ ) . 'partials/covid-dynamic-map-public-display.php' );
        $calc = ob_get_clean();
        return $calc;
    }

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

	    $asset_manifest = json_decode( file_get_contents( plugin_dir_path( __FILE__ ).'assets/asset-manifest.json' ), true )['files'];
	    $assets_url = plugin_dir_url( __FILE__ ).'assets/';

        if ( isset( $asset_manifest[ 'main.css' ] ) ) {
            wp_register_style( 'dcm', $assets_url . $asset_manifest[ 'main.css' ] );
            $this->registered_styles[] = 'dcm';

        }

        wp_register_script( 'dcm-runtime', $assets_url . $asset_manifest[ 'runtime-main.js' ], array(), $this->version, true );
        $this->registered_scripts[] = 'dcm-runtime';

        wp_register_script( 'dcm-main', $assets_url . $asset_manifest[ 'main.js' ], array('dcm-runtime'), $this->version, true );
        $this->registered_scripts[] = 'dcm-main';

        foreach ( $asset_manifest as $key => $value ) {
            if ( preg_match( '@static/js/(.*)\.chunk\.js@', $key, $matches ) ) {
                if ( $matches && is_array( $matches ) && count( $matches ) === 2 ) {
                    $name = "dcm-" . preg_replace( '/[^A-Za-z0-9_]/', '-', $matches[1] );
                    wp_register_script( $name, $assets_url . $value, array( 'dcm-main' ), $this->version, true );
                    $this->registered_scripts[] = $name;

                }
            }

            if ( preg_match( '@static/css/(.*)\.chunk\.css@', $key, $matches ) ) {
                if ( $matches && is_array( $matches ) && count( $matches ) == 2 ) {
                    $name = "dcm-" . preg_replace( '/[^A-Za-z0-9_]/', '-', $matches[1] );
                    wp_register_style( $name, $assets_url . $value, array( 'dcm' ), $this->version );
                    $this->registered_styles[] = $name;
                }
            }
        }

	}

}
