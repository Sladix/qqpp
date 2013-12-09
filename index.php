<html>
<head>
	<title>Cul</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

	<div id="container">
	<?php 
		$feedUrl = 'http://rss.lemonde.fr/c/205/f/3050/index.rss';
		$rawFeed = file_get_contents($feedUrl);
		$xml = new SimpleXmlElement($rawFeed);
		foreach ($xml->channel->item as $item) {
			echo "<div class='news'>";
				echo "<h2>".$item->title."</h2>";
			echo "</div>";

		}
	 ?>
	</div>
	<script type="text/javascript" src="lejs.js"></script>
</body>
</html>

