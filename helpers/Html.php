<?php

/**
 * Html Helper Class
 * Use To Display Customisable Html Page Component
 * @category  View Helper
 */
class Html {

    /**
     * Display Html Head Title
     * Set Title From Url If Present
     * @return Html
     */
    public static function page_title($title = null) {
        //if title is passed to the url parameters then use it. if not used the titleset on the PageLayout View
        if (!empty($_GET['title'])) {
            $title = $_GET['title'];
        }
        ?>
        <title><?php echo $title; ?></title>
        <?php
    }

    /**
     * Display Html Head Meta Tag
     * @return Html
     */
    public static function page_meta($name, $val = null) {
        ?>
        <meta name="<?php echo $name; ?>" content="<?php echo $val ?>" />
        <?php
    }

    /**
     * Link To Css File From Css Dir
     * NB -- Pass only The Css File Nam-- (eg. style.css) 
     * @return Html
     */
    public static function page_css($arg) {
        ?>
        <link rel="stylesheet" href="<?= CSS_DIR . $arg ?>" />
        <?php
    }

    /**
     * Link To Js File From JS Dir
     * NB -- Pass only The Js File Name-- (eg. script.js) 
     * @return Html
     */
    public static function page_js($arg) {
        ?>
        <script type="text/javascript" src="<?= JS_DIR . $arg ?>"></script>
        <?php
    }

    public static function assets_img($image_name, $style = "") {
        ?>
        <img src="<?= IMG_DIR . $image_name ?>" alt="<?= $image_name ?>" style="<?= $style ?>" />
        <?php
    }

    public static function display_form_errors($formerror) {
        if (!empty($formerror)) {
            if (!is_array($formerror)) {
                ?>
                <div class="alert alert-danger animated shake">
                    <?php echo $formerror; ?>
                </div>
                <?php
            } else {
                ?>
                <script>
                    $(document).ready(function () {
                <?php
                foreach ($formerror as $key => $value) {
                    echo "$('[name=$key]').parent().addClass('has-error').append('<span class=\"help-block\">$value</span>');";
                }
                ?>
                    });
                </script>
                <?php
            }
        }
    }

    /**
     * Display Page Main Header Components
     * @return Html
     */
    public static function page_header($arg = null) {
        if (user_login_status() == true) {
            ?>
            <nav class="navbar navbar-dark bg-light fixed-left navbar-expand-md">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav_collapse" aria-controls="nav_collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a href="<?= SITE_ADDR ?>" target="_self" class="navbar-brand bg-light"><img src="<?= SITE_ADDR . IMG_DIR . 'SDG_logo.png' ?>" class="img-responsive"></a>
                <div class="user-info">
                    <h5 class="user-name"> Welcome, <?php echo ucwords(USER_NAME); ?></h5>
                    ---
                    <a href="<?= get_link('admin/logout') ?>" style="color: #ffffff;">
                        <div class="item-inner">
                            <div class="item-title"><i class="fa fa-sign-out"></i> &nbsp; Logout</div>
                        </div>
                    </a>
                </div>
                <div id="nav_collapse" class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        <ul class="sdg-menu">
                            <li>
                                <a href="<?= get_link('admin') ?>" class="item-link item-content bg-gray">
                                    <div class="item-inner">
                                        <div class="item-title"><i class="fa fa-dashboard"></i> Dashboard</div>
                                    </div>
                                </a>
                            </li>
                            <?php
                            $db = PDODb::getInstance();
                            $db->where('primary_data_uploader_id', get_active_user('user_id'), "=");
                            $db->where('secondary_data_uploader_id', get_active_user('user_id'), "=", 'OR');
                            $provider = $db->getOne('data_provider');

                            if ($provider && PageAccessManager::is_allowed('dataprovider/uploads')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('dataprovider/uploads') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title">
                                                <i class="fa fa-upload"></i> Upload Data</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }

                            if (PageAccessManager::is_allowed('admin/upload')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('admin/upload') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title"><i class="fa fa-upload"></i> Upload Data For Publishing</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }

                            if (PageAccessManager::is_allowed('admin/verify')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('admin/verify') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title"><i class="fa fa-check"></i> Verify Data For Publishing</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }

                            if (PageAccessManager::is_allowed('admin/approve')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('admin/approve') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title"><i class="fa fa-send"></i> Approve Data For Publishing</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }

                            if (PageAccessManager::is_allowed('dataprovider/verify')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('dataprovider/verify') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title">
                                                <i class="fa fa-check-circle"></i> Verify Provider Data</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }

                            if (PageAccessManager::is_allowed('dataprovider/verify')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('dataprovider/verified') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title">
                                                <i class="fa fa-thumbs-o-up"></i> Verified Provider Data</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }

                            if (PageAccessManager::is_allowed('dataprovider')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('dataprovider') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title"><i class="fa fa-database"></i> Manage Data Providers</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }

                            if (PageAccessManager::is_allowed('admin/configuration')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('configuration/template') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title"><i class="fa fa-archive"></i>Manage Data Upload Template</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }

                            if (PageAccessManager::is_allowed('users')) {
                                ?>
                                <li>
                                    <a href="<?= get_link('users') ?>" class="item-link item-content bg-gray">
                                        <div class="item-inner">
                                            <div class="item-title">
                                                <i class="fa fa-users"></i> Manage Users</div>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }
                            ?>
                        </ul>
                    </ul>
                </div>
            </nav>
            <?php
        }
    }

    /**
     * Display Page Main Footer Components
     * @return Html
     */
    public static function page_footer($args = null) {
        ?>
        <footer class="footer bg-light">
            <div  class="container-fluid text-center">
                <div class="row">
                    <div  class="col-sm-4 text-left">
                        <div class="copyright">All rights reserved. &copy; <?php echo SITE_NAME ?> - <?php echo date('Y') ?></div>
                    </div>
                </div>
            </div>
        </footer>
        <?php
    }

    public static function add_new_button($link, $text) {
        ?>
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <a href="<?= $link ?>" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fa fa-plus fa-sm text-white-50"></i> <?= $text ?></a>
            </div>
        </div>   
        <?php
    }

    public static function back_button() {
        ?>
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <a href="javascript:void(0)" onclick="javascript:history.go(-1)" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fa fa-arrow-left text-white-50"></i> Back</a>
            </div>
        </div>   
        <?php
    }

    public static function no_records() {
        ?>
        <div class="card-body">
            <div class="text-muted animated bounce">
                <h4><i class="fa fa-ban"></i> No records to show.</h4>
            </div>
        </div>   
        <?php
    }

    public static function alert_div($message, $class = "danger") {
        ?>
        <div class="alert alert-<?= $class ?>">
        <?= $message ?>
        </div>   
        <?php
    }

    public static function getMonthNumber($str) {
        switch (strtolower($str)) {
            case 'jan': return 1;
            case 'feb': return 2;
            case 'mar': return 3;
            case 'apr': return 4;
            case 'may': return 5;
            case 'jun': return 6;
            case 'jul': return 7;
            case 'aug': return 8;
            case 'sep': return 9;
            case 'oct': return 10;
            case 'nov': return 11;
            case 'dec': return 12;
        }
    }
    
    public static function getMonthName($str) {
        switch (strtolower($str)) {
            case 1: return 'Jan';
            case 2: return 'Feb';
            case 3: return 'Mar';
            case 4: return 'Apr';
            case 5: return 'May';
            case 6: return 'Jun';
            case 7: return 'Jul';
            case 8: return 'Aug';
            case 9: return 'Sep';
            case 10: return 'Oct';
            case 11: return 'Nov';
            case 12: return 'Dec';
        }
    }

}
