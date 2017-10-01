$(document).ready(function() {
    // Set this to the name of the column holding the position
    pos_field = 'order';
    
    // Determine the column number of the position field
    pos_col = null;
    
    cols = $('.inline-group tbody tr:first').children()
    
    for (i = 0; i < cols.length; i++) {
        inputs = $(cols[i]).find('input[name*=' + pos_field + ']')
        
        if (inputs.length > 0) {
            // Found!
            pos_col = i;
            break;
        }
    }
    
    if (pos_col == null) {
        return;
    }
    
    // Some visual enhancements
    header = $('.inline-group thead tr').children()[pos_col]
    $(header).css('width', '1em')
    $(header).children('a').text('#')
    
    // Hide position field
    $('.inline-group tbody tr').each(function(index) {
        pos_td = $(this).children()[pos_col]
        input = $(pos_td).children('input').first()
        //input.attr('type', 'hidden')
        input.hide()
        
        label = $('<strong>' + input.attr('value') + '</strong>')
        $(pos_td).append(label)
    });
    
    // Determine sorted column and order
    sorted = $('.inline-group thead th.sorted')
    sorted_col = $('.inline-group thead th').index(sorted)
    sort_order = sorted.hasClass('descending') ? 'desc' : 'asc';
    
    if (sorted_col != pos_col) {
        // Sorted column is not position column, bail out
        console.info("Sorted column is not %s, bailing out", pos_field);
        // return;
    }
    
    $('.inline-group tbody tr').css('cursor', 'move')
    
    // Make tbody > tr sortable
    $('.inline-group tbody').sortable({
        axis: 'y',
        items: 'tr',
        cursor: 'move',
        update: function(event, ui) {
            item = ui.item
            items = $(this).find('tr').get()
            
            if (sort_order == 'desc') {
                // Reverse order
                items.reverse()
            }
            
            $(items).each(function(index) {
                pos_td = $(this).children()[pos_col]
                input = $(pos_td).children('input').first()
                label = $(pos_td).children('strong').first()
                
                input.attr('value', index)
                label.text(index)
            });
            
            // Update row classes
            $(this).find('tr').removeClass('row1').removeClass('row2')
            $(this).find('tr:even').addClass('row1')
            $(this).find('tr:odd').addClass('row2')
        }
    });
});
