<?php
require_once('init.php');
require_once dirname(__FILE__) . '/classes/PDODb.php';
$db = PDODb::getInstance(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title>WeMAST Geoportal</title>
        <?= HTML::page_css('bootstrap.min.css') ?>
        <?= HTML::page_css('style.css') ?>
        <?= HTML::page_css('all.min.css') ?>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.js"></script>
        <script src="https://cdn.maptiler.com/mapbox-gl-js/v1.5.1/mapbox-gl.js"></script>
        <script src="https://cdn.maptiler.com/mapbox-gl-leaflet/latest/leaflet-mapbox-gl.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" />
        <link rel="stylesheet" href="https://cdn.maptiler.com/mapbox-gl-js/v1.5.1/mapbox-gl.css" />
        <style>
            #mapid {
                width: 100%;
                min-height: 80%;
            }

            .leaflet-container {
                background: #fff;
            }

            #main {
                border-bottom: 2px solid #2e3192;
                min-height: 60px;
                padding-bottom: 2px;
            }
        </style>
    </head>
    <body class="home page-template-default page page-id-264 tribe-js">
        <div id="main">
            <header id="header"> 
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-3 col-xs-2">
                            <a href="http://wemast.sasscal.org/" title="GMES-WeMAST" class="logo" style="height: 135px;">
                                <?= HTML::assets_img('gmes-logo.png', 'float: left;max-height: 75px;') ?>
                            </a>
                        </div>
                        <div class="col-lg-6 col-xs-8 text-center">
                            <h1 style="font-family:Tahoma, Geneva, sans-serif; font-size:22px; color:#2e3192; margin-top: 15px;">
                                Wetland Monitoring and Assessment Service for Transboundary Basins
                            </h1>
                        </div>
                        <div class="col-lg-3 col-xs-3">
                            <div style="float: right;">
                                <?= HTML::assets_img('wemast_logo_website.png', 'display: inline-block;max-height: 75px;') ?>
                                <a href="http://www.sasscal.org/" target="_blank">
                                    <?= HTML::assets_img('sasscal_with_website_white.png', 'display: inline-block;max-height: 75px;') ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div id="wemastgeo" style="border:0; min-height: 80vh; overflow: auto;">
            <div class="bg-primary border-primary rounded-0" id="min-filter" onclick="collapseFilter();">
                <i class="fas fa-chevron-circle-left text-white" style="display: inline-block; margin: auto; font-size: 1.25rem;"></i>
            </div>
            <div class="card border-primary mb-3 rounded-0" style="width: 20rem; position: absolute; right: 0; z-index: 9999;" id="main-filter">
                <div class="card-header bg-primary border-primary rounded-0">
                    <h5 class="text-white">
                        <a class="text-white" href="javascript:void(0)" role="button" onclick="collapseFilter()"><i class="fas fa-chevron-circle-right"></i></a>
                        Filters
                    </h5>
                </div>
                <div class="card-body">
                    <div class="p-2">
                        <div class="">
                            <div class="form-group">
                                <label>Basin</label>
                                <div>
                                    <select name="basin_select" id="basin_select" class="form-control">
                                        <option value="">-select basin-</option>
                                        <?php
                                        $db->orderBy("name", "ASC");
                                        $basins = $db->get("basin");

                                        foreach ($basins as $basin) {
                                            echo '<option value="', $basin['id'], '">', $basin['name'], '</option>';
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Wetland</label>
                                <div>
                                    <select name="wetland_select" id="wetland_select" class="form-control">
                                        <option value="">-select basin-</option>
                                        <?php
                                        $db->orderBy("wetland", "ASC");
                                        $wetlands = $db->get("reference_wetlands");

                                        foreach ($wetlands as $wetland) {
                                            echo '<option value="', $wetland['id'], '">', $wetland['wetland'], '</option>';
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p2" id="dynamic-content-panel" style="max-height: 40vh; overflow: auto;">

                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="main-content">
                <!--<iframe src="http://197.188.227.173:9090/wemastgeoportal/wemast.html" style="width: 100%; min-height: 80vh;"></iframe>-->
            </div>
        </div>
        <footer class="footer">
            <div class="container-fluid">
                <div class="text-dark">
                    <span class="copyright">GMES-WeMAST © 2018 | All Rights Reserved</span>
                    <div class="float-right bg-white">
                        <?= HTML::assets_img('consortium_min_sasscal.png', 'max-height: 60px;') ?>
                    </div>
                </div>
            </div>
        </footer>

        <!--BEGIN -- GLOBAL AJAX MODAL-->
        <div id="ajax-modal" class="modal fade" tabindex="-1" style="display: none;"></div>
        <!--END -- GLOBAL AJAX MODAL-->
        <?= HTML::page_js('jquery-2.1.4.min.js') ?>
        <?= HTML::page_js('bootstrap.min.js') ?>
        <?= HTML::page_js('common.js') ?>


        <script type="text/javascript">
            function collapseFilter() {
                if ($('#main-filter').is(':visible')) {

                    $('#main-filter').addClass('collapse').animate({width: "0"}, 'slow', 'swing', function () {
                        $(this).css('display', 'none');
                        $('#basin_select').val('').trigger('change');
                        $('#min-filter').animate({width: "2rem"}).css('display', 'flex');
                    });
                } else {
                    $('#min-filter').animate({width: "0"}, 'slow', 'swing', function () {
                        $(this).css('display', 'none');
                        $('#main-filter').css('display', 'flex').animate({width: "20rem"});
                    });
                }
            }

            $(function () {
                $('#basin_select').on('change', function () {
                    if (!isEmpty($(this).val())) {
                        doGet('get_basin_wetlands.php?id=' + this.value, function (data) {
                            $('#wetland_select').html(data);
                        });

                        doGet('get_basin_panel.php?id=' + this.value, function (data) {
                            $('#dynamic-content-panel').html(data);
                        });
                    } else {
                        $('#dynamic-content-panel').html('');
                        $('#wetland_select').html('<option value="">-select basin-</option>');
                    }
                });

                $('#wetland_select').on('change', function () {
                    if (!isEmpty($(this).val())) {
                        doGet('get_wetland_panel.php?id=' + this.value, function (data) {
                            $('#dynamic-content-panel').html(data);
                        });
                    } else {
                        doGet('get_basin_panel.php?id=' + this.value, function (data) {
                            $('#dynamic-content-panel').html(data);
                        });
                    }
                });
            });
        </script>
    </body>
</html>
