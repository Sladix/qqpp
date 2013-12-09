<?php 
require_once "config.php";
//TODO recup en fonction du journal
$posts = $db->query("SELECT titre, image, guid FROM actus ORDER BY guid DESC");
$done = array();
foreach ($posts as $key => $value) {
	$done[] = (int)$value["guid"];
}
 ?>
<html>
<head>
	<title>Qu'est-ce qui se P*tain d'Passe ?</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src = "isotope.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link href='http://fonts.googleapis.com/css?family=Exo+2:200,400' rel='stylesheet' type='text/css'>
</head>
<body>
	<h1>Qu'est-ce qui s'P*tain d'Passe ?</h1>
	<div id="menu">
		<button id="connectB" onclick="dalog();">Se Connecter</button>
		<p id="nameholder">Bienvenue <span id="name"></span></p>
	</div>
	<p style="text-align:center;margin-bottom:2px;font-weight:200">Parce que l'acualité est trop intense, le peuple a le droit d'élever sa voix, vociférons ensemble sur ce qui se P*tain de Passe !</p>
	<p style="text-align:center;margin-top:3px;font-weight:200">Il vous suffit de cliquer sur un mot pour... voilà quoi ! P*tain !</p>
	<div id="container">
	<?php 
		$feedUrl = 'http://rss.lemonde.fr/c/205/f/3050/index.rss';
		//20 miutes$feedUrl = 'http://flux.20minutes.fr/c/32497/f/479493/index.rss?xts=290428&xtor=RSS-1';
		$rawFeed = file_get_contents($feedUrl);
		$xml = new SimpleXmlElement($rawFeed);
		foreach ($xml->channel->item as $item) {
			$b = (string)$item->guid;
			$id = explode("/", $b);
			$id = $id[count($id)-2];

			if(!in_array((int)$id,$done))
			{
				echo "<article class='news'>";
					echo "<div class='nncontainer'>";
						echo "<div class='imgcontainer'>";
							echo "<img src='".$item->enclosure['url']."'>";
							$image = $item->enclosure['url'];
						echo "</div>";
						echo "<div class='ncontainer' id='".$id."'>";
							echo "<h2>".$item->title."</h2>";
							//echo "<small><a href='".$b."'>Lire la suite</a></small>";
							echo "<p class='ptain'>P*tain d'<span class='mot'></span></p>";
							echo "<div class='statholder'></div>";
						echo "</div>";
					echo "</div>";
				echo "</article>";
			}

			//on enregistre si c'est pas dans la db
			if(!in_array((int)$id,$done))
			{
				$db->bindMore(array("titre"=>$item->title,"image"=>$image,"guid"=>$id));
				$db->query("INSERT INTO actus (guid,titre,image) VALUES (:guid,:titre,:image)");
			}

		}

		foreach ($posts as $key => $value) {
			echo "<article class='news'>";
					echo "<div class='nncontainer'>";
						echo "<div class='imgcontainer'>";
							echo "<img src='".$value["image"]."'>";
						echo "</div>";
						echo "<div class='ncontainer' id='".$value["guid"]."'>";
							echo "<h2>".$value["titre"]."</h2>";
							//echo "<small><a href='".$b."'>Lire la suite</a></small>";
							echo "<p class='ptain'>P*tain d'<span class='mot'></span></p>";
							echo "<div class='statholder'></div>";
						echo "</div>";
					echo "</div>";
				echo "</article>";
		}
	 ?>
	 <button class = "news" onclick="getMore();"></button>
	</div>

	<script type="text/javascript" src="lejs.js"></script>
</body>
</html>

