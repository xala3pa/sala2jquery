
$('#detailsPage').live('pageshow', function(event) {
    var id_recipe = getUrlVars()["id"];
    var cat_recipe = getUrlVars()["category"];
    var data_recipe;

    if (cat_recipe){
        data_recipe = $.jStorage.get(decodeURIComponent(cat_recipe));
    }
    else{
        data_recipe = $.jStorage.get('orderedList');
    }
    
    var filtered = $.grep(data_recipe.posts, function(el, i) {
        return  el.ID.toString() === id_recipe.toString();
    });
    displayRecipe(filtered);

    //$.jStorage.flush()
    $("#saveFav").click(function() {
        var favoritesData = [];
        if(!$.jStorage.get("favorites")){
            favoritesData = [-1,id_recipe];
            $.jStorage.set("favorites",favoritesData);
            
        }else{
            if ($.inArray(id_recipe,$.jStorage.get("favorites")) === -1){
                favoritesData = $.jStorage.get("favorites");
                favoritesData.push(id_recipe);
                $.jStorage.set("favorites",favoritesData);
            }
        }
        paintFavoritesList();
    });
});

function displayRecipe(data) {
    var decoded = $('<textarea/>').html(data[0].title).val();

    $('#recipeTitle').text(decoded);
    $('#recipeDetail').append(data[0].content);
    $('#recipeDetail img').each(function(i, ele) {
        $(ele).attr('width','100%');
        $(ele).attr('height','auto');
        $(ele).css('max-width',640);
    });
    $('#recipeDetail a').each(function(i, ele) {
        $(ele).removeAttr('href');
    });
}

function paintFavoritesList(arr_favorites){
    
    $.mobile.changePage( "./favorites.html" );

}
