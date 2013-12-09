
 $(document).ready(function(){
 	$("h2 span").hover(colorize);
 	$("h2 span").click(selectWord);
 });

 $("#container h2").each(function(){
 	var txt = $(this).text().split(" ");
 	var container = $(this);
 	$(this).html("");
 	$(txt).each(function(index,value){
 		if(!$.isNumeric(value) && value.length>2)
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
 	if($(this).attr("id") == "clicked")
 		$(this).attr("id","");
 	else
 	{
 		$("h2 span").attr("id","");
 		$(this).attr("id","clicked");
 	}
 }