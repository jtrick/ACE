<?php  // EchoV.php Copyright (c) The New Waters Foundation Inc, all rights reserved.  For license see: http://openAce.org/license/?ace=EchoV.php
// Basic debugging output tool, allows structured format for displaying variables of any kind via styled html.  Examples:  if ($Echo) { EchoV(array('EchoV'=>'Comment', 'VarName'=>$Var, 'VarName'=>$Var)); }  |  if ($Echo) { EchoV($Var, 'VarComment'); }

include_once('html_tools.php');


SetEchoV($Echo); // , $Echo);  // Sets the initial value for echoing EchoV calls by default based on $Echo.
if (!isset($Echo)) { $Echo = 0; }  // This is included to avoid notices involving unset $Echo var checks. Fix! Should almost certainly be a different name as well as referencing a global or static class variable.


// Turns echoing on or off for the function EchoV() If $OnVal is set, its value is stored in the global var $EchoV for output, otherwise it suppresses echoing. Returns 1 if it has been turned on, 0 if turned off.
function SetEchoV($OnVal=null, $Echo=0) {  global $EchoV;
	if ($OnVal) { // && is_object(EchoV)) {
		$EchoV = $OnVal;
	} else if (is_null($OnVal)) {
		$EchoV = (($EchoV)?(0):(1));
	} else {
		$EchoV = 0;
	}
	//$TraceArray = GetCallingFunctionStats();  // Fix.  Originally going to use this to record all points where SetEchoV was switched on and off.
	//EchoV($TraceArray, '$TraceArray');
	if ($Echo) { echo "<p>SetEchoV() \$EchoV: |{$EchoV}|, \$Echo: |{$Echo}|, \$OnVal: |{$OnVal}|</p>"; }
	//$EchoV = 0;  // Fix! EchoV functionality was broken so temporarily forced it off. Remove this line once fixed.
	return (($EchoV)?(1):(0));
}


// Outputs the current value of the global variable EchoV.
function GetEchoV($Echo=0) {
	global $EchoV;
	if ($Echo) { echo "<h1>\$EchoV: |{$EchoV}|</h1>"; }
	return $EchoV;
}


// Echoes a comment and variable with calling function name, page, and line number. $Var name can be passed in $Comment but should ideally be able to bypass this constraint. // Making one of the indexes of $Var array = 'EchoV' will treat the argument as an associative array in the form array('VarName'=>$Var, 'VarName'=>$Var, ...). $Levels represents the maximum levels of 'parent' calling functions to output information for, defaults to 5. $Detail indicates whether (0) Function and applicable object names are given with file location for immediate calling function only, (1) outputs file names and line number locations of the parent calling functions as well.
function EchoV($Var=0, $Comment=0, $Detail=1, $Levels=0) {  global $EchoV;  // Fix.  Should not have to pass the variable name here. Should be able to determine through code somehow. I stopped due to time considerations but this should really be solved.
	//echo "<p>EchoV() \$EchoV: |{$EchoV}|</p>\n";  // Fix.
	//global $OutputAdminEcho;  // Fix! Temporary hack due to broken EchoV functionality.
	// if ($OutputAdminEcho && (function_exists('AdminEcho'))) {  // Fix! Temporary hack due to broken EchoV functionality.
		// // AdminEcho($Var, $Comment);
	// }
	if (!isset($EchoV) || !$EchoV) { return; }  //  || !CheckAdminIP()) { return; }  // Fix? Setting this for local level convenience for passing $Echo. May not want.
	$BackTraceArray = debug_backtrace();
	//echo "<p>\$BackTraceArray: |".EchoHtmlArray($BackTraceArray)."|</p>";  // Fix!
	//echo "<h1>Made it through the security IP check and global EchoV test</h1>";  // Fix.
	if (is_array($Var) && (isset($Var['EchoV']))) {  // Making one of the indexes of $Var array = 'EchoV' will treat the argument as an associative array in the form array('VarName'=>$Var, 'VarName'=>$Var, ...)
		$EchoArrayVal = $Var['EchoV'];
		$Comment = (($Comment)?("{$Comment}, EchoV='{$EchoArrayVal}': "):("{$EchoArrayVal}: "));  // Fix?
	} else {
		$Comment = (($Comment)?($Comment.': '):(''));  // Fix?
	}
	$FunctionChain = '';
	$OutputText = "\n<div class=\"echov\" style=\"border: thin solid blue; margin: 5px; padding: 5px;\">\n";
	for ($i = 1; $i <= $Count=count($BackTraceArray); $i++) {
		if ($TraceFunction = (isset($BackTraceArray[($i)])) ? ($BackTraceArray[($i)]['function']) : ('')) {
			if (isset($BackTraceArray[($i)]['class'])) { 
				$TraceFunction = "{$BackTraceArray[($i)]['class']}->{$TraceFunction}()"; 
			} else if ($TraceFunction == 'include_once' || $TraceFunction == 'include' || $TraceFunction == 'require' || $TraceFunction == 'require_once') {
				if (isset($BackTraceArray[($i)]['args'])) { $TraceFunction .= '(\''.$BackTraceArray[($i)]['args'][0].'\')'; } else { $TraceFunction .= '(Args NOT Set)'; }
			} else {
				$TraceFunction .= '()';
			}
		}
		$TraceLine = $BackTraceArray[($i-1)]['line'];
		$TraceFile = $BackTraceArray[($i-1)]['file'];
		if ($i == 1) { 
			$OutputText .= "<p><b>".(($TraceFunction)?("<div style=\"display: inline; color: blue; padding: 3px; border: thin solid red\">{$TraceFunction}</div> called EchoV()"):('EchoV() called'))." from line {$TraceLine} in file {$TraceFile}:</b></p>\n";  // Fix? May want block display for line break after function name?
		}
		if ($Detail) {
			$FunctionChain .= "<br>\n -->>| ".(($TraceFunction)?($TraceFunction.' on '):(''))."line {$TraceLine} in file {$TraceFile}";
		} else {
			$FunctionChain = " -->>| " . (($TraceFunction) ? ($TraceFunction) : ($TraceFile)) . $FunctionChain;
		}
	}
	
	$VarColor = 'green'; $CommentColor = 'red';
	$ColorVar = "<div style=\"display: inline; color: {$VarColor};\">";
	$ColorComment = "<div style=\"display: inline; color: {$CommentColor};\">";
	if (isset($EchoArrayVal)) {  // Fix!  Correct this spacing, tabs, and layout for clear source code display.
		$OutputText .= "\n<p><b>{$ColorComment}{$Comment}</div></b></p>\n";
		foreach($Var as $VarName=>$VarValue) {
			if ($VarName != 'EchoV') { 
				if (is_string($VarValue)) { $VarValue = EchoHtmlSource($VarValue); }  // Fix? May not always want to show source for strings...
				if (is_bool($Var)) { $Var = (($Var)?('TRUE'):('FALSE')); }
				$OutputText .= "\n<p>{$ColorComment}\n\t{$VarName}: \n" . ((is_array($VarValue) || is_object($VarValue)) ? ("</div></p>\n\t\t" . EchoHtmlArray($VarValue)) : ("|</div>{$ColorVar}\n\t\t{$VarValue}\n\t</div>{$ColorComment}|</div></p>\n")); 
			}
		}
	} else {
		if (is_string($Var)) { $Var = EchoHtmlSource($Var); }  // Fix? May not always want to show source for strings...
		if (is_bool($Var)) { $Var = (($Var)?('TRUE'):('FALSE')); }
		if (!$Var) { $Var = 'NULL'; }
		$OutputText .= "\n\n<p><b>{$ColorComment}\n\t{$Comment}\n</b>" . ((is_array($Var) || is_object($Var)) ? ("</div></p>\n\t\t" . EchoHtmlArray($Var)) : ("|</div>{$ColorVar}\n\t\t{$Var}\n\t</div>{$ColorComment}|</div></p>\n"));
	}

	$OutputText .= "<dl>\n\t<dh>Function Chain Call Hierarchy:</dh>\n\t<dd>{$FunctionChain}</dd>\n</dl>\n</div>\n\n";
	echo $OutputText;  // Fix?  Handle text output differently for specific conditions.
	return $OutputText;  
}




/*
class EchoV {
	private $EchoOn = 0;  // Determines whether echoing is active (set) or off (0). 
	private $CallingFunction = '';  // The function that instantiated this object for variable tracking.
	private $CallingLineNum = 0;  // The line number that instantiated this object for variable tracking.
	private $CallingFile = '';  // The file name that this object was instantiated from.
	private $CallingArray = array();  // An array storing all points where Echoing was toggled for this object in the form array(array($OnOrOff, $File, $Function, $Line), array($OnOrOff, $File, $Function, $Line), ...).
	
	
	
	public function __construct() {
		
	}
	
	
	// Turns echoing on or off for this object. If $OnVal is set, its value is stored in the global var $EchoV for output, otherwise it suppresses echoing. Returns 1 if it has been turned on, 0 if turned off.
	function SetOnOff($OnVal=0) {
		if ($OnVal) {
			$this->EchoOn = $OnVal;
			
		} else {
			$this->EchoOn = 0;
			$this->CallingFile = '';
			$this->CallingLineNum = 0;
		}
		return (($this->EchoOn)?(1):(0));
	}


	// Sets the file, function and line number attributes for this object and returns the function name. $CallingLevel is the number of levels of function calls within this object to identify the correct calling function data.
	private function SetCallingStats($CallingLevel=1) {
		$BackTraceArray = debug_backtrace();
		if (!isset($BackTraceArray) || !$FunctionArray = isset($BackTraceArray[$CallingLevel]) || !isset($BackTraceArray[1]['function'])) {	$Var=1;}
		if (isset($BackTraceArray[1]) && isset($BackTraceArray[1]) && isset($BackTraceArray[1]['function'])) {
			if (isset($BackTraceArray[1]['class'])) { 
				$TraceFunction = "{$BackTraceArray[1]['class']}->{$TraceFunction}()"; 
			} else if ($TraceFunction == 'include_once' || $TraceFunction == 'include' || $TraceFunction == 'require' || $TraceFunction == 'require_once') {
				if (isset($BackTraceArray[1]['args'])) { $TraceFunction .= '(\''.$BackTraceArray[1]['args'][0].'\')'; } else { $TraceFunction .= '(Args NOT Set)'; }
			} else {
				$TraceFunction .= '()';
			}
			$this->CallingFile = $BackTraceArray[0]['file'];
			$this->CallingLineNum = $BackTraceArray[0]['line'];
		} else {
			$this->CallingFile = '';
			$this->CallingLineNum = 0;
		}
		return $this->CallingFunction = $TraceFunction;
	}

	
}  // End of class EchoV.
*/

// Returns an array containing the file, function and line number attributes that this function was called from, in the form array('function'=>$TraceFunction, 'file'=>$CallingFile, 'line'=>$LineNum). $CallingLevel is the number of levels of function calls above this one, to trace the calling chain.
function GetCallingFunctionStats($CallingLevel=null) {
	if ((!$BackTraceArray = debug_backtrace()) || !is_array($BackTraceArray)) { return; }
	//EchoV(array('$CallingLevel'=>$CallingLevel, '$BackTraceArray'=>$BackTraceArray));
	if (!isset($CallingLevel)) { $CallingLevel = $NewCallingLevel = 1; } // { (count($BackTraceArray) - 1); }
	$UpLevel = ($CallingLevel+1);
	//if (!isset($BackTraceArray[$CallingLevel]) || !is_array($FunctionArray = $BackTraceArray[$CallingLevel])) { return; }
	if (isset($BackTraceArray[($UpLevel)]) && (is_array($FunctionArray = $BackTraceArray[($UpLevel)]))) {
		$TraceFunction = ((isset($FunctionArray['function']))?($FunctionArray['function']):(''));
		if (isset($FunctionArray['class'])) {
			$TraceFunction = "{$FunctionArray['class']}->{$TraceFunction}()"; 
		} else if ($TraceFunction == 'include_once' || $TraceFunction == 'include' || $TraceFunction == 'require' || $TraceFunction == 'require_once') {
			//EchoV($TraceFunction, '$TraceFunction Indicates a file include.');
			if (isset($FunctionArray['args'])) { $TraceFunction .= '(\''.$FunctionArray['args'][0].'\')'; } else { $TraceFunction .= '(Args NOT Set)'; }
		} else {
			$TraceFunction .= '()';
		}
	} else {
		$TraceFunction = '';
	}
	if (isset($BackTraceArray[($CallingLevel)]) && (is_array($FileArray = $BackTraceArray[($CallingLevel)]))) {
		$CallingFile = ((isset($FileArray['file']))?($FileArray['file']):(''));
		$LineNum = ((isset($FileArray['file']))?($FileArray['line']):(''));
	} else {
		$CallingFile = '';
		$LineNum = '';
	}
	$Text = (($TraceFunction)?("Function {$TraceFunction} c"):('C')) . "alled from line {$LineNum} in file {$CallingFile}.";
	$TraceArray = array('function'=>$TraceFunction, 'file'=>$CallingFile, 'line'=>$LineNum, 'text'=>$Text);
	//EchoV($TraceArray, '$TraceArray');
	return $TraceArray;
}


/*// Echos html-friendly representation of array. (Pretty weak functionality; very quick hack.)
function CheapHtmlArray($Array, $CallingText=0) {
	$OutputText = '';
	if ($CallingText) { $OutputText .= "<p>{$CallingText}:</p>\n"; } 
	$OutputText .= "\n<pre>\n" . nl2br( eregi_replace( " ", " ", print_r( $Array, TRUE ) ) ) . "</pre>\n\n";
	return $OutputText;
}*/


// Fix!  Quick hack to patch EchoV when loaded standalone.  Should correct at a fundamental level and remove this redundancy, Changing all instances of EchoHtmlArray() in this file back to HtmlArray().
// Generates and returns an un-ordered list HTML representation of an array and its sub-arrays, including keys. Also handles objects and other data types. $TabCount is used for markup indentation. {copyright 2003 http://jtrick.net?Id='HtmlArray'}
function EchoHtmlArray($MainArray, $TabCount=0, $BgColor=0) {
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
		if (is_string($MainArray)) { $MainArray = EchoHtmlSource($MainArray, 'cyan'); }
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
		$OutputText .= EchoHtmlArray($ThisItem, ($TabCount+1))."\n";
	}
	$OutputText .= $Tabs.'</ul></div>'.$NewLineStr;
	if ($NewLineStr) { 
		unset($StartCount);
		$OutputText .= "<!-- #######  HtmlArray END  ####### -->\n";
	}
	return $OutputText;
}


// Fix!    Quick hack to patch EchoV when loaded standalone.  Should correct at a fundamental level and remove this redundancy, Changing all instances of EchoHtmlSource() in this file back to HtmlSource().
// Returns a string containing a <pre> block to output the source for html as stored in the text file.
function EchoHtmlSource($HtmlString, $TextColor=0, $Border=0, $Echo=0) {
	if (!$TextColor) { $TextColor = 'gray'; }
	$Border = ($Border)?("border: thin solid {$TextColor}; padding:3px;"):('');
	$TabSym = '(_-\t-_)';  // Fix?  '(&nbsp; &nbsp; &nbsp;)';
	$DoubSpaceSym = '(__)';  // Fix?
	//$Echo = "\$Echo set within EchoHtmlSource()";
	$LineCount = count(explode("\n", $HtmlString));
	$EchoHtmlSource = htmlspecialchars($HtmlString);
	if ($Echo) { echo "\n<p>EchoHtmlSource() called. \$Echo: |'{$Echo}'|</br>\n"; }
	// if ($LineCount > 2) {
		// if ($Echo) { echo "\nAdding Pre block for {$LineCount} lines\n"; }
		// $EchoHtmlSource = '<pre>' . $EchoHtmlSource . '</pre>';
	// } else { 
		// if ($Echo) { echo "\nNOT modifying HtmlString, {$LineCount} lines\n"; } 
	// }
	$EchoHtmlSource = str_replace("\t", $TabSym, nl2br($EchoHtmlSource));
	$EchoHtmlSource = str_replace("  ", $DoubSpaceSym, nl2br($EchoHtmlSource));
	$EchoHtmlSource = "'<div style=\"display:inline; color:{$TextColor};{$Border}\">{$EchoHtmlSource}</div>'";
	if ($Echo) { echo "\n\$EchoHtmlSource: {$EchoHtmlSource}\n</p>\n"; }
	return $EchoHtmlSource;
}


// (The old version with automatic variable name checking included.) Echoes a comment and variable with calling function name, page, and line number. $Var name can be passed in $Comment but should ideally be able to bypass this constraint. // Making one of the indexes of $Var array = 'EchoV' will treat the argument as an associative array in the form array('VarName'=>$Var, 'VarName'=>$Var, ...). $Levels represents the maximum levels of 'parent' calling functions to output information for, defaults to 5. $Detail indicates whether (0) Function and applicable object names are given with file location for immediate calling function only, (1) outputs file names and line number locations of the parent calling functions as well.
function OldEchoV($Var=0, $Comment=0, $Detail=0, $Levels=5) {  // Fix.  Should not have to pass the variable name here. Should be able to determine through code somehow. I stopped due to time considerations but this should really be solved.
	if (!CheckAdminIP()) { return; }
	if (is_array($Var) && (isset($Var['EchoV']))) {  // Making one of the indexes of $Var array = 'EchoV' will treat the argument as an associative array in the form array('VarName'=>$Var, 'VarName'=>$Var, ...)
		$EchoArrayVal = $Var['EchoV'];
		if (!$Comment) { 
			$Comment = $EchoArrayVal . ': ';
		} else {
			$Comment .= ", EchoV='{$EchoArrayVal}': ";
		}
	} else {
		if ($Comment) {
			$Comment .= ': ';
		} else {
			$Comment = ''; 
		}// Fix?
	}
	$BackTraceArray = debug_backtrace();  // EchoHtmlArray($BackTraceArray, 'EchoV() $BackTraceArray');
	$FunctionChain = '';
	$OutputText = "\n<div class=\"echov\" style=\"border: thin solid blue; margin: 5px; padding: 5px;\">\n";
	for ($i = 1; $i <= $Count=count($BackTraceArray); $i++) {
		if ($TraceFunction = (isset($BackTraceArray[($i)])) ? ($BackTraceArray[($i)]['function']) : ('')) {
			if (isset($BackTraceArray[($i)]['class'])) { 
				$TraceFunction = "{$BackTraceArray[($i)]['class']}->{$TraceFunction}()"; 
			} else if ($TraceFunction == 'include_once' || $TraceFunction == 'include' || $TraceFunction == 'require' || $TraceFunction == 'require_once') {
				if (isset($BackTraceArray[($i)]['args'])) { $TraceFunction .= '(\''.$BackTraceArray[($i)]['args'][0].'\')'; } else { $TraceFunction .= '(Args NOT Set)'; }
			} else {
				$TraceFunction .= '()';
			}
		}
		$TraceLine = $BackTraceArray[($i-1)]['line'];
		$TraceFile = $BackTraceArray[($i-1)]['file'];
		if ($i == 1) { 
			$OutputText .= "<p><b>".(($TraceFunction)?("<div style=\"display: inline; color: blue; padding: 3px; border: thin solid red\">{$TraceFunction}</div> called EchoV()"):('EchoV() called'))." from line {$TraceLine} in file {$TraceFile}:</b></p>\n";  // Fix? May want block display for line break after function name?
		}
		
		if ($Detail) {
			$FunctionChain .= "<br>\n -->>| ".(($TraceFunction)?($TraceFunction.' on '):(''))."line {$TraceLine} in file {$TraceFile}";
		} else {
			$FunctionChain = " -->>| " . (($TraceFunction) ? ($TraceFunction) : ($TraceFile)) . $FunctionChain;
		}
	}
	
	$VarColor = 'green'; $CommentColor = 'red';
	$ColorVar = "<div style=\"display: inline; color: {$VarColor};\">";
	$ColorComment = "<div style=\"display: inline; color: {$CommentColor};\">";
	if (isset($EchoArrayVal)) {  // Fix!  Correct this spacing, tabs, and layout for clear source code display.
		$OutputText .= "\n<p><b>{$ColorComment}{$Comment}</div></b></p>\n";
		foreach($Var as $VarName=>$VarValue) {
			if ($VarName != 'EchoV') { 
				if (is_string($VarValue)) { $VarValue = EchoHtmlSource($VarValue); }  // Fix? May not always want to show source for strings...
				$OutputText .= "\n<p>{$ColorComment}\n\t{$VarName}: \n" . ((is_array($VarValue) || is_object($VarValue)) ? ("</div></p>\n\t\t" . EchoHtmlArray($VarValue)) : ("|</div>{$ColorVar}\n\t\t{$VarValue}\n\t</div>{$ColorComment}|</div></p>\n")); 
			}
		}
	} else {
		if (is_string($Var)) { $Var = EchoHtmlSource($Var); }  // Fix? May not always want to show source for strings...
		$OutputText .= "\n\n<p><b>{$ColorComment}\n\t{$Comment}\n</b>" . ((is_array($Var) || is_object($Var)) ? ("</div></p>\n\t\t" . EchoHtmlArray($Var)) : ("|</div>{$ColorVar}\n\t\t{$Var}\n\t</div>{$ColorComment}|</div></p>\n"));
	}

	$OutputText .= "<dl>\n\t<dh>Function Chain Call Hierarchy:</dh>\n\t<dd>{$FunctionChain}</dd>\n</dl>\n</div>\n\n";
	echo $OutputText;  // Fix?  Handle text output differently for specific conditions.
	return $OutputText;  
	
	
	// Fix.  The following code was used to automatically find the variable name of $Var by brute force due to no method for gaining it in a straightforward way.
	$TempVar = $Var;
	$KeyMatchArray = array_keys($GLOBALS, $Var, true);
	if ($MatchCount = count($KeyMatchArray) == 1) {  // If there is only one global variable with the value in $Var
		$VarName = $KeyMatchArray[0];
	} else if ($MatchCount > 1) {  // Fix? This approach may introduce unexpected behavior. May need to update for situations involving variables with equal values present in calling function scope.
		$Var = 'EchoV() placeholder string to ensure unique variable exchange.1234567';
		foreach($KeyMatchArray as $KeyName) {
			if ($GLOBALS[$KeyName] === $Var) {
				echo "<p>EchoV() \$Var: |{$Var}| DOES MATCH \$KeyName: |{$KeyName}|</p>\n";
				$VarName = $KeyName;
				$Var = $TempVar;
				break;
			}
			$Var = $TempVar;
			echo "<p>EchoV() \$Var: |{$Var}| DOES match variables global to calling scope, but did not update on reference modification. Aborting.</p>\n";
			return;			
		}
	} else {  
		echo "<p>EchoV() \$Var: |{$Var}| does NOT match any variables global to calling scope. Checking hierarchial arguments.</p>\n";
		foreach($BackTraceArray as $TraceArray) {
			if ($ArgMatchArray = array_keys($TraceArray[args], $Var, true)) {
				// Fix.  This is really irritating; Doesn't seem to be a method for getting an array of argument variable _names_ for a function...
			}
		}
		return;  // Fix.  This shouldn't happen but if does, handle error.
	}
	$FileListing = array();
	$FunctionChain = '';
	foreach ($BackTraceArray as $TraceArray) {
		if ($Count++ > $Levels) { break; }
		$TraceFunction = $BackTraceArray['function'];
		$TraceLine = $BackTraceArray['line'];
		$TraceFile = $BackTraceArray['file'];
		$TraceClass = $BackTraceArray['class'];
		$TraceObject = $BackTraceArray['object'];
		$TraceType = $BackTraceArray['type'];
		$TraceArgs = $BackTraceArray['args'];
		
		$FunctionChain .= " -> {$TraceFunction}()";
		// $DefinedVarsArray = get_defined_vars();  // Fix. This was used to determine $VarName, not necessary otherwise.
		// $CallingFunction = (isset($BackTraceArray[1])) ? ("{$BackTraceArray[1]['function']}() on ") : ('');
		// if (isset($BackTraceArray[1]['class'])) { $CallingFunction = "{$BackTraceArray[1]['class']}->{$CallingFunction}"; }
		// echo "<p><b>EchoV() called from {$CallingFunction}line {$BackTraceArray[0]['line']} in file {$BackTraceArray[0]['file']}:</b></p>\n";
		// EchoHtmlArray($Var, 'EchoV() $Var');
		// EchoHtmlArray($BackTraceArray, 'EchoV() $BackTraceArray');
		// EchoHtmlArray($DefinedVarsArray, 'EchoV() $DefinedVarsArray');
		// EchoHtmlArray($GLOBALS, 'EchoV() $GLOBALS');
		// EchoHtmlArray(func_get_args(), 'EchoV() func_get_args()');
	}
}


?>