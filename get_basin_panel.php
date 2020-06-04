<?php

require_once('init.php');
require_once dirname(__FILE__) . '/classes/PDODb.php';

global $db;
!isset($db) && $db = PDODb::getInstance(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);


$id = $_GET['id'];
$db->where("id", $id);
$basin = $db->getOne("basin");


if ($basin) {
    ?>
    <div class="card">
        <h5 class="card-header">
            <?= $basin['name'] ?>
        </h5>
        <div class="card-body">
          <h5 class="card-title">Basin Specifications</h5>
          <div class="card-text">
            <div class="form-group">
                Country:
            </div>
            <div class="form-group">
                Length: <?= number_format($basin['shape_leng'], 2) ?>
            </div>
            <div class="form-group">
                Area: <?= number_format($basin['area'], 2) ?>
            </div>
            <div class="form-group">
                Perimeter: <?= number_format($basin['perimeter'], 2) ?>
            </div>
          </div>
          
          <h5 class="card-title">Datasets and Products</h5>
          <div class="card-text">
              <?php
                
                $db->clearWhere();
                $db->where("basin_id", $id);
                
                $rainfall = $db->get("basin_rainfall_stats");
              
                if ($rainfall) {
                    ?>
                    <div class="row">
                        <div class="col-lg-6">
                            <button class="btn btn-block btn-primary btn-product" onclick="openModalRemoteContent('rainfall_product.php?id=<?= $basin['id'] ?>', 'Rainfall - <?= $basin['name'] ?>')">
                                  <i class="fas fa-cloud-rain"></i>
                                  Rainfall
                              </button>
                        </div>
                        <div class="col-lg-6">
                            <button class="btn btn-block btn-primary btn-product" onclick="openModalRemoteContent('fact_sheets.php?id=<?= $basin['id'] ?>', 'Fact Sheets - <?= $basin['name'] ?>')">
                                  <i class="fas fa-info-circle"></i>
                                  Fact Sheets
                              </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <button class="btn btn-block btn-primary btn-product">
                                  <i class="fas fa-mountain"></i>
                                  Land Cover/Land Use
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