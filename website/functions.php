<?php
// functions.php - theme setup, styles & scripts

function ritchlau_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'ritchlau_theme_setup' );

function ritchlau_enqueue_assets() {
	wp_enqueue_style(
		'ritchlau-google-fonts',
		'https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&family=Noto+Sans+TC:wght@400;500;600;700;900&display=swap',
		array(),
		null
	);
	wp_enqueue_style(
		'ritchlau-style',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
	wp_enqueue_script(
		'ritchlau-script',
		get_template_directory_uri() . '/script.js',
		array(),
		wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ritchlau_enqueue_assets' );
