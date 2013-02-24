<?php  // Copyright (c) The New Waters Foundation, all rights reserved.  For license see: http://aceModel.org/license?id=DatabaseObj.php
// Allows streamlined and modular interaction with database using the ACE protocol.


//include_once('obj/AceObj.php');
include_once('EchoV.php');
include_once('array_tools.php');


class DatabaseObj { 
	function DatabaseObj($DbItems=0, $Echo=0) {
		$this->TranslateDbItems($DbItems, $Echo);	
		if (!$this->CheckUserAccess()) { return; }
		if ($Echo) { echo "<p>DatabaseObj->DatabaseObj() \$DbName:|{$this->DbName}|, \$DbHost:|{$this->DbHost}|, \$DbUser:|{$this->DbUser}|, \$DbPass:|{$this->DbPass}|, \$DbType:|{$this->DbType}|</p>\n"; }
		
		if (!$this->DbConnect($Echo)) { return; }  // Fix. Should specify reason for error.	
		$this->IsLoaded = (($this->LoadObj()) ? (true) : (false)); // Fix? Make more useful?
		//echo "<p>DatabaseObj->DatabaseObj() \$this: |".HtmlArray($this)."|</p>";
	}
	
	private $ThisID;  // The ID for this Database, if applicable. // Fix. Should use an aceID for this.
	private $IsLoaded;  // Bool, indicates whether this Database loaded successfully or not.
	private $SrvRsc;  // The resource link used to access this database on the server.
	private $DbType;  // The type of db represented by this object. Can be 'mysql', 'postgres', etc.
	private $DbName;  // The name of the database to load objects from.
	private $DbHost;  // The host location of this database.
	private $Name;  // The name used to summon this DatabaseObj from GetDatabaseObj() and by file.
	private $Description;  // The Description property for this object.
	private $Value;  // The overall Value rating for this object.
	private $ObjSize;  // The Size of this object, in bytes.  // Fix?

	private $RemainingArray;  // An array to store excess items passed through InsertQuery() in the form array('$TableName'=>array($RemainingItem1=>$Value, $RemainingItem2=>$Value)).  // Fix? Seems a little convoluted, may be a better way?  Wanted to pass by reference in the function itself but was not possible prior to php5.
	private $SqlQue;  // Array used in dynamic query creation to store additional parameters to be added at the end of processes carried out by other functions.
	private $SqlOptions;  // String used for specific options to be added to the end of a query, outside of the containing command parentheses.
	
	private $TableList;  // All tables contained in this database, in full case-compliant name form.
	private $TableArray;  // An associative array to all tables accessed during this database session, as array('TableName'=>array('Field1'[=>array(FieldData)], 'Field2', ...));
	private $CurrentTable;  // The current or most recently accessed table.
	private $CurrentField;  // The current or most recently accessed field in $CurrentTable.
	
	private $PriList;  // A list of all segmented _pri tables in this database, in the form array('RootName').
	private $RefList;  // A referenced list of all segmented _ref tables in the form array(array('PriRoot'), array('RefRoot')) where items in the same slot in the array are associated with each other.
	private $LnkList;  // A referenced list of all segmented table names internally referencing other tables in the form array('PriRoot'->array('LnkRoot', 'LnkRoot'), 'PriRoot'->array('LnkRoot', 'LnkRoot')).
	private $BadLnkList;  // Lists internal ID links with no corresponding _pri table root. array('ContainingTable'->array('UnrecognizedField', 'UnrecognizedField'), 'ContainingTable'->array('UnrecognizedField', 'UnrecognizedField')).
	private $TypList;  // A list of all segmented _typ tables in this database, in the form array('TypName').
	private $LogList;  // A list of all segmented _log tables in this database, in the form array('LogName').


	///////////  Integral Functions:  ///////////

	public function Ping() { return (($this->CheckUserAccess() && $this->GetRsc())?(1):(0)); }
	// Fix!  These functions are depreciated. Made obsolete by Get(), use that instead.
	function GetID() { return ($this->CheckUserAccess()) ? ($this->ThisID) : (0); }  // Returns the ID of this object.  Fix? Allow unauthorized users to see the ID#?
	function GetRsc() { return $this->Get('SrvRsc'); }
	function GetDbName() { return $this->Get('DbName'); }  // Returns the database name of this object.
	function GetDbHost() { return $this->Get('DbHost'); }  // Returns the host for the database for this object.
	function GetName() { return $this->Get('Name'); } 
	function GetDescription() { return $this->Get('Description'); }  
	function GetValue() { return $this->Get('Value'); }
	function GetSize() { return $this->Get('ObjSize'); }
	
	
	
	// Loads the data structure into the object abstraction of this form for useful access.
	public function LoadObj() {
		return 1;  // Fix! Transition this into process for loading alternate types of data.
		if (!$this->CheckUserAccess()) { return; }
		$this->SortTables();
		$this->LoadLnkList();
		return 1;
	}

	
	
	/////// Standardized DataBridge data interaction calls.  /////////////////////////
	// See https://github.com/jtrick/DataBridge for details.
	
	
	// Standardized DataBridge data interaction call for db.exe() function.  
	public function exe($Arg, $Echo=0) {  // Fix? Seemed like a good universal call name.
		$Arg = TranslateArg($Arg, $Echo);
	}
	
	
	// Standardized DataBridge data interaction call for db.get() function.  
	public function get($Arg, $Echo=0) {
		$Arg = TranslateArg($Arg, $Echo);
	}


	// Standardized DataBridge data interaction call for db.set() function.
	public function set($Arg, $Echo=0) {
		$Arg = TranslateArg($Arg, $Echo);
	}
	
	
	// Standardized DataBridge data interaction call for db.add() function.  
	public function add($Arg, $Echo=0) {  // Fix? Can't use 'new'
		$Arg = TranslateArg($Arg, $Echo);
	}
	
	
	// Standardized DataBridge data interaction call for db.del() function.
	public function del($Arg, $Echo=0) {
		$Arg = TranslateArg($Arg, $Echo);
	}

	
	// Core db_bridge Functions:  /////////////////
	// Fix.  We will probably want to transition these completely over to an abstract object model.  Leaving this in place for the moment to allow instantiation of base DatabaseObject and for back-compatibility. Ultimately we'll want to branch this or create a new project to allow for the dramatic modifications that are really called for.
	
	
	// Provides abstraction for universal db conection across various implementations.
	protected function db_connect() {
		$DbHost = $this->DbHost;
		$DbName = $this->DbName;
		$DbUser = $this->DbUser;
		$DbPass = $this->DbPass;
		$DbType = $this->DbType;
		if ($DbType == 'postgres') {  // Fix. Centralize the DbType to class function and extend from base object.
			$SrvRsc = pg_connect("host={$DbHost} dbname={$DbName} user={$DbUser} password={$DbPass}");
		} else if ($DbType == 'mysql') {
			$SrvRsc = mysql_connect($DbHost, $DbUser, $DbPass);
		}
		if ($this->CheckDbUser()) {  // If db exists under this user
			if ($DbType == 'mysql') {
				mysql_select_db($DbName, $SrvRsc);
				if ($Echo) { echo "<p>DatabaseObj->db_connect() Connected to database |{$DbHost}| on host \$DbHost |{$DbHost}| as user |{$DbUser}|</p>"; }
			}
		} else {
			$SrvRsc = null;
			echo "<p>DatabaseObj->db_connect() \$DbName |{$DbName}| is not available to \$DbUser |{$DbUser}|.</p>";
		}
		return $SrvRsc;
	}
	
	
	// Provides abstraction for universal db query across various implementations.
	protected function db_query($Query, $SrvRsc=0) {
		if (!$SrvRsc) { $SrvRsc = $this->SrvRsc; }  // Fix? May want to only allow access to internal $this->SrvRsc;
		if ($this->DbType == 'postgres') {  // Fix. Centralize the DbType to a class function and extend from base object.
			$SrvRsc = pg_query($SrvRsc, $Query);
		} else if ($this->DbType == 'mysql') {
			$SrvRsc = mysql_query($Query, $SrvRsc);
		}
		return $SrvRsc;
	}
	
	
	// Provides abstraction for universal fetch_array functionality across various implementations.
	protected function db_fetch_array($SrvRsc=0) {
		if (!$SrvRsc) { $SrvRsc = $this->SrvRsc; }  // Fix? May want to only allow access to internal $this->SrvRsc;
		if ($this->DbType == 'postgres') {  // Fix. Centralize the DbType to a class function and extend from base object.
			$NumRows = pg_fetch_array($SrvRsc);
		} else if ($this->DbType == 'mysql') {
			$NumRows = mysql_fetch_array($SrvRsc);
		}
		return $NumRows;
	}
	

	// Provides abstraction for universal num_rows functionality across various implementations.
	protected function db_num_rows($SrvRsc=0) {
		if (!$SrvRsc) { $SrvRsc = $this->SrvRsc; }  // Fix? May want to only allow access to internal $this->SrvRsc;
		if ($this->DbType == 'postgres') {  // Fix. Centralize the DbType to a class function and extend from base object.
			$NumRows = pg_num_rows($SrvRsc);
		} else if ($this->DbType == 'mysql') {
			$NumRows = mysql_num_rows($SrvRsc);
		}
		return $NumRows;
	}
	

	// Provides abstraction for universal fetch_row functionality across various implementations.
	protected function db_fetch_row($SrvRsc=0) {
		if (!$SrvRsc) { $SrvRsc = $this->SrvRsc; }  // Fix? May want to only allow access to internal $this->SrvRsc;
		if ($this->DbType == 'postgres') {  // Fix. Centralize the DbType to a class function and extend from base object.
			$NumRows = pg_fetch_row($SrvRsc);
		} else if ($this->DbType == 'mysql') {
			$NumRows = mysql_fetch_row($SrvRsc);
		}
		return $NumRows;
	}
	
	
	// Provides abstraction for universal error functionality across various implementations.
	protected function db_error($SrvRsc=0) {
		if (!$SrvRsc) { $SrvRsc = $this->SrvRsc; }  // Fix? May want to only allow access to internal $this->SrvRsc;
		if ($this->DbType == 'postgres') {  // Fix. Centralize the DbType to a class function and extend from base object.
			$NumRows = pg_last_error($SrvRsc);
		} else if ($this->DbType == 'mysql') {
			$NumRows = mysql_error($SrvRsc);
		}
		return $NumRows;
	}
	
	
	// Login and Access Functions:  /////////////////


	// Translates function arguments from the many possible formats to the primary native one.
	function TranslateArg($Arg, $Echo=0) {
		if (!is_string($Arg) || (!$Mod=json_decode($Arg, TRUE))) {
			$Mod = $Arg;
		}
		if ($Echo) { EchoV(array('Arg'=>$Arg,'Mod'=>$Mod,'Echo'=>$Echo)); }
		return $Mod;
	}
	
	
	// Used during the initialization process to handle login and db selection items.
	function TranslateDbItems($DbItems=0, $Echo=0) {
		if ($Echo) { EchoV(array('$DbItems'=>$DbItems,'$Echo'=>$Echo)); }
		if (is_string($DbItems)) {
			if (!$DbItems=json_decode($DbName=$DbItems, TRUE)) {
				if (strpos($DbName,' ')===FALSE) {
					if ($Echo) { EchoV($DbName,'Using simple string DbItems as DbName'); }
					$this->DbName = $DbName;
				} else {
					if ($Echo) { EchoV(json_last_error(),'JSON Error code while translating DbItems'); }
					// Fix. Continue for other string parsing options.
				} 
			} else {
				if ($Echo) { EchoV($DbItems,'Instantiated login DbItems from JSON'); }
			}
		}
		if (is_array($DbItems)) {  // Fix. Add checking process.
			if (isset($DbItems['host'])) { $this->DbHost = $DbItems['host']; }  
			if (isset($DbItems['user'])) { $this->DbUser = $DbItems['user']; }
			if (isset($DbItems['pass'])) { $this->DbPass = $DbItems['pass']; }
			if (isset($DbItems['type'])) { $this->DbType = $DbItems['type']; }
			if (isset($DbItems['data'])) { $this->DbName = $DbItems['data']; }
			return TRUE;
		}
	}
	
	
	// Returns bool indicating whether this db has been instantiated correctly.
	function IsLoaded($Echo=0) {
		if ($Echo) { echo "<p>DatabaseObj->IsLoaded() \$IsLoaded: |{$this->IsLoaded}|</p>"; }
		return $this->IsLoaded;
	}
	
	
	// Checks to see whether the current user has access to this table by returning 1, or not by returning 0. Tables listed in Table_pri are restricted, and UserIDs referenced to them in User_Table_ref are allowed access.
	function CheckUserAccess($TableName=0) {
		return 1;  // Fix!  Identify best standard for checking authentication.
		
		if (!$SrvRsc = $this->SrvRsc) { return; }
		$UserID = 2;  // Fix!! GetUserID($this->DbName, $this->DbHost);  // Fix. Use without a second CheckUserAccess() call.
		if (!$TableName) { 
			// Fix. 
			// return; 
		}
		echo "<p>DatabaseObj->CheckUserAccess() \$this: |".HtmlArray($this)."|</p>";
		
		$Result = $this->db_query("SHOW TABLES LIKE 'Table_pri'", $SrvRsc);
		echo "<p>obj_base DatabaseObj->CheckUserAccess() \$Result: |{$Result}|, \$SrvRsc: |{$SrvRsc}|</p>";
		if (!db_num_rows($Result)) { return 1; }
		
		$Query = "SELECT TableID FROM Table_pri WHERE Name = '{$TableName}'";
		$Result = $this->db_query($Query, $this->SrvRsc);
		echo "<p>obj_base DatabaseObj->CheckUserAccess() \$Result: |{$Result}|, \$ItemName: |{$ItemName}|</p>";
		list($TableID) = $this->db_fetch_row($Result);
		echo "<p>obj_base DatabaseObj->CheckUserAccess() \$TableID: |{$TableID}|</p>";
		if (!$TableID) { return 1; }
		if (db_num_rows($this->db_query("SELECT * FROM User_Table_ref WHERE UserID = '{$UserID}' AND TableID = '{$UserID}'", $this->SrvRsc))) { return 1; }
	}


	// Used to connect to the database.
	function DbConnect($Echo=0) {
		if (!$this->DbPass) {  // Fix. Handle cases with no authentication.
			if ($this->GetLoginInfo($Echo)) {
				$DbHost = $this->DbHost;
				$DbName = $this->DbName;
				$DbUser = $this->DbUser;
				if ($Echo) { echo "<p>DatabaseObj->DbConnect() Successfully obtained login info:  \$DbName |{$DbName}|, \$DbHost |{$DbHost}|, \$DbUser |{$DbUser}|</p>"; }
			} else {
				if ($Echo) { echo "<p>DatabaseObj->DbConnect() FAILED to obtain login info.  Returning null.</p>"; }
				return;
			}
		}
		if ($SrvRsc=$this->db_connect()) {
			$this->SrvRsc = $SrvRsc;
			if ($Echo) { echo "<p>DatabaseObj->DbConnect() Successfully logged in on host \$DbHost |{$DbHost}| as user |{$DbUser}|</p>"; }
		} else {
			echo "<p>DatabaseObj->DbConnect() FAILED to login on \$DbHost |{$DbHost}| as \$DbUser |{$DbUser}| using this \$DbPass</p>";
			return;  // Fix. Should probably specify bad connection.
		}
		//echo "<p>DatabaseObj->DbConnect() Logged into \$DbName |{$DbName}| on \$DbHost |{$DbHost}| as \$DbUser |{$DbUser}| with \$DbPass |{$DbPass}|</p>";
		return $SrvRsc ? TRUE : FALSE;
	}
	
	
	// Returns a 1D array in the form array($DbUser, $DbPass). The purpose is to keep the login info out of session vars for security. Better solution?
	private function GetLoginInfo($Echo=0) {  // Fix.  Update this output.
		if ($this->GetLoginFile($Echo)) {  // Checks for file first. Fix?
			if ($Echo) { echo "<p>DatabaseObj->GetLoginInfo() successfully obtained info from file.</p>"; }
		} else if ($this->GetLoginFromDb()) {  // Checks for Db records for this db. Fix?
			//echo "<p>DatabaseObj->GetLoginInfo() called from DB, \$LoginArray: |".HtmlArray($LoginArray)."|</p>";
		} else if ($this->GetLoginDefault()) {  // If all else fails. Fix?
			echo "<p>DatabaseObj->GetLoginInfo() called from Default, \$LoginArray: |".HtmlArray($LoginArray)."|</p>";
		} else {
			return;
		}
		return TRUE;
	}
	
	
	// Chooses the relevant file for login info and returns a 1D array in the form array($DbName, $DbHost, $DbUser, $DbPass).
	private function GetLoginFile($Echo=0) {  // Fix.  This whole set of functionality needs re-worked.
		$DbHost = $this->DbHost;
		$DbName = $this->DbName;
		if ($Echo) { echo "<p>DatabaseObj->GetLoginFile() \$DbName:|{$DbName}|, \$DbHost:|{$DbHost}|, \$DbUser:|{$DbUser}|</p>\n"; }
		if (!$DbName) { $DbName = 'default'; }  // Fix. There are many better ways of doing this.
		if ($DbHost && ($DbHost != 'localhost')) {  // Fix. This has mixed purposes since the structure revision.
			$DbFile = "{$DbHost}/{$DbName}";
		} else {
			$DbHost = 'localhost'; 
			$DbFile = $DbName;
		}
		$FilePath = "db/{$DbFile}.db";  // Fix? Originally temporary hack for brevity.
		if ($Echo) { echo "<p>DatabaseObj->GetLoginFile() \$FilePath:|{$FilePath}|</p>\n"; }
		if (file_exists($FilePath)) {
			if ($Echo) { echo "<p>DatabaseObj->GetLoginFile() Found local file {$FilePath}.</p>\n"; }
			if (!$Loaded = file_get_contents($FilePath, FILE_USE_INCLUDE_PATH)) { 
				echo "<p>DatabaseObj->GetLoginFile() Error loading local file {$FilePath}.</p>\n";  // Fix? Require $Echo? 
			} else {
				if ($Echo) { "<p>DatabaseObj->GetLoginFile() Successfully loaded local file {$FilePath}.</p>\n"; }
			}
		} else if (file_exists($GlobalCheck=($this->LoginFileRoot().$DbFile.'.db'))) {  // Fix! Quick hack to access server root using new include path.
			if ($Echo) { echo "<p>DatabaseObj->GetLoginFile() No local file {$FilePath}.  Found global file {$GlobalCheck}.</p>\n"; }
			if (!$Loaded = file_get_contents($GlobalCheck, FILE_USE_INCLUDE_PATH)) {
					echo "<p>DatabaseObj->GetLoginFile() Error loading global file {$GlobalCheck}.</p>\n";  // Fix? Require $Echo? 
			} else {
				if ($Echo) { echo "<p>DatabaseObj->GetLoginFile() Successfully loaded global file {$GlobalCheck}.</p>\n"; }
			}	
		} else {
			echo "<p>DatabaseObj->GetLoginFile() \$DbFile |{$DbFile}| does not exist at |{$FilePath}| nor |{$GlobalCheck}|.</p>\n";  // Fix? Require $Echo? 
			return;
		}
		if (!$this->TranslateDbItems($Loaded, $Echo)) {
			echo "<p>DatabaseObj->GetLoginFile() Error translating file for db initialization.</p>\n";  // Fix? Require $Echo?
			return;
		} else {
			return TRUE;
		}
	}
	
	
	// Returns the global directory for db login file access.
	private function LoginFileRoot() {
		return '/srv/data/web/includes/db/';  // Fix!  Temporary hack.
	}

	// Checks whether login info for this db is in the central DB database.
	private function GetLoginFromDb($DbName=0, $DbHost=0, $DbUser=0) {  // Fix! Currently does nothing.
		return 0;
		return ($DbUser && $DbPass) ? (array($DbName, $DbHost, $DbUser, $DbPass)) : (0);
	}
	
	
	// The default login info if all else fails, in the form array($DbName, $DbHost, $DbUser, $DbPass).
	private function GetLoginDefault() {  // Fix! Not currently useful data.
		$DbName = 'default';
		$DbHost = '';
		$DbUser = '';
		$DbPass = '';
		return array($DbName, $DbHost, $DbUser, $DbPass);
	}
	
	
	// Returns a 1D Array of all Dbs on this host (For this user).
	private function GetDbList($Echo=0) {
		$DbListRsc = $this->db_query('SHOW DATABASES');
		while ($DbRow = $this->db_fetch_array($DbListRsc)) {
			$DbName = $DbRow['Database'];
			$DbList[] = $DbName;
		}
		if ($Echo) { echo "<p>DbObj.php DatabaseObj->GetDbList() \$DbList: |".HtmlArray($DbList)."|</p>\n"; }
		return $DbList;
	}
	
	
	// Checks for the existence of DatabaseObj->$DbName within the user's access privelages. Returns TRUE or FALSE
	private function CheckDbUser() {  // Fix! Does nothing now.
		return 1;
		$DbName = $this->DbName;
		$DbList = $this->GetDbList();
		$InArray = (in_array($DbName, $DbList));  // Fix! Returns true always as is.
		//echo "<p>DbObj.php DatabaseObj->CheckDbUser() \$DbName: |{$DbName}|, \$InArray: |{$InArray}|</p>\n";
		return ($InArray) ? (1) : (0);
	}
	
	
	// Database Structure Functions:  /////////////////
	
	
	// Returns a 1D Array of all table names in this db.
	function ListTables($Echo=0) {  // Fix? Check speed against specifying single row item during actual query.
		if ($this->TableList) { return $this->TableList; }
		if ($this->DbType == 'postgres') {  // Fix. Centralize the DbType to a class function and extend from base object.
			$Query = 'SELECT "tablename" from "pg_tables" WHERE "schemaname" = \'public\''; // Fix.  Stupid, stupid syntax... Must be better way?
		} else if ($this->DbType == 'mysql') {
			$Query = "SHOW TABLES"; //  FROM '{$DbName}'";  
		}
		$Result = $this->db_query($Query, $this->SrvRsc);
		while ($ThisRow = $this->db_fetch_row($Result)) {
			$TableArray[] = $ThisRow[0];
		}
		if ($Echo) { EchoV(array('Query'=>$Query,'TableArray'=>$TableArray)); }
		return $this->TableList=$TableArray;
	}
	
	
	// Checks for the existence of Table $TableName in this DatabaseObj. Returns TRUE or FALSE.
	function CheckTable($TableName, $Echo=0) {
		if (!$TableArray=$this->ListTables($Echo)) { return; }
		//EchoV(array_key_exists($TableName, $TableArray), "array_key_exists($TableName, $TableArray)");
		return (in_array($TableName, $TableArray)) ? (TRUE) : (FALSE);
	}


	// Screens $TableName strings for sql injection and other negative conditions.
	private function FilterTableString($TableName) {
		if ((count(explode(' ',$TableName))>1) || (strpos($TableName, '"'))) { return; }  // Fix! Quick hack to prevevent query segmentation. Security, Notification
		return $this->FilterSqlString($TableName);
	}
	
	
	// Checks for the existence of $TableName in this DatabaseObj and its validity as a _ref table. Returns 1 or null.
	private function CheckRefTable($TableName) {
		if (!$this->CheckTable($TableName)) { return; }
		if ($this->SplitTableName($TableName) != 'ref') { return; }
		$TableArray = $this->TableStruct($TableName);
		$RefCheck = 'int(10) unsigned';  // The required ID format for the DbObjs.
		if ($TableArray[0]['Type'] == $RefCheck && $TableArray[1]['Type'] == $RefCheck && $TableArray[2]['Type'] == $RefCheck) { return 1; } // If the first 3 fields of the table are the correct ID format.
	}
	
	
	// Returns a 1D array of all table root names referenced with $TableRoot. $UpOrDown specifies whether the reference is to a higher (1, 'Up', or 'up') or lower hierarchial relationship, defaults to downward referencing.
	private function ListRefRoots($TableRoot, $UpOrDown='Down', $Echo=0) { 
		$RefTableArray = $this->RefList;
		if ($Echo) { echo "<p>DatabaseObj.php DatabaseObj->ListRootRefs() \$TableRoot: |{$TableRoot}|, \$UpOrDown: |{$UpOrDown}|, \$RefTableArray: |".HtmlArray($RefTableArray)."|, \$Echo: |{$Echo}|</p>\n"; }
		if (!is_array($RefTableArray) || !count($RefTableArray) || !is_array($RefTableArray[0]) || !count($RefTableArray[0])) { 
			if ($Echo) { echo "<p>DatabaseObj.php DatabaseObj->ListRootRefs() \$this->RefList[0] not set.  No {$UpOrDown}ward references to name root {$TableRoot} in this DatabaseObj.</p>\n"; }
			return; 
		}
		
		if ($UpOrDown == 1 || $UpOrDown == 'Up' || $UpOrDown == 'up') {  // Looking for upward references.
			if (!$KeyList = array_keys($RefTableArray[1], $TableRoot)) { 
				if ($Echo) { echo "<p>DbObj.php DatabaseObj->ListRootRefs() No upward references to name root {$TableRoot} in this DatabaseObj.</p>\n"; }
				return; 
			}
			foreach($KeyList as $SlotNum) { $RefRootList[] = $RefTableArray[0][$SlotNum]; }
		} else {  // Looking for downward references.
			if (!$KeyList = array_keys($RefTableArray[0], $TableRoot)) { 
				if ($Echo) { echo "<p>DatabaseObj.php DatabaseObj->ListRootRefs() No downward references from name root {$TableRoot} in this DatabaseObj.</p>\n"; }
				return; 
			}
			foreach($KeyList as $SlotNum) { $RefRootList[] = $RefTableArray[1][$SlotNum]; }
		}
		
		if ($Echo) { echo "<p>DatabaseObj.php DatabaseObj->ListRootRefs() \$TableRoot: |{$TableRoot}|, \$UpOrDown: |{$UpOrDown}|, \$RefRootList: |".HtmlArray($RefRootList)."|, \$Echo: |{$Echo}|</p>\n"; }
		return $RefRootList;
	}
	
	
	// Returns all full table names that contain reference to $TableRoot. $UpOrDown specifies whether the reference is to a higher (1, 'Up', or 'up') or lower hierarchial relationship, defaults to downward referencing.
	private function ListRefTables($TableRoot, $UpOrDown='Down', $Echo=0) {
		if (!$RootList = $this->ListRefRoots($TableRoot, $UpOrDown, $Echo || !is_array($RootList))) { return; }
		if ($UpOrDown == 1 || $UpOrDown == 'Up' || $UpOrDown == 'up') {
			foreach($RootList as $RefRoot) { $TableList[] = "{$RefRoot}_{$TableRoot}_ref"; }
		} else {
			foreach($RootList as $RefRoot) { $TableList[] = "{$TableRoot}_{$RefRoot}_ref"; }
		}
		//echo "<p>DbObj.php DatabaseObj->ListRefTables() \$TableList: |".HtmlArray($TableList)."|</p>\n";
		return $TableList;
	}
	
	
	// Table Structure Functions:  /////////////////
	
	
	// Returns a 2D array with structure details for $TableName.
	private function TableStruct($TableName) {
		if (!$this->CheckTable($TableName)) { return; }  // Fix? May be redundant.
		$Query = "SHOW COLUMNS FROM {$TableName}";
		$Result = $this->db_query($Query, $this->SrvRsc);
		while ($Row = $this->db_fetch_array($Result, MYSQL_ASSOC)) { $TableArray[] = $Row; }
		//echo "<p>DatabaseObj->TableStruct() \$TableArray: |".HtmlArray($TableArray)."|</p>\n";
		return $TableArray;
	}
	
	
	// Returns a 1D of all fields in this table, in their column order.  $SkipFields is an integer that if set will return only fields following that number.
	function ListFields($TableName, $SkipFields=0) {
		//echo "<p>db_obj.php DatabaseObj->ListFields() \$TableName: |".HtmlArray($TableName)."|</p>\n";
		if (!$this->CheckTable($TableName)) { return; }  // Fix? May be redundant.
		$Query = "SHOW COLUMNS FROM {$TableName}";
		$Result = $this->db_query($Query, $this->SrvRsc) or die ('Error in DatabaseObj->ListFields(): '.db_error()."</p>\n");
		if (db_num_rows($Result) > 0) {
			while ($Row = $this->db_fetch_array($Result)) {
				if ($RowNum++ >= $SkipFields) { $FieldList[] = $Row['Field']; }
				//echo "<p>db_obj.php DatabaseObj->ListFields() \$Row: |".HtmlArray($Row)."|</p>\n";
			}
		return $FieldList;
		}
	}
	
	
	// Returns true or false depending on whether $FieldName is a field in $TableName.
	function CheckField($TableName, $FieldName) {
		if (!$this->CheckTable($TableName)) { return; }  // Fix? May be redundant.
		$Query = "SHOW COLUMNS FROM {$TableName} LIKE '{$FieldName}'";
		$Result = $this->db_query($Query, $this->SrvRsc);  //  or die ('Error in DatabaseObj->CheckField(): '.db_error()."</p>\n");
		$NumRows = db_num_rows($Result);
		//echo "<p>DatabaseObj->CheckField() \$TableName: {$TableName}, \$FieldName: {$FieldName}, \$NumRows: {$NumRows}</p>";
		return (($NumRows > 0)?(true):(false));
	}
	
	
	// Goes through each table's structure to determine internal references to other table keys by "{$TableName}ID" and sorts them in $this->LnkList.
	private function LoadLnkList($Echo=0) {
		$TableList = $this->PriList;
		if ($Echo) { echo "<p>DatabaseObj->LoadLnkList() \$Echo: |{$Echo}|, \$TableList: |".HtmlArray($TableList)."|</p>\n"; }
		foreach($TableList as $TableName) {
			$FieldList = $this->ListFields("{$TableName}_pri");
			if ($Echo) { echo "<p>DatabaseObj->LoadLnkList() \$TableName: |{$TableName}|, \$FieldList: |".HtmlArray($FieldList)."|</p>\n"; }
			foreach($FieldList as $FieldName) {
				if (substr($FieldName, -2) == "ID" && $FieldName != "{$TableName}ID") {  // If this is an ID field, and not the table's primary key.
					$FieldMod = rtrim($FieldName, "ID");  // Fix. This may strip either 'I' or 'D' in cases where it is not an exact match.
					if (in_array($FieldMod, $TableList)) {
						if ($Echo) { echo "<p>DatabaseObj->LoadLnkList() Found \"{$FieldMod}\" in \$TableList</p>\n"; }
						$this->LnkList[$FieldMod][] = $TableName;
					} else {
						$Found = 0;
						foreach($TableList as $TableCheck) {
							if ($StrLoc = strpos($FieldName, "{$TableCheck}ID") !== FALSE) {  // To include compounded names (as in ParentItemID or BeforeImageID, etc.)
								if ($Echo) { echo "<p>DatabaseObj->LoadLnkList() strpos() found \$TableCheck: |{$TableCheck}ID| in \$FieldName: |{$FieldName}| at \$StrLoc: |{$StrLoc}|</p>\n"; }
								$this->LnkList[$TableCheck][] = $TableName;
								$Found = 1;
							}
						}
						if (!$Found) {
							if ($Echo) { echo "<p>DatabaseObj->LoadLnkList() Unrecognized \$FieldName: |\"{$FieldName}\"|</p>\n"; }
							$this->BadLnkList[$TableName][] = $FieldName;
							// Unrecognized ID Reference.
						}
					}
				}
			}
		}
		if ($Echo) { echo "<p>DatabaseObj->LoadLnkList() \$this->LnkList: |".HtmlArray($this->LnkList)."|</p>\n"; }
	}
	
	
	// Returns the name of the field in $SlotNum location in the table column order. Defaults to 0, the first item.
	private function FieldSlotName($TableName, $SlotNum=0) {
		$TableArray = $this->ListFields($TableName);
		return $TableArray[$SlotNum];
	}
	
	
	// Returns the $SlotNum respective segment of a '_' seperated table name. 1 corresponds to the first segment, 2 the second, 3 the third, etc. 0 Defaults to the last segment. 
	private function SplitTableName($TableName, $SlotNum=0) {
		$NameArray = explode('_', $TableName);
		//echo "<p>DatabaseObj->SplitTableName() \$TableName: |{$TableName}|, \$SlotNum: |{$SlotNum}|\$NameArray: |".HtmlArray($NameArray)."|</p>\n";
		if (($Count = count($NameArray)) <= 1) { return 0; }  // Not a valid format. // Fix? Return whole name?
		if (!$SlotNum) { $SlotNum = $Count; }
		$NameSplit = $NameArray[($SlotNum-1)];
		//echo "<p>DatabaseObj->SplitTableName() \$TableName: |{$TableName}|, \$SlotNum: |{$SlotNum}|, \$NameSplit: |{$NameSplit}|</p>\n";
		return $NameSplit;
	}
	
	
	// Returns the Primary Index Key for the table $ThisTable.
	function GetKey($TableName) {
		//echo "<p>db_obj.php DatabaseObj->GetKey() \$ThisTable: |{$ThisTable}|</p>\n"
		$Query = "SHOW INDEX FROM {$TableName}";
		if (!$Result = $this->db_query($Query, $this->SrvRsc)) { return; }
		while ($ThisRow = $this->db_fetch_row($Result)) {
			//echo "<p>db_obj.php DatabaseObj->GetKey() \$ThisRow: |".HtmlArray($ThisRow)."|</p>\n";
			if ($ThisRow[2] == 'PRIMARY') {
				return $ThisRow[4];
			}
		}
	}
	
	
	// Data Retrieval Functions:  /////////////////
	
	
	// Do NOT call directly; no security.  Used INTERNALLY to perform standard SQL queries on a DatabaseObj. 
	private function Query($Query=0, $Echo=0, $ArrayCtrl=0) {  //  Fix! Implememt restrictions and security.
		if (!$Query) { return; }
		$Query = $this->FormatQuery($Query, $Echo);
		if (!$Result = $this->$this->db_query($Query, $this->SrvRsc)) {
			if ($Echo) { echo "<p>DatabaseObj->Query() This Query Obtained no Result. Returning NULL.</p>\n"; }
			return;
		}
		if (!$ArrayCtrl) { $ArrayCtrl = MYSQL_ASSOC; }  // MYSQL_BOTH; MYSQL_NUM;
		while ($RowArray = $this->db_fetch_array($Result, $ArrayCtrl)) { $QueryArray[] = $RowArray; }
		if ($Echo) { echo "<p>DatabaseObj->Query() \$QueryArray: |".HtmlArray($QueryArray)."|</p>\n"; }
		return $QueryArray;
	}
	
	
	// Parses individual query strings for dangerous code, bad formatting, and makes preparations for contingencies where necessary.  If $Force is set, it will attempt to correct queries, otherwise, it will return 0 on errors. (Except for blank lines and comments, which are removed.)
	private function FormatQuery($Query=0, $Echo=0, $Force=0) {  // Fix. $Force is not functional yet.
		if (!$Query || !is_string($Query)) { return ''; }
		//foreach ( explode(";", $Query) as $SingleQuery) {  // Fix?  If we want functionality for handling multiple queries.
		//	$NewQuery .= FormatQuery($SingleQuery) . ';';
		//}
		$Query = trim($Query);
		if (!is_array($LineArray = explode("\n", $Query)) || !count($LineArray)) { 
			if ($Echo) { EchoV($LineArray, '<p><font color=\"orange\">No lines resulted from exploding Query into {$LineArray}.  Returning an empty string.</font></p>'); }
			return ''; 
		}
		foreach ($LineArray as $QueryLine) {
			if ((substr($QueryLine,0,1) != '#') && strlen(trim($QueryLine))) {   // To remove comments and blank lines from the sql.
				//if ($Echo) { echo "<p>DatabaseObj->FormatQuery() \$QueryLine: |{$QueryLine}|</p>\n"; }
				$NewLineArray[] = $QueryLine;
			} else { 
				//if ($Echo) { echo "<p>DatabaseObj->FormatQuery() Removed blank line or comment</p>\n"; } 
			}
		}
		if (!is_array($NewLineArray) || !count($NewLineArray)) { 
			if ($Echo) { echo "<p color=\"orange\">DatabaseObj->FormatQuery() Passed string containing only blank lines or comments.  Returning an empty string.</p>\n"; }
			return '';
		}
		//if ($Echo) { EchoV($NewLineArray, 'Completed parsing comments and blank lines. $NewLineArray:'); }
		if (!$QueryLine = $NewLineArray[0]) {
			if ($Echo) { echo "<p color=\"orange\">DatabaseObj->FormatQuery() Stripping comments and blank lines resulted in empty string.</p>\n"; }
			return '';
		}
			
		foreach ($NewLineArray as $QueryLine) {  // Re-assemble the query string from the array with new formatting:
			$NewQuery .= $QueryLine . "\n";
		}
		//if ($Echo) { echo "<p>DatabaseObj->FormatQuery() <b>Completely Re-formatted \$NewQuery:</b></br>|{$NewQuery}|</p>\n"; }
		return $NewQuery;
	}
	
	
	// Converts standard sql queries into components and calls internal db tools to carry out acceptable functionality.  Fix. Currently no functionality.
	private function ConvertQueryCall($Query) {
		// Fix. This higher-level abstraction should replace lower-level sql query interaction in all functions parsing and executing sql code.
	}
	
	
	// Screens general query strings for sql injection and other negative conditions.
	private function FilterSqlString($SqlString) {  // Fix!  This currently does essentially nothing.
		return mysql_real_escape_string($SqlString);  // Fix.
	}
	
	
	// Screens $FieldName strings for sql injection and other negative conditions.
	private function FilterFieldString($FieldName) {
		if ((count(explode(' ',$FieldName))>1) || (strpos($FieldName, '"'))) { return; }  // Fix! Quick hack to prevevent query segmentation. Security, Notification
		return $this->FilterSqlString($FieldName);
	}
	
	
	// Screens $OrderString for sql injection and other negative conditions. If $OrderString is a number, it will simply return null.
	private function FilterOrderString($OrderString) {
		if (!is_string($OrderString)) { return; }
		return $this->FilterSqlString($OrderString);
	}
	
	
	// Parses through the standard $ItemArray used in DatabaseObj functions to obtain query string, screening for anything that should be modified or eliminated.
	private function ParseItemArray($ItemArray, $OrderString=0, $TableName=0) {  // Fix. This got convoluted, but should separate out parsing without passing all these arguments.
		$OrderString = $this->FilterOrderString($OrderString);
		$Query = "";
		if (is_array($ItemArray)) {
			$Query .= " WHERE ";
			foreach($ItemArray as $FieldName=>$Value) {
				if ($And++) { $Query .= " AND "; }
				if (strpos($Value, '<') !== false) {  // If '<' Occurs.
					$CompChar = '<';
					if (strpos($Value, '=')) { $CompChar .= '='; }  // If actually <=
				} else if (strpos($Value, '>') !== false) {  // If '>' Occurs.
					$CompChar = '>';
					if (strpos($Value, '=')) { $CompChar .= '='; }  // If actually >=
				} else if(strpos($Value, '!=')) {
					$CompChar = '!=';					
				} else { 
					$CompChar = '=';
				}
				$Value = ltrim($Value, '!<>= ');
				$Query .= "\"{$FieldName}\" {$CompChar} '{$Value}'";
				$OrderBy .= "\"{$FieldName}\", ";
			}
			$OrderBy = ($OrderString && is_string($OrderString)) ? ($OrderString) : (rtrim($OrderBy, ', '));
		} else if ((is_string($ItemArray) or is_numeric($ItemArray)) && $ItemArray != '*' && $ItemArray != '') {
			if (!$ItemArray = $this->FilterFieldString($ItemArray)) { return; }  // Fix. Notification, Error handling.
			$ItemArray = $this->FilterFieldString($ItemArray);
			$FieldName = $this->GetKey($TableName);
			$Query .= " WHERE \"{$FieldName}\" = '{$ItemArray}'";
		} else {
			$OrderBy = ($OrderString && is_string($OrderString)) ? ('"'.$OrderString.'"') : ('');
		}
		if ($OrderBy) { $Query .= " ORDER BY {$OrderBy}"; }
		return $Query;
	}
	
	
	// Used to match queries with multiple parameters using a simple interface. $ItemArray is array('FieldName'=>'Value', 'FieldName'=>'Value') for all required fields in the query, returned ordered in the order they are passed. '<', '>', '<=', '>=' can be included at the beginning of the 'Value' portion of $ItemArray to do comparison operations. If other order is wanted, $OrderString is used directly as "ORDER BY {$OrderString}" and can include DESCENDING if desired; if -1 it will return a single row without the containing array, and any other number will return an array with that number of rows. $ItemArray can also be a single value to match with the primary key, or even null, 0, or '*' to return the entire table contents. $Echo can be used to echo the results of several aspects of the query as well as to echo $Echo itself to pass messages from calling functions. ArrayCtrl is used to specify the format of the returned array, as MYSQL_BOTH, MYSQL_NUM, or defaults to MYSQL_ASSOC. 
	function SelectQuery($TableName, $ItemArray=0, $OrderString=0, $Echo=0, $ArrayCtrl=0) {
		// if ($Echo) { echo "<p>DatabaseObj->SelectQuery() \$Echo: \$TableName: |{$TableName}|, \$ItemArray: |".HtmlArray($ItemArray)."|, \$OrderString: |{$OrderString}|, \$Echo: |{$Echo}|</p>\n"; }
		if (!$this->CheckTable($TableName, $Echo)) {
			if ($Echo) { echo "<p>DatabaseObj->SelectQuery() CheckTable() failed for \$TableName |{$TableName}|.</p>\n"; }
			return; 
		}
		$Query = "SELECT * FROM \"{$TableName}\"";
		$Query .= $this->ParseItemArray($ItemArray, $OrderString, $TableName);
		if (!$Result = $this->db_query($Query, $this->SrvRsc)) {
			if ($Echo) { EchoV(array('$Query'=>$Query), 'This Query Obtained no Result. Returning NULL.'); }
			//if ($Echo) { echo "<p>DatabaseObj->SelectQuery() This Query Obtained no Result. Returning NULL.</p>\n"; }
			return;
		}
		if (!$ArrayCtrl) { $ArrayCtrl = MYSQL_ASSOC; }  // MYSQL_BOTH; MYSQL_NUM;
		while ($RowArray = $this->db_fetch_array($Result, $ArrayCtrl)) {
			if ($NumberOrdered || ($OrderString && !is_string($OrderString) && is_numeric($OrderString))) {
				$NumberOrdered = true;
				// $Echo = "Set from SelectQuery()";  // Fix!
				// if ($Echo) { EchoV(array('$OrderString'=>$OrderString)); }
				if ($OrderString == -1) { return $RowArray; }
				if ($OrderString-- <= 0) { return $QueryArray; }
			}
			$QueryArray[] = $RowArray;
			
		}
		if ($Echo && ($Echo != 'Query')) { EchoV(array('$Query'=>$Query, '$QueryArray'=>$QueryArray)); }
		return ((is_array($QueryArray) && count($QueryArray)) ? ($QueryArray) : (0));
	}
	
	
	// Returns an array representing the field data for a single entry based on its _pri ID. $ArrayCtrl is used to specify the format of the returned array, as MYSQL_BOTH, MYSQL_NUM, or defaults to MYSQL_ASSOC.
	function IDQuery($TableName, $ThisID, $ArrayCtrl=0) {
		if (!$ThisID) { return; }
		$TableArray = $this->SelectQuery($TableName, $ThisID, null, null, $ArrayCtrl);
		//echo "<p>db_obj.php DatabaseObj->IDQuery() \$TableArray: |".HtmlArray($TableArray)."|</p>\n";
		if (is_array($TableArray)) { return $TableArray[0]; }
	}
	
	
	// Returns an array with field data for a single entry based on the value of a specified field. FieldName defaults to 'Name'.
	function ValueQuery($TableName, $Value, $FieldName=0, $Echo=0) {
		$FieldName = (($FieldName)?($FieldName):('Name'));
		return $this->SelectQuery($TableName, array($FieldName=>$Value), null, $Echo);
	}
	
	
	// Returns a single row matching characteristics passed in $ItemArray, and ordered using the order passed.
	function RowQuery($TableName, $ItemArray=0, $Echo=null) {
		return $this->SelectQuery($TableName, $ItemArray, -1, $Echo);
	}
	
	
	// Returns a single field value for the row matching characteristics passed in $ItemArray, prioritized using the order passed in ItemArray.
	function ItemQuery($TableName, $ItemArray=0, $FieldName=0, $ArrayCtrl=0) {
		$Row = $this->RowQuery($TableName, $ItemArray, $ArrayCtrl);
		if (is_array($Row) && array_key_exists($FieldName, $Row)) { return $Row[$FieldName]; }
	}
	
	
	// Returns 1 if an entry ID exists in $TableName, null otherwise. $ThisID can also be an ItemArray.
	function CheckQuery($TableName, $ThisID) {
		if (!$this->CheckTable($TableName)) { return; }  // Fix? May be redundant and too cumbersome for such a common query?
		if (is_array($ThisID)) {
			return (($this->RowQuery($TableName, $ItemArray)) ? (1) : (null));
		}
		if ($this->IDQuery($TableName, $ThisID)) { return 1; }
	}
	
	
	// Returns a 1D list of ID values returned from a SelectQuery() call.
	function ListQuery($TableName, $ItemArray=0, $OrderString=0, $Echo=0) {
		$QueryArray = $this->SelectQuery($TableName, $ItemArray, $OrderString, $Echo, MYSQL_NUM);
		foreach($QueryArray as $ThisItem) { $QueryList[] = $ThisItem[0]; }
		if ($Echo) { echo "<p>DatabaseObj->ListQuery() \$QueryList: |".HtmlArray($QueryList)."|</p>\n"; }
		return $QueryList;
	}
	
	
	// Returns a single ID value for a _pri item based on field value(s) passed. If more than one result, returns the first in order. Parameters function like those in SelectQuery.
	function IDFromValue($TableName, $ItemArray=0, $OrderString=0, $Echo=0) {
		//echo "<p>DatabaseObj.php DatabaseObj->IDFromValue() \$TableName: |{$TableName}|, \$ItemArray: |".HtmlArray($ItemArray)."|, \$OrderString: |{$OrderString}|</p>\n";
		if ($ItemArray && !is_array($ItemArray) && is_string($ItemArray)) { $ItemArray = array('Name'=>$ItemArray); }  // Fix? May be pointless to have this option?
		$TableArray = $this->SelectQuery($TableName, $ItemArray, $OrderString, $Echo);
		if (is_array($TableArray)) { $ItemArray = $TableArray[0]; } else { return; }
		if (is_array($ItemArray)) {
			$ThisKey = $this->GetKey($TableName);
			$ThisID = $ItemArray[$ThisKey];
			//echo "<p>DatabaseObj.php DatabaseObj->IDFromValue() \$ThisID: |{$ThisID}|</p>\n";
			return $ThisID;
		}
	}
	
	
	// Returns a single value for an item based on the _pri ID passed in reference to the given field name. $FieldName defaults to 'Name'.
	function ValueFromID($TableName, $ThisID, $FieldName=0) {
		if (!$FieldName) { $FieldName = 'Name'; }
		//echo "<p>DatabaseObj.php DatabaseObj->ValueFromID() \$TableName: |{$TableName}|, \$ThisID: |{$ThisID}|, \$FieldName: |{$FieldName}|</p>\n";
		//$TableArray = $this->QueryArray($TableName, $ThisID);
		$TableArray = $this->SelectQuery($TableName, $ThisID);
		if (is_array($TableArray)) { $ItemArray = $TableArray[0]; } else { return; }
		if (is_array($ItemArray)) {
			$Value = $ItemArray[$FieldName];
			//echo "<p>DatabaseObj.php DatabaseObj->ValueFromID() \$ThisID: |{$ThisID}|, {$FieldName}: |{$Value}|</p>\n";
			return $Value;
		}
	}
	
	
	// // Returns a single item based on the $FieldName and $Value.  If multiple items are returned, it will follow behavior based on $Multiple ('first', 'last', 'all', 'null', 'alert'), defaults to 'first'.
	// function ItemQuery($TableName, $ItemArray, $FieldName, $Multiple=0) {  // Fix! Identify original intention for this and fix it.
		// $TableArray = $this->SelectQuery($TableName, $ItemArray, $OrderString);
		// if (is_array($TableArray)) {
			// if (!$Multiple || $Multiple == 'first') {
				// $ItemArray = $TableArray[0];
				// return $ItemArray[$FieldName];  // Fix.  Error handling.
			// } else {
				// return $this->SelectQuery($TableName, $ItemArray, $OrderString);  // Fix. Verify this works.
			// }
		// } else { return; }
	// }
	
	
	// Returns the max value for $MaxField in $TableName, with conditionals in $ItemArray if desired. if ($FullReturn), it will return the entire row.
	function MaxQuery($TableName, $MaxField, $ItemArray=0, $FullReturn=0, $Echo=0) {
		$Query = "SELECT MAX({$MaxField}) AS {$MaxField} FROM {$TableName}";
		$Query .= ParseItemArray($ItemArray);
		if ($Echo) { echo "<p>DatabaseObj->MaxQuery() \$Query: |{$Query}|</p>\n"; }
		if (!$Result = $this->db_query($Query, $this->SrvRsc)) {
			if ($Echo) { echo "<p>DatabaseObj->MaxQuery() This Query Obtained no Result. Returning NULL.</p>\n"; }
			return;
		}
		if (!$ArrayCtrl) { $ArrayCtrl = MYSQL_ASSOC; }  // MYSQL_ASSOC; MYSQL_BOTH; MYSQL_NUM;
		while ($RowArray = $this->db_fetch_array($Result, $ArrayCtrl)) { $QueryArray[] = $RowArray; }
		if ($Echo) { echo "<p>DatabaseObj->MaxQuery() \$QueryArray: |".HtmlArray($QueryArray)."|</p>\n"; }	
		if (!$FullReturn) { $QueryArray = $QueryArray[0][$MaxField]; }
		return $QueryArray;
	}
	
	
	// Depreciated, use SelectQuery(). Performs simple queries in a single line. $KeyValue is the value checked for in $KeyField. If !$KeyField, it will use the primary field for the table. Returns a 2D array containing all rows returned using the specified query values. $OrderBy can be a string, sorting the results by the fields named in the string as a standard SQL argument for a query using ORDER BY. $ArrayCtrl is used to specify the format of the returned array, as MYSQL_BOTH, MYSQL_NUM, or defaults to MYSQL_ASSOC.
	function QueryArray($TableName, $KeyValue, $KeyField='', $OrderBy='', $ArrayCtrl=0) {
		//echo "<p>db_obj.php DatabaseObj->QueryArray() \$TableName: |{$TableName}|, \$KeyValue: |{$KeyValue}|, \$KeyField: |{$KeyField}|, \$OrderBy: |{$OrderBy}|</p>\n";
		if (!$this->CheckTable($TableName)) { return; }  // Fix? May be redundant.
		if (!$KeyField) { $KeyField = $this->GetKey($TableName); }
		$Query = "SELECT * FROM {$TableName} WHERE {$KeyField} = '{$KeyValue}'";
		if ($OrderBy) { $Query .= " ORDER BY {$OrderBy}"; }
		if (!$ArrayCtrl) { $ArrayCtrl = MYSQL_ASSOC; }  // MYSQL_BOTH; MYSQL_NUM;

		//echo "<p>db_obj.php DatabaseObj->QueryArray() \$Query: |{$Query}|</p>\n";
		$Result = $this->db_query($Query, $this->SrvRsc);
		while ($RowArray = $this->db_fetch_array($Result, $ArrayCtrl)) {
			$TableArray[] = $RowArray;
			// if (count($TableArray) >= $CutOff) { break; }  // Fix? May want this...
		}
		// if (count($TableArray) < 1) { $TableArray = array(0); }  // Fix? For array consistency?
		//echo "<p>db_obj.php DatabaseObj->QueryArray() \$TableArray: |".HtmlArray($TableArray)."|</p>\n";
		return $TableArray;
	}
	
	
	
	
	// Data Entry and Deletion Functions:  /////////////////
	
	
	// Used to insert data in an array into the specified table. It will create a new entry for the item and return its ID. If (!$ItemArray) a new empty entry will be created. If ($ItemArray) it will match the column values with the corresponding array keys, skipping those missing or that do not match up. Otherwise it will insert the data sequentially, starting with THE *FIRST FIELD FOLLOWING THE ID FIELD* for $ItemArray[0]. The first field column in a _pri table is reserved as its Primary Key field, and as such cannot be used to specify an insert ID nor used as a field value in $FieldArray. $RemainingArray should be passed by reference to retrieve the values not successfully inserted but instead is inserted into $this->RemainingArray referenced by $TableName.
	function InsertQuery($TableName, $ItemArray=0, $Echo=0) {  // Fix. $RemainingArray should be passed by reference to retrieve the remaining items from the calling function. Parse Error in pre 5.x php
		//if ($Echo) { EchoV(array('$TableName'=>$TableName, '$ItemArray'=>$ItemArray), 'New InsertQuery() called.'); } 
		if (!$this->CheckTable($TableName)) { return; }  // Fix? May be redundant.
		$ItemArray = $this->MatchFieldArray($TableName, $ItemArray, $Echo);
		foreach($ItemArray as $ThisField=>$ThisItem) { 
				$FieldString .= (($n++) ? (',') : ('')) . $ThisField;
				$ThisItem = $this->SafeInsertString($ThisField, $ThisItem);
				$DataString .= ($ThisItem == 'NOW()') ? (",{$ThisItem}") : (",'{$ThisItem}'");  // Fix this bullshit. problem passing quotes from a function.
				//echo "<p>DatabaseObj->InsertQuery() \$SafeInsertString: |{$SafeInsertString}|, \$DataString: |{$DataString}|</p>\n";
			}
		$DataString = ltrim($DataString, ',');
		//echo "<p>DatabaseObj.php InsertQuery()  \$ItemArray: " . HtmlArray($ItemArray) . "</p>\n";
		$Query = "INSERT INTO {$TableName} ({$FieldString}) VALUES ({$DataString})"; 
		if ($Echo) { echo "<p>DatabaseObj->InsertQuery() \$Query: |{$Query}|</p>\n"; }
		if ($this->DbType=='postgres') {
			$Query .= 'RETURNING '.$this->GetKey($TableName);
			$NewID = $this->db_query($Query, $this->SrvRsc) or die ('DatabaseObj->InsertQuery() Unable to add entry for Query ('.$Query.'): ' . db_error());  //  . EchoV());
		} else if ($this->DbType=='mysql') {
			$Result = $this->db_query($Query, $this->SrvRsc) or die ('DatabaseObj->InsertQuery() Unable to add entry for Query ('.$Query.'): ' . db_error());  //  . EchoV());
			$NewID = mysql_insert_id();
		}
		if ($Echo) { echo "<p>DatabaseObj->InsertQuery() \$NewID: |{$NewID}|</p>\n"; }
		return $NewID;
	}
	
	
	// Cleans up string data for safe insertion into database.
	function SafeInsertString($ThisField, $ThisItem) {
		if (!$ThisItem) { return ''; }
		if (is_string($ThisItem)) { 
			if(get_magic_quotes_gpc()) { $ThisItem = stripslashes($ThisItem); }
			$ThisItem = mysql_real_escape_string($ThisItem); 
		}
		return $ThisItem;
	}
	
	
	// Used primarily in InsertQuery(), Generates an associative array containing an ordered list of all field names in a table matched up with those values that correspond with those passed in $ItemArray. $ItemArray is an associative list of field names with their desired values, or passed as a flat array, inserting the data sequentially, starting with THE *FIRST FIELD FOLLOWING THE ID FIELD*
	function MatchFieldArray($TableName, $ItemArray, $Echo=0) {  // Fix. $RemainingArray should be passed by reference to retrieve the remaining items from the calling function. Parse Error in pre 5.x php
		if (!$TableArray = $this->ListFields($TableName)) { return; }
		$RemainingArray = array();
		if (!is_array($ItemArray)) { $ItemArray = array(); } 
		//if ($Echo) { echo "<p>DatabaseObj->MatchFieldArray() \$TableArray: |".HtmlArray($TableArray)."| <br>\n \$ItemArray: |".HtmlArray($ItemArray)."|</p>\n"; }
		if (CheckAssocArray($ItemArray)) {  // If using an associative array
			//if ($Echo) { echo "<p>DatabaseObj->MatchFieldArray() \$ItemArray is an associative array, matching keys to field names for value association.</p>\n"; }
			foreach($ItemArray as $ThisField=>$ThisValue) {
				if (in_array($ThisField, $TableArray)) {  // (array_key_exists($ThisField, $TableArray)) {
					$MatchArray[$ThisField] = $ItemArray[$ThisField];
				} else {
					$RemainingArray[$ThisField] = $ItemArray[$ThisField];
				}
			}      
			$this->ReturnUnMatchArray($RemainingArray, $TableName);      
		} else {  // If NOT using an associative list. Will line up all values in $ItemArray with available colums in $TableArray, starting AFTER the initial key field. If there are fewer items in $ItemArray, the remaining values will be NULL. If there are too many it will cut them off.  // Fix? May want warnings, different behavior?
			//if ($Echo) { echo "<p>DatabaseObj->MatchFieldArray() \$ItemArray is a flat array, lining up items sequentially.</p>\n"; }
			$ListNum = -1;
			foreach($TableArray as $ThisField) {
				$MatchArray[$ThisField] = ($ThisItem = $ItemArray[$ListNum++]) ? ($ThisItem) : (NULL);
				//if ($Echo) { echo "<p>DatabaseObj->MatchFieldArray() \$ListNum: |{$ListNum}|, \$ThisItem: |{$ThisItem}|</p>\n"; }
			}
		}
		if ($Echo) { EchoV(array('$TableName'=>$TableName, 'Original $ItemArray'=>$ItemArray, '$MatchArray'=>$MatchArray, '$RemainingArray'=>$RemainingArray), 'Called from new InsertQuery() call'); } 
		//if ($Echo) { echo "<p>DatabaseObj->MatchFieldArray() \$MatchArray: |".HtmlArray($MatchArray)."| <br>\n \$RemainingArray: |".HtmlArray($RemainingArray)."|</p>\n"; }
		return $MatchArray;  
	}
	
	
	// Sends the remaining array from MatchFieldArray() to in this DatabaseObj for reference.
	function ReturnUnMatchArray($RemainingArray, $TableName) {
		if (is_array($RemainingArray) && count($RemainingArray)) {
			$this->RemainingArray[$TableName] = $RemainingArray;	
		} else {
			if ($this->RemainingArray[$TableName]) { unset($this->RemainingArray[$TableName]); }  // Fix?
		}
	}
	
	
	// Updates an existing _pri entry in $TableName. $ItemArray is an associative array in the format array("FieldName"=>$Item, ).
	function UpdateQuery($TableName, $ThisID, $ItemArray, $Echo=0) {
		if ($Echo) { echo "<p>DatabaseObj->UpdateQuery() \$Echo: |{$Echo}|, \$TableName: |{$TableName}|, \$ThisID: |{$ThisID}|, \$ItemArray: |".HtmlArray($ItemArray)."|</p>\n"; }
		if (!$ThisID || !$this->CheckQuery($TableName, $ThisID)) {
			if ($Echo) { echo "<p>DatabaseObj->UpdateQuery() \$ThisID: |{$ThisID}| Does Not Exist in \$TableName: |{$TableName}|</p>\n"; }
			return; 
		}  
		$TableArray = $this->ListFields($TableName);
		if ($Echo) { echo "<p>DatabaseObj->UpdateQuery() \$TableArray: |".HtmlArray($TableArray)."|</p>\n"; }
		$Query = "UPDATE {$TableName} SET"; 
		foreach($ItemArray as $FieldName=>$ThisItem) {
			if (in_array($FieldName, $TableArray)) {  // if (array_key_exists($FieldName, $TableArray)) {
				if (!is_null($ThisItem)) { $Query .= " {$FieldName}='{$ThisItem}',"; }
			}
		}
		$Query = rtrim($Query, ',');
		$KeyField = $this->GetKey($TableName);
		$Query .= " WHERE {$KeyField}={$ThisID}";
		if ($Echo) { echo "<p>DatabaseObj->UpdateQuery() \$Query: |{$Query}|</p>\n"; }
		$Result = $this->db_query($Query, $this->SrvRsc);
		if ($Echo && !$Result) { echo "<p>DatabaseObj->UpdateQuery() Not Updated! \$Result: |{$Result}|</p>\n"; }
		return ($Result) ? (1) : (0);
	}
	
	
	// Deletes a record from $TableName based on its primary ID, $ItemsOrID. $ItemsOrID can also be an associative array working like $ItemArray in $this->SelectQuery(). $Limit restricts the number of items deleted and $OrderBy works identically to $OrderBy in $this->SelectQuery(). Fix? May be better to require $this->SelectQuery() call and delete individually?
	function DeleteQuery($TableName, $ItemsOrID, $Limit=0, $OrderBy=0, $Echo=0) {
		if ($Echo) { echo "<p>DatabaseObj->DeleteQuery() \$Echo: |{$Echo}|, \$TableName: |{$TableName}|, \$ItemsOrID: |{$ItemsOrID}|, \$Limit: |{$Limit}|, \$OrderBy: |{$OrderBy}|</p>\n"; }
		if (!$ItemsOrID || !$this->CheckQuery($TableName, $ItemsOrID)) {
			if ($Echo) { echo "<p>DatabaseObj->DeleteQuery() \$ThisID: |{$ThisID}| Does Not Exist in \$TableName: |{$TableName}|</p>\n"; }
			return; 
		}
		if (is_array($ItemsOrID)) {
			// Fix... Include conditional field behavior here for multiple item deletion. Fix? May be better to require $this->SelectQuery() call and delete individually?
			if ($OrderBy) { $Query .= " ORDER BY {$OrderBy}"; }
			if ($Limit) { $Query .= " LIMIT {$Limit}"; }
			return;  // Fix.
		} else if (is_numeric($ItemsOrID)) {
			$KeyField = $this->GetKey($TableName);
			$Query = "DELETE FROM {$TableName} WHERE {$KeyField} = '{$ItemsOrID}'";
		}
		if ($Echo) { echo "<p>DatabaseObj->DeleteQuery() \$Query: |{$Query}|</p>\n"; }
		//$Result = $this->db_query($Query, $this->SrvRsc);  // Fix... For multiple entry deletion.
		if ($Echo && !$Result) { echo "<p>DatabaseObj->DeleteQuery() Not Deleted! \$Result: |{$Result}|</p>\n"; }
		return ($Result) ? (1) : (0);
	}

	
	// Ref-based Functions:  /////////////////
	
	
	// Returns a 2D array containing all entries matching $PriID or/and $RefID. If either are null, will return all entries matching the other. Uses the standard _ref table format. If both are null, it will return null. (Fix?)
	function GetRefArray($TableName, $PriID=0, $RefID=0, $Echo=0) {
		if (!$this->CheckRefTable($TableName)) { return; }  // Fix? May be too bulky for high volume of calls. Place responsibility on calling function?
		if (!$PriID && !$RefID) { return; }  // Fix?
		if ($PriID) { $ItemArray[$this->FieldSlotName($TableName, 1)] = $PriID; }
		if ($RefID) { $ItemArray[$this->FieldSlotName($TableName, 2)] = $RefID; }
		if ($Echo) { $Echo .= ', Called Using GetRefArray()'; }
		$RefArray = $this->SelectQuery($TableName, $ItemArray, 'Value', $Echo);
		if ($Echo) { echo "<p>DatabaseObj->GetRefArray() \$RefArray: |".HtmlArray($RefArray)."|</p>\n"; }
		return $RefArray;
	}
	
	
	// Returns a 1D array of all branch IDs referenced to by $PriID in $TableName. Uses the standard _ref table format.
	function RefRefList($TableName, $PriID, $Echo=0) {
		if (!$RefArray = $this->GetRefArray($TableName, $PriID, 0)) { if ($Echo) { EchoV(array('$TableName'=>$TableName, '$PriID'=>$PriID), 'GetRefArray() returned no results.'); } return; }
		$RefSlot = $this->FieldSlotName($TableName, 2);
		foreach($RefArray as $ThisRef) { $RefList[] = $ThisRef[$RefSlot]; }
		if ($Echo) { echo "<p>DatabaseObj->RefRefList() \$TableName: |{$TableName}|, \$PriID: |{$PriID}|, \$Echo: |{$Echo}|, \$RefList: |".HtmlArray($RefList)."|</p>\n"; }
		return $RefList;
	}
	
	
	// Returns a 1D array of all nexus IDs referenced to by $RefID in $TableName. Uses the standard _ref table format.
	function RefPriList($TableName, $RefID, $Echo=0) {
		if (!$RefArray = $this->GetRefArray($TableName, 0, $RefID, $Echo)) { if ($Echo) { EchoV(array('$TableName'=>$TableName, '$RefID'=>$RefID), 'GetRefArray() returned no results.'); } return; }
		$RefSlot = $this->FieldSlotName($TableName, 1);
		foreach($RefArray as $ThisRef) { $RefList[] = $ThisRef[$RefSlot]; }
		if ($Echo) { echo "<p>DatabaseObj->RefPriList() \$TableName: |{$TableName}|, \$PriID: |{$PriID}|, \$Echo: |{$Echo}|, \$RefList: |".HtmlArray($RefList)."|</p>\n"; }
		return $RefList;
	}
	
	
	// Returns a 2D array containing the all _pri entries referenced to by $PriID in $TableName. Uses the standard _ref table format.
	function RefRefQuery($TableName, $PriID, $Echo=0) {
		if (!$RefList = $this->RefRefList($TableName, $PriID, $Echo)) { if ($Echo) { EchoV(array('$TableName'=>$TableName, '$PriID'=>$PriID), 'RefRefList() returned no results.'); } return; };
		$RefName = $this->SplitTableName($TableName, 2);
		foreach($RefList as $ThisID) {
			$RefArray[] = $this->IDQuery("{$RefName}_pri", $ThisID);
		}
		if ($Echo) { echo "<p>DatabaseObj->RefRefQuery() \$TableName: |{$TableName}|, \$PriID: |{$PriID}|, \$Echo: |{$Echo}|, \$RefArray: |".HtmlArray($RefArray)."|</p>\n"; }
		return $RefArray;
	}
	
	
	// Gets the RefEntry field name value for a _ref table. (Meaning the first field in a _ref structured table, the unique key and incremented field for the table.).
	function GetRefEntry($ThisTable) {
		$Query = "DESCRIBE {$ThisTable}";
		if (!$Result = $this->db_query($Query, $this->SrvRsc)) { return; }
		while ($ThisRow = $this->db_fetch_row($Result)) { return $ThisRow[0]; }
		echo "<p>No Reference ID Field Found for {$ThisTable}</p>\n";  // Fix? Just delete this line?
	}
	
	
	// Creates a _ref entry in $TableName.
	function AddRef($TableName, $PriID=0, $RefID=0, $Value=0, $Echo=0) {
		// Fix.  Add checking for existing refs and build logic for this.
		return $this->InsertQuery($TableName, array($PriID, $RefID, $Value), $Echo);
	}
	
	
	// Table Manipulation Functions:  /////////////////
	
	
	// Drops one or more tables from this db. $TableNames can be a space separated string or an array of strings, if '*' all tables will be dropped.  Be careful with this function!
	function DropTable($TableNames, $Echo=0) {  // Fix! Need to decide behavior for security, permissions, backup, protection, etc.
		// Fix!!!  Security and backup!
		if ($TableNames == '*') {
			$TableNames = $this->ListTables();
		} else if (is_string($TableNames)) { 
			$TableNames = explode(' ', $TableNames); 
		}
		//EchoV($TableNames, '$TableNames'); 
		if (is_array($TableNames) && ($DropCount = count($TableNames))) {
			$TableString = '';
			foreach($TableNames as $Table) { $TableString .= "`{$Table}`, "; }
			$TableString = rtrim($TableString, ', ');  //  . ';';
			$Multi = (($DropCount > 1)?('s'):(''));
		} else {
			if ($Echo) { echo "<p>DatabaseObj->DropTable() <font color=red>Unable to drop tables based on \$TableNames: '{CheapHtmlArray($TableNames)}'| .</font></p>\n"; }
			return;
		} 
		/*  // Fix?  This no longer necessary due to 'IF EXISTS' but may want some kind of notification?
		if ($Echo) { echo "<p>DatabaseObj->DropTable() <font color=orange>Deleting table '{$TableNames}' from db '{$this->DbName}' on server '{$this->DbHost}'.</font></p>\n"; }
		if (!$this->CheckTable($TableNames)) { 
			if ($Echo) { echo "<p>DatabaseObj->DropTable() No table found named '{$TableNames}'.</p>\n"; }
			return;
		}*/
		$Query = "DROP TABLE IF EXISTS {$TableString}";
		if ($Echo) { echo "<p>DatabaseObj->DropTable() \$Query: '{$Query}'.</p>\n"; }
		$Result = $this->db_query($Query, $this->SrvRsc);
		foreach($TableNames as $Table) {  // Unfortunately this seems necessary as none of the built-in functions that I could find return a table drop count.
			if (!$this->CheckTable($Table)) {
				$NumDropped++; 
			} else {
				$MissedString .= (($MissedString)?(", {$Table}"):("{$Table}"));
			}
		}
		if ($Echo) {
			EchoV(array('Result'=>$Result, 'NumDropped'=>$NumDropped));  
			if (!$NumDropped) {
				echo "<p>DatabaseObj->DropTable() Error Dropping table{$Multi} '{$TableString}'! Error: <font color=red>|".db_error($this->SrvRsc)."|</font></p>\n";
			} else if ($NumDropped != $DropCount) {
				echo "<p>DatabaseObj->DropTable() Error Dropping some tables: |{$MissedString}| ({$NumDropped} out of {$DropCount}) from intended |{$TableString}|. Error: <font color=red>|".db_error($this->SrvRsc)."|</font></p>\n";
			} else {
				echo "<p>DatabaseObj->DropTable() <font color=green>Successfully Dropped table{$Multi} |{$TableString}|</font>.  (\$NumDropped: {$NumDropped} out of {$DropCount}).</p>\n";
			}
		}
		return $NumDropped;
	}
	
	
	// SQL Import and Export, Table and Database Add/Drop Functions:  /////////////////
	
	
	// Runs queries from a .sql file $PathAndFile.  Returns 1 on success, or 0 if errors were encountered. // Fix!  Need to determine security, behavior, error handling, etc.
	function ImportSQL($PathAndFile, $Echo=0, $Force=0) {
		if (!$PathAndFile) { $PathAndFile = PageDir().'/db/'.$PathAndFile; }
		if ($Echo) { echo "<p>DatabaseObj->ImportSQL() Opening file '{$PathAndFile}'...</p>\n"; }
		if (!file_exists($PathAndFile)) {
			if ($Echo) { echo "<p>DatabaseObj->ImportSQL() File {$PathAndFile} does not exist.</p>\n"; }
			return; 
		}
		$FileHandle = fopen($PathAndFile, 'r', 1);
		if (!$FileHandle) { 
			if ($Echo) { echo "<p>DatabaseObj->ImportSQL() Unable to open file {$PathAndFile}.</p>\n"; }
			return; 
		}
		//	$Results .= "\$FileHandle: |{$FileHandle}|<br>\n";
		if ($Echo) { echo "<p>DatabaseObj->ImportSQL() Reading file {$PathAndFile}...</p>\n"; }
		$QueryString = fread($FileHandle, filesize($PathAndFile));
		if (!$QueryString || !is_string($QueryString)) { 
			if ($Echo) { echo "<p>DatabaseObj->ImportSQL() Unable to read file {$PathAndFile}.</p>\n"; }
			return; 
		}
		if ($Echo) { echo "<p>DatabaseObj->ImportSQL() File {$PathAndFile} read successfully.  Closing file.</p>\n"; }
		fclose($FileHandle);
		//if ($Echo) { echo "<pre>{$QueryString}</pre>\n"; }
		return $this->ParseSqlString($QueryString, $Echo, $Force);
	}
	
	
	// Parses through an SQL string and calls the queries for the database.
	function ParseSqlString($QueryString, $Echo=0, $Force=0) {
		if ($Echo) { echo "<p>DatabaseObj->ParseSqlString() Exploding File QueryString...</p>\n"; }
		foreach ( explode(";", "$QueryString") as $QueryLine) {
			//if ($Echo) { EchoV($QueryLine, 'Originally passed $QueryLine:'); }
			if ($Query = $this->FormatQuery($QueryLine, $Echo)) {
				//if ($Echo) { echo "<p>DatabaseObj->ParseSqlString() Re-formatted \$Query:</br>|<b>{$Query}</b>|</p>\n"; }
				if ($this->CommandChecks(($Query.=';'), $Echo, $Force)) {
					if (!$Result = $this->db_query($Query, $this->SrvRsc)) { 
						$ErrorCount++;
						if ($Echo) { echo "<font color=red>Error: ".db_error($this->SrvRsc)."<br>\n"; }
					} else {
						if ($Echo) { echo "<font color=green>Successfully executed SQL query.<br>\n"; }
						//$this->QueryFollowup($Query);  // Handle special-case administration for this query.
					}
					if ($Echo) { echo "Query: |{$Query}|</font><br>\n<br>\n"; }
				}else {
					if ($Echo) { echo "<font color=red>ParseSqlString() was passed null from CommandChecks() using query: |{$Query}|.</font><br>\n"; } // Fix?  Do anything here?
				}
			} else {
				//if ($Echo) { echo "<p>DatabaseObj->ParseSqlString() <b><font color=orange>Formatting \$Query resulted in blank string! Skipping Query.</font></b></p>\n"; }
			}
		}
		if ($Echo) { 
			echo "<p>DatabaseObj->ParseSqlString() Completed SQL execution.</p>\n";
			if ($ErrorCount) {
				echo "<p>But resulted in {$ErrorCount} error" . (($ErrorCount>1)?('s'):('')) . ':</p>\n';
				echo "<p>Check your sql code.</p><br>\n";
			} else {
				echo "<p><font color=green>With no errors.</font></p><br>\n";
			}
		}
		return ($ErrorCount)?(0):(1);
	}
	
	
	// Used to take precautionary measures or make preparations in specific commands. Returns 1 or 0.  If $Force is set, it will attempt to take necessary steps to prepare for successful query.
	function CommandChecks($Query, $Echo=0, $Force=0) {
		$QueryType = substr($Query, 0, ($SpaceLoc1 = strpos($Query , ' ')));
		//if ($Echo) { echo "<p>DatabaseObj->CommandChecks() \$QueryType: |{$QueryType}|.</p>\n"; }
		if ($QueryType == 'CREATE') {
			$CreateType = trim(substr($Query, $SpaceLoc1, (($SpaceLoc2 = strpos($Query , ' ', $SpaceLoc1+1))-$SpaceLoc1)));
			$QuerySubject = trim(substr($Query, $SpaceLoc2, (strpos($Query , ' ', $SpaceLoc2+1)-$SpaceLoc2)), ' `');
			//if ($Echo) { echo "<p>DatabaseObj->CommandChecks() \$CreateType: |{$CreateType}|, \$QuerySubject: |{$QuerySubject}|.</p>\n"; }
			if ($CreateType == 'TABLE') {
				if ($this->CheckTable($QuerySubject)) {
					if ($Echo) { echo "<p color=\"red\">DatabaseObj->CommandChecks() Table |{$QuerySubject}| already exists.</p>\n"; }
					if ($Force) {
						if ($Echo) { echo "<p color=\"red\">DatabaseObj->CommandChecks() \$Force is set so will delete table |{$QuerySubject}|.</p>\n"; }
						return $this->DropTable($QuerySubject, $Echo);
					} else {
						if ($Echo) { echo "<p>DatabaseObj->CommandChecks() \$Force is null so we are skipping this command.</p>\n"; }
					}
				} else {
					return 1;
				}
			} else if ($CreateType == 'DB') {
				if ($Echo) { echo "<p><font color=red>DatabaseObj->CommandChecks() Cannot create a DB from here.</font></p>\n"; }  // Fix.  Should integrate some mechanism for accomplishing this with sufficient privilages.
			} else {
				if ($Echo) { echo "<p><font color=red>DatabaseObj->CommandChecks() Unrecognized CREATE \$QueryType: |{$QueryType} {$CreateType}|</font></p>\n"; }
			}
		} else if ($QueryType == 'INSERT') {
			$TableName = trim(substr($Query, ($SpaceLoc2 = strpos($Query , ' ', $SpaceLoc1+1)), (strpos($Query , ' ', $SpaceLoc2+1)-$SpaceLoc2)), ' `');
			if (!$this->CheckTable($TableName)) { 
				if ($Echo) { echo "<p><font color=red>DatabaseObj->CommandChecks() Cannot INSERT data because table {$SubjectTable} does not exist.</font></p>\n"; }
				return 0; 
			}
			$StructArray = explode(',', ($StructString = BetweenString($Query, '(', ')', $SpaceLoc1)));
			foreach($StructArray as $Field) {
				if (!$this->CheckField($TableName, trim($Field))) { 
					if ($Echo) { echo "<p><font color=red>DatabaseObj->CommandChecks() Cannot INSERT data because field '{$Field}' does not exist within table '{$SubjectTable}'.</font></p>\n"; }
					return 0;
				}
			}
			$ValuesString = '(' . BetweenString($Query, '(', ';', strpos($Query, ')'));  // Fix? May want more reliable method for this.
			//if ($Echo) { echo "<p>DatabaseObj->CommandChecks() \$TableName: |{$TableName}|, \$StructString: |{$StructString}|, \$ValuesString: |{$ValuesString}|.</p>\n"; }
			//echo "<p>\$ValuesString: {$ValuesString}</p>";  // Fix!
			do {
				if ($ValueRow = BetweenString($ValuesString, '(', ')', $NextStart++)) {
					$ValueArray[] = $ValueRow;
				}
				//echo "\$ValueRow: {$ValueRow}, \$NextStart: {$NextStart}<br>";  // Fix!
			} while ($NextStart = strpos($ValuesString, ')', $NextStart));
			//EchoV($ValueArray, 'ValueArray');  // Fix!
			if (!is_array($ValueArray) || !count($ValueArray)) {
				if ($Echo) { echo "<p><font color=red>DatabaseObj->CommandChecks() Cannot INSERT data because no VALUES were passed.</font></p>\n"; }
				return 0;
			}
			foreach($ValueArray as $ValueRow) {
				$RowArray = explode("', '", $ValueRow);  // Fix.  Make sure this addresses possible ' and , inclusion within the importing text.
				if (count($StructArray) != count($RowArray)) {
					if ($Echo) { 
						echo "<p><font color=red>DatabaseObj->CommandChecks() Cannot INSERT data because the VALUES count does not match the structure field count.</font></p>\n"; 
						EchoV(array('TableName'=>$TableName, 'StructArray'=>$StructArray, 'RowArray'=>$RowArray));
					}
					return 0;
				}
			}
			return 1;  // If it makes it through all of these checks.
		} else if ($QueryType == 'COMMAND') {
			// Fix. Example.
		} else {
			if ($Echo) { echo "<p><font color=red>DatabaseObj->CommandChecks() Unrecognized \$QueryType: |{$QueryType}|</font></p>\n"; }
		}
		return 0;
	}
	
	
	// Table Creation Functions:  /////////////////
	
	
	// Wrapper function to create a new table named $TableName. $FieldArray structures the table as array("$FieldName"=>"$FieldInfoString", ...) where $FieldInfoString can be either a literal string to be passed into the sql command or can be a keyword to be referenced by TableFieldTranslate() below.  The table's primary key will be generated automatically and will auto-increment following the protocol for all tables in this db, so that field should be left out of the specification, as should 'Name', 'Description', and 'Value' which are ubiquitous in this standard. Default Engine Type is InnoDB unless $EngineType is specified.
	function CreateTable($TableName, $FieldArray=0, $EngineType=0, $Force=0, $Echo=1) { // Fix. echo.
		if (!$this->CheckUserAccess()) { return; }
		if (!$TableName || !is_string($TableName)) {
			if ($Echo) { echo "<p>DatabaseObj->CreateTable() \$TableName |{$TableName}| is NULL or an illegal format. Returning NULL.</p>"; }
			return;
		} else if ($this->CheckTable($TableName)) {  // Handle situation for table already existing.
			if ($Echo) { echo "<p>DatabaseObj->CreateTable() \$TableName |{$TableName}| already exists.</p>"; }
			if ($Force) {
				if ($Echo) { echo "<p>DatabaseObj->CreateTable() \$Force is set. Dropping table {$TableName}.</p>"; }
				$this->DropTable($TableName, $Echo); 
			} else {
				if ($Echo) { echo "<p>DatabaseObj->CreateTable() \$Force is not set so returning without taking any action.</p>"; }
				return;
			}
		}
		if (!$NameSegs = ((is_string($TableName))?(count($NameArray = explode('_', $TableName))):(0))) {
			if ($Echo) { echo "<p>DatabaseObj->CreateTable() Illegal \$TableName format: |{$TableName}|. Returning NULL.</p>"; }
			return;  // Fix. Error handling
		} else if ($NameSegs == 1) {  // This table is named literally, without using '_' to segment for the naming convention used in this db.
			if ($Echo) { echo "<p>DatabaseObj->CreateTable() Invalid \$TableName format: |{$TableName}|.  Defaulting to new primary table '{$TableName}_pri'.</p>"; }
			$TableClass = 'pri';  // Fix? May want to make this illegal here.
		} else {
			$TableClass = $NameArray[NameSegs-1];
			if ($Echo) { echo "<p>DatabaseObj->CreateTable() \$TableName: |{$TableName}|. Creating new table of type '_{$TableClass}'.</p>"; }
		}
		if (!$EngineType) { $EngineType = 'InnoDB'; }  // 'InnoDB';  'MyISAM';
		$this->SqlOptions = ") TYPE=InnoDB ";
		
		$CreateFunc = ucfirst($TableClass).'TableCreate';
		if (function_exists($CreateFunc)) {
			$this->SqlQue = array();  // Empty the SqlQue. 
			if ($Echo) { echo "<p>DatabaseObj->CreateTable() Function |{$CreateFunc}()| exists. Calling variable function to complete table creation..</p>"; }
			if ($Result = $CreateFunc($TableName, $FieldArray, $Echo)) {  // Call the specialized table creation function.
				// Fix. Handle success notification etc.
				return $Result;  
			} else {
				if ($Echo) { echo "<p>DatabaseObj->CreateTable() There was an error during |{$CreateFunc}()|. \$Result: |{$Result}|</p>"; }
				// Fix. Handle error in table creation.
			}
		} else {
			if ($Echo) { echo "<p>DatabaseObj->CreateTable() Function |{$CreateFunc}()| does NOT exist. Returning NULL.</p>"; }
			// Fix. Handle bad function name.
		}
	}
	
	
	// For use in CreateTable() and table-specific fuctions. Auto-populates $FieldArray for values representing keywords.
	private function PopulateFieldArray($FieldArray) {
		if (!is_array($FieldArray) || !count($FieldArray)) {
			return;  // Fix.  Error handling and notification.
		}
		foreach($FieldArray as $FieldName=>$FieldValue) { 
			if ($FieldValue) {  // If specifying a field value
				if ($FieldSql = $this->TableFieldTranslate($FieldValue, $FieldName)) {  // It can either be named and using a keyword
					$CreateArray[$FieldName] = $FieldSql;
				} else if ($FieldSql = $this->CheckFieldSql($FieldValue)) {  // Or named with specific table formatting.
					$CreateArray[$FieldName] = $FieldSql;
				} else {
					$BadFields[$FieldName] = $FieldValue;  // Fix. Error handling and notification.
				}
			} else if ($FieldSql = $this->TableFieldTranslate($FieldName)) {  // If no field value, it must be a keyword.
				$CreateArray[$FieldName] = $FieldSql;
			} else {
				$BadFields[] = $FieldName;  // Fix. Error handling and notification.
			}
		}
		if ($BadFields) {
			// Fix. Error handling and notification.
		}
		return $CreateArray;
	}
	
	
	// Translates keywords for field values into strings containing field structure code with default values for items represented by those keywords. $Value can be used to specify aspects of the various types of fields designated with keywords. Returns the updated Sql string value adds any modifier strings to $this->SqlQue[] resulting from the update to append to the end of the query if applicable, or null on failure.
	private function TableFieldTranslate($KeyWord=0, $Value=0) {
		if ($KeyWord == 'AceID') {
			$NumChars = '128';  // Fix? Set this universal default elsewhere...
			$SqlString = "`AceID` varchar({$NumChars}) NOT NULL auto_increment";  // Fix! Handling auto-generated AceIDs.
			$this->SqlQue[] = "PRIMARY KEY (`AceID`)";  // Fix? Settle on naming format...
			$this->SqlOptions .= "AUTO_INCREMENT=1 ";  // Fix? Determine standards for this.
		} else if ($KeyWord == 'SqlID') {
			$NumBits = '10';  // Fix? Set this universal default elsewhere...
			$SqlString = "`{$Value}ID` int({$NumBits}) unsigned NOT NULL auto_increment";
			$this->SqlQue[] = "PRIMARY KEY (`{$Value}ID`)";  // Fix? Settle on naming format...
			$this->SqlOptions .= "AUTO_INCREMENT=1 ";
		} else if ($KeyWord == 'Name') {
			$NumChars = '50';  // Fix? Set this default elsewhere...
			$SqlString = "`Name` varchar({$NumChars}) NOT NULL default ''";
		} else if ($KeyWord == 'Description') {
			$SqlString = "`Description` text NOT NULL default ''";
		} else if ($KeyWord == 'Value') {
			$SqlString = "`Value` float NOT NULL default '0'";
		} else if ($KeyWord == 'Text') {
			if (!$Value) { $Value = "Text"; }  // Fix! Default field name, auto-incrementing etc.
			$SqlString = "`{$Value}` text NOT NULL default ''";
		} else if ($KeyWord == 'VarChar' || $KeyWord == 'Varchar') {
			$NumChars = '50';  // Fix? Set this default elsewhere...
			if (!$Value) { $Value = "VarChar"; }  // Fix! Default field name, auto-incrementing etc.
			$SqlString = "`Name` varchar({$NumChars}) NOT NULL default ''";
		} else if ($KeyWord == 'Value') {
			$SqlString = "";
		} else if ($KeyWord == 'Value') {
			$SqlString = "";
		} else {
			return;  // Fix.  Error handling and notification.
		}
		return $SqlString;
	}
	
	
	// Checks for valid SQL structure in field creation strings and returns acceptable code or null on failure.  
	function CheckFieldSql($FieldSql) {
		return $FieldSql;  // Fix!  Currently does nothing.
	}
	
	
	// Do not call directly! Use CreateTable(). The internal function for creating '_pri' tables under the ace db format. $NameArray contains a single lowercase name value which will automatically be converted into the AceID and appended with _pri as the new table name.
	private function PriTableCreate($NameArray, $FieldArray=0, $Echo=0) {
		if (!is_array($NameArray) || (count($NameArray) != 1)) {
			return;  // Fix.  Error handling and notification.
		}
		if (!$FieldArray || !is_array($FieldArray)) { $FieldArray = array(); }
		$NameRoot = $NameArray[0];
		$BaseArray = array(($NameRoot.'ID')=>'AceID', 'Name', 'Description', 'Value');
		$CreateArray = $this->PopulateFieldArray($JointArray = array_merge($BaseArray, $FieldArray));
		$Result = $this->ArrayTableCreate($NameArray, $CreateArray, $Echo);
		// Fix!  Followup tasks and notification.
		return $Result;
	}
	
	
	// Do not call directly! Use CreateTable(). The internal function for creating '_ref' tables under the ace db format. $NameArray contains a single lowercase name value which will automatically be converted into the AceID and appended with _pri as the new table name.
	private function RefTableCreate($NameArray, $FieldArray=0, $Echo=0) {
		if (!is_array($NameArray) || (count($NameArray) != 1)) {
			return;  // Fix.  Error handling and notification.
		}
		if (!$FieldArray || !is_array($FieldArray)) { $FieldArray = array(); }
		$BaseArray = array('RefID'=>'ID', $NameArray[0]=>'Ref', $NameArray[1]=>'Ref', 'Name', 'Description');
		$CreateArray = $this->PopulateFieldArray($JointArray = array_merge($BaseArray, $FieldArray));
		
	}
	
	
	// Fix!  Include these:
		// if ($TableClass == 'pri') {
			// $BaseArray = array($NameRoot.'ID'=>'ID', 'Name', 'Description');
		// } else if ($TableClass == 'ref') {
			// $BaseArray = array('RefID'=>'ID', $NameArray[0]=>'Ref', $NameArray[1]=>'Ref', 'Name', 'Description');
		// } else if ($TableClass == 'typ') {
			// $BaseArray = array();  // Fix. Continue...
		// } else if ($TableClass == 'tag') {
			// $BaseArray = array();  // Fix. Continue...
		// } else if ($TableClass == 'log') {
			// $BaseArray = array();  // Fix. Continue...
		// } else if ($TableClass == 'ext') {
			// $BaseArray = array();  // Fix. Continue...
		// } else if ($TableClass == 'etc') {
			// $BaseArray = array();  // Fix. Continue...
		// } else {
			// // Fix. Handle exceptions...
			// return;
		// }
		
		
	// Copy the following block and customize for various standard table types.
	// Do not call directly! Use CreateTable(). The internal specialized function for creating '_etc' tables under the ace db format.
	private function EtcTableCreate() {
		// Fix. Continue 
	}
	
	
	// Do not call directly. Assembles the sql code compiled through CreateTable() and creates a table using the resulting string.
	private function ArrayTableCreate($NameArray, $CreateArray, $Echo=0) {
		$NameString = strtolower(implode('_', $NameArray));
		$CreateString = "CREATE TABLE `{$NameString}` ( \n";
		$CreateString .= implode(", \n\t", $CreateArray);
		$CreateString .= ((count($this->SqlQue) < 2) ? ($this->SqlQue[0]) : (implode(", \n\t", $this->SqlQue))) . "\n";
		$CreateString .= $this->SqlOptions . ";";
		if ($Echo) { echo "<p>DatabaseObj->ArrayTableCreate() created query string: <br>|{$CreateString}|</p>\n"; }
		//$this->Query($CreateString, $Echo);  // Fix.  
		return $CreateString;
	}
	
	
	// Creates a new database, returning the password if successful or null if not. Defaults to generating random password , and using $DbName for $UserName if none supplied.
	function CreateDatabase($DbName, $Pass=0, $UserName=0) {
		// Fix.  Due to virtual shared hosting restrictions in my primary environment I just left this for the moment. Databases and users can only be created via the cPanel on BlueHost, but in other circumstances this should actually function...  
	}
	
	
	
}  // End of DatabaseObj



////////////////////////////////////////////////////////////////////////////////


// The following are universal functions used to access DataBaseObjs in the most efficient and flexible means possible.


// Gets DatabaseObj contained in $dbArray as referenced by $DbName and $DbHost. If $ForceNew is set, it should be in the form array('$dbUser', '$dbPass'). If no representative DatabaseObj is existing, a new one will be instantiated.
function GetDatabaseObj($DbName=0, $DbHost=0, $ForceNew=0, $Echo=0) { global $dbArray;  // Fix. Update interface. Include $DbHost functionality and harden security for this. Consider creating a private class for this purpose?
	//$Echo = "Set from GetDatabaseObj()";  
	if ($Echo) { EchoV(array('$DbName'=>$DbName, '$DbHost'=>$DbHost, '$ForceNew'=>$ForceNew)); }
	if (!$dbArray) { $dbArray = array(); } 
	if ((!$DbName) && (!$DbName = $dbArray['CURRENT-DB'])) { $DbName = 'default'; }
	if ($Echo) { EchoV($dbArray, '$dbArray'); }
	if ((!$DatabaseObj = $dbArray[$DbName]) || $ForceNew) {  // Fix! Subarrays for individual hosts.
		if ($Echo) { echo "<p>DbObj.php GetDatabaseObj() No Existing DatabaseObj in \$dbArray referenced as \$DbName |{$DbName}| Creating...</p>\n"; }
		if (!$DatabaseObj = SetDatabaseObj($DbName, $DbHost, $ForceNew, $Echo)) { return; }
		if ($Echo) { EchoV($DatabaseObj, 'Created New $DatabaseObj'); }	
	} else {
		if ($Echo) { echo "<p>DbObj.php GetDatabaseObj() \$DatabaseObj |'{$DbName}'| DOES exist in \$dbArray.</p>\n"; }
		if ($Echo) { EchoV($DatabaseObj, 'Returning Existing $DatabaseObj'); }
	}
	if ($DatabaseObj->CheckUserAccess()) { return $DatabaseObj; }
	echo "<h3>DatabaseObj.php GetDatabaseObj() You do not have access privilages for this database.  Returning NULL.</h3>\n";  // Fix. Security, output handling.
}


// Instantiates a new DatabaseObj in $dbArray as referenced by $DbName and $DbHost. If $LoginArray is set, it should be in the form array('$dbUser', '$dbPass').
function SetDatabaseObj($DbName=0, $DbHost=0, $LoginArray=0, $Echo=0) { global $dbArray;  // Fix. Update interface. Include $DbHost functionality.
	if (!$dbArray) { $dbArray = array(); } 
	if ($LoginArray && is_array($LoginArray) && (count($LoginArray) == 2)) { list($dbUser, $dbPass) = $LoginArray; }
	$DatabaseObj = new DatabaseObj(array('data'=>$DbName,'host'=>$DbHost,'user'=>$dbUser,'pass'=>$dbPass), $Echo);
	if (!$DatabaseObj->CheckUserAccess()) { 
		echo "<h3>DatabaseObj.php SetDatabaseObj() You do not have access privilages for this database.  Returning NULL.</h3>\n";  // Fix. Security, output handling.
		return;
	}
	if ($DbRsc = $DatabaseObj->Ping()) {
		//echo "<p>DbObj.php SetDatabaseObj() Successful creation of DatabaseObj |'{$DbName}'|, \$DbRsc |{$DbRsc}|</p>\n";
		$CallName = (($CallName=$DatabaseObj->Get('Name'))?($CallName):($DbName));  // Fix!
		$dbArray["{$DbName}"] = $DatabaseObj;  // Fix.
		$dbArray['CURRENT-DB'] = $DbName;  // $CallName;  // Fix.
	} else {
		echo "<p>DbObj.php SetDatabaseObj() No \$DbRsc for \$DbName |'{$DbName}'|. Aborting...</p>\n";
		$dbArray["{$DbName}"] = $DatabaseObj = 0;
		return;
	}
	//echo "<p>DbObj.php SetDatabaseObj() Created \$DbName |{$DbName}| in \$dbArray: |".HtmlArray($dbArray)."|</p>\n";
	if ($DatabaseObj->CheckUserAccess()) { return $DatabaseObj; }
	echo "<h3>DatabaseObj.php SetDatabaseObj() You do not have access privilages for this database.  Returning NULL.</h3>\n";  // Fix. Security, output handling.
}


// Returns the name of the currently open DatabaseObj.
function CurDatabaseObjName() {
	return $this->Get('Name');
}







?>
