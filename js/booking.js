function NattakanReservation(id) {

    let that = this;
    this.id = id;

    this.url = 'http://api.nattakan.pl/reservation.php';


    this.bookNowOnClickCallback = function(event, item) {
        if (event) {
            event.preventDefault();
        }
        bookNowOnClickCallbackInt(item.item);
    }

    function bookNowOnClickCallbackInt(selectedReservation)
    {
        const shop = selectedReservation.shopName;
        that.selectedReservation.shopId = (shop.toString().indexOf('Old Town') >= 0 || shop.toString().indexOf('Stare Miasto') >= 0) ? 'old_town' : 'centrum';
        that.selectedReservation.guid = selectedReservation.guid;
        that.selectedReservation.dateFrom = selectedReservation.dateFrom;
        that.selectedReservation.dateTo = selectedReservation.dateTo;
        that.selectedReservation.description = selectedReservation.description;
        that.selectedReservation.label = selectedReservation.label;
        that.selectedReservation.searchType = selectedReservation.searchType;
        that.selectedReservation.shopName = selectedReservation.shopName;
        that.modalConfirmData.selectedReservation = that.selectedReservation;
        that.modalConfirmData.form = that.reservationForm.form;
        that.modalConfirmData.people = that.searchResults.people;
        that.modalConfirmData.form.contactType = 'phone';

        if (googleEmail && googleEmail !== '') {
            that.modalConfirmData.form.contactType = 'google';
            that.modalConfirmData.form.email = googleEmail;
            that.modalConfirmData.form.name = googleName;
        }


        if (fbEmail && fbEmail !== '') {
            that.modalConfirmData.form.contactType = 'facebook';
            that.modalConfirmData.form.email = fbEmail;
            that.modalConfirmData.form.name = fbLink;
        }
        that.showModal();
    }
    /**
     * contact
     * date
     * dateFrom
     * dateTo
     * guid
     * hour
     * isExactMatch
     * length
     * message
     * minute
     * people
     * reservationProposals
     */
    this.searchResults = {
        data: {
            reservationProposals: []
        },
        reservationProposals: [
        ],
        translations: labels_nattakan,
        bookNowOnClickCallback: this.bookNowOnClickCallback,
        people: []
    };

    this.selectedReservation = {
        description: '',
        dateFrom: '',
        dateTo: '',
        guid: '',
        label: '',
        searchType: '',
        shopName: '',
        shopId: '',
    };

    this.reservationForm = {
        form: {
            date: '',
            time: '12:00',
            length: '60',
            people: 1,
            shops: 0,
            policy: false
        },
        selectValues: {
            date: [
                {value: 0, label: ''},
            ],
            time: [
                {value: '12:00', label: '12:00'},
                {value: '12:30', label: '12:15'},
                {value: '12:30', label: '12:30'},
                {value: '12:30', label: '12:45'},
                {value: '13:00', label: '13:00'},
                {value: '13:15', label: '13:15'},
                {value: '13:30', label: '13:30'},
                {value: '13:30', label: '13:45'},
                {value: '14:00', label: '14:00'},
                {value: '14:30', label: '14:15'},
                {value: '14:30', label: '14:30'},
                {value: '14:30', label: '14:45'},
                {value: '15:00', label: '15:00'},
                {value: '15:30', label: '15:15'},
                {value: '15:30', label: '15:30'},
                {value: '15:30', label: '15:45'},
                {value: '16:00', label: '16:00'},
                {value: '16:30', label: '16:15'},
                {value: '16:30', label: '16:30'},
                {value: '16:30', label: '16:45'},
                {value: '17:00', label: '17:00'},
                {value: '17:30', label: '17:15'},
                {value: '17:30', label: '17:30'},
                {value: '17:30', label: '17:45'},
                {value: '18:00', label: '18:00'},
                {value: '18:30', label: '18:15'},
                {value: '18:30', label: '18:30'},
                {value: '18:30', label: '18:45'},
                {value: '19:00', label: '19:00'},
                {value: '19:30', label: '19:15'},
                {value: '19:30', label: '19:30'},
                {value: '19:30', label: '19:45'},
                {value: '20:00', label: '20:00'},
                {value: '20:00', label: '20:15'},
                {value: '20:00', label: '20:30'},
            ],
            length: [
                {value: 30, label: labels_nattakan['page.booking.length_30']},
                {value: 45, label: labels_nattakan['page.booking.length_45']},
                {value: 60, label: labels_nattakan['page.booking.length_60']},
                {value: 90, label: labels_nattakan['page.booking.length_90']},
                {value: 120, label: labels_nattakan['page.booking.length_120']},
            ],
            people: [
                {value: 1, label: labels_nattakan['page.booking.people_1']},
                {value: 2, label: labels_nattakan['page.booking.people_2']},
                {value: 3, label: labels_nattakan['page.booking.people_3']},
            ],
            shops: [
                {value: 0, label: labels_nattakan['page.booking.both_shops_label']},
                {value: 1, label: labels_nattakan['page.booking.Centrum_label']},
                {value: 2, label: labels_nattakan['page.booking.Old_Town_label']},
            ],
        },
    };
    let matchType2icon = {
        'exact' : 'icon-exact',
        'same_day_earlier_time' : 'icon-up',
        'same_day_later_time' : 'icon-down',
        'earlier_day_same_time' : 'icon-left',
        'later_day_same_time' : 'icon-right',
        'earlier_day_earlier_time' : 'icon-left',
        'earlier_day_later_time' : 'icon-left',
        'later_day_earlier_time' : 'icon-right',
        'later_day_later_time' : 'icon-right',

    };


    this.bookNowWithDataOnClickCallback = function(event, item) {
        that.bookNowWithFullData(event, item);
    };

    this.modalConfirmData = {
        bookNowWithDataOnClickCallback: that.bookNowWithDataOnClickCallback,
        selectedReservation: {},
        people: [],
        form: {
            contact: '',
            special: 'fdsfdsfsdf dsdfs dsfds',
            contactType: 'phone',
            phone: '',
            name: ''
        }
    };
    let phoneInput;
    this.init = function()
    {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const length = urlParams.get('length');
        const description = urlParams.get('description');

        if (length) {
            this.reservationForm.form.length = length.toString();
        }
        if (description) {
            this.reservationForm.form.special = description.toString();
        }

        rivets.binders.addclass = function(el, value) {
            if (el.addedClass) {
                jQuery(el).removeClass(el.addedClass);
                delete el.addedClass;
            }

            if (value) {
                jQuery(el).addClass(value);
                el.addedClass = value;
            }
        };

        rivets.binders['set-proposal-style'] = function(el, value){
            el.className += ' '+ (value === 'exact' ? 'success' : 'warning');
        }

        rivets.binders['set-proposal-icon'] = function(el, value){
            el.className += ' ' + matchType2icon[value];
        }

        let d = new Date();
        this.reservationForm.form.date = d.toISOString().split('T')[0];
        rivets.bind(document.querySelector('#reservation-form'), that.reservationForm);
        rivets.bind(document.querySelector('#confirm-form-content'), that.searchResults);
        rivets.bind(document.querySelector('#modal-confirm'), that.modalConfirmData);
        rivets.bind(document.querySelector('#booking-confirmation-page'), that.selectedReservation);
        const input = document.querySelector("#form-field-phone");
        phoneInput = window.intlTelInput(input, {
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                return "e.g. " + selectedCountryPlaceholder;
            },
            initialCountry: 'pl',
            separateDialCode: true,
            autoInsertDialCode: true,
            nationalMode: false,
            placeholderNumberType: "MOBILE"
        });

        const nattakan_search_id = getCookie('nattakan_search_id');
        const nattakan_reservation_id = getCookie('nattakan_reservation_id');



        if (nattakan_search_id && nattakan_reservation_id)
        {
            loadSearchData(nattakan_search_id, nattakan_reservation_id);
        }
    }

    function loadSearchData(nattakan_search_id, nattakan_reservation_id)
    {
        let url = that.url+'?action=search_data&locale='+nattakan_locale+'&guid='+nattakan_search_id;
        jQuery( "#reservation-form" ).fadeTo( 500 , 0, function() {
            // Animation complete.
            jQuery('#reservation-form').addClass('hidden');
            jQuery('#therapist-animation').removeClass('hidden');
            jQuery('#therapist-animation').fadeTo(500, 1, function(){
                fadeComplete = true;
            });
            scrollToAnimationIfNeeded();
        });
        jQuery.post(url, {}, function(data){
            try{
                let d = JSON.parse(data);
                that.searchResults.data = d;
                that.searchResults.reservationProposals = d.reservationProposals;

                setTimeout(function(){
                    jQuery('#therapist-animation').fadeTo(300, 0, function(){
                        jQuery('#therapist-animation').addClass('hidden');
                        jQuery('#confirm-form').removeClass('hidden');
                        jQuery('#confirm-form').fadeTo(300, 1, function(){
                            for(let i = 0; i < that.searchResults.reservationProposals.length; i++)
                            {
                                let proposal = that.searchResults.reservationProposals[i];
                                if (proposal.guid === nattakan_reservation_id)
                                {
                                    bookNowOnClickCallbackInt(proposal);
                                }
                            }
                        });
                    });
                }, 2000);
            }catch(e){
                window.location.href = labels_nattakan['page.booking.link_for_errors'];
            }
        });
    }

    function clearIds()
    {

        setCookie('nattakan_search_id', that.searchResults.data.guid, -2400);
        setCookie('nattakan_reservation_id', that.selectedReservation.guid, -2400);
    }
    function dateDiff(date1, date2)
    {
        date1.setHours(0,0,0,0);
        date2.setHours(0,0,0,0);
        return parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
    }
    this.doSearch = function ()
    {
        clearIds();
        var searchData = JSON.parse(JSON.stringify(this.reservationForm.form));

        switch(this.reservationForm.form.shops)
        {
            case 0:
                searchData['shops'] = [1, 2];
                break;
            case 1:
            case 2:
            default:
                searchData['shops'] = [this.reservationForm.form.shops];
                break;
        }
        let people = [];
        for (let i = 0; i < that.reservationForm.form.people; i++)
        {
            people.push('person '+i);
        }

        if (people.length > 1)
        {
            that.searchResults.people = people;
        }

        let d = new Date();
        let d2 = new Date(searchData['date']);

        searchData['date'] =  dateDiff(d, d2);

        let url = that.url+'?action=find&locale='+nattakan_locale;

        var fadeComplete = false;
        jQuery( "#reservation-form" ).fadeTo( 500 , 0, function() {
            // Animation complete.
            jQuery('#reservation-form').addClass('hidden');
            jQuery('#therapist-animation').removeClass('hidden');
            jQuery('#therapist-animation').fadeTo(500, 1, function(){
                fadeComplete = true;
            });
            scrollToAnimationIfNeeded();
        });
        jQuery.post(url, searchData, function(data){
            try{
                let d = JSON.parse(data);
                that.searchResults.data = d;
                that.searchResults.reservationProposals = d.reservationProposals;

                setTimeout(function(){
                    jQuery('#therapist-animation').fadeTo(300, 0, function(){
                        jQuery('#therapist-animation').addClass('hidden');
                        jQuery('#confirm-form').removeClass('hidden');
                        jQuery('#confirm-form').fadeTo(300, 1, function(){
                        });
                    });
                }, 2000);
            }catch(e){
                window.location.href = labels_nattakan['page.booking.link_for_errors'];
            }

        });
    };


    this.bookNowWithFullData = function(event, data) {

        if (
            !that.modalConfirmData.form.contactType ||
            (that.modalConfirmData.form.contactType === 'phone' && !that.modalConfirmData.form.phone) ||
            (that.modalConfirmData.form.contactType !== 'phone' && !that.modalConfirmData.form.email)

        ) {
            alert('You need to provide contact details, phone number or e-mail address!');
            return;
        }

        if (
            that.modalConfirmData.form.contactType !== 'phone' &&
            that.modalConfirmData.form.email &&
            (
                that.modalConfirmData.form.email.indexOf('@') <= 0 ||
                that.modalConfirmData.form.email.indexOf('@') === that.modalConfirmData.form.email.length - 1
            )
        )
        {

            alert('You need to provide valid e-mail address!');
            return;
        }

        let people = parseInt(that.searchResults.data.people);
        let proposal_id = (that.selectedReservation.guid);
        let description = (that.selectedReservation.description);

        let shop = (that.selectedReservation.shopName);
        let price = 150;
        let length = parseInt(that.reservationForm.form.length);
        switch(length){
            case '30':
                price = 90;
                break;
            case '45':
                price = 115;
                break;
            case '60':
                price = 150;
                break;
            case '90':
                price = 210;
                break;
            case '120':
                price = 260;
                break;
        }
        let value = price*parseInt(people);
        clearIds();
        trackConversion(value, proposal_id, shop, price, people, length);

        let redirect_link = redirect_link_centrum;
        let centrum = true;
        if(shop.toString().indexOf('Old Town') >= 0 || shop.toString().indexOf('Stare Miasto') >= 0){
            redirect_link = redirect_link_old_town;
            centrum = false;
        }


        let dys = event.currentTarget;

        jQuery(dys).html('<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
        jQuery('button').attr('disabled', true).css('opacity', 0.5);
        jQuery(dys).css('opacity', 1);
        let url = that.url+'?action=book&guid='+proposal_id+'&locale='+nattakan_locale;

        var postData = JSON.parse(JSON.stringify(that.modalConfirmData.form));
        postData['phone'] = phoneInput.getNumber();

        jQuery.post(url, postData, function(data){
            try{
                let dataParsed = JSON.parse(data);
                if(dataParsed.msg == 'ok'){

                    showConfirmationPage();
                    // jQuery('#booking-confirmation-placeholder').html('<form action="'+redirect_link+'" name="confirmation-form" method="get" style="display:none;"><input type="text" name="proposal_id" value="' + proposal_id + '" /><input type="text" name="description" value="' + description + '" /><input type="text" name="people" value="' + people + '" /></form>');
                    // document.forms['confirmation-form'].submit();

                }else if(dataParsed.msg == 'conflict'){
                    alert(labels_nattakan['page.booking.error_message_conflict']);
                    // closeModal();
                    // that.nattakanBackToSearch();
                    window.location.reload();
                }
                else{
                    showConfirmationPage();
                    // jQuery('#booking-confirmation-placeholder').html('<form action="'+labels_nattakan['page.booking.link_for_errors']+'" name="confirmation-form" method="get" style="display:none;"><input type="text" name="proposal_id" value="' + proposal_id + '" /><input type="text" name="description" value="' + description + '" /><input type="text" name="people" value="' + people + '" /></form>');
                    // document.forms['confirmation-form'].submit();
                }
            }catch(e){
                window.location.href = labels_nattakan['page.booking.link_for_errors'];
            }
        });

    }

    function showConfirmationPage()
    {
        that.closeModal();
        jQuery('#booking-confirmation-page').removeClass('hidden');
        jQuery('#page-booking').addClass('hidden');
    }

    function trackConversion(value, proposal_id, shop, price, qty, length)
    {

        /*
                gtag('event', 'reservation', {
                    'value': value,
                    'currency': 'PLN',
                    'transaction_id': proposal_id,
                });
        */
        var item = {
            'item_id': 'SKU_MASSAGE_RESERVATION_'+length+'_MIN',
            'item_name': 'Massage booking from website '+length+' min.',
            'location_id': shop,
            'item_variant': length+'min',
            'price': price,
            'quantity': qty
        };
        var gtagdata = {
            'transaction_id': proposal_id,
            'value': value,
            'tax': parseFloat(value*0,23),
            'currency': 'PLN',
            'items': [item]
        };

        try {
            gtag('event', 'purchase', gtagdata);
        }catch(e){
            console.log(e);
        }

        try{
            fbq('track', 'Purchase', {currency: "PLN", value: value});
        }catch(e){
            console.log(e);
        }

        try{
            wph('track', 'Purchase', {
                transaction_id: proposal_id,
                value: value,
                value_gross: value
            });
        }catch(e){
            console.log(e);
        }

        try{
            window.lintrk('track', { conversion_id: proposal_id });
        }catch(e){
            console.log(e);
        }

    }
    that.closeModal = function()
    {
        const modal = document.getElementById('modal-confirm');
        modal.classList.add("hidden");
        clearIds();
    }
    this.showModal = function()
    {
        //event.preventDefault();
        const modal = document.getElementById('modal-confirm');
        modal.classList.remove("hidden");
        //document.getElementById('modal-confirm').scrollTo(0, 0);
        return;
    }

    this.nattakanBackToSearch = function(){
        jQuery('#confirm-form').fadeTo(500, 0, function(){
            jQuery('#confirm-form').addClass('hidden');
            jQuery('#reservation-form').removeClass('hidden').fadeTo(300, 1, function(){
            });
        });
    }

    that.changeContactType = function(type)
    {
        that.modalConfirmData.form.contactType = type;
        if (type === 'google')
        {
            setCookie('nattakan_search_id', that.searchResults.data.guid, 10);
            setCookie('nattakan_reservation_id', that.selectedReservation.guid, 10);
            window.location.href = googleLoginUrl;
        }

        if (type === 'facebook')
        {
            setCookie('nattakan_search_id', that.searchResults.data.guid, 10);
            setCookie('nattakan_reservation_id', that.selectedReservation.guid, 10);
            window.location.href = fbLoginUrl;
        }
    }
}

window.onerror = function(msg, url, line, col, error) {
    console.error(msg);
    var extra = !col ? '' : '\ncolumn: ' + col;
    extra += !error ? '' : '\nerror: ' + error;
    var error_data = {
        url: document.location.href,
    };
    if(error != null) {
        error_data['name'] = error.name; // e.g. ReferenceError
        error_data['message'] = error.line;
        error_data['stack'] = error.stack;
    } else {
        error_data['msg'] = msg;
        error_data['filename'] = filename;
        error_data['line'] = line;
        error_data['col'] = col;
    }

    var xhr = new XMLHttpRequest();

    xhr.open('POST', that.url+'?action=error&locale='+nattakan_locale);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
        } else if (xhr.status !== 200) {

        }
    };
    xhr.send(JSON.stringify(error_data));

    var suppressErrorAlert = true;
    return suppressErrorAlert;
};

let nattakanReservation;

jQuery(document).ready(function(){
    nattakanReservation = new NattakanReservation();
    nattakanReservation.init();
});

function scrollToAnimationIfNeeded(){
    var top_of_element = jQuery("#therapist-animation").offset().top;
    var bottom_of_element = jQuery("#therapist-animation").offset().top + jQuery("#therapist-animation").outerHeight();
    var bottom_of_screen = jQuery(window).scrollTop() + jQuery(window).innerHeight();
    var top_of_screen = jQuery(window).scrollTop();
    //if (!((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element))) {
    if(!(top_of_screen <= top_of_element && bottom_of_screen >= bottom_of_element)){
        var headerHeight = jQuery('#masthead').height();
        jQuery([document.documentElement, document.body]).animate({
            scrollTop: jQuery("#therapist-animation").offset().top - 30 - headerHeight
        }, 500);
    }
}
function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}
function setCookie(cname, cvalue, exminutes) {
    const d = new Date();
    d.setTime(d.getTime() + (exminutes*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
