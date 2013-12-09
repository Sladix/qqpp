<?php 
require_once "config.php";

if($_POST["action"] == "getAll")
{
	$data = $db->Select("votes",array("user_id"=>$user_id),-1,false,'AND','mot');

}else
{
	if(empty($_POST) || empty($_POST["actu_id"]) || empty($_POST["user_id"]) || empty($_POST["mot"]))
		exit;


	extract($_POST);

	$hasVoted = $db->Select("votes",array("actu_id"=>$actu_id,"user_id"=>$user_id));

	if(!$hasVoted)
	{
		$res = $db->Insert(array("actu_id"=>$actu_id,"user_id"=>$user_id,"mot"=>$mot),"votes");
		if(!$res)
			die(json_encode(array("error"=>"DB Error")));
		else
			die(json_encode(array("success"=>true)));
	}else
	{
		$res = $db->Delete("votes",array("actu_id"=>$actu_id,"user_id"=>$user_id));
		if(!$res)
			die(json_encode(array("error"=>"DB Error")));
		else
			die(json_encode(array("success"=>true)));
	}	
}


?>