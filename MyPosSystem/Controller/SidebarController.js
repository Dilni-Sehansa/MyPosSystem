$(document).ready(function () {
    // Navigation Logic
    $('.nav-btn').on('click', function () {
        // Remove active class from all links
        $('.nav-btn').removeClass('active-nav');
        $(this).addClass('active-nav');

        // Hide all sections
        $('.spa-section').hide();

        // Show the target section
        let targetId = $(this).data('target');
        $('#' + targetId).show();
    });
});
