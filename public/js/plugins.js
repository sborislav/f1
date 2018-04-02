$(document).ready(function(){
    $("#phone").mask("+7(999) 999-9999");

    $('#consultation button').click(function () {
        $.getJSON('/ajax',{
            method:'callback', name: $('#consultation input#name').val(), phone: $('#consultation input#phone').val()
        },function (data) {
            if (data){
                $('#consultation input#name').val('');
                $('#consultation input#phone').val('');
                if (data.status){
                    $('#consultation .modal-content').remove();
                    $('#consultation .modal-dialog').append('<div class="alert alert-success" role="alert">\n' +
                        '<h4 class="alert-heading">Успешно!</h4>\n' +
                        '<p>'+data.message+'</p>\n' +
                        '</div>');
                } else {
                    $('#consultation .modal-dialog').prepend('<div class="alert alert-danger" role="alert">\n' +
                        '<h4 class="alert-heading">Ошибка!</h4>\n' +
                        '<p>'+data.error+'</p>\n' +
                        '</div>');
                }
            }
        })
    });

    $("#navbarSupportedContent>.navbar-nav").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

function boxFullHeight() {
    $('.fullpage').css('min-height',
        $(window).height()
    );
}

boxFullHeight();

$(window).resize(function(){
    boxFullHeight();
});
