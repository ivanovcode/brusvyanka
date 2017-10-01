django.jQuery(document).ready(function(){
if(location.href.indexOf('projects') > 0)
    django.jQuery('#articletag_set-group .add-row a').attr("onclick", "location='/admin/projects/articletag/add/'");
if(location.href.indexOf('buildhouse') > 0)
    django.jQuery('#articletag_set-group .add-row a').attr("onclick", "location='/admin/buildhouse/articletag/add/'");

var ids = '#id_name, #id_h1, #id_title, #id_keyword, #id_description';
django.jQuery(ids).each(function() {
   if(django.jQuery(this).length) {
       django.jQuery(this).after('<span class="count_field"></span>');
       var charCount = django.jQuery(this).val().length;
       django.jQuery(this).next().text(charCount);
   }
});


django.jQuery(ids).on('keyup',function(){
   var charCount = django.jQuery(this).val().length;
   django.jQuery(this).next().text(charCount);
});


});
