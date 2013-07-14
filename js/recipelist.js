$('#recipeListPage').live('pageshow', function(event) {
    getRecipeFilterList();
});

var cat = "";

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getRecipeFilterList() {

cat = decodeURIComponent(getUrlVars()["category"]);

$('#categoryName').text(cat);
    //Check if key are storaged
    if (!$.jStorage.get(cat)){
        
        //show loading div
        $.mobile.loading( 'show', {
            text: 'Cargando...',
            textVisible: true,
            theme: '',
            html: ""
        });

        //load again th category
        var arrCat = [cat];
         callService(arrCat);

        //Listen if recipe storage change
        $.jStorage.listenKeyChange(cat, function(key, action){
            //hide loading div
            $.mobile.loading( 'hide');
            //paint recipe only if action is updated no deleted
            if (action === 'updated')
                paintRecipes();
        });

    }else{
        paintRecipes();
    }

function paintRecipes(){

    var data = $.jStorage.get(cat);

    $('#recipeList li').remove();
    
    $.each(data.posts, function(index, categ) {
               $('#recipeList').append('<li><a href="recipedetails.html?id=' + categ.ID + '&category=' + cat +'">' +
                    '<img src="' + categ.featured_image + '"></img>' +
                    '<h4>' + categ.title + '</h4>' +
                    '</a></li>');
            });

    $('#recipeList').listview('refresh');
}
}