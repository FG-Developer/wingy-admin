$(function() {
    var table = $('table').DataTable({
        "paging": false,
        "info": false,
        "searching": false,
        "columnDefs": [{
            "targets": 4,
            "orderable": false
        }]
    });

    table.columns().iterator('column', function(ctx, idx) {
        $(table.column(idx).header()).append('<span class="sort-icon"/>');
    });

    $(document).on('mouseover', 'td.action span', function() {
        if ($(this).parent('td').parent('tr').hasClass('selected')) {
            $(this).parent('td').parent('tr').removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).parent('td').parent('tr').addClass('selected');
        }
    });

    $(document).on('click', 'td.action span.delete-btn', function() {
        if (confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
            table.row('.selected').remove().draw(false);
        }
    });

    $(document).on('click', 'td.action span.add-btn', function() {

        var validationError = false;
        var parentRow = $(this).parent('td').parent('tr');
        $(parentRow).find('input').each(function(k, v) {
            if ($(v).hasClass('required')) {
                if (!$(v).val()) {
                    $(v).addClass('validation-error');
                    validationError = true;
                } else {
                    $(v).removeClass('validation-error');
                }
            }
        });

        if (validationError) {
            return false;
        }

        if (confirm("Bu kaydı eklemek istediğinize emin misiniz?")) {

            var row = $(this).parent('td').parent('tr');
            $(row).addClass('new-row-form');

            var name_surname = $(row).find('input[name=name_surname]').val();
            var title = $(row).find('input[name=title]').val();
            var department = $(row).find('input[name=department]').val();
            var mac = $(row).find('input[name=mac]').val();

            var newRow = table.row.add([
                name_surname,
                title,
                department,
                mac,
                '<span class="delete-btn"></span>'
            ]).draw().node();

            $(newRow).find('td:eq(4)').addClass('action');

            table.row('.new-row-form').remove().draw(false);
        }
    });

    $('.add-new-table-row').on('click', function() {
        table.order();
        var newRow = table.row.add([
            '<input type="text" name="name_surname" placeholder="ad - soyad" class="required">',
            '<input type="text" name="title" placeholder="ünvanı" class="required">',
            '<input type="text" name="department" placeholder="departmanı" class="required">',
            '<input type="text" name="mac" placeholder="mac" class="required">',
            '<span class="add-btn"></span>'
        ]).draw().node();

        $(newRow).find('td:eq(4)').addClass('action');
    });

    $(document).on('keyup', 'input.validation-error', function() {
        $(this).removeClass('validation-error');
    });

});