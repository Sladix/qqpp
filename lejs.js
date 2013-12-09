
 $(document).ready(function(){
 	$(".ncontainer h2 span").hover(colorize);
 	$(".ncontainer h2 span").click(selectWord);
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
 	{
 		$(this).attr("id","");
 		$(this).parent().parent().find(".ptain").slideUp();
 	}
 	else
 	{
 		$(this).parent().children("span").attr("id","");
 		$(this).attr("id","clicked");
 		$(this).parent().parent().find(".mot").text($(this).text());
 		$(this).parent().parent().find(".ptain").slideDown();
 	}
 }