<?php
if(!isset($_POST["action"]))
	exit; 
require_once "config.php";

if($_POST["action"] == "getAllVotes")
{
	extract($_POST);
	$db->bindMore(array("user_id"=>$user_id));
	$data = $db->query("SELECT actu_id,mot FROM votes WHERE user_id = :user_id LIMIT 50");
	echo json_encode($data);
	die();

}else if($_POST["action"] == "vote")
{
	if(empty($_POST) || empty($_POST["actu_id"]) || empty($_POST["user_id"]) || empty($_POST["mot"]))
		exit;


	extract($_POST);
	$db->bindMore(array("uid"=>$user_id,"aid"=>$actu_id,"mot"=>$mot));
	$hasVoted = $db->query("SELECT COUNT(user_id) as c FROM votes WHERE user_id = :uid AND mot = :mot AND actu_id = :aid");
	if(isset($hasVoted[0]) && (int)$hasVoted[0]["c"] != 1)
	{
		$res = $db->query("DELETE FROM votes WHERE user_id = :uid AND actu_id = :aid", array("uid"=>$user_id,"aid"=>$actu_id));
		$res = $db->query("INSERT INTO votes(user_id,actu_id,mot) VALUES(:uid,:aid,:mot)", array("uid"=>$user_id,"aid"=>$actu_id,"mot"=>$mot));
		if(!$res)
		{
			echo json_encode($data);
			die();
		}
		else
		{
			echo json_encode($data);
			die();
		}
	}else
	{
		$res = $db->query("DELETE FROM votes WHERE user_id = :uid AND actu_id = :aid", array("uid"=>$user_id,"aid"=>$actu_id));
		if(!$res)
		{
			echo json_encode($data);
			die();
		}
		else
		{
			echo json_encode($data);
			die();
		}
	}	
}else if($_POST["action"] == "getStat")
{
	extract($_POST);
	$db->bind("aid",$actu_id);
	$res = $db->query("SELECT COUNT(user_id) as score,mot FROM votes WHERE actu_id = :aid GROUP BY mot");
	echo json_encode($res);
	die();
}else if($_POST["action"] == "getMore")
{
	extract($_POST);
	$lenombre = $number;
	$db->bind("lenombre",$number);
	$posts = $db->query("SELECT titre, image, guid FROM actus ORDER BY guid DESC LIMIT 50 OFFSET :lenombre");
	return $posts;
}


?>