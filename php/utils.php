<?php  // utils.php Copyright (c)2012-2013 The New Waters Foundation Inc, all rights reserved.  For license see: http://OpenAce.org/license?id=utils.php


// Returns time in a format compatable with javascript's Date.now() function: the number of milliseconds that have passed since 1970-01-01.
function jsTime($Time=0) {
	// Fix. Add check/conversion mechanisms for various input time formats. Assumes microtime(true) format.
	if (!$Time) { $Time = microtime(true); }
	return round(($Time*1000));  // sprintf("%06d",($Time-floor($Time))*1000);
}


// Returns formatted msg object for logging with timestamp, message, and data if desired. Format: array('time'=>microtime(true), 'msg'=>"Message String", 'dat'=>array(), 'typ'=>"typ")
function LogMsg($msg=0, $dat=null, $typ=null) { global $OmniDataArray, $LastLogTime;
	$Time = microtime(true);
	$EventArray = array('time'=>$Time);
	$Msecs = sprintf("%06d",($Time-floor($Time))*1000000);
	$Time = new DateTime(date('Y-m-d H:i:s.'.$Msecs, $Time));
	$Time = $Time->format("Y-m-d H:i:s.u");
	$TraceArr = debug_backtrace();
	$i = ($typ=='SECURITY')?(2):(1);  // Add other specialized callers of LogMsg().
	$Line = $TraceArr[$i-1]['line'];
	$Path = $TraceArr[$i-1]['file'];
	$File = explode('/', $Path);
	$File = $File[count($File)-1];
	$Caller = isset($TraceArr[$i]) ? ($TraceArr[$i]['function'].'()') : ('');
	$Count = count($TraceArr);
	$Trace = 'LogMsg()';
	for ($i=1; $i<$Count; $i++) { 
		$Cur = isset($TraceArr[$i]) ? $TraceArr[$i] : null;
		$Args = ($Cur && ($Args=$Cur['args']) && count($Args)) ? ("'".implode("','", $Args)."'") : '';
		$Trace=($Cur?$Cur['function']:'').'('.$Args.')->'.$Trace; 
	}
	$Inf = "[{$File}:{$Line}]{$Caller}(): ";  // If you want to prepend this string to $msg on the following line;   $Inf.
	$EventArray['msg'] = (($msg)?("{$msg}"):("Event logged"));
	$EventArray['dat'] = $dat;  // (($dat)?((is_array($dat))?($dat):(array($dat))):(array()));
	$EventArray['typ'] = (($typ)?("{$typ}"):("log"));
	$EventArray['stats'] = array('File'=>$File,'Caller'=>$Caller,'Line'=>$Line,'Trace'=>$Trace,'Time'=>$Time);  // ,'Path'=>$Path);  // 
	return $EventArray;
}


// Generates a random string of pure alphanumeric chars. If $Passwd, confusable characters will be removed and more variety added. (1,l,0,O).
function RandStr($Length=64, $Chars=0, $Passwd=0) {
	if (!$Chars) { $Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"; }
	if ($Passwd) { $Chars = '!@#$%^&*()'.str_replace(array('1','l','0','O'),'',$Chars); }	 // Fix? Additional mods?
	$CharsL = strlen($Chars)+2;
	$Str = '';
	for ($Length; $Length; $Length--) {
		$Str .= substr($Chars, rand(0,$CharsL), 1);
	}
	return $Str;
}


// Returns $_SERVER['HTTP_HOST'];
function GetDomain() {
	$Domain = $_SERVER['HTTP_HOST']; 
	LogMsg("Domain obtained for hit", $Domain);
	return $Domain;
}


// Returns the parsed component segments of the passed or loaded url.
function GetUrlSegs($Url='') {
	if (!$Url) { $Url = $_SERVER['SERVER_NAME']; }
	$Parsed = parse_url($Url);
	return array(
		"mode" => $Parsed['scheme'],
		"host" => $Parsed['host'],
		"port" => $Parsed['port'],
		"path" => $Parsed['path'],
		"args" => $Parsed['query'],
		"hash" => $Parsed['fragment']
	);
}


// Writes activity data to the end of the appripriate data file.
function AddFileData($FileName, $Data, $Echo=0) {
	if (!$FileName || !$Data) { return; }
	$FileName = 'admin_data/'.$FileName;  // Fix.  Remove context dependency, add safety mechanisms.
	$Time = microtime(true);
	$Result = @file_put_contents($FileName, $Data, FILE_APPEND | LOCK_EX);  // ObjOut($Obj, $ID, 'Connection')
	$Time = microtime(true) - $Time;
	if ($Echo) { 
		if ($Result) { 
			LogMsg("Added data to file '{$FileName}'; Operation took {$Time} seconds.", $Data);
		} else {
			LogMsg("AddFileData() FAILED for file '{$FileName}'; Operation took {$Time} seconds.", array('Data'=>$Data,'Result'=>$Result));
		}
	}
	return $Result;
}


// Retrieves activity data from the appripriate data file and deletes it unless $LeaveFile is set.
function GetFileData($FileName, $LeaveFile=0, $Echo=0) {
	if (!$FileName) { return; }  //  || !(strpos($FileName, 'admin_data')!==false)) { return; }
	if (!is_file($FileName='admin_data/'.$FileName)) { return; }  // Fix.  Remove context dependency, add safety mechanisms.
	$Time = microtime(true);
	$Data = @file_get_contents($FileName);  // ObjOut($Obj, $ID, 'Connection')
	if (!$LeaveFile) { 
		if ($Echo) { LogMsg("Deleting file '{$FileName}'...", $Data); }
		@unlink($FileName);   // file_put_contents($FileName, '');  // Fix! Re-add @ for @unlink($FileName);
	}
	$Time = microtime(true) - $Time;
	
	if ($Data) { 
		$Data = '['.trim($Data, ',\' ').']';
		LogMsg("Retreived data from file '{$FileName}'; Operation took {$Time} seconds.", $Data);
	} else {
		if ($Echo) { LogMsg("GetFileData() FAILED for file '{$FileName}'; Operation took {$Time} seconds.", array('Data'=>$Data)); }
	}
	return $Data;
}


// Deletes a given file if it exists.
function DelFile($FileName) {
	if (!$FileName || !is_string($FileName) || !is_file($FileName='admin_data/'.$FileName)) { return; }  // Fix.  Remove context dependency, add safety mechanisms.
	LogMsg("Deleting file '{$FileName}'...");
	@unlink($FileName);
}


// Converts a JSON array string into a native array
function StringToArray($ArrayStr, $Name=0, $Echo=0) {
	$ObjStr = '{"ItemRef":'.$ArrayStr.'}';  // Workaround for JSON requirements.
	$ItemObj = json_decode($ObjStr, true);
	if (!$Resolved=$ItemObj['ItemRef']) { $Resolved = array(); } // Fix? return as null?
	if ($Echo) { LogMsg('StringToArray() conversion for '.$Name, array('ArrayStr'=>$ArrayStr,'ItemObj'=>$ItemObj,'Resolved'=>$Resolved)); }
	return $Resolved;
}


// Universal function for updating table values based on existing items in memory, or overridden by setting their values in items.
function DataSet($Table=0, $Items=0, $KeyID=0) {
	$db = GetDB();
	if (!$Table) { $Table = $db->Get('CurrentTable'); }
	$FieldArray = $db->ListFields($Table);
	if (!$Items) { $Items = $db->ListFields($Table); }
	$KeyField = $db->GetKey($Table);
	foreach($Items as $Key=>$Val) {
		if (!is_numeric($Key)) {
			if (!in_array($Key, $FieldArray)) { unset($Items[$Key]); }
		} else {
			if (in_array($Val,$FieldArray) && OmniVar($Val)) { $Items[$Val] = OmniVar($Val); }
			unset($Items[$Key]); 
		}
	}
	if ($KeyID = $Items[$KeyField] ? $Items[$KeyField] : $KeyID) {
		DataAdd($Table, $Items);
	}
	
}


// Universal function for creating a new table entry propogated with items in memory.
function DataAdd($Table=0, $Items=0) {
	$db = GetDB();
	
}


// Universal function for deleting specific table values as well as existing items in memory.
function DataDel($Table=0, $Items=0) {
	$db = GetDB();
	
}


// Returns an array of the network trace for data, with each ip point stored as an array item as [["Ip","ServerName"], ["Ip","ServerName"], ...].
function TraceRoute($Echo=0) {
	//$Echo='Set from TraceRoute()';  // Fix.
	$UserIP = OmniVar('IP');
	$Options = "-N 1 -q 1 ";  // Include space at the end!
	$Command = "traceroute {$Options}{$UserIP}";
	$RouteString = shell_exec($Command);
	// echo "\$RouteString: {$RouteString}";
	$RouteArray = explode("\n", $RouteString);
	$NewRouteArray = Array();
	foreach($RouteArray as $Item) {
		$ItemArray = explode("  ", $Item);
		// foreach($ItemArray as $HopAspect) {  // Fix? If we want a higher level of scrutiny, we can loop through each aspect.
			// $ItemIP = BetweenString($HopAspect, '(', ')');
			// if 
		// }
		$ItemStr = $ItemArray[1];
		$ItemIP = BetweenString($ItemStr, '(', ')');
		if ($ItemIP) {
			$ItemName = substr($ItemStr, 0, strpos($ItemStr, '('));
			//$ItemName = strstr($ItemStr, '(', true);  // Only works >= PHP 5.3
			//EchoV(array('ItemStr'=>$ItemStr, 'ItemIP'=>$ItemIP, 'ItemName'=>$ItemName));  // Fix
			$NewRouteArray[] = array($ItemIP,$ItemName); 
		}
	}
	if ($Echo) { EchoV(array('NewRouteArray'=>$NewRouteArray, 'RouteString'=>$RouteString)); }
	return $NewRouteArray;
}


// Checks $Name against the current function chain to ensure infinite recursion does not take place. Returns true if a function called $Name occurs.
function CheckRecursion($Name=null) {  // ,$MaxDepth=100) {
	$BackTraceArray = debug_backtrace();
	// LogMsg("CheckRecursion() Building \$BackTraceArray for |{$Name}|: ", $BackTraceArray);
	$Count=count($BackTraceArray);
	$TraceStr = $BackTraceArray[1]['function']."() -> CheckRecursion('{$Name}')";  // Fix? To skip the function calling CheckRecursion().
	$Detected = false;
	for ($i=2; $i<=$Count; $i++) {
		$TraceFunction = (isset($BackTraceArray[($i)])) ? ($BackTraceArray[($i)]['function']) : ('');
		$TraceStr = $TraceFunction.'() -> '.$TraceStr;
		if ($Name && $Name == $TraceFunction) {
			$TraceLine = $BackTraceArray[($i)]['line'];
			$TraceFile = $BackTraceArray[($i)]['file'];
			$Caller = $BackTraceArray[($i+1)]['function'];
			$TraceStr = $Caller.'() -> '.$TraceStr;
			$Args = $BackTraceArray[($i)]['args'];
			$TraceArr = array(
				'Name'=>$Name,
				'Args'=>$Args,
				'TraceStr'=>$TraceStr,
				'SourceFile'=>$TraceFile,
				'LineCall'=>$TraceLine,
				'Caller'=>$Caller,
				'Steps'=>$i,
			);
			LogMsg("CheckRecursion() Detected recursive instance of |{$Name}()| in the current function chain: ", $TraceArr);
			$Detected = true; 
		}
	}
	//if ($Count>$MaxDepth) { LogMsg("CheckRecursion() trace count exceeded \$MaxDepth. ", $TraceStr); return true; }
	if (!$Name) { LogMsg("CheckRecursion() Function Stack: ", $TraceStr); } // Fix?
	return $Detected;
}


// Records hit data to log file.
function logFile($Data, $Msg=0) {  // Fix. Update transitional items.
	if (!$Msg) { $Msg = 'omni.php logged data:'; }
	if (!is_array($Data)) { $Data = array(); }
	$FileName = 'admin_data/logs/'.date('Y-m-d');  // Fix.  Remove context dependency, add safety mechanisms.
	$TimeDiff = $OmniLoadTime - $Time;
	$Str = "\n\n======= Hit# {$HitID} | time: {$Time} | now: ".date('H:i:s (Y-m-d)')." | IP: [{$IP}] | {$Msg} =======\n";
	$Time = round((jsTime()-$LoadTime)/1000, 3);
	$Str .= trim(str_replace('Array', '', print_r($Data, true)))." -- (Call process took {$Time} seconds.)\n";
	@file_put_contents($FileName, $Str, FILE_APPEND | LOCK_EX);
	// $Time = microtime(true);
	// @file_put_contents($FileName, , FILE_APPEND | LOCK_EX);  // Fix. Only for performance testing.
	// $Time = round((microtime(true)-$Time), 4);
}









?>
