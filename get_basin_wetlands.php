<?php

require_once('init.php');
require_once dirname(__FILE__) . '/classes/PDODb.php';

global $db;
!isset($db) && $db = PDODb::getInstance(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

$id = $_GET['id'];
$db->where("basin_id", $id);
$db->orderBy("wetland", "ASC");
$wetlands = $db->get("reference_wetlands");

echo '<option value="">-select wetland-</option>';

if (!empty($wetlands)) {
    foreach ($wetlands as $wetland) {
        echo '<option value="', $wetland['id'] , '">', $wetland['wetland'], '</option>';
    }
}
