<?php

require_once('init.php');
require_once dirname(__FILE__) . '/classes/PDODb.php';

global $db;
!isset($db) && $db = PDODb::getInstance(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);


$id = $_GET['id'];
$db->where("id", $id);
$basin = $db->getOne("basin");

if ($basin) {
    HTML::alert_div("There are currently no fact sheets for this basin.");
} else {
    Html::alert_div("Could not load basin!");
}