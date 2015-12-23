;
(function($) {
    function Modal(element, options) {
        this.opts = $.extend({}, Modal.DEFAULTS, options);
        this.$el = element;
        this._init();
    }

    Modal.prototype._init = function() {
        var $el = this.$el,
            opts = this.opts;
        opts.target = opts.target || $el.attr('data-modal');
        init(opts, $el);
    }

    function removeModal(callback) {
        var md = $('.md-show');
        md.removeClass('md-show');
        $('.md-container').removeClass('md-blur');
        $('html').removeClass('md-perspective');
        if (callback instanceof Function) {
            callback();
        }
    }

    function init(opts, $el) {
        if (opts.target) {
            var overlay = $('.md-overlay');
            var modal = $('#' + opts.target);
            var isSetperspective = modal.hasClass('md-effect-17') || modal.hasClass('md-effect-18') || modal.hasClass('md-effect-19');

            function openEvent() {
                var width = modal.width();
                var height = modal.height();
                var wh = $(window).height();
                if (height > (wh - 60)) {
                    height = wh - 200;
                    console.log(modal.find('.md-body'));
                    modal.find('.md-body').css({
                        height: height + 'px'
                    });
                }
                var ml = width / 2;
                modal.css({
                    marginLeft: -ml + 'px'
                });
                modal.addClass('md-show');
                if (opts.blur) {
                    $('.md-container').addClass('md-blur');
                }
                if (opts.overlayClose) {
                    overlay.unbind('click');
                    overlay.one('click', function() {
                        removeModal();
                    });
                }
                if (isSetperspective) {
                    setTimeout(function() {
                        $('html').addClass('md-perspective');
                    }, 25);
                }
            }
            if ($el) {
                $el.on('click', function() {
                    openEvent();
                });
            } else {
                openEvent();
            }
            modal.find('.md-close').unbind('click');
            modal.find('.md-close').on('click', function(event) {
                event = event || window.event;
                removeModal(opts.closeCallback);
                event.stopPropagation();
            });
        }
    }

    Modal.DEFAULTS = {
        target: '',
        blur: false,
        overlayClose: true,
        closeCallback: null
    }
    $.fn.extend({
        ecModal: function(opts) {
            return this.each(function() {
                new Modal($(this), opts);
            });
        }
    });
    $.extend({
        ecModal: {
            open: function(options) {
                var opts = $.extend({}, Modal.DEFAULTS, options);
                if (opts.beforeOpen) {
                    opts.beforeOpen();
                }
                init(opts);
                if (opts.afterOpen) {
                    opts.afterOpen();
                }
            },
            close: function(callback) {
                removeModal(callback);
            }
        }
    });
    if ($('.md-overlay').length < 1) {
        $('.md-container').after($('<div class="md-overlay"></div>'));
    }
    $('.md-trigger').ecModal();
})(jQuery)
