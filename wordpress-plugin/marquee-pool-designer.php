<?php
/**
 * Plugin Name:  Marquee Pool Designer
 * Plugin URI:   https://www.marqueepools.com/
 * Description:  AI-powered pool designer widget for Marquee Pools & Service.
 *               Use shortcode [marquee_pool_designer] or [marquee_pool_designer_button]
 *               on any page or Elementor section to embed the designer.
 * Version:      1.0.0
 * Author:       Marquee Pools Dev Team
 * License:      GPL-2.0+
 * Text Domain:  marquee-pool-designer
 */

defined( 'ABSPATH' ) || exit;

// ─── Constants ────────────────────────────────────────────────────────────────
define( 'MPD_VERSION',    '1.0.0' );
define( 'MPD_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'MPD_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// ─── Enqueue assets ──────────────────────────────────────────────────────────
add_action( 'wp_enqueue_scripts', 'mpd_enqueue_assets' );
function mpd_enqueue_assets() {
    // Only load on pages that use the shortcode
    global $post;
    if ( ! is_a( $post, 'WP_Post' ) ) return;
    if ( ! has_shortcode( $post->post_content, 'marquee_pool_designer' ) &&
         ! has_shortcode( $post->post_content, 'marquee_pool_designer_button' ) ) {
        return;
    }

    // Google Fonts (matches Poolax theme)
    wp_enqueue_style(
        'mpd-google-fonts',
        'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800'
            . '&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400'
            . '&family=Red+Hat+Display:wght@400;600;700&display=swap',
        [],
        null
    );

    // Font Awesome
    wp_enqueue_style(
        'mpd-fontawesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
        [],
        '6.5.0'
    );

    // Built React widget bundle (run `npm run build:wp` to generate)
    wp_enqueue_script(
        'marquee-pool-designer',
        MPD_PLUGIN_URL . 'assets/pool-designer.js',
        [],
        MPD_VERSION,
        true   // load in footer
    );

    // Pass the API proxy URL and nonce to JS
    wp_localize_script( 'marquee-pool-designer', 'MarqueePoolDesignerConfig', [
        'proxyUrl' => rest_url( 'marquee-pools/v1/design-chat' ),
        'nonce'    => wp_create_nonce( 'wp_rest' ),
    ] );
}

// ─── Shortcodes ───────────────────────────────────────────────────────────────
/**
 * [marquee_pool_designer]
 * Renders the mount point div. The React bundle mounts to this.
 */
add_shortcode( 'marquee_pool_designer', 'mpd_shortcode_widget' );
function mpd_shortcode_widget() {
    return '<div id="marquee-pool-designer"></div>';
}

/**
 * [marquee_pool_designer_button label="Design My Pool" class="th-btn"]
 * Renders a button that triggers the modal via window.MarqueePoolDesigner.open()
 */
add_shortcode( 'marquee_pool_designer_button', 'mpd_shortcode_button' );
function mpd_shortcode_button( $atts ) {
    $atts = shortcode_atts( [
        'label' => 'Design My Pool',
        'class' => 'th-btn',
        'icon'  => 'fa fa-drafting-compass',
    ], $atts, 'marquee_pool_designer_button' );

    $label = esc_html( $atts['label'] );
    $class = esc_attr( $atts['class'] );
    $icon  = $atts['icon'] ? '<i class="' . esc_attr( $atts['icon'] ) . '" aria-hidden="true"></i> ' : '';

    return sprintf(
        '<button class="%s" onclick="window.MarqueePoolDesigner && window.MarqueePoolDesigner.open()">%s%s</button>',
        $class,
        $icon,
        $label
    );
}

// ─── REST API proxy ──────────────────────────────────────────────────────────
// Receives messages from the widget, calls Anthropic server-side so the API
// key is never exposed to the browser.
add_action( 'rest_api_init', 'mpd_register_rest_routes' );
function mpd_register_rest_routes() {
    register_rest_route( 'marquee-pools/v1', '/design-chat', [
        'methods'             => 'POST',
        'callback'            => 'mpd_proxy_chat',
        'permission_callback' => '__return_true',   // public endpoint
    ] );
}

function mpd_proxy_chat( WP_REST_Request $request ) {
    $api_key = defined( 'MARQUEE_ANTHROPIC_KEY' ) ? MARQUEE_ANTHROPIC_KEY : get_option( 'mpd_anthropic_key' );

    if ( ! $api_key ) {
        return new WP_Error(
            'mpd_no_key',
            'Anthropic API key not configured. Add define(\'MARQUEE_ANTHROPIC_KEY\', \'sk-ant-...\') to wp-config.php.',
            [ 'status' => 500 ]
        );
    }

    $body     = $request->get_json_params();
    $messages = isset( $body['messages'] ) ? $body['messages'] : [];

    if ( empty( $messages ) ) {
        return new WP_Error( 'mpd_bad_request', 'messages array required', [ 'status' => 400 ] );
    }

    // System prompt (kept server-side)
    $system = mpd_get_system_prompt();

    $response = wp_remote_post( 'https://api.anthropic.com/v1/messages', [
        'timeout' => 45,
        'headers' => [
            'Content-Type'      => 'application/json',
            'x-api-key'         => $api_key,
            'anthropic-version' => '2023-06-01',
        ],
        'body' => wp_json_encode( [
            'model'      => 'claude-sonnet-4-20250514',
            'max_tokens' => 1024,
            'system'     => $system,
            'messages'   => $messages,
        ] ),
    ] );

    if ( is_wp_error( $response ) ) {
        return new WP_Error( 'mpd_upstream', $response->get_error_message(), [ 'status' => 502 ] );
    }

    $data = json_decode( wp_remote_retrieve_body( $response ), true );
    $text = '';
    if ( isset( $data['content'] ) && is_array( $data['content'] ) ) {
        foreach ( $data['content'] as $block ) {
            if ( isset( $block['type'] ) && $block['type'] === 'text' ) {
                $text .= $block['text'];
            }
        }
    }

    return rest_ensure_response( [ 'reply' => $text ] );
}

function mpd_get_system_prompt() {
    return "You are a senior pool design consultant at Marquee Pools & Service, Inc., "
         . "serving Fairfield County, Connecticut since 1987. You help homeowners design "
         . "their dream pool through expert, friendly conversation.\n\n"
         . "MARQUEE'S TWO POOL TYPES:\n"
         . "1. FIBERGLASS POOLS (via Latham and River Pools): One-piece in-ground, fastest "
         . "installation, lifetime structural warranty. Models: Laguna, Barcelona, Cancun, Olympia. "
         . "Finishes: Ocean Blue, Sapphire, Caribbean.\n"
         . "2. VINYL-LINER POOLS: Fully custom shapes, cantilever coping, stamped concrete. "
         . "Features: waterfalls, spillover spas, fire bowls/walls, deck jets, lighted water sheers.\n\n"
         . "Discuss 1-2 topics at a time. Be warm, professional, specific. Keep responses 3-5 sentences. "
         . "Reference CT towns (Fairfield, Trumbull, Shelton, Newtown, Westport) when relevant. "
         . "Make model-specific recommendations. Topics: pool type, shape/size, depth, water features, "
         . "spa/hot tub, fire features, decking, Pentair LED lighting, sound system, automation, covers.";
}

// ─── Admin settings page ──────────────────────────────────────────────────────
add_action( 'admin_menu', 'mpd_admin_menu' );
function mpd_admin_menu() {
    add_options_page(
        'Pool Designer Settings',
        'Pool Designer',
        'manage_options',
        'marquee-pool-designer',
        'mpd_settings_page'
    );
}

function mpd_settings_page() {
    if ( isset( $_POST['mpd_save'] ) && check_admin_referer( 'mpd_settings' ) ) {
        update_option( 'mpd_anthropic_key', sanitize_text_field( $_POST['mpd_anthropic_key'] ) );
        echo '<div class="updated"><p>Settings saved.</p></div>';
    }
    $key = get_option( 'mpd_anthropic_key', '' );
    ?>
    <div class="wrap">
        <h1>Marquee Pool Designer — Settings</h1>
        <p>Alternatively, define <code>MARQUEE_ANTHROPIC_KEY</code> in <code>wp-config.php</code> (recommended for security).</p>
        <form method="post">
            <?php wp_nonce_field( 'mpd_settings' ); ?>
            <table class="form-table">
                <tr>
                    <th><label for="mpd_anthropic_key">Anthropic API Key</label></th>
                    <td>
                        <input type="password" id="mpd_anthropic_key" name="mpd_anthropic_key"
                               value="<?php echo esc_attr( $key ); ?>" class="regular-text" />
                        <p class="description">Your <code>sk-ant-...</code> key from console.anthropic.com</p>
                    </td>
                </tr>
            </table>
            <p><input type="submit" name="mpd_save" class="button-primary" value="Save Settings" /></p>
        </form>
        <hr>
        <h2>Shortcode Usage</h2>
        <table class="widefat" style="max-width:700px">
            <thead><tr><th>Shortcode</th><th>Output</th></tr></thead>
            <tbody>
                <tr><td><code>[marquee_pool_designer]</code></td><td>Hidden mount point (required on any page using the designer)</td></tr>
                <tr><td><code>[marquee_pool_designer_button]</code></td><td>Styled button that opens the designer modal</td></tr>
                <tr><td><code>[marquee_pool_designer_button label="Design My Pool" class="th-btn"]</code></td><td>Customized button</td></tr>
            </tbody>
        </table>
    </div>
    <?php
}
