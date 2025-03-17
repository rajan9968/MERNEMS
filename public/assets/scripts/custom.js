$(document).ready(function () {
    $('#addClass').click(function () {
        $('.active').toggleClass('subdrop');
    });
    $('#menu_bar').click(function () {
        $('.menu-s').toggleClass('active');
        $('body').toggleClass('mini-sidebar');
    });
    $('#profileDropdown').click(function () {
        $('.dropdown-toggle').toggleClass('show');
        $('#profileDropdownMenu').toggleClass('show').css({
            position: 'absolute',
            inset: '0px 0px auto auto',
            margin: '0px',
            transform: 'translate(0px, 25.5556px)'
        });

    });
});

$(document).on('mouseover', function (e) {
    e.stopPropagation();
    if ($('body').hasClass('mini-sidebar') && $('#menu_bar').is(':visible')) {
        var targ = $(e.target).closest('.sidebar, .header-left').length;
        if (targ) {
            $('body').addClass('expand-menu');
            $('.subdrop + ul').slideDown().addClass('expanded');
        } else {
            $('body').removeClass('expand-menu');
            $('.subdrop + ul').slideUp().removeClass('expanded');
        }
        return false;
    }
});