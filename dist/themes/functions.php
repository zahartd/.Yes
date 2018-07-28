<?php
add_action( 'wp_enqueue_scripts', 'theme_name_scripts' );
function theme_name_scripts() {
	wp_enqueue_style( 'style', get_stylesheet_uri() );
	wp_enqueue_style( 'normalize', get_template_directory_uri(). '/libs/normalize.css/normalize.css' );
	wp_enqueue_style( 'animate', get_template_directory_uri(). '/libs/animate.css/animate.min.css' );
	wp_enqueue_style( 'slick', get_template_directory_uri(). '/libs/slick/slick.css' );
	wp_enqueue_style( 'slick-theme', get_template_directory_uri(). '/libs/slick/slick-theme.css' );
	wp_enqueue_style( 'main', get_template_directory_uri(). 'css/style.min.css' );
	}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
function theme_scripts() {
	wp_deregister_script( 'jquery' );
	wp_enqueue_script( 'jquery', get_template_directory_uri() . '/libs/jquery/jquery.min.js', array('wow'), null, true );
	wp_enqueue_script( 'wow', get_template_directory_uri() . "/js/wow.min.js" );
	wp_enqueue_script( 'slick', get_template_directory_uri() . "/libs/slick/slick.min.js", array('jquery'), null, true );
	wp_enqueue_script( 'main', get_template_directory_uri() . "js/main.min.js", array('slick'), null, true );
}
?>