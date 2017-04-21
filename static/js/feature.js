$("input#playerName").on("focus", function(){
  $("span#notice").html('<h5> The name is case insensitive, ignore the space</h5>')
});

$("td.bigger").on("mouseover", function(){
    $(this).attr("id", "show_bigger");
    $(this).on("mouseleave", function(){
        $(this).attr("id", "show_smaller");
    });
});
