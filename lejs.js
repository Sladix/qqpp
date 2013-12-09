var lettresExclude = ["les","mes","tes","ses","ces","aux","eux","des","mon","ton","son","une"];
var _uuser;
 $(document).ready(function(){
 	$(".ncontainer h2 span").hover(colorize);
 	$(".ncontainer h2 span").click(selectWord);

 	$.ajaxSetup({ cache: true });
	  $.getScript('//connect.facebook.net/fr_FR/all.js', function(){
	    FB.init({
	      appId: '635626513145154',
	    });     
	    $('#loginbutton,#feedbutton').removeAttr('disabled');
	    FB.getLoginStatus(updateStatusCallback);
	  }); 
 });

 $("#container h2").each(function(){
 	var txt = $(this).text().split(" ");
 	var container = $(this);
 	$(this).html("");
 	$(txt).each(function(index,value){
 		if(!$.isNumeric(value) && value.length>2 && $.inArray(value,lettresExclude) == -1)
 			container.append("<span>"+value+"</span> ");
 		else
 			container.append("<i>"+value+"</i> ");
 	});
 });

 function colorize()
 {
 	if($(this).hasClass("hovered"))
 	{
 		$(this).removeClass("hovered");
 	}else
 	{
 		$(this).addClass("hovered");
 	}
 }

 function selectWord()
 {
 	if($(this).hasClass("clicked"))
 	{
 		$(this).removeClass("clicked");
 		$(this).parent().parent().find(".ptain").slideUp();
 	}
 	else
 	{
 		var id = $(this).parent().parent().attr("id");
 		var mot = $(this).text();
 		var obj = $(this);
 		doAjaxPerso(id,mot,obj);
 	}
 }

 function displayTain(obj)
 {
 	obj.parent().children("span").attr("id","");
	obj.addClass("clicked");
	obj.parent().parent().find(".mot").text(obj.text());
	obj.parent().parent().find(".ptain").slideDown();
 }

 function doAjaxPerso(idActu,mot,obj)
 {
 	$.ajax({
	  type: "POST",
	  url: "ajax.php",
	  data: { actu_id: idActu, mot: mot,user_id:_uuser.id }
	}).done(function() {
	    displayTain(obj);
	  })
	  .fail(function() {
	    alert( "Putain ! ça marche pas !" );
	  });
 }

 function updateStatusCallback(data)
 {
 	if(data.status != "not_authorized")
 	{
 		displayLog();
 	}
 }
function displayLog()
{
	$("#connectB").slideUp().remove();
	FB.api('/me', function(response) {
	       $("#name").text(response.name);
	       $("#nameholder").slideDown();
	       _uuser = response;
	       getAllVotes();
	  });
}
 function dalog()
 {
 	FB.login(function(response) {
	   if (response.authResponse) {
	     displayLog();
	   } else {
	     console.log('User cancelled login or did not fully authorize.');
	   }
	 });
 }

 function getAllVotes()
 {
 	$.ajax({
	  type: "POST",
	  url: "ajax.php",
	  data: { action:"getAll",user_id:_uuser.id}
	}).done(function(data) {
	    colorizeVoted(data);
	  })
 }

 function colorizeVoted()
 {

 }