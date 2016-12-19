function getWidth(obj){
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();
    return width;
};

function getHeight(obj){
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var height = clone.outerHeight();
    clone.remove();
    return height;
};

function offset(pic, container) {
    var width = getWidth(pic);
    var height = getHeight(pic);
    var cWidth = getWidth(container);
    var cHeight = getHeight(container);
  //  alert(width+" "+height);
    
    if (width >= height) {
        pic.css('max-height', cHeight);
        width = getWidth(pic);
        var offset = -(width - cWidth)/2;    
        pic.css('margin-left', offset);
    }
    else {
        pic.css('max-width', cWidth);
        height = getHeight(pic);
        var offset = -(height - cHeight)/2;  
        pic.css('margin-top', offset);
    }
}

var main = function () {
    // ALIGN GALLERY
      $('#gallery li').each(function () {
        offset($(this).find('img'), $(this).find('.img-container'));
           offset($(this).find('img'), $(this).find('.img-container'));
           offset($(this).find('img'), $(this).find('.img-container'));
    });
    
    // GALLERY IMG HOVER
    $('#gallery li').hover(function () {
        $(this).find('img').fadeTo(400,0.5);
        $(this).find('span').fadeTo(400,1);
    }, function() {
        $(this).find('img').fadeTo(400,1);
        $(this).find('span').fadeTo(400,0);
    });
    // GALLERY LI CLICK
    $('#gallery li').click(function () {
      
        // Get img src
        var img = $(this).find('img').attr('src');
        // Set img src for expanded img
        $('.exp-img-container').find('img').attr('src',img);
        // Align exp image
        offset($('.exp-img-container').find('img'),$('.exp-img-container'));
        // Set title
        var title = $(this).find('span').text();
        $('.wrapper h2').text(title);
        // Set description
        var description = $(this).find('.description').text();
        $('.wrapper p').text(description);
          // Show overlay
      $('#overlay').show();
    });
    
    // CLOSE
    $('.close').click(function () {
        $('#overlay').hide();
    });
};

$(document).ready(main);
