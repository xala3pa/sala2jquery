var url = "https://public-api.wordpress.com/rest/v1/sites/sala2recetario.es/posts/";
var url_ordered = "https://public-api.wordpress.com/rest/v1/sites/sala2recetario.es/posts/?number=100&order_by=title&order=ASC";
var arrCategories =["Carnes","Cocina en miniatura","Comidas del mundo","ensalada","Entre pan y pan","Galletas","Las recetas de la abuela","Panaderia Sala2","Pescados","Postres","Setas"];

var service = function (url,key){
        $.ajax({
            url: url,
            dataType:'jsonp',
            cacheJStorage: true,
            cacheKey: key,
            cacheTTL: 172800,
            isCacheValid: function(){return true;},
            success: function(data) {
            }
        });
};

var callService = function (categories){
    //$.jStorage.flush()
    $.each(categories, function(index, category) {
        service(url + '?category=' + encodeURIComponent(category),category);
    });
};

$('#categoryListPage').bind('pageinit', function(event) {

    //Call REST service
    //callService(arrCategories);

    //load orderedList
    //service(url_ordered,'orderedList');
});


