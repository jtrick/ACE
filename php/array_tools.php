<?php  // Copyright (c) 2003-2009 Jeff Trickett, all rights reserved.  License agreement available at http://jefftrickett.com/license/?Id=Tools



// Counts the total depth of an array.
function CountArrayDepth($MainArray) {
	if (!count($MainArray)) { return 0; }
	$HighCount = 0;
	for ($ThisRow=0;$ThisArray=$MainArray[$ThisRow];$ThisRow++) {
		if (is_array($ThisArray)) { 
			$ThisCount = CountArrayDepth($MainArray); 
			if ($ThisCount > $HighCount) { $HighCount = $ThisCount; }
		}
	}
	return ($HighCount + 1);  // To take into account the depth of $MainArray itself.
}


// Checks to see if two arrays match.  Returns 1 if they do, 0 otherwise.
function CheckArrayMatch($FirstArray, $NextArray) {
	if ($FirstArray && $NextArray) {  
		if (is_array($FirstArray) && is_array($NextArray)) {
			$DiffArray = array_diff($FirstArray, $NextArray);
			if (count($DiffArray) < 1) { return 1; }
		}
	}
}


// Checks to see whether an array is associative or not.
function CheckAssocArray($Array, $Echo=0) {
	if (!is_array($Array) || empty($Array)) { return; }
	$Keys = array_keys($Array);
	$Result = (array_keys($Keys) !== $Keys);
	if ($Echo) { EchoV(array('$Array'=>$Array), "\$Array " . (($Result) ? ('IS') : ('is NOT')) . " an associative array."); }
	return $Result;
}


// The following were taken directly from a php.net posting:
function is_assoc($array) { return is_array($array) && count($array) !== array_reduce(array_keys($array), 'is_assoc_callback', 0); }
function is_assoc_callback($a, $b) { return $a === $b ? $a + 1 : 0; }


// Breaks a string in csv format into an array of subarrays. $Delimiter defaults to "\t", $RefArray are the column headings to be used to separate the subarrays, if desired. $StringDelimeter will chop string quotes for array strings if (!= -1). $KeepEmptyRows will retain empty rows rather than dropping them.
function CsvToArray($String, $Delimiter="\t", $KeyArray=0, $StringDelimeter=0, $KeepEmptyRows=0) {
	//echo "<p>array_tools.php CsvToArray() \$String: |{$String}|</p>\n";
	if (!$StringDelimeter) { $StringDelimeter = '"'; }  // Fix? 
	$RowArray = StringRowArray($String);
	//echo "<p>array_tools.php CsvToArray() \$RowArray: ".HtmlArray($RowArray)."</p>\n";
	foreach($RowArray as $ThisRowString) { 
		if ($ThisRowString) {
			//echo "<p>array_tools.php CsvToArray() \$ThisRowString: |{$ThisRowString}|</p>\n";
			$ThisLineArray = explode($Delimiter, $ThisRowString);
			//echo "<p>array_tools.php CsvToArray() \$ThisLineArray: ".HtmlArray($ThisLineArray)."</p>\n";
			if ($StringDelimeter != -1) { 
				$StrippedArray = array();
				foreach($ThisLineArray as $ThisItem) { $StrippedArray[] = trim($ThisItem, $StringDelimeter); }
				//echo "<p>array_tools.php CsvToArray() \$ThisLineArray: ".HtmlArray($ThisLineArray).", \$StrippedArray: ".HtmlArray($StrippedArray)."</p>\n";
				$ThisLineArray = $StrippedArray;
			}
			$StringArray[] = MergeArraysToAssoc($KeyArray, $ThisLineArray);
		} else if ($KeepEmptyRows) {
			$StringArray[] = MergeArraysToAssoc($KeyArray);
		}
	}
	//echo "<p>array_tools.php CsvToArray() \$StringArray: ".HtmlArray($StringArray)."</p>\n";
	return $StringArray;
}


// Merges two simple arrays into an associative array. If $CutOff, the arrays will be rerstricted to the number of fields in $KeyArray, otherwise they will continue past as numerical keys.
function MergeArraysToAssoc($KeyArray, $ValArray=0, $CutOff=0) {  // Fix!! Make breakproof, decide on behavior.
	//echo "<p>array_tools.php MergeArraysToAssoc() \$KeyArray: ".HtmlArray($KeyArray).", \$ValArray: ".HtmlArray($ValArray).", \$CutOff: |{$CutOff}|</p>\n";
	foreach($KeyArray as $ThisNum=>$ThisField) {
		$ThisVal = $ValArray[$ThisNum];
		$NewArray[$ThisField] = $ThisVal;
	}
	//echo "<p>array_tools.php MergeArraysToAssoc() \$NewArray: ".HtmlArray($NewArray)."</p>\n";
	return $NewArray;
}


// Breaks a string into rows and returns it as an array of the rows.
function StringRowArray($String) {
	//echo "<p>array_tools.php StringRowArray() \$String: |{$String}|</p>\n";
	//$NewString = str_replace(array("\r\n","\n\r","\r"),"\n", $String);  // Fix? to bring file down to normal '\n' format.  
	$NewString = $String;  // Fix! Make the above process work correctly.
	//echo "<p>array_tools.php StringRowArray() \$NewString: |{$NewString}|</p>\n";
	$RowArray = explode("\n", $NewString);
	//echo "<p>array_tools.php StringRowArray() \$RowArray: ".HtmlArray($RowArray)."</p>\n";
	return $RowArray;
}


// Outputs an array in table form.
function HTMLTableArray($MainArray) {
	if (!count($MainArray)) { return "Array is Empty!"; }
	$TableColTotal = CountArrayDepth($MainArray);
}




?>
