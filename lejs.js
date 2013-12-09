var lettresExclude = ["les","mes","tes","ses","ces","aux","eux","des","mon","ton","son","une"];
var _uuser;
var refreshS = false;
var _number = 50;
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
	$(".ncontainer").mouseenter(getStats);
	$('#container').isotope({
	  // options
	  itemSelector : '.news',
	  layoutMode : 'fitRows'
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
 		if(typeof _uuser != "undefined")
 			doAjaxPerso(id,mot,obj);
 		else
 			//message d'erreur à mettre
 			alert('il faut se connecter pour voter putain !!');
 	}
 }

 function displayTain(obj)
 {
 	obj.parent().children("span").removeClass('clicked');
	obj.addClass("clicked");
	obj.parent().parent().find(".mot").text(obj.text());
	obj.parent().parent().find(".ptain").slideDown();
 }

 function doAjaxPerso(idActu,mot,obj)
 {
 	$.ajax({
	  type: "POST",
	  url: "ajax.php",
	  data: { actu_id: idActu, mot: mot,user_id:_uuser.id,action:"vote" }
	}).done(function() {
	    displayTain(obj);
	    refreshS = true;
	    $("#"+idActu).trigger("mouseenter");
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
	       $("#name").text(response.first_name);
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
	  data: { action:"getAllVotes",user_id:_uuser.id}
	}).done(function(data) {
	    colorizeVoted(data);
	});
 }

 function colorizeVoted(data)
 {
 	var d = eval(data);
 	for (var i = d.length - 1; i >= 0; i--) {
 		var m = d[i];
 		$("#"+m.actu_id).find('span').each(function(){
 			if($(this).text() == m.mot)
 			{
 				$(this).addClass('clicked');
 			}
 		});
 	};
 }

 function getStats(refresh)
 {
 	
 	if($(this).find('.statholder').text() == "" || refreshS)
 	{
		var id = $(this).attr("id");
	 	$.ajax({
		  type: "POST",
		  url: "ajax.php",
		  data: { action:"getStat",actu_id:id}
		}).done(function(data) {
			$("#"+id).find('.statholder').slideUp(100,function(){
				$(this).empty();
				var total = 0;
				var d = eval(data);
				$.each(d,function(i,v){
					total+= v.score;
				});
				if(total>0)
				{
					var html = $("<div></div>");
					var d = eval(data);
					$.each(d,function(i,v){
						html.append($("<div></div>").css("width",Math.round(v.score*100/total)+"%").addClass("stat").append($("<p>"+v.mot+"</p>")));
					});
				    $(this).hide().append(html).slideDown();
				    refreshS = false;
				}

			});
		});
	}
 }

 function getMore()
 {
 	$.ajax({
		  type: "POST",
		  url: "ajax.php",
		  data: { action:"getMore",number:_number}
		}).done(function(data){
			
			if(typeof data != "undefined" && data != "")
			{
				var d = eval(data);
				$.each(d,function(i,v){
					$("#container").isotope('insert',$("<article class='news'><div class='nncontainer'><div class='imgcontainer'><img src='"+v.image+"'></div><div class='ncontainer' id='"+v.guid+"'><h2>"+v.titre+"</h2><p class='ptain'>P*tain d'<span class='mot'></span></p><div class='statholder'></div></div></article>"));
				});
				_number+=50;
			}else
			{
				alert('yen a plus !');
			}
			
		});
 }