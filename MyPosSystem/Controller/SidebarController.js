
$(document).ready(function () {

    $('body').prepend(`
        <button id="hamburger-btn" aria-label="Toggle menu">
            <span></span>
        </button>
        <div id="sidebar-overlay"></div>
    `);

    function openSidebar() {
        $('#sidebar').addClass('sidebar-open');
        $('#sidebar-overlay').addClass('active');
        $('#hamburger-btn').addClass('open');
    }

    function closeSidebar() {
        $('#sidebar').removeClass('sidebar-open');
        $('#sidebar-overlay').removeClass('active');
        $('#hamburger-btn').removeClass('open');
    }

    function isMobile() {
        return window.innerWidth < 992;
    }

    $('#hamburger-btn').on('click', function () {
        if ($('#sidebar').hasClass('sidebar-open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    $('#sidebar-overlay').on('click', function () {
        closeSidebar();
    });

    $('.nav-btn').on('click', function () {

        $('.nav-btn').removeClass('active-nav');
        $(this).addClass('active-nav');

        $('.spa-section').hide();
        let targetId = $(this).data('target');
        $('#' + targetId).show();

        if (isMobile()) {
            closeSidebar();
        }
    });

    $(window).on('resize', function () {
        if (!isMobile()) {
            closeSidebar();
        }
    });

});