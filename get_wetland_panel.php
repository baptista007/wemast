<?php

require_once('init.php');
require_once dirname(__FILE__) . '/classes/PDODb.php';

global $db;
!isset($db) && $db = PDODb::getInstance(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);


$id = $_GET['id'];
$db->where("id", $id);
$wetland = $db->getOne("reference_wetlands");


if ($wetland) {
    ?>
    <div class="card">
        <h5 class="card-header">
            <?= $wetland['wetland'] ?>
        </h5>
        <div class="card-body">
          <h5 class="card-title">Wetland Specifications</h5>
          <div class="card-text">
            <div class="form-group">
                Country: <?= $wetland['country'] ?>
            </div>
            <div class="form-group">
                State: <?= $wetland['state'] ?>
            </div>
            <div class="form-group">
                Basin: <?= $wetland['basin'] ?>
            </div>
            <div class="form-group">
                Perimeter: <?= number_format($wetland['perimeter'], 2) ?>
            </div>
            <div class="form-group">
                Population Density: <?= number_format($wetland['pop_densit'], 2) ?>
            </div>
          </div>
          <h5 class="card-title">Datasets and Products</h5>
          <div class="card-text">
              <?php
                
                $db->clearWhere();
                $db->where("wetland_id", $id);
                $rainfall = $db->get("wetland_seasonal_rainfall");
              
                if ($rainfall) {
                    ?>
                    <div class="row">
                        <div class="col-lg-6">
                            <button class="btn btn-block btn-primary btn-product" onclick="openModalRemoteContent('wetland_rainfal.php?id=<?= $wetland['id'] ?>', 'Rainfall - <?= $wetland['wetland'] ?>')">
                                  <i class="fas fa-cloud-rain"></i>
                                  Rainfall
                              </button>
                        </div>
                        <div class="col-lg-6">
                            <button class="btn btn-block btn-primary btn-product" onclick="openModalRemoteContent('fact_sheets.php?id=<?= $wetland['id'] ?>', 'Fact Sheets - <?= $wetland['wetland'] ?>')">
                                  <i class="fas fa-info-circle"></i>
                                  Fact Sheets
                              </button>
                        </div>
                    </div>
                    <?php
                }
              ?>
          </div>
        </div>
      </div>
    <?php
} else {
    Html::alert_div("Could not load basin!");
}