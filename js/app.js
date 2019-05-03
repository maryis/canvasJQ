



// // Step 1 : Select Initial Color
var color = $('.controls li.selected').css('background-color')


// // Step 2 : Let User Select His/Her Color
// $('.colorSelectContainer li').on('click', function(){
$(document).on('click', '.colorSelectContainer li', function(){
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    color = $(this).css('background-color');
});


// // Step 3 : Open Add new Color Box
$('#revealColorSelect').on('click', function(){
    $('#colorSelect').slideToggle();
});


// // Step 4 : Close box if clicked outside the box.
$(window).on('click', function(e){
    var $target = $(e.target);

    if (
        !$target.is('#revealColorSelect') &&
        !$target.parents('#colorSelect').length &&
        !$target.is('#colorSelect')
    ){
        $('#colorSelect').slideUp();
    }
});


var rgb = "rgb(0,0,0)";
var r = "0";
var g = "0";
var b = "0";

// Step 5 : Add a new Color.
$('#colorSelect input').on('change',function(){

    if ($(this).is('#red')){
        r = $(this).val();
    }

    if ($(this).is('#green')){
        g = $(this).val();
    }

    if ($(this).is('#blue')){
        b = $(this).val();
    }

    // var rgb = "rgb(" + r + "," + g + "," + b + ")";

    // ECMASCRIPT 6
    rgb = `rgb(${r},${g},${b})`;


    $('#newColor').css("background-color" , rgb)

});


$('#addNewColor').on('click',function(){

    // newColor = "<li> <"
    var newColor = $('<li>');
    newColor.css('background-color', rgb);
    $('.colorSelectContainer li').removeClass('selected');
    newColor.addClass('selected');

    $('.colorSelectContainer').append(newColor);

})


// // Step 6 : Paint on the canvas
var canvas = $('canvas');

var ctx = canvas[0].getContext('2d');

// console.log(ctx);

// // ctx.beginPath();
// // ctx.moveTo(100, 100);
// //
// // ctx.lineTo(200, 100);
// // ctx.lineTo(200, 200);
// // ctx.lineTo(100, 200);
// // ctx.lineTo(100, 100);
// //
// // ctx.stroke();

// // mousedown
// // mousemove
// // mouseup

var isMouseDown = false;

$('canvas')
    .on('mousedown', function(e){
        console.log(e);
        isMouseDown = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
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





// var color = $('.controls .colorSelectContainer .selected').css("background-color");




// $('.controls .colorSelectContainer').on('click', 'li',function(){
//     DOM Caching
//     let $this = $(this);
    
//     $this
//         .addClass('selected')
//         .siblings()
//         .removeClass('selected');

//     color = $this.css('background-color');
// });



// $('#revealColorSelect').on('click', function(){
//     $('#colorSelect').slideToggle();
// });





// $(window).on('click', function(e){

//     let $target = $(e.target);

//     if (
//         !$target.is('#colorSelect') &&
//         !$target.is('#revealColorSelect') &&
//         !$target.parents('#colorSelect').length
//     ) {
//         $('#colorSelect').slideUp();
//     }

// });



// var r = '0';
// var g = '0';
// var b = '0';


// $('.sliders :input').on('input', function(){

//     let $this = $(this);

//     if ($this.is('#red')){
//         r = $this.val();
//     }

//     if ($this.is('#green')){
//         g = $this.val();
//     }

//     if ($this.is('#blue')){
//         b = $this.val();
//     }

//     $('#newColor').css(
//         'background-color', 
//         // 'rgb('+r+','+g+','+b+')'
//         `rgb(${r},${g},${b})`
//     );

// });

// DRY


// $('#addNewColor').on('click', function(){

//     // let newColor = 'rgb('+r+','+g+','+b+')';
    // let newColor = $('#newColor').css('background-color');


//     let $newColorEl = $('<li>', {
//         'class' : 'selected'
//     });

//     $newColorEl.css('background-color', newColor);

//     $('.colorSelectContainer')
//         .find('li')
//         .removeClass('selected');

//     $('.colorSelectContainer')
//         .append($newColorEl);

//     color = newColor;

//     $('#colorSelect').slideUp();


// });








// // Playground 

// var canvas = $('canvas');
// var ctx = canvas[0].getContext('2d');

// // ctx.beginPath();
// // ctx.moveTo(100, 100);
// // ctx.lineTo(100, 200);
// // ctx.lineTo(200, 200);
// // ctx.lineTo(200, 100);
// // // ctx.lineTo(100, 100);
// // ctx.closePath();
// // ctx.stroke();


// var isMouseDown = false;

// canvas
//     .on('mousedown', function(e){
//         ctx.beginPath();
//         ctx.moveTo(e.offsetX, e.offsetY);
//         isMouseDown = true;
//     })
//     .on('mousemove', function(e){
//         if (isMouseDown){
//             ctx.lineTo(e.offsetX, e.offsetY);
//             ctx.strokeStyle = color;
//             ctx.stroke();
//         }
//     })
//     .on('mouseup', function(){
//         isMouseDown = false;
//     });






// Spagetti Code


// Design Pattern

// (function(){

//     // Revealing Module Pattern


//     // Module Pattern

//     var drawingApplication = {

//         init : function(conf){
//             this.config = conf;
//             this.bindEvents();
//         },

//         bindEvents : function(){
//             this.config.colorsContainer.on('click', 'li', this.switchColor);
//         },

//         switchColor : function(){
//             let $this = $(this);
//             let self = drawingApplication;
    
//             $this
//                 .addClass('selected')
//                 .siblings()
//                 .removeClass('selected');
        
//             self.config.color = $this.css('background-color');

//         }
        
//     }
//     drawingApplication.init({
//         colorsContainer        : $('.controls .colorSelectContainer'),
//         // color                  : $('.controls .colorSelectContainer li.selected').css('background-color')
//     });



// })()