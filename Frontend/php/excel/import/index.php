<?php 

print_r($_FILES);


require('PHPExcel/PHPExcel.php');
require('PHPExcel/PHPExcel/IOFactory.php');

$file = $_FILES['myFile']['name'];

print_r($file);

$path = $_FILES['myFile']['tmp_name'];

echo "\n";
print_r($path);

$destfile = $file;

echo "\n";
print_r($destfile);

move_uploaded_file($path, $destfile);

$obj=PHPExcel_IOFactory::load($file);

foreach($obj->getWorksheetIterator() as $sheet){
    // print_r($sheet);
    $getHighestRow=$sheet->getHighestRow();
    // echo "\n";
    // print_r($getHighestRow);
    for($i=0;$i<=$getHighestRow;$i++){
        $name=$sheet->getCellByColumnAndRow(0,$i)->getValue();
        $id=$sheet->getCellByColumnAndRow(1,$i)->getValue();
        $rent=$sheet->getCellByColumnAndRow(2,$i)->getValue();
        $image=$sheet->getCellByColumnAndRow(3,$i)->getValue();

        echo "\n";
        echo "$name";
        echo "\n";
        echo "$id";
        echo "\n";
        echo "$rent";
        echo "\n";
        echo "$image";
        echo "\n";
    }
}







// $propertyimagename = $_FILES['myFile']['name'];

// echo $propertyimagename;

// $propertyimagepath = $_FILES['myFile']['tmp_name'];

// echo "\n";
// echo $propertyimagepath;

// $destfile = 'property_images/'.$propertyimagename;

// echo "\n";
// echo $destfile;

// move_uploaded_file($propertyimagepath, $destfile);




?>