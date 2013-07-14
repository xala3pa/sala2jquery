$('#favoriteListPage').live('pageshow', function(event) {

    //Check if key are storaged
    if (!$.jStorage.get('orderedList')){
        
        //show loading div
        $.mobile.loading( 'show', {
            text: 'Cargando Favoritos...',
            textVisible: true,
            theme: '',
            html: ""
        });

        //load again 
        service(url_ordered,'orderedList');

        //Listen if recipe storage change
        $.jStorage.listenKeyChange('orderedList', function(key, action){
            //hide loading div
            $.mobile.loading( 'hide');
            //paint recipe only if action is updated no deleted
            if (action === 'updated'){
                paintFavoriteList();
            }
        });
    }else{
        paintFavoriteList();
    }
});

var paintFavoriteList = function(){

    $('#favoriteList li').remove();
  
    $.each($.jStorage.get('orderedList').posts, function(index,categ) {
        if ($.inArray(categ.ID.toString(),$.jStorage.get('favorites'),0) > 0){

               $('#favoriteList').append('<li><a href="recipedetails.html?id=' + categ.ID + '">' +
                    '<img src="' + categ.featured_image + '"></img>' +
                    '<h4>' + categ.title + '</h4>' +
                    '</a><a href="#" id="'+categ.ID+'" onclick="deleteFavorite($(this));" data-rel="popup" data-position-to="window" data-icon="delete"></li>');
        }
    });
        
    $('#favoriteList').listview('refresh');
};

function deleteFavorite(obj){
   
    var idRecipe = obj.attr('id');

    // console.error("receta " + idRecipe);
    
    var favoriteList = $.jStorage.get('favorites');
    favoriteList = $.grep(favoriteList, function(value) {
        return value != idRecipe;
    });
    $.jStorage.set("favorites",favoriteList);
    
    paintFavoriteList();

}
