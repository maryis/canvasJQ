
// $(document).on('ready', function(){
$(function(){

    var color = $('.controls .colorSelectContainer .selected').css('background-color');

    


    $('.controls .colorSelectContainer').on('click', 'li', function(){
        // $('.controls .colorSelectContainer li').removeClass('selected');

        color = $(this).css('background-color');

        $(this)
            .addClass('selected')
            .siblings()
            .removeClass('selected')

    });



    $(window).on('click', function(event){
        var $target = $(event.target);

        if (
            !$target.is('#colorSelect') &&
            !$target.is('#revealColorSelect') &&
            !$target.parents('#colorSelect').length
        ) {
            $('#colorSelect').slideUp();
        }

    })




    $('#revealColorSelect').on('click', function(){

        $('#colorSelect').slideToggle();

    });





    var r = 0;
    var g = 0;
    var b = 0;

    // color = 'rgb(0, 0, 0)'

    $('#colorSelect .sliders input').on('change input', function(){

        if ($(this).is('#red')){
            r = $(this).val();
        }

        if ($(this).is('#blue')){
            b = $(this).val();
        }

        if ($(this).is('#green')){
            g = $(this).val();
        }

        $('#newColor').css(
            'background-color', 
            'rgb( '+r+' , '+g+' , '+b+' )'
        );

    })


    $('#addNewColor').on('click', function(){

        var newColor = $('#newColor').css('background-color')

        var newColorElement = $('<li>', {
            style : 'background-color: ' + newColor
        });

        $('.controls .colorSelectContainer li').removeClass('selected');

        newColorElement.addClass('selected');

        $('.colorSelectContainer').append(newColorElement);

        color = newColor;

    })





    var canvas = $('canvas');

    // console.log(canvas[0]);

    var ctx = canvas[0].getContext('2d');
    // console.log(ctx);

    // ctx.beginPath();
    // ctx.moveTo(100, 100);

    // ctx.lineTo(100, 200);
    // ctx.lineTo(200, 200);
    // ctx.lineTo(200, 100);
    // ctx.lineTo(100, 100);

    // ctx.stroke();

    var isMouseDown = false;

    $('canvas')
        .on('mousedown', function(e){
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            isMouseDown = true;
        })
        .on('mousemove', function(e){
            if (isMouseDown){
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        })
        .on('mouseup', function(){
            isMouseDown = false;
        })



});