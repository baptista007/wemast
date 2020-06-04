<?php

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'wemast_user');
define('DB_PASSWORD', 'NKA-s7W'); 
define('DB_NAME', 'wemast');
define('DB_TYPE', 'pgsql');

// return the full path application directory
define('ROOT', str_replace('\\', '/', dirname(__FILE__)) . '/');

// return the application directory name.
define('ROOT_DIR_NAME', basename(ROOT));

define('SITE_NAME', "SDG Portal");


// Get Site Address Dynamically
$site_addr = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']);

//Must end with /
$site_addr = rtrim($site_addr, "/\\") . "/";

define('SITE_ADDR', $site_addr);

// Application Default Color (Mostly Used By Mobile)
define('META_THEME_COLOR', "#000000");

// Application Files and Directories 
define('IMG_DIR', "assets/img/");
define('SITE_FAVICON', IMG_DIR . "sdgs.png");
define('SITE_LOGO', IMG_DIR . "SDG_logo.png");
define('CSS_DIR', SITE_ADDR . "assets/css/");
define('JS_DIR', SITE_ADDR . "assets/js/");
define('HELPERS_DIR', 'helpers/');


/**
 * Initialize The Helper Class From helper Dir
 * @return null
 */
function autoloadHelper($className) {
    $filename = HELPERS_DIR . $className . ".php";
    if (is_readable($filename)) {
        require $filename;
    }
}

spl_autoload_register("autoloadHelper");
