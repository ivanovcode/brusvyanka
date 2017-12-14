(function($) {
    $.fn.idiotscroll = function(options) {
        options = $.extend({
            width_element: 410,
            element: 'a',
            scrollInterval: 20,
            scrollStep: 1
        }, options);
        var xpos = 0;
        var speed = 1;
        var timerspeed = 0;
        var right = 1;
        return this.each(function() {
            var self = $(this);
            var length_element = $("#" + self.attr("id") + " .scrollWrapper .scrollableArea div").length;
            var width = (3 * length_element) * options.width_element + 14 * 3 * length_element;
            var xstart = length_element * options.width_element + (length_element) * 14;
            xpos = xstart;
            self.children(".scrollingHotSpotLeft").css("opacity", "0.35");
            self.children(".scrollingHotSpotRight").css("opacity", "0.35");
            
            $(document).on('mouseup touchend', '.scrollingHotSpotRight, .scrollingHotSpotLeft', function(){
              speed = 1;
            });
            
            $(document).on('mousedown touchstart', '.scrollingHotSpotRight', function(){
              speed = 10;
              right = 1;
            });
            
            $(document).on('mousedown touchstart', '.scrollingHotSpotLeft', function(){
              speed = 10;
              right = -1;
            });
            
            self.children(".scrollWrapper").children(".scrollableArea").css("width", width);
            var scroll_html = $(".scrollableArea").html();
            $(".scrollableArea").append(scroll_html);
            $(".scrollableArea").prepend(scroll_html);
            var rightend = width - $(".scrollWrapper").width();
            var leftend = 0;
            var timer = setInterval(function() {
                if (xpos > rightend) {
                    xpos = xstart - $(".scrollWrapper").width();
                }
                if (xpos < leftend + 40) {
                    xpos = xstart + 40;
                }
                xpos += right * options.scrollStep * speed;
                $(".scrollWrapper").scrollLeft(xpos);
            }, options.scrollInterval);
        });
    };
})(jQuery);