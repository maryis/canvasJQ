

(function(){

    // Module
    var drawingApplication = {
        
        init : function(config){
            this.config = config;
            this.ctx = this.config.canvas[0].getContext('2d');
            this.isMouseDown = false;
           // this.bindEvents();
        },


 


        bindEvents : function(){
            this.config.revealColorSelect.on('click', this.openColorSelectBox.bind(this));

            this.config.colorItems.on('click', 'li', this.changeSelectedColor);

            this.config.colorSliders.on('input', this.handleSliderChange.bind(this));

            this.config.addNewColorBtn.on('click', this.addNewColor.bind(this));

            this.config.canvas
                .on('mousedown', this.handleCanvasMouseDown.bind(this))
                .on('mousemove', this.handleCanvasMouseMove.bind(this))
                .on('mouseup', this.handleCanvasMouseUp.bind(this));

            $(window).on('click', this.handleWindowClick);
        },

        handleCanvasMouseDown : function(e){
            this.ctx.beginPath();
            this.ctx.moveTo(e.offsetX, e.offsetY);
            this.isMouseDown = true;
        },

        handleCanvasMouseMove : function(e){
            if (this.isMouseDown){
                this.ctx.lineTo(e.offsetX, e.offsetY);
                this.ctx.strokeStyle = this.config.color;
                this.ctx.stroke();
            }
        },

        handleCanvasMouseUp : function(){
            this.isMouseDown = false;
        },

        changeSelectedColor : function(){
            // DOM Caching
            var $this = $(this);

            $this
                .addClass('selected')
                .siblings()
                .removeClass('selected');
            
            drawingApplication.setColor($this.css('background-color'));
        },

        setColor : function(color){
            this.config.color = color;
        },

        handleSliderChange : function(e){
            var $target = $(e.target);

            if ($target.is('#blue'))
                this.config.b = $target.val();

            if ($target.is('#red'))
                this.config.r = $target.val();

            if ($target.is('#green'))
                this.config.g = $target.val();

            this.setPreviewColor(
                'rgb('+this.config.r+','+this.config.g+','+this.config.b+')'
            );

            // rgb(255, 0, 154);
        },  

        setPreviewColor : function(color){
            this.config.colorPreviewBox.css('background-color', color);
        },

        addNewColor : function(){

            var { r, g, b } = this.config;
            
            // Get the color and create a new string
            var rgb = `rgb(${r}, ${g}, ${b})`;

            // Create a new element to add to DOM
            var newColorElement = $('<li>', {
                style : 'background-color: ' + rgb
            });
           
            this.config.colorItems.append(newColorElement);

            // Close reveal color selectbox
            this.config.colorSelect.slideUp();

            // Set selected to new added color
            this.config.colorItems
                .find('.selected')
                .removeClass('selected');
            
            newColorElement.addClass('selected');

            this.setColor(rgb);
            console.log(this.config.color);

        },

        openColorSelectBox : function(){
            this.config.colorSelect.slideToggle();
        },

        handleWindowClick : function(e){
            var self = drawingApplication;
            var $target = $(e.target);

            if (
                !$target.is('#revealColorSelect') &&
                !$target.is('#colorSelect') &&
                !$target.parents('#colorSelect').length
            ){
                self.config.colorSelect.slideUp();
            }

        }
	}
		
    drawingApplication.init({
        color               :   $('.controls .colorSelectContainer .selected').css('background-color'),
        colorItems          :   $('.controls .colorSelectContainer'),
        revealColorSelect   :   $('#revealColorSelect'),
        colorSelect         :   $('#colorSelect'),
        colorSliders        :   $('#colorSelect .sliders-input :input'),
        colorPreviewBox     :   $('#newColor'),
        addNewColorBtn      :   $('#addNewColor'),
        canvas              :   $('canvas'),
        r                   :   '0',
        g                   :   '0',
        b                   :   '0',
    });


    // .bind
    // .call
    // .apply

    // Semantic Versioning
    // Major.Minor.Macro


    // var canvas = $('canvas');
    // console.log(canvas);
    // console.log(canvas[0]);
    // var ctx = canvas[0].getContext('2d');
    // console.log(ctx);
    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(100, 200);
    // ctx.lineTo(200, 200);
    // ctx.lineTo(200, 100);
    // ctx.lineTo(100, 100);
    // ctx.stroke();

})()