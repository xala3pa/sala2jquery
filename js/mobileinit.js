$(document).bind('mobileinit', function(event){
    
    $.mobile.loadingMessage = "Cargando ...";
    $.mobile.loadingMessageTheme = "a";
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.pageLoadErrorMessage = "Error Cargando la pagina";
    $.mobile.pageLoadErrorMessageTheme = "e";

    // Navigation
    $.mobile.page.prototype.options.backBtnText = "Volver";
    $.mobile.page.prototype.options.backBtnTheme    = "d";

    // Listview
    $.mobile.listview.prototype.options.filterPlaceholder = "Busca tus recetas...";
});