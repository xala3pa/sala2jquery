$('#alphabeticalListPage').live('pageshow', function(event) {

//Check if key are storaged
    if (!$.jStorage.get('orderedList')){
        
        //show loading div
        $.mobile.loading( 'show', {
            text: 'Cargando listado...',
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
                paintList();
            }
        });
    }else{
        paintList();
    }
});

var paintList = function(){
    $('#alphabeticalList li').remove();
            var  recipeOrderedList = $.jStorage.get('orderedList').posts;
            $.each(recipeOrderedList, function(index, categ) {
                var tit = (categ.title).substring(1,categ.title.length).replace("!","");
               
               $('#alphabeticalList').append('<li><a href="recipedetails.html?id=' + categ.ID +'">' +
                    '<img src="' + categ.featured_image + '"></img>' +
                    '<h4>' + tit + '</h4>' +
                    '</a></li>');
            });
            //hide loading div
            $.mobile.loading( 'hide');
            $('#alphabeticalList').listview('refresh');

};

