/**
 * jQuery tttbutton plugin
 * Copyright Junichi Shinohara <http://github.com/tabe1hands/tttbutton/>
 * Dual licensed under the MIT <http://www.opensource.org/licenses/mit-license.php>
 * and GPL <http://www.opensource.org/licenses/gpl-license.php> licenses.
 * Date: 2010-09-20
 * @author Junichi Shinohara <http://github.com/tabe1hands/tttbutton/>
 * @version 1.0.0
 */
;(function($) {
    var name_space = 'tttbutton';

    var INIT_STATUS = 1 << 0;
    var OVER_STATUS    = 1 << 1;
    var CLICK_STATUS   = 1 << 2;
    var DISABLE_STATUS = 1 << 3;

    $.fn[name_space] = function(options) {
        var elements = this;

        var settings = $.extend({
            disable: true,
            style: 'default',
            mouseover: null,
            mouseout: null,
            mouseup: null,
            mousedown: null,
        }, options);

        var class_prefix = name_space
        if(settings.style != 'default'){
            class_prefix += '_'+settings.style;
        };

        var _handle_mouseover = function () {
            var self = this;
            var obj = $.data(self, name_space);
            if(obj.status != CLICK_STATUS && obj.status != DISABLE_STATUS){
                obj.status = OVER_STATUS;
                _style_over(self);
                if(typeof(settings.mouseover) == 'function'){
                    settings.mouseover();
                }
            }
        };

        var _handle_mouseout = function () {
            var self = this;
            var obj = $.data(self, name_space);
            if(obj.status != CLICK_STATUS && obj.status != DISABLE_STATUS){
                obj.status = INIT_STATUS;
                _style_init(self);
                if(typeof(settings.mouseout) == 'function'){
                    settings.mouseout();
                }
            }
        };

        var _handle_mousedown = function () {
            var self = this;
            var obj = $.data(self, name_space);
            if(obj.status != DISABLE_STATUS){
                obj.status = CLICK_STATUS;
                _style_click(self);
                if(typeof(settings.mousedown) == 'function'){
                    settings.mousedown();
                }
            }
        };

        var _handle_mouseup = function () {
            var self = this;
            var obj = $.data(self, name_space);
            if(obj.status != DISABLE_STATUS){
                if(settings.disable === true){
                    obj.status = DISABLE_STATUS;
                    _style_disable(self);
                } else {
                    obj.status = INIT_STATUS;
                    _style_init(self);
                }
                if(typeof(settings.mouseup) == 'function'){
                    settings.mouseup();
                }
            }
        };

        var _style_init = function(self){
            var obj = $.data(self, name_space);
            $(self).removeClass(class_prefix+'_over')
                   .removeClass(class_prefix+'_click')
                   .removeClass(class_prefix+'_disable');
        };

        var _style_over = function(self){
            var obj = $.data(self, name_space);
            _style_init(self);
            $(self).addClass(class_prefix+'_over');
        };

        var _style_click = function(self){
            var obj = $.data(self, name_space);
            _style_init(self);
            $(self).addClass(class_prefix+'_click');
        };

        var _style_disable = function(self){
            var obj = $.data(self, name_space);
            _style_init(self);
            $(self).addClass(class_prefix+'_disable');
        };

        var _create = function (self) {
            var obj = $.data(self, name_space);
            obj.status = INIT_STATUS;
            _style_init(self);
            
            var button_text = $(self).text();

            $(self).text('')
                   .addClass(class_prefix)
                   .append('<span class="'+class_prefix+'_left"></span>')
                   .append('<span class="'+class_prefix+'_middle">'+button_text+'</span>')
                   .append('<span class="'+class_prefix+'_right"></span>');
        };

        var _bind = function (self) {
            $(self).bind('mouseover.'+name_space, _handle_mouseover)
                   .bind('mouseout.'+name_space, _handle_mouseout)
                   .bind('mousedown.'+name_space, _handle_mousedown)
                   .bind('mouseup.'+name_space, _handle_mouseup);
        };

        elements.each(function() {
            var self = this;
            $.data(self, name_space, {});
            _create(self);
            _bind(self);
        });

        return this;
    };
})(jQuery);
