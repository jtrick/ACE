<?php  // Copyright (c) 2003-2009 Jeff Trickett, all rights reserved.  License agreement available at http://jefftrickett.com/license/?Id=Tools
// include_once('html_tools.php');  // Html PHP utilities.



// Generates an HTML select element from the 2D array $SelectArray[$Item1['Value', 'Display'], $Item2['Value', 'Display'], etc]. or 1D format $SelectArray["$Item1", "$Item2", etc]. The form element name for this select list is determined by $ElementName and defaults to 'select'. The blank option text is passed in $DefaultText. If an item is selected, it can be entered as $Selected. $FieldName is the field displayed for each option. $ValueField can be used to designate the value for items using a field name. If a set list size is desired, it can be specified with $Size.
function HTMLArraySelect($SelectArray, $ElementName=0, $DefaultText=0, $Selected=0, $Size=0, $TabCount=2) {
	$ValueArray = (is_array($SelectArray[0])) ? (1) : (0);  // if ($ValueArray), it is a 2D value array, else it is a 1D item list.
	while ($TabCount--) { $Tabs .= "\t"; }
	if (!$ElementName) { $ElementName = CurrPage(); }
	if (!$DefaultText) { $DefaultText = 'Please Choose'; }
	$HtmlString = "\n{$Tabs}<select name=\"{$ElementName}\"";
	$HtmlString .= ($Size) ? (" size=\"{$Size}\">\n") : (">\n");
	$NoSelected = (!$Selected || $Selected=="" || $Selected=="0") ? (' selected') : ('');
	$HtmlString .= "{$Tabs}\t<option value=\"\"{$NoSelected}>- - {$DefaultText} - -</option>\n";
	
	if (!$SelectArray || !count($SelectArray) || !is_array($SelectArray)) { return $HtmlString .= "</select>"; }
	foreach($SelectArray as $ThisItem) {
		if ($ValueArray) {
			//echo "<p>HTMLArraySelect() \$ThisItem[0]: |{$ThisItem[0]}| \$ThisItem[1]: |{$ThisItem[1]}| \$Selected: |{$Selected}|</p>";
			if ($Selected) { $SelectString = ($ThisItem[0] == $Selected || $ThisItem[1] == $Selected) ? (' selected') : (''); }
			$HtmlString .= "{$Tabs}\t<option value=\"{$ThisItem[0]}\"{$SelectString}>{$ThisItem[1]}</option>\n";
		} else {
			$SelectString = ($ThisItem == $Selected) ? (' selected') : ('');
			$HtmlString .= "{$Tabs}\t<option{$SelectString}>$ThisItem</option>\n";
		}
		if ($i > 100) { break; }  // To limit list size. Fix?
	}
	$HtmlString .= "{$Tabs}</select>\n";
	return $HtmlString;
}


// Generates an HTML select element from the 2D array $TableArray[$HeaderArray['Header1', 'Header2', ...], $Row1['Item1', 'Item2', ...], etc...]. The form element name for this table is determined by $ElementName and defaults to 'ArrayTable'. If a set table length is desired, it can be specified with $NumRows.
function HTMLArrayTable($TableArray, $ElementName=0, $NumRows=1000, $InlineStyle=0, $TabCount=2) {
	if ((!is_array($TableArray)) || (!is_array($ColumnArray = $TableArray[0]))) { return; }  // Fix. Error reporting.
	if (!$NumCols = count($ColumnArray)) { return; }  // Fix. Error reporting.
	while ($TabCount--) { $Tabs .= "\t"; }
	if (!$ElementName) { $ElementName = 'ArrayTable'; }  // Fix? Better default?
	if (!$InlineStyle) { $InlineStyle = 'border="1"'; }  // Fix? Better default?
	$HtmlString = "\n{$Tabs}<table name=\"{$ElementName}\" {$InlineStyle} >\n{$Tabs}\t<tr>";
	foreach($ColumnArray as $Value) { $HtmlString .= "<th>{$Value}</th>"; }
	$HtmlString .= "</tr>\n";
	//EchoV(array('$TableArray'=>$TableArray, '$ElementName'=>$ElementName, '$NumRows'=>$NumRows, '$NumCols'=>$NumCols));
	do {
		$RowNum++;
		if (!is_array($RowArray = $TableArray[$RowNum]) || (($RowCount = count($RowArray)) != $NumCols)) { 
			//EchoV(array('$RowArray'=>$RowArray, '$RowNum'=>$RowNum, '$RowCount'=>$RowCount), 'ERROR!');
			break; 
		}
		$HtmlString .= "{$Tabs}\t<tr>";
		foreach($RowArray as $Value) { $HtmlString .= "<td>{$Value}</td>"; }
		$HtmlString .= "</tr>\n";
	} while (($RowNum <= $NumRows) && ($RowNum <= count($TableArray)));
	$HtmlString .= "{$Tabs}</table>\n";
	return $HtmlString;
}


// Generates html for a list of checkboxes, does not include the form structure or submit button. $CheckedArray contains the names of all fields that should be checked. Will automatically call GetCheckedArray() in addition to values passed using $CheckedArray.
function HtmlCheckList($ValueArray, $Name, $Legend=0, $CheckedArray=0) {
	if (!is_array($ValueArray)) { return ''; }
	if (!is_array($CheckedArray)) { $CheckedArray = array(); }
	$CheckedArray = array_merge($CheckedArray, GetCheckedArray($Name.'-'));
	if (is_string($Legend)) {
		$Indent = "\t";
		$HtmlString = "\n<fieldset id=\"{$Name}\"><legend>{$Legend}</legend>\n";
	} else {
		$HtmlString = $Indent = $Legend = '';
	}
	foreach($ValueArray as $ArrVal=>$Label) {
		$Id = "{$Name}-{$ArrVal}";
		$Label = (($Label)?($Label):($ArrVal));
		$Checked = ((in_array($Id,$CheckedArray))?('checked="checked" '):(''));
		$HtmlString .= $Indent . "<input id=\"{$Id}\" type=\"checkbox\" name=\"{$Id}\" value=\"{$Label}\" {$Checked}/>";
		$HtmlString .= "<label for=\"{$Id}\">{$Label}</label><br>\n";
	}
	$HtmlString .= (($Legend)?("</fieldset>\n"):("\n"));
	return $HtmlString;
}


// Used in conjunction with HtmlCheckList($RootName), checks for the existence of $RootName in $_REQUEST and returns an array of all keys that match this pattern. Returns null if no instances are found.
function GetCheckedArray($RootName) {
	foreach($_REQUEST as $Key=>$Value) { 
		if (strpos($Key,$RootName) != FALSE) { $DropArray[$Key] = $Value; }
	}
	return $DropArray;
}


// Returns html for a standard div menu.  MenuItemArray is 2D array in the form of MenuItemArray[LinkArray['LinkText','LinkUrl','DivID','ShortKey','HoverMsg'), (or) {['txt'=>'LinkText', 'url'=>'LinkUrl', 'div'=>'DivID', 'key'=>'ShortKey', 'hov'=>'HoverMsg']}]. All subarray items are optional and if set using an associated value it will trump the ordered item. $DivIdName is the parent div ID name, defaults to 'menu'. $ClassItems can be a string or array of strings to be included in the class items of each menu item. $Url is the default root url to be used for each item and if set then the MenuItem $Url will be appended to this for each button link. $Style
function HtmlArrayMenu($MenuItemArray, $Url='', $DivIdName='', $ClassItems=0, $Style='', $TabIndex=1, $Indent=2) {
	if (!$MenuItemArray || !is_array($MenuItemArray)) { return; }
	$IdString = (($DivIdName) ? (" id=\"{$DivIdName}\"") : (''));
	if (is_array($ClassItems)) { 
		$ClassString = trim(implode(' ', $ClassItems)); 
	} else if (!$ClassItems || !is_string($ClassItems)) { 
		$ClassString = 'hmenu';  // Fix? 
	}
	$ClassString = ' class="menuitem '.$ClassString.'"';  // Fix? Force 'menuitem' class?
	$Style = (($Style) ? (" style=\"{$Style}\"") : (''));
	do { $Tabs .= "\t";} while ($Count++ < ($Indent-1));
	$MenuString = "<div{$IdString} class=\"menu\"{$Style} >\n";  // Fix? We probably set the tabs manually by placement in the html, but there may be times where we want to justify the first line automatically by prepending {$Tabs}...
	
	foreach($MenuItemArray as $ThisArray) {
		$ItemNum++;
		if (is_array($ThisArray)) {
			$a = array('txt', 'url', 'div', 'key', 'msg');  $n=0;  // The recognized keywords that can be used to specify the link values for this menu item.
			foreach ($a as $k) { if ($v = $ThisArray[$k]) { $ThisArray[$n] = $v; }  $n++; }  // Overwrite the current value in the array slot if there is a key match.
			$LinkText = $ThisArray[0];
			$LinkUrl = (($ThisArray[1]) ? ($ThisArray[1]) : (''));
			$LinkUrl = (($Url) ? ($Url.$LinkUrl) : ($LinkUrl));
			$DivID = " id=\"{$DivIdName}-" . (($ThisArray[2]) ? ($ThisArray[2]) : ($ItemNum)) . '"';  // Fix? Handle this differently?
			$ShortKey = (($ThisArray[3]) ? (' accesskey="'.$ThisArray[3].'"') : ('')); 
			$HoverMsg = (($ThisArray[4]) ? (' title="'.$ThisArray[4].'"') : (''));
			if ($ShortKey) { $HoverMsg = rtrim($HoverMsg, "\"") . " (Shortcut: Alt-'".strtoupper($ThisArray[3])."')\"";	}
		} else {
			$LinkText = $ThisArray;
			$LinkUrl = $Url.$LinkText;  // Fix? Handle differently? May not even want this option.
		}
		$LinkClasses = "{$ClassString}";  // $ClassString.$Style;  // Fix? Apply classes/styles to each item?
		$MenuString .= "{$Tabs}\t<div{$DivID}{$LinkClasses}{$HoverMsg}>\n{$Tabs}\t\t";
		$MenuString .= "<a href=\"{$LinkUrl}\" tabindex=\"{$TabIndex}\"{$ShortKey}>{$LinkText}</a>";
		$MenuString .= "\n{$Tabs}\t</div><!--/{$DivID}-->\n";
		$TabIndex++;
	}
	$MenuString .= "{$Tabs}</div><!--/{$DivIdName}-->\n";
	return $MenuString;
}




  
  
  
  
// Generates an HTML select element containing all of the items in $TableName. $FieldName is the field displayed for each option. If an item is selected, it can be entered as $Selected. The blank initial selection text cand be specified by $DefaultText. $ValueField can be used to designate the value for items using a field name, will default to the ID field, and if set to -1 will be omitted. The form element name for this select list is determined by $ElementName and defaults to "{$TableName}_select". If a set list size is desired, it can be specified with $Size.
function TableSelectHtml($TableName, $FieldName='Name', $Selected=0, $DefaultText=0, $ValueField=0, $ElementName=0, $DbName=0, $DbHost=0, $Size=0) {
	$DataBaseObj = GetDatabaseObj($DbName, $DbHost);
	if (!$ElementName) { $ElementName = "{$TableName}_select"; }  // Fix? Kind of crappy and not standards compliant.
	if (!$ValueField) { $ValueField = $DataBaseObj->GetKey($TableName); }
	if ($ValueField == -1) { $ValueField = 0; }
	echo "<p>html_tools.php TableSelectHtml(): \$TableName: |{$TableName}|, \$ElementName: |{$ElementName}|, \$DefaultText: |{$DefaultText}|, \$Selected: |{$Selected}|, \$FieldName: |{$FieldName}|, \$ValueField: |{$ValueField}|</p>\n";
	
	// Fix! Finish or pitch this? May be too tricky to use within the new DatabaseObj framework.
	
}


// Depreciated, uses old mysql_tools system. Generates an HTML select element containing all of the items in $TableName. The form element name for this select list is determined by $ElementName and defaults to "{$TableName}_select". The blank option text is passed in $EmptyText. If an item is selected, it can be entered as $Selected. $FieldName is the field displayed for each option. $ValueField can be used to designate the value for items using a field name, will default to the ID field, and if set to -1 will be omitted. If a set list size is desired, it can be specified with $Size.
function HtmlTableSelect($TableName, $FieldName='Name', $ValueField=0, $ElementName=0, $EmptyText=0, $Selected=0, $Size=0) {
	if (!$ElementName) { $ElementName = "{$TableName}_select"; }  // Fix? Kind of crappy and not standards compliant.
	if (!$ValueField) { $ValueField = GetKeyForTable($TableName); }
	if ($ValueField == -1) { $ValueField = 0; }
	//echo "<p>html_tools.php HtmlTableSelect(): \$TableName: |{$TableName}|, \$ElementName: |{$ElementName}|, \$EmptyText: |{$EmptyText}|, \$Selected: |{$Selected}|, \$FieldName: |{$FieldName}|, \$ValueField: |{$ValueField}|</p>\n";
	$ValueQuery = ($ValueField) ? ("{$ValueField}, {$FieldName}") : ("{$FieldName}");
	$Query = "SELECT {$ValueQuery} FROM {$TableName}";
	//echo "<p>html_tools.php HtmlTableSelect(): \$Query: |{$Query}|</p>\n";
	$Result = mysql_query($Query);
	while ($RowArray = mysql_fetch_row($Result)) {  
		$SelectArray[] = (count($RowArray) > 1) ? ($RowArray) : ($RowArray[0]); 
	}
	
	return HTMLArraySelect($SelectArray, $ElementName, $EmptyText, $Selected, $Size);
}


// Obsolete. Uses old protocol.  Outputs the html for a standard menu.  SiteAreaArray is 2D array in the form of array(array($SiteArea,$LinkText), array($SiteArea,$LinkText)). $DivIdName is the div ID name. $ClassItems can be a string or array of strings to be included in the class items of each menu item. $PagePath can be an alternate page link if it is desired. $VarName is the variable name if an alternate to '?PageArea=' is desired.
function OldHtmlArrayMenu($SiteAreaArray, $DivIdName=0, $ClassItems=0, $Indent=3, $PagePath=0, $VarName=0 ) {
	if (!SiteAreaArray) { return; }
	$IdString = ($DivIdName) ? (" id=\"{$DivIdName}\"") : ('');
	if (is_array($ClassItems)) {
		$ClassString = ' class="';
		foreach($ClassItems as $ClassItem) { $ClassString .= "{$ClassItem} "; }
		$ClassString = rtrim($ClassString) . '"';
	} else if (is_string($ClassItems)) {
		$ClassString = " class=\"{$ClassItems}\"";
	} else {
		$ClassString = '';
	}
	do { $TabStr .= "\t";} while ($Count++ < ($Indent-1));
	if (!$PagePath) { $PagePath = ''; }
	if (!$VarName) { $VarName = 'SiteArea'; }
	
	$ReturnText = "<div{$IdString}>\n";
	foreach($SiteAreaArray as $ThisArray) {
		if (is_array($ThisArray)) { 
			$SiteArea = $ThisArray[0];
			$LinkText = ($ThisArray[1]) ? ($ThisArray[1]) : ($SiteArea);
			$ThisPath = ($ThisArray[2]) ? ($ThisArray[2]) : ($PagePath); 
		} else {
			$SiteArea = $LinkText = $ThisArray;
			$ThisPath = $PagePath;
		} 
		$ReturnText .= "{$TabStr}\t<div{$ClassString}><a href=\"{$ThisPath}?{$VarName}={$SiteArea}\">{$LinkText}</a></div>\n";
	}
	$ReturnText .= "{$TabStr}</div><!--/{$DivIdName}-->\n";
	return $ReturnText;
}


// Returns the html to create a generic navigational link to step up or down within $NavArray. $NavArray is a 2D array with sub-arrays using the ArrayToLink() format. $IdName and $Path can be used to set default values if not supplied in the individual $NavArray sub-arrays.
function GetNavLinkHtml($NavArray, $SlotNum, $IdName=0, $Path=0, $NavID=0, $NavClass=0, $NavBackID=0) {
	
	GetLinkHtml($IdValue, $IdName, $LinkText=0, $Path=0);
}


// Returns the html to convert an array in the form of Array('IdValue', 'IdName', 'LinkText', 'Path'). which results in a link of <a href="{Path}?{IdName}={IdValue}>{LinkText}</a>" 'LinkText' will default to 'IdName' and 'Path' will default to '' if not provided explicitly.
function ArrayToLink($LinkArray) {
	return GetLinkHtml($LinkArray[0], $LinkArray[1], $LinkArray[2], $LinkArray[3]);
}


// Returns the html to generate a link from the arguments passed to it in the form "<a href=\"{$Path}?{$IdName}={$IdValue}\">{$LinkText}</a>". $LinkText will default to $IdName and $Path will default to '' if not provided explicitly.
function GetLinkHtml($IdValue, $IdName, $LinkText=0, $Path=0) {
	if (!$LinkText) { $LinkText = $IdValue; }
	if (!$Path) { $Path = ''; }
	return "<a href=\"{$Path}?{$IdName}={$IdValue}\">{$LinkText}</a>";
}


// Returns a string containing a <pre> block to output the source for html as stored in the text file.
function HtmlSource($HtmlString, $TextColor=0, $Border=0, $Echo=0) {
	if (!$TextColor) { $TextColor = 'gray'; }
	$Border = ($Border)?("border: thin solid {$TextColor}; padding:3px;"):('');
	$TabSym = '(_-\t-_)';  // Fix?  '(&nbsp; &nbsp; &nbsp;)';
	$DoubSpaceSym = '(__)';  // Fix?
	//$Echo = "\$Echo set within HtmlSource()";
	$LineCount = count(explode("\n", $HtmlString));
	$HtmlSource = htmlspecialchars($HtmlString);
	if ($Echo) { echo "\n<p>HtmlSource() called. \$Echo: |'{$Echo}'|</br>\n"; }
	// if ($LineCount > 2) {
		// if ($Echo) { echo "\nAdding Pre block for {$LineCount} lines\n"; }
		// $HtmlSource = '<pre>' . $HtmlSource . '</pre>';
	// } else { 
		// if ($Echo) { echo "\nNOT modifying HtmlString, {$LineCount} lines\n"; } 
	// }
	$HtmlSource = str_replace("\t", $TabSym, nl2br($HtmlSource));
	$HtmlSource = str_replace("  ", $DoubSpaceSym, nl2br($HtmlSource));
	$HtmlSource = "'<div style=\"display:inline; color:{$TextColor};{$Border}\">{$HtmlSource}</div>'";
	if ($Echo) { echo "\n\$HtmlSource: {$HtmlSource}\n</p>\n"; }
	return $HtmlSource;
}


// Generates and returns an ordered list HTML representation of an array and its sub-arrays, including keys. Also handles objects and other data types. $TabCount is used for markup indentation.
function HtmlOLArray($MainArray, $TabCount=0) {
	if (!$MainArray) { return "{Null Var}"; }
	while ($TabCount--) { $Tabs .= "\t"; }
	if (!is_array($MainArray) && !is_object($MainArray)) { return $MainArray; }
	if (!count($MainArray)) { return "{Empty Array}"; }
	$OutputText = "\n<br>\n<OL start=0>\n";
	foreach ($MainArray as $ThisKey => $ThisItem) {
		$OutputText .= "\t<LI>";
		if ($ThisKey || $ThisKey === 0) { $OutputText .= "|$ThisKey| => "; }
		if (is_object($ThisItem)) { 
			$ThisItem = get_object_vars($ThisItem);
			$OutputText .= "{Object}\n";
		}
		$OutputText .= HtmlOLArray($ThisItem)."\n";
	}
	$OutputText .= "</OL>\n";
	return $OutputText;
}


// Grabs the text between two identifying substrings in a string.
function BetweenString($InputString, $StartStr, $EndStr=0, $StartLoc=0, $Echo=0) {
	if (!is_string($InputString)) { if ($Echo) { echo "<p>html_tools.php BetweenString() FAILED. \$InputString is not a string.</p>\n"; } return; }
	if (($StartLoc = strpos($InputString, $StartStr, $StartLoc)) === false) { if ($Echo) { echo "<p>html_tools.php BetweenString() FAILED. Could not find \$StartStr '{$StartStr}' within \$InputString |{$InputString}| starting from \$StartLoc ({$StartLoc}).</p>\n"; } return; }
	$StartLoc += strlen($StartStr);
	if (!$EndStr) { $EndStr = $StartStr; }
	if (!$EndLoc = strpos($InputString, $EndStr, $StartLoc)) { if ($Echo) { echo "<p>html_tools.php BetweenString() FAILED. Could not find \$EndStr '{$EndStr}' within \$InputString |{$InputString}| starting from \$StartLoc ({$StartLoc}).</p>\n"; } return; }
	$BetweenString = substr($InputString, $StartLoc, ($EndLoc-$StartLoc));
	if ($Echo) { echo "<p>html_tools.php BetweenString() Returning |'{$BetweenString}'| as found between \$StartLoc ({$StartLoc}) and \$EndLoc ({$EndLoc}).</p>\n"; }
	return $BetweenString; 
} 


// Returns a hex and decimal encoded string for use on web pages to hide normal text from simple robots.
function WebEncodeString ($OriginalString) {	
	$StringLength = strlen($OriginalString);
	for ( $i = 0; $i < $StringLength; $i++) {
		$Mode = rand(1,2);
		if ($Mode == 1) {  // Decimal encoding
			$CodeString .= "&#" . ord($OriginalString[$i]) . ";";
		} else if ($Mode == 2) {  // Hexadecimal encoding
			$CodeString .= "&#x" . dechex(ord($OriginalString[$i])) . ";";
		}
	}
	return $CodeString;
}


// Returns a hex and decimal encoded mailto: email address based on $Email. 
function EncodeEmailAddress($Email) {
	$CodeMail = WebEncodeString($Email);
	$MailTo = WebEncodeString('mailto:');
	$EmailHtml = "<a href=\"{$MailTo}{$CodeMail}\">{$CodeMail}</a>";
	return $EmailHtml;
}


/*
// Generates and returns an un-ordered list HTML representation of an array and its sub-arrays, including keys. Also handles objects and other data types. $TabCount is used for markup indentation.
function HtmlArray($MainArray, $TabCount=0, $BgColor=0) {
	static $StartCount;
	$OutputText = $NewLineStr = ((isset($StartCount))?(''):("\n"));
	if (!isset($StartCount)) {
		 $StartCount++;
		 $ThisCount = $TabCount;
	} else {
		$ThisCount = ($TabCount*2);
	}
	for (; $ThisCount; $ThisCount--) { $Tabs .= "\t"; }
	if (!$MainArray) { return $Tabs."\t{ Null Var }"; }
	if (!is_array($MainArray) && !is_object($MainArray)) { return $MainArray; }
	if (!$ArrayCount = count($MainArray)) { return $Tabs."\t{ Empty Array }"; }
	$ColrCnt = count($ColorArray = array('blue', 'black', 'red', 'green'));
	$Color = $ColorArray[$SlotNum=(($TabCount<$ColrCnt)?($TabCount):($TabCount%$ColrCnt))];
	$BgColor = ($BgColor) ? ($ColorArray[$BgSlotNum=($ColrCnt-($SlotNum+1))]) : ('white');
	$OutputText .= $Tabs.'<div style="color: '.$Color.'; background-color: '.$BgColor.'; text-align: left;">';
	$OutputText .= '<ul start=0 type="none">'."\n";
	foreach ($MainArray as $ThisKey => $ThisItem) {
		$OutputText .= $Tabs."\t<li>";
		$OutputText.='['.((is_string($ThisKey))?("'$ThisKey'"):($ThisKey)).'] => '; 
		if (is_object($ThisItem)) { 
			$OutputText .= '{ Object ('.get_class($ThisItem).") }\n";
			$ThisItem = get_object_vars($ThisItem);
		} else if (is_array($ThisItem)) { 
			$OutputText .= "{ Array (Count=".count($ThisItem).") }\n";
		}
		$OutputText .= HtmlArray($ThisItem, ($TabCount+1))."\n";
	}
	$OutputText .= $Tabs.'</ul></div>'.$NewLineStr;
	if ($NewLineStr) { unset($StartCount); }
	return $OutputText;
}
*/


//  Fix! This is the newer version created in context to EchoV, check to see which is better, and correct the faulty source formatting:
// Generates and returns an un-ordered list HTML representation of an array and its sub-arrays, including keys. Also handles objects and other data types. $TabCount is used for markup indentation. {copyright 2003 http://jtrick.net?Id='HtmlArray'}
function HtmlArray($MainArray, $TabCount=0, $BgColor=0) {
	static $StartCount = 0;
	$OutputText = $NewLineStr = ($StartCount) ? ('') : ("<!-- #######  HtmlArray START  ####### -->\n");
	if (!isset($StartCount)) {
		 $StartCount++;
		 $ThisCount = (is_numeric($TabCount)) ? ($TabCount) : (0);
	} else {
		$ThisCount = (is_numeric($TabCount)) ? ($TabCount*2) : (0);
	}
	for ($Tabs=''; $ThisCount; $ThisCount--) { $Tabs .= "\t"; }
	if ($MainArray === null) { return $Tabs."\t<div style=\"display:inline; color:gray;\"> { Null Var } </div>"; }
	if (is_bool($MainArray)) { return $Tabs."\t<div style=\"display:inline; color:orange;\"> |".(($MainArray)?('TRUE'):('FALSE'))."| </div>"; }
	if (!is_array($MainArray) && !is_object($MainArray)) { 
		if (is_string($MainArray)) { $MainArray = HtmlSource($MainArray, 'cyan'); }
		if (is_bool($MainArray)) { $MainArray = (($MainArray)?('TRUE'):('FALSE')); }
		return $MainArray; 
	}
	if (!$ArrayCount = count($MainArray)) { return $Tabs."\t{ Empty Array }"; }
	$ColrCnt = count($ColorArray = array('blue', 'black', 'red', 'green'));
	$Color = $ColorArray[$SlotNum=(($TabCount<$ColrCnt)?($TabCount):($TabCount%$ColrCnt))];
	$BgColor = ($BgColor) ? ($ColorArray[$BgSlotNum=($ColrCnt-($SlotNum+1))]) : ('white');
	$OutputText .= $Tabs.'<div style="color: '.$Color.'; background-color: '.$BgColor.'; text-align: left;">';
	$OutputText .= '<ul start=0 type="none">'."\n";
	foreach ($MainArray as $ThisKey => $ThisItem) {
		$OutputText .= $Tabs."\t<li>";
		$OutputText.='['.((is_string($ThisKey))?("'{$ThisKey}'"):($ThisKey)).'] => '; 
		if (is_object($ThisItem)) { 
			$OutputText .= '{ Object ('.get_class($ThisItem).") }\n";
			$ThisItem = get_object_vars($ThisItem);
		} else if (is_array($ThisItem)) { 
			$OutputText .= "{ Array (Count=".count($ThisItem).") }\n";
		}
		$OutputText .= HtmlArray($ThisItem, ($TabCount+1))."\n";
	}
	$OutputText .= $Tabs.'</ul></div>'.$NewLineStr;
	if ($NewLineStr) { 
		unset($StartCount);
		$OutputText .= "<!-- #######  HtmlArray END  ####### -->\n";
	}
	return $OutputText;
}







?>
