<?php

require('init.php');
require_once dirname(__FILE__) . '/classes/PDODb.php';

$db = PDODb::getInstance(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$basins = array();

function getMonthNumber($str) {
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


/*
 Import basin monthly values
 */

//if (($handle = fopen(dirname(__FILE__) . "/dataset/basin_month_by_season_stats.csv", "r")) !== FALSE) {
//    $flag = true;
//    
//    while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
//        if ($flag) {$flag = false; continue; }
//        
//        $basin_name = $data[0];
//        
//        $db->where("name", $basin_name);
//        $basin = $db->getOne("basin");
//        
//        
//        if ($basin) {
//            $year_month = $data[1];
//            $year = substr($year_month, 0, 4);
//            $month_str = substr($year_month, 4, 3);
//            $month = getMonthNumber($month_str);
//            $values = array(
//                'basin_id' => $basin['id'],
//                'stat' => $data[2],
//                'year' => $year,
//                'month' => $month,
//                'value' => $data[3]
//            );
//            
//            if ($db->insert("basin_rainfall_stats", $values)) {
//                echo "success";
//            } else {
//                echo "fail";
//            }
//            
//        } else {
//            echo 'Basin not found ', $basin_name, '<br />';
//        }
//    }
//
//    fclose($handle);
//}

/*
 Import basin monthly values
 */

if (($handle = fopen(dirname(__FILE__) . "/dataset/wetland_seasonal.csv", "r")) !== FALSE) {
    $flag = true;
    
    while (($data = fgetcsv($handle, 0, ",")) !== FALSE) {
        if ($flag) {$flag = false; continue; }
        
        $wetland_name = $data[0];
        
        $db->where("wetland", "%$wetland_name%", "LIKE");
        $wetland = $db->getOne("reference_wetlands");
        
        if ($wetland) {
            $season = explode("_", $data[2]);
            $start = $season[0];
            $stop = (intval(end($season)) > 20 ? "19" : "20" ) . end($season);
            
            $values = array(
                'wetland_id' => $wetland['id'],
                'stat' => $data[3],
                'start' => intval($start),
                'stop' => intval($stop),
                'value' => $data[1]
            );
            
            if ($db->insert("wetland_seasonal_rainfall", $values)) {
                echo "success";
            } else {
                echo "fail";
            }
            
            echo '<br />';
            
        } else {
            echo 'Basin not found ', $wetland_name, '<br />';
        }
    }

    fclose($handle);
}