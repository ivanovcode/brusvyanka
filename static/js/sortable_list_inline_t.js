$(document).ready(function() {
    pos_field = 'order';
    
    // Determine the column number of the position field
    pos_col_i = null;
    
    cols = $('#tagproject_set-group tbody tr:first').children()
    
    for (i = 0; i < cols.length; i++) {
        inputs = $(cols[i]).find('input[name*=' + pos_field + ']')
        
        if (inputs.length > 0) {
            // Found!
            pos_col_i = i;
            break;
        }
    }
    
    if (pos_col_i == null) {
        return;
    }


    $("#tagproject_set-group table tbody .form-row td").css('maxHeight', '100px');
    $("#tagproject_set-group table tbody .form-row td").css('height', '100px');
    //$("#articletag_set-group table tbody textarea").css('width', '580px');

    $("#tagproject_set-group table tbody").sortable({
        axis: 'y',
        items: 'tr',
        cursor: 'move',
	placeholder: "ui-state-highlight",
        forcePlaceholderSize: true,
        update: function(event, ui) {
            item = ui.item
            items = $(this).find('tr').get()
            
            $(items).each(function(index) {
                pos_td = $(this).children()[pos_col_i]
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
