$(document).ready(function() {
    pos_field = 'order';
    
    // Determine the column number of the position field
    // pos_col_i = null;
    
    cols = $('#articletag_set-group tbody tr:first').children()


    $("#articletag_set-group table tbody .form-row td").css('maxHeight', '100px');
    $("#articletag_set-group table tbody .form-row td").css('height', '100px');
    //$("#articletag_set-group table tbody textarea").css('width', '580px');

    $("#articletag_set-group table tbody").sortable({
        axis: 'y',
        items: 'tr',
        cursor: 'move',
	placeholder: "ui-state-highlight",
        forcePlaceholderSize: true,
        update: function(event, ui) {
            item = ui.item
            items = $(this).find('tr').get()
            
            $(items).each(function(index) {
                pos_td = $(this).children()[5]
                input = $(pos_td).children('input').first()
                label = $(pos_td).children('strong').first()
                
                input.attr('value', index)
                label.text(index)
            });
            
            // Update row classes
            $(this).find('tr').removeClass('row1').removeClass('row2')
            $(this).find('tr:even').addClass('row1')
            $(this).find('tr:odd').addClass('row2')

        },
	start: function() {
	}

    });


   
});
