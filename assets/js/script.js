$( document ).ready(function() {
    $('body').scrollspy({ target: '#main-navbar' })
    
    $('#slider_1').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        dots: true,
        items: 1,
    })
    $('#test-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        dots: true,
        items: 1,
    })

    $("#contactForm").submit(function(e){

        e.preventDefault();
        var $ = jQuery;

        var postData        = $(this).serializeArray(),
            formURL         = $(this).attr("action"),
            $cfResponse     = $('#contactFormResponse'),
            $cfsubmit       = $("#cfsubmit"),
            cfsubmitText    = $cfsubmit.text();

        $cfsubmit.text("Sending...");


        $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data)
                {
                    $cfResponse.html(data);
                    $cfsubmit.text(cfsubmitText);
                },
                error: function(data)
                {
                    alert("Error occurd! Please try again");
                }
            });

        return false;

    });
});
/*------------------------------------------
 Subscribe form ajax
 ------------------------------------------*/


$('#subscription-form').submit(function(e) {

    e.preventDefault();
    var $form           = $('#subscription-form');
    var submit          = $('#subscribe-button');
    var ajaxResponse    = $('#subscription-response');
    var email           = $('#subscriber-email').val();

    $.ajax({
        type: 'POST',
        url: 'php/subscribe.php',
        dataType: 'json',
        data: {
            email: email
        },
        cache: false,
        beforeSend: function(result) {
            submit.html("Working...");
        },
        success: function(result) {
            if(result.sendstatus == 1) {
                ajaxResponse.html(result.message);
                $form.fadeOut(500);
            } else {
                ajaxResponse.html(result.message);
                submit.html('<i class="ion-heart"></i> Get it');
            }
        },
        error: function(){
            submit.html('<i class="ion-heart"></i> Get it');
        }
    });

});

// Obtener el ancho de la ventana del navegador
var windowWidth = window.innerWidth;

// Función para aplicar estilos según el tamaño de la pantalla
function applyStyles() {
    if (windowWidth <= 600) {
        document.body.classList.add('small-screen');
        document.querySelector('.container').classList.add('small-screen-container');
    } else if (windowWidth >= 601 && windowWidth <= 1024) {
        document.body.classList.add('medium-screen');
        document.querySelector('.container').classList.add('medium-screen-container');
    } else {
        document.body.classList.add('large-screen');
        document.querySelector('.container').classList.add('large-screen-container');
    }
}

// Llamar a la función cuando se carga la página y cuando cambia el tamaño de la ventana
window.onload = applyStyles;
window.onresize = function() {
    windowWidth = window.innerWidth;
    applyStyles();
};
