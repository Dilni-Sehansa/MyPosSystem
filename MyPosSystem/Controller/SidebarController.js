$(document).ready(function () {

    $('.nav-btn').on('click', function () {

        $('.nav-btn').removeClass('active-nav');
        $(this).addClass('active-nav');

        $('.spa-section').hide();

        let targetId = $(this).data('target');
        $('#' + targetId).show();
    });

});



