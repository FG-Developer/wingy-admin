if ($(".datepicker").length) {
    setDefaultDate();
    var datePicker = $(".datepicker").datepicker({
        numberOfMonths: 2,
        dateFormat: "dd.mm.yy",
        showOtherMonths: true,
        selectOtherMonths: true,
        maxDate: new Date(),
        onSelect: function(selectedDate) {
            if (!$(this).data().datepicker.first) {
                $(this).data().datepicker.inline = true
                $(this).data().datepicker.first = selectedDate;
            } else {
                var dt_from = compareDate($(this).data().datepicker.first);
                var dt_to = compareDate(selectedDate);

                if (selectedDate > $(this).data().datepicker.first) {

                    $('#from').val($(this).data().datepicker.first);
                    $('#to').val(selectedDate);

                    $('.from-date').text($(this).data().datepicker.first);
                    $('.to-date').text(selectedDate);

                    $('.datestring .from .date').text(dt_from.getDate() + ' ' + getMonthName(dt_from) + ' ' + dt_from.getFullYear());
                    $('.datestring .from .day').text(getDayName(dt_from));

                    $('.datestring .to .date').text(dt_to.getDate() + ' ' + getMonthName(dt_to) + ' ' + dt_to.getFullYear());
                    $('.datestring .to .day').text(getDayName(dt_to));

                } else {

                    $('#from').val(selectedDate);
                    $('#to').val($(this).data().datepicker.first);

                    $('.from-date').text(selectedDate);
                    $('.to-date').text($(this).data().datepicker.first);

                    $('.datestring .from .date').text(dt_to.getDate() + ' ' + getMonthName(dt_to) + ' ' + dt_to.getFullYear());
                    $('.datestring .from .day').text(getDayName(dt_to));

                    $('.datestring .to .date').text(dt_from.getDate() + ' ' + getMonthName(dt_from) + ' ' + dt_from.getFullYear());
                    $('.datestring .to .day').text(getDayName(dt_from));

                }
                $(this).data().datepicker.inline = false;
            }
            setTimeout(insertButtons, 10);
        },
        beforeShow: function(input, instance) {
            setTimeout(insertButtons, 10);
        },
        beforeShowDay: function(date) {

            var date1 = compareDate($('#from').val());
            var date2 = compareDate($('#to').val());

            if (date >= date1 && date <= date2) {
                if (date1.getTime() == date2.getTime()) {
                    return [true, 'ui-datepicker-current-day', ''];
                }
                if (date.getTime() == date1.getTime()) {
                    return [true, 'ui-state-selected-range-start', ''];
                } else if (date.getTime() == date2.getTime()) {
                    return [true, 'ui-state-selected-range-end', ''];
                } else {
                    return [true, 'ui-state-selected-range', ''];
                }
            }
            return [true, '', ''];
        },
        onClose: function() {
            delete $(this).data().datepicker.first;
            $(this).data().datepicker.inline = false;
            $('.calendar-content .days').hide();
        },
        onChangeMonthYear: function() {
            setTimeout(insertButtons, 10);
        }
    });

    $(document).on('click', '.days ul li', function() {

        $('body').find('.days ul li').removeClass('active');

        var period = $(this).data('period');
        $('.datepicker').attr('data-period', period);

        let today = new Date();
        let from_date = '';

        switch (period) {
            case 'weekly':
                var day = today.getDay();
                var diff = today.getDate() - day + (day == 0 ? -6 : 1);
                from_date = new Date(today.setDate(diff));
                break;
            case 'monthly':
                from_date = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'yearly':
                from_date = new Date(today.getFullYear(), 0, 1);
                break;
            default:
                from_date = new Date();
                break;
        }

        setDefaultDate(from_date, new Date());
        $(".datepicker").datepicker("hide");
    });

    // $(document).on('click', '#close-calendar', function() {
    //     var from_date = $('#from').val();
    //     var to_date = $('#to').val();

    //     setDefaultDate(compareDate(from_date), compareDate(to_date));
    //     $(".datepicker").datepicker("hide");
    // });
}

function compareDate(str1) {
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var dt1 = parseInt(str1.substring(0, 2));
    var mon1 = parseInt(str1.substring(3, 5));
    var yr1 = parseInt(str1.substring(6, 10));
    var date = new Date(yr1, mon1 - 1, dt1);
    return date;
}

function getDayName(date) {
    return date.toLocaleString(locale, { weekday: 'long' });
}

function getMonthName(date) {
    return date.toLocaleString(locale, { month: 'long' });
}

function setDefaultDate(start_date = null, end_date = null) {

    if (!start_date) {
        start_date = new Date();
    }

    if (!end_date) {
        end_date = new Date();
    }

    var start_date_format = ('0' + start_date.getDate()).slice(-2) + '.' + ('0' + (start_date.getMonth() + 1)).slice(-2) + '.' + start_date.getFullYear();
    var end_date_format = ('0' + end_date.getDate()).slice(-2) + '.' + ('0' + (end_date.getMonth() + 1)).slice(-2) + '.' + end_date.getFullYear();

    $('#from').val(start_date_format);
    $('#to').val(end_date_format);

    $('.from-date').text(start_date_format);
    $('.to-date').text(end_date_format);

    $('.datestring .from .date').text(start_date.getDate() + ' ' + getMonthName(start_date) + ' ' + start_date.getFullYear());
    $('.datestring .from .day').text(getDayName(start_date));

    $('.datestring .to .date').text(end_date.getDate() + ' ' + getMonthName(end_date) + ' ' + end_date.getFullYear());
    $('.datestring .to .day').text(getDayName(end_date));
}

function insertButtons() {
    var days = '<div class="days">' +
        '<ul>' +
        '<li data-period="daily">daily</li>' +
        '<li data-period="weekly">weekly</li>' +
        '<li data-period="monthly">monthly</li>' +
        '<li data-period="yearly">yearly</li>' +
        '<!--<li id="close-calendar">apply</li>-->' +
        '</ul>' +
        '</div>';

    if ($('#ui-datepicker-div').is(':visible')) {
        $('body').find('#ui-datepicker-div').append(days);
        var period = $('.datepicker').attr('data-period');
        if (period) {
            $('body').find('.days').find('[data-period=' + period + ']').addClass('active');
        } else {
            $('body').find('.days').find('[data-period=daily').addClass('active');
        }

    }
}

function getNewDate(period, operator) {
    var operator = operator == 'prev' ? '-' : '+';
    var date = $('.datepicker').datepicker('getDate');
    switch (period) {
        case 'daily':
            date.setDate(date.getDate() + 1);
            break;
        case 'weekly':
            date.setDate(date.getDate() + 7);
            break;
        case 'monthly':
            date.setMonth(date.getMonth() + 1);
            break;
        case 'yearly':
            date.setFullYear(date.getFullYear() + 1);
            break;
    }

    return date;
}