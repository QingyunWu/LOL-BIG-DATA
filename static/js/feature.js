$("input#playerName").on("focus", function(){
  $("span#notice").html('<h3> The name is case insensitive, ignore the space</h3>')
});
