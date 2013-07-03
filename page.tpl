<?php  // Main Page

$Main = include_string(main-page.tpl);

<html>
	<?=$Main;?>
</html>


//......

== main-page.tpl: ==

<div id="container">
	<div id="head"><?=$Head;?></div>
	<div id="content">Content</div>
	<div>Widget1</div>

</div>






.......//

function makeSubSect() {
	$Var1 = 'bla';
	$SubSect = include('sub-sect.tpl');
	
}

<html>

	<?=$SubSect;?>
	<
</html>
