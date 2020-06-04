<?php

require_once('init.php');
require_once dirname(__FILE__) . '/classes/PDODb.php';
$db = PDODb::getInstance(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);


$id = $_GET['id'];
$db->where("id", $id);
$basin = $db->getOne("basin");


Html :: page_js('Highcharts/highcharts.js');
Html :: page_js('Highcharts/data.js');
Html :: page_js('Highcharts/exporting.js');
Html :: page_js('Highcharts/export-data.js');
Html :: page_js('Highcharts/accessibility.js');
Html :: page_js('Highcharts/histogram-bellcurve.js');

if ($basin) {
    ?>
    <div class="container-fluid">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Monthly Stats</a>
                <a class="nav-item nav-link" id="nav-chartTable-tab" data-toggle="tab" href="#nav-season" role="tab" aria-controls="nav-chartTable" aria-selected="false">Seasonal Stats</a>
                <a class="nav-item nav-link" id="nav-map-tab" data-toggle="tab" href="#nav-spi" role="tab" aria-controls="nav-maps" aria-selected="false">SPI</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div id="monthly-chart"></div>
                <?php
                
                $months = array();
                
                $db->clearWhere();
                $db->where("basin_id", $id);
                $db->where("stat", "average");
                $db->orderBy("year", 'ASC');
                $db->orderBy("month", 'ASC');
                
                $avgs = $db->get("basin_rainfall_stats");
                $avg_data = array();
                $min_data = array();
                $max_data = array();
                
                foreach ($avgs as $row) {
                    $months[] = $row['year'] . ' - ' . HTML::getMonthName($row['month']);
                    $avg_data[] = $row['value'];
                }
                
                $db->clearWhere();
                $db->where("basin_id", $id);
                $db->where("stat", "minimum");
                
                $mins  = $db->get("basin_rainfall_stats");
                foreach ($mins as $row) {
                    $min_data[] = $row['value'];
                }
                
                
                $db->clearWhere();
                $db->where("basin_id", $id);
                $db->where("stat", "maximum");
                
                $maxs  = $db->get("basin_rainfall_stats");
                
                foreach ($maxs as $row) {
                    $max_data[] = $row['value'];
                }
                ?>
                <script type="text/javascript">
                    avg = JSON.parse('<?= json_encode($avg_data) ?>').map(parseFloat);
                    min = JSON.parse('<?= json_encode($min_data) ?>').map(parseFloat);
                    max = JSON.parse('<?= json_encode($max_data) ?>').map(parseFloat);
                    $(function () {
                        $('#monthly-chart').highcharts({
                            title: {
                                text: 'Basin Monthly Stats'
                            },
                            chart: {
                              type: 'histogram',
                              zoomType: 'xy'
                            },
                            xAxis: {
                                categories: JSON.parse('<?= json_encode($months) ?>')
                            },
                            yAxis: {
                                title: {
                                    text: 'Rainfal in mm'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: 'mm'
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0,
                                 showInLegend: false
                            },
                            series: [
                              {
                                marker: {
                                   fillColor: 'transparent',
                                   lineColor: '#fd7e14'
                                },
                                data: max,
                                name: 'Maximum rainfall'
                              },
                              {

                                  marker: {
                                        fillColor: 'transparent',
                                        lineColor: '#fd7e14'
                                 },
                                  data: min,
                                  name: 'Minimum rainfall'
                              },
                              {

                                  marker: {
                                        fillColor: 'transparent',
                                        lineColor: '#20c997'
                                    },
                                  data: avg,
                                  name: 'Average rainfall'
                              }
                            ]
                        });
                    });
                </script>
            </div>
            <div class="tab-pane fade" id="nav-season" role="tabpanel" aria-labelledby="nav-season-tab">
                
            </div>
            <div class="tab-pane fade" id="nav-spi" role="tabpanel" aria-labelledby="nav-spi-tab">
                
            </div>
        </div>
    </div>
    <?php
} else {
    Html::alert_div("Could not load basin!");
}