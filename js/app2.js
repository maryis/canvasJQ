// Self Invoke
(function(w){

    // Addy Osmani JavaScript Design Patterns
    
    // Module
    var drawingApplication = {
        color : 'rgb(0, 0, 0)',
        isMouseDown : false,

        init : function(conf){
            this.config = conf;
            this.ctx = this.config.canvas[0].getContext('2d');
            this.bindEvents();
            this.selectColorCode();
        },

        bindEvents : function(){
            this.config.colorOption.on('click', 'li', this.selectColor);
            this.config.revealColorSelectBtn.on('click', this.toggleNewColorSelect);
            this.config.sliders.on('change, input', 'input', this.handleInputChange);
            this.config.addNewColorBtn.on('click', this.addNewColor.bind(this));

            this.config.canvas
                    .on('mousedown', this.canvasMouseDown.bind(this))
                    .on('mousemove', this.canvaMouseMove.bind(this))
                    .on('mouseup', this.canvasMouseUp.bind(this));

            $(window).on('click', this.handleWindowClick);
        },

        addNewColor : function(){
            let rgbColor = `rgb(${this.config.r}, ${this.config.g}, ${this.config.b})`;

            let newColorElement = $('<li>').css('background-color', rgbColor);

            this.config.colorOption.append(newColorElement);
            
        },

        handleInputChange : function(e){
            var self = drawingApplication;
            let $this = $(this);

            if ($this.is('#red')){
                self.config.r = $this.val();
            }
            if ($this.is('#green')){
                self.config.g = $this.val();
            }
            if ($this.is('#blue')){
                self.config.b = $this.val();
            }

            self.setPreviewColor();

        },

        setPreviewColor : function(){
            this.config.colorPreview.css(
                'background-color',
                `rgb(${this.config.r}, ${this.config.g}, ${this.config.b})`
            );
        },

        handleWindowClick : function(e){
            var self = drawingApplication;
            var $target = $(e.target);
            
            if (
                !$target.is('#colorSelect') &&
                !$target.parents('#colorSelect').length &&
                !$target.is('#revealColorSelect')
            ) {
                self.config.colorSelectBox.slideUp();
            }

        },

        selectColor : function(){
            var self = drawingApplication;
            
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');

            self.selectColorCode();
        },

        selectColorCode : function(){
            this.color = $('li.selected').css('background-color');
        },

        toggleNewColorSelect : function(){
            var self = drawingApplication;

            self.config.colorSelectBox.slideToggle();
        },

        canvasMouseDown : function(e){
            this.isMouseDown = true;
            this.ctx.beginPath();
            this.ctx.moveTo(
                e.offsetX,
                e.offsetY
            )
        },

        canvaMouseMove : function(e){
            if (this.isMouseDown){
                this.ctx.lineTo(
                    e.offsetX,
                    e.offsetY
                );
                this.ctx.strokeStyle = this.color;
                this.ctx.stroke();
            }
        },

        canvasMouseUp : function(){
            this.isMouseDown = false;
        }

    }


    drawingApplication.init({
        colorOption        :   $('.controls .colorSelectContainer'),
        revealColorSelectBtn    :   $('#revealColorSelect'),
        colorSelectBox      :   $('#colorSelect'),
        colorPreview        :    $('#newColor'),
        sliders             :    $('.sliders'),
        addNewColorBtn      :    $('#addNewColor'),
        canvas              :  $('canvas'),
        r           :   '0',
        g           :   '0',
        b           :   '0'
    })


})(window)





// let canvas = $('canvas');
// let ctx = canvas[0].getContext('2d');

// ctx.beginPath();

// ctx.moveTo(100, 100);

// ctx.lineTo(100, 200);
// ctx.lineTo(200, 200);
// ctx.lineTo(200, 100);
// ctx.lineTo(100, 100);

// ctx.stroke();
