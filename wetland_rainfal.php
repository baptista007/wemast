<?php

require_once('init.php');
require_once dirname(__FILE__) . '/classes/PDODb.php';

global $db;
!isset($db) && $db = PDODb::getInstance(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

$id = $_GET['id'];
$db->where("id", $id);
$wetland = $db->get("reference_wetlands");


Html :: page_js('Highcharts/highcharts.js');
Html :: page_js('Highcharts/data.js');
Html :: page_js('Highcharts/exporting.js');
Html :: page_js('Highcharts/export-data.js');
Html :: page_js('Highcharts/accessibility.js');
Html :: page_js('Highcharts/histogram-bellcurve.js');

if ($wetland) {
    ?>
    <div class="container-fluid">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Seasonal Stats</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div id="monthly-chart"></div>
                <?php
                
                $months = array();
                
                $db->clearWhere();
                $db->where("wetland_id", $id);
                $db->where("stat", "avg");
                $db->orderBy("start", 'ASC');
                
                $avgs = $db->get("wetland_seasonal_rainfall");
                $avg_data = array();
                $min_data = array();
                $max_data = array();
                
                $aavg_data = array();
                $amin_data = array();
                $amax_data = array();
                
                foreach ($avgs as $row) {
                    $months[] = $row['start'] . ' - ' . $row['stop'];
                    $avg_data[] = $row['value'];
                    $aavg_data[] = 912;
                }
                
                $db->clearWhere();
                $db->where("wetland_id", $id);
                $db->where("stat", "min");
                $db->orderBy("start", 'ASC');
                
                $mins  = $db->get("wetland_seasonal_rainfall");
                foreach ($mins as $row) {
                    $min_data[] = $row['value'];
                    $amin_data[] = 343;
                }
                
                
                $db->clearWhere();
                $db->where("wetland_id", $id);
                $db->where("stat", "max");
                $db->orderBy("start", 'ASC');
                
                $maxs  = $db->get("wetland_seasonal_rainfall");
                
                foreach ($maxs as $row) {
                    $max_data[] = $row['value'];
                    $amax_data[] = 1806;
                }
                ?>
                <script type="text/javascript">
                    avg = JSON.parse('<?= json_encode($avg_data) ?>').map(parseFloat);
                    min = JSON.parse('<?= json_encode($min_data) ?>').map(parseFloat);
                    max = JSON.parse('<?= json_encode($max_data) ?>').map(parseFloat);
                    
                    aavg = JSON.parse('<?= json_encode($aavg_data) ?>').map(parseFloat);
                    amin = JSON.parse('<?= json_encode($amin_data) ?>').map(parseFloat);
                    amax = JSON.parse('<?= json_encode($amax_data) ?>').map(parseFloat);
                    
                    $(function () {
                        $('#monthly-chart').highcharts({
                            title: {
                                text: 'Wetland Seasonal Stats'
                            },
                            chart: {
                              type: 'line',
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
                              },
                              {
                                  type: 'line',
                                  data: aavg,
                                  name: 'All Season Average'
                              },
                              {
                                  type: 'line',
                                  data: amax,
                                  name: 'All Season Maximum'
                              },
                              {
                                  type: 'line',
                                  data: amin,
                                  name: 'All Season Minimum'
                              }
                            ]
                        });
                    });
                </script>
            </div>
        </div>
    </div>
    <?php
} else {
    Html::alert_div("Could not load wetland!");
}