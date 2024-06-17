<?php
// ==================================================
// 
// phpspreadsheet-Reading-Images-from-an-Excel-File
// 
// Developer: Raja Rama Mohan Thavalam <rajaram.tavalam@gmail.com>
//
// ==================================================

require 'vendor/autoload.php';

// print_r($_FILES);

// $propertyimagename = $_FILES['myFile']['name'];
// $propertyimagepath = $_FILES['myFile']['tmp_name'];

// $destfile = $propertyimagename;

// move_uploaded_file($propertyimagepath, $destfile);

$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load("./test_excel_upload.xlsx");

$worksheet = $spreadsheet->getActiveSheet();
$worksheetArray = $worksheet->toArray();

array_shift($worksheetArray);

echo '<table style="width:100%"  border="1">';
echo '<tr align="center">';
echo '<td>sub_property_name</td>';
echo '<td>sub_property_legal_id</td>';
echo '<td>sub_property_rent</td>';
echo '<td>sub_property_image</td>';
echo '</tr>';

foreach ($worksheetArray as $key => $value) {

    $worksheet = $spreadsheet->getActiveSheet();
    $drawing = $worksheet->getDrawingCollection()[$key];

    $zipReader = fopen($drawing->getPath(), 'r');
    $imageContents = '';

    while (!feof($zipReader)) {
        $imageContents .= fread($zipReader, 1024);
    }
    fclose($zipReader);

    // echo "$imageContents";

    $extension = $drawing->getExtension();

    echo '<tr align="center">';
    echo '<td>' . $value[0] . '</td>';
    echo '<td>' . $value[1] . '</td>';
    echo '<td>' . $value[2] . '</td>';
    echo '<td><img  height="150px" width="150px"   src="data:image/jpeg;base64,' . base64_encode($imageContents) . '"/></td>';
    echo '</tr>';
}