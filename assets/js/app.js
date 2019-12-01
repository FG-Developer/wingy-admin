$(function() {

    checkWindowHeight();
    $(window).resize(function() {
        checkWindowHeight();
    });

    function checkWindowHeight() {
        if ($(window).height() + 10 < $('.menu').height() + $('.nav-top').height()) {
            $('.menu-container').css('position', 'static');
        }
    }

    $('.change-brand-logo').on('click', function() {
        $('#brand-logo').trigger('click');
    });

    $('#brand-logo').on('change', function() {
        var preview = $('img.brand-logo');
        var file = document.querySelector('#brand-logo').files[0];
        var reader = new FileReader();

        reader.onloadend = function() {
            $(preview).attr('src', reader.result);
            sendFileToServer();
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    });

    var top = $('li.menu-item.active').position().top;
    $('.hover-slide').css('top', top - 30);

    $('.menu-item:not(.line)').hover(function() {
        var top = $(this).position().top - 30;
        $('.hover-slide').css('top', top);
    });

    $('.menu-item').mouseleave(function() {
        $('.hover-slide').css('top', top - 30);
    });

    $('.text-buttons a').click(function() {
        $('.text-buttons a').removeClass('active');
        $(this).addClass('active');
    });

    $('.language a').click(function() {
        $('.language a').removeClass('active');
        $(this).addClass('active');
    });

    $('a.edit').click(function() {
        $(this).addClass('active');
        $('a.save').remove('active');
        var span_value = $('span.textarea').text();
        $('span.textarea').html('<textarea class="comment" name="comment">' + span_value + '</textarea>');
    });

    $('a.save').click(function() {
        $(this).addClass('active');
        $('a.edit').remove('active');
        var span_value = $('textarea.comment').val();
        $('span.textarea').text(span_value);
    });

    $(window).resize(function() {
        if ($(window).width() >= 940) {
            $('body').removeClass('mobile');
        }
    });

    $('div.mobile .menu-items').on('click', function() {
        $('body').addClass('mobile');
    });

    $('div.mobile .close-icon').on('click', function() {
        $('body').removeClass('mobile');
    });

});

function sendFileToServer() {
    // send file to server from here
}