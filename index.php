<?php 
require_once "config.php";
 ?>
<html>
<head>
	<title>Qu'est-ce qui se putain d'passe ?</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link href='http://fonts.googleapis.com/css?family=Exo+2:200' rel='stylesheet' type='text/css'>
</head>
<body>
	<h1>Qu'est-ce qui s'putain d'passe ?</h1>
	<div id="menu">
		<button id="connectB" onclick="dalog();">Se Connecter</button>
		<p id="nameholder">Bienvenue <span id="name"></span></p>
	</div>
	<p style="text-align:center;margin-bottom:2px;">Parce que l'acualité est riche, le peuple a le droit d'élever sa voix, et d'exprimer sa sensibilité sur ce qui se putain de passe !</p>
	<p style="text-align:center;margin-top:3px;">Il vous suffit de cliquer sur un mot pour... voilà quoi ! Putain !</p>
	<div id="container">
	<?php 
		$feedUrl = 'http://rss.lemonde.fr/c/205/f/3050/index.rss';
		$rawFeed = file_get_contents($feedUrl);
		$xml = new SimpleXmlElement($rawFeed);
		foreach ($xml->channel->item as $item) {
			$b = (string)$item->guid;
			$id = explode("/", $b);
			$id = $id[count($id)-2];
			echo "<article class='news'>";
				echo "<div class='nncontainer'>";
					echo "<div class='imgcontainer'>";
						echo "<img src='".$item->enclosure['url']."'>";
					echo "</div>";
					echo "<div class='ncontainer' id='".$id."'>";
						echo "<h2>".$item->title."</h2>";
						//echo "<small><a href='".$b."'>Lire la suite</a></small>";
						echo "<p class='ptain'>Putain d'<span class='mot'></span></p>";
						echo "<div class='statholder'></div>";
						echo "<input type='hidden' name='mot'>";
					echo "</div>";
				echo "</div>";
			echo "</article>";

		}
	 ?>
	</div>
	<script type="text/javascript" src="lejs.js"></script>
</body>
</html>

