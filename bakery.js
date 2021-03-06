/*
 * Return the width of an object
 */
function getWidth(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();
    return width;
}
/*
 * Return the height of an object
 */
function getHeight(obj) {
    var clone = obj.clone();
    clone.css("visibility", "hidden");
    $('body').append(clone);
    var height = clone.outerHeight();
    clone.remove();
    return height;
}
/*
 * Return the native dimensions of an object
 */
function getNativeDim(obj, which) {
    var copy = new Image();
    copy.src = $(obj).attr("src");
    if (which == "w") return copy.width;
    else return copy.height;
}
/*
 * Resize images for expanded view
 */
function resize(pic) {
    // Reset dim
    $(pic).css("max-height", "");
    $(pic).css("max-width", "");
    // Get dim of window
    var windowH = $(window).height();
    var windowW = $(window).width();
    // Get native nim of pic
    var nativeH = getNativeDim(pic, "h");
    var nativeW = getNativeDim(pic, "w");
    var margin = 150;
    // Check if pic needs to be sized down
    if (nativeH <= windowH - margin && nativeW <= windowW - margin) {
        $(pic).css("max-height", nativeH);
        $(pic).css("max-width", nativeW);
        return;
    }
    // Set height to windowHeight - 200
    $(pic).css("max-height", windowH - margin);
    $(pic).css("width", "auto");
    // Check if new width is in bounds
    if (getWidth(pic) >= windowW - margin) {
        $(pic).css("height", "auto");
        $(pic).css("max-width", windowW - margin);
    }
    return;
}
var main = function () {
    /*
       
       if (getHeight($('#gallery img')) < 18 vh) alert("hsfdj"); */
    /* BUTTONS */
    // HOME BUTTON
    $('#logo').click(function () {
        if ($(document).scrollTop() == 0) {
            location.reload();
            return;
        }
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
    // ABOUT ME BUTTON
    $('#about-me-button').click(function () {
        var windowHeight = window.innerHeight;
        $("html, body").animate({
            scrollTop: windowHeight
        }, "slow");
    });
    // GALLERY BUTTON
    $('#gallery-button').click(function () {
        var windowHeight = window.innerHeight;
        $("html, body").animate({
            scrollTop: 2 * windowHeight
        }, "slow");
    });
    // CONTACT BUTTON
    $('#contact-button').click(function () {
        var windowHeight = window.innerHeight;
        var docHeight = $(document).height();
        // Set shake delay
        var delay = '200';
        // Set shake delay to 0 if already at bottom of page
        if ($(document).scrollTop() >= (docHeight - windowHeight)) {
            delay = '0';
        }
        // Scroll down and shake
        $("html, body").animate({
            scrollTop: docHeight - windowHeight
        }, "slow").promise().then(function () {
            $('#footer li').delay(delay).effect('shake', {
                times: 2
                , distance: 4
                , direction: 'right'
            }, 400);
        });
    });
    // HANDLE MENU CSS ON SCROLL
    $(window).scroll(function () {
            var pos = $(this).scrollTop();
            var windowHeight = $(window).height();
            // - 65
            if (pos < windowHeight - 120) {
                $("#menu ul").css("background-color", "");
            }
            else {
                $("#menu ul").css("background-color", "rgba(140, 102, 99,0.9)");
               
        }
    });
// GALLERY LI CLICK
$('#gallery img').click(function () {
    // Get img src
    var img = $(this).attr('src');
    // Set img src for expanded img
    $('#overlay .img-container').find('img').attr('src', img);
    // Resize
    img = $('#overlay .img-container').find('img');
    resize(img);
    // Show overlay
    $('#overlay').fadeIn(300);
});
// CLOSE
$('.close').click(function () {
    $('#overlay').fadeOut(300);
});
};
$(document).ready(main);