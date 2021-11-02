$.ajax({
    url: "menu.html",
    success: function (data) { $(data).insertAfter('header'); },
    dataType: 'html'
});