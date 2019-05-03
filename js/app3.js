



// Step 1 : Select Initial Color
var color = $('.controls li.selected').css('background-color')
//
//
// // Step 2 : Let User Select His/Her Color
// $('.colorSelectContainer li').on('click', function(){
// $(document).on('click', '.colorSelectContainer li', function(){
//     $(this).siblings().removeClass('selected');
//     $(this).addClass('selected');
//     color = $(this).css('background-color');
// });
//
//
// // Step 3 : Open Add new Color Box
// $('#revealColorSelect').on('click', function(){
//     $('#colorSelect').slideToggle();
// });
//
//
// // Step 4 : Close box if clicked outside the box.
// $(window).on('click', function(e){
//     var $target = $(e.target);
//
//     if (
//         !$target.is('#revealColorSelect') &&
//         !$target.parents('#colorSelect').length &&
//         !$target.is('#colorSelect')
//     ){
//         $('#colorSelect').slideUp();
//     }
// });
//
//
// var rgb = "rgb(0,0,0)";
// var r = "0";
// var g = "0";
// var b = "0";
//
// // Step 5 : Add a new Color.
// $('#colorSelect input').on('change',function(){
//
//     if ($(this).is('#red')){
//         r = $(this).val();
//     }
//
//     if ($(this).is('#green')){
//         g = $(this).val();
//     }
//
//     if ($(this).is('#blue')){
//         b = $(this).val();
//     }
//
//     // var rgb = "rgb(" + r + "," + g + "," + b + ")";
//
//     // ECMASCRIPT 6
//     rgb = `rgb(${r},${g},${b})`;
//
//
//     $('#newColor').css("background-color" , rgb)
//
// });
//
//
// $('#addNewColor').on('click',function(){
//
//     // newColor = "<li> <"
//     var newColor = $('<li>');
//     newColor.css('background-color', rgb);
//     $('.colorSelectContainer li').removeClass('selected');
//     newColor.addClass('selected');
//
    // $('.colorSelectContainer').append(newColor);
//
// })
//
//
// // Step 6 : Paint on the canvas
// var canvas = $('canvas')[0];
//
// var ctx = canvas.getContext('2d');
//
// console.log(ctx);
//
// // ctx.beginPath();
// // ctx.moveTo(100, 100);
// //
// // ctx.lineTo(200, 100);
// // ctx.lineTo(200, 200);
// // ctx.lineTo(100, 200);
// // ctx.lineTo(100, 100);
// //
// // ctx.stroke();
//
// // mousedown
// // mousemove
// // mouseup
//
// var isMouseDown = false;
//
// $(canvas)
//     .on('mousedown', function(e){
//         console.log(e);
//         isMouseDown = true;
//         ctx.beginPath();
//         ctx.moveTo(e.offsetX, e.offsetY);
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
//     })





// Select Color
// Add New Color
// Paint


// Object Literal
var drawingApp = {

    isMouseDown : false,

    init : function(cnfg){
        this.config = cnfg;
        this.bindEvents();
    },

    bindEvents : function(){
        this.config.colorsContainer.on('click', 'li',this.changeColor.bind(this));
        this.config.newColorBtn.on('click', this.togglePallet);
        this.config.colorSliders.on('change', this.handleInputChange);
        this.config.addNewColorBtn.on('click', this.addNewColorBullet.bind(this));

        this.config.canvas
                    .on('mousedown', this.mouseDownHandler.bind(this))
                    .on('mousemove', this.mouseMoveHandler.bind(this))
                    .on('mouseup', this.mouseUpHandler.bind(this))

        $(window).on('click', this.handleWindowClick);

    },

    changeColor : function(e){
        var $this = $(e.target);

        $this
            .addClass('selected')
            .siblings()
            .removeClass('selected');

        this.config.color = $this.css('background-color');
    },

    togglePallet : function(){
        var self = drawingApp;

        self.config.colorPallet.slideToggle();

    },

    handleWindowClick : function(e){
        var self = drawingApp;
        var $target = $(e.target);

        if (
            !$target.is('#colorSelect') &&
            !$target.is('#revealColorSelect') &&
            !$target.parents('#colorSelect').length
        ) {
            self.config.colorPallet.slideUp();
        }

    },

    handleInputChange : function(e){
        var $target = $(e.target);
        var self = drawingApp;

        if ($target.is('#red')){
            self.config.r = $target.val();
        }

        if ($target.is('#green')){
            self.config.g = $target.val();
        }

        if ($target.is('#blue')){
            self.config.b = $target.val();
        }

        let newColor = 'rgb( '+self.config.r+' , '+self.config.g+' , '+self.config.b+' )';

        self.config.colorPreview.css('background-color', newColor);
    },

    addNewColorBullet : function(){

        let {
            r, g, b
        } = this.config;

        var newColor = $('<li>');

        newColor
            .css('background-color', 'rgb( '+r+' , '+g+' , '+b+' )')
            .addClass('selected');

        this.config.colorsContainer
            .find('li.selected')
            .removeClass('selected');

        this.config.colorsContainer
            .append(newColor);

        this.config.color = 'rgb( '+r+' , '+g+' , '+b+' )';

    },

    mouseDownHandler : function(e){
        this.isMouseDown = true;
        this.config.ctx.beginPath();
        this.config.ctx.moveTo(e.offsetX, e.offsetY);
    },

    mouseMoveHandler : function(e){
        if (this.isMouseDown){
            this.config.ctx.lineTo(e.offsetX, e.offsetY);
            this.config.ctx.strokeStyle = this.config.color;
            this.config.ctx.stroke();
        }
    },

    mouseUpHandler : function(e){
        this.isMouseDown = false;
    }

}


drawingApp.init({
    color            :  $('.controls li.selected').css('background-color'),
    colorsContainer  :  $('.controls .colorSelectContainer'),
    newColorBtn      :  $('#revealColorSelect'),
    colorPallet      :  $('#colorSelect'),
    colorSliders     :  $('.sliders input'),
    addNewColorBtn   :  $('#addNewColor'),
    colorPreview     :  $('#newColor'),
    canvas           :  $('canvas'),
    ctx              :  $('canvas')[0].getContext('2d'),
    r  :  '0',
    g  :  '0',
    b  :  '0',
})



// var canvas = $('canvas');
// var ctx = canvas[0].getContext('2d');
//
// ctx.beginPath();
// ctx.moveTo(100, 100);
//
// ctx.lineTo(100, 200);
// ctx.lineTo(200, 200);
// ctx.lineTo(200, 100);
// ctx.lineTo(100, 100);
//
// ctx.stroke();
