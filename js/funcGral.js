function loadingUI(message, color) {
    $.blockUI({
        baseZ: 2000,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: color,
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            //opacity                  : 0.5,
            color: '#003465',
            //width                    : '40em'

        },
        message: '<h2><i class="fas fa-spinner fa-pulse"></i> <span class="hidden-xs">' + message + '</span></h2>'
    });
}

function responseUI(message, color) {
    $.blockUI({
        baseZ: 2000,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: color,
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: 0.5,
            color: '#fff'
        },
        message: '<h2 class="blockUIMensaje">' + message + '</h2>'
    });

    setTimeout(function() {
        $.unblockUI();
    }, 2000);
}

// $(".nav-link").click(function(event) {

// })


function selectedOptionMenu(id, clase, subId = '', navlink = '') {

    if (subId != '') {
        $(".nav-link").attr('class', 'nav-link');
        $("#" + subId).attr('class', navlink);
    }

    $(".br-menu-link").attr('class', 'br-menu-link');
    $("#" + id).attr('class', clase);

}

function destroy_existing_data_table(tableDestry) {
    var existing_table = $(tableDestry).dataTable();
    if (existing_table != undefined) {
        existing_table.fnClearTable();
        existing_table.fnDestroy();
    }
}

function ajaxError(statusCode, errorThrown) {

    if (statusCode.status == 0) {
        alertify.alert('Alerta...', '<h4 class="yellow">Internet: Problemas de Conexion</h4>', function() {
            alertify.success('Ok');
        });
    } else if (statusCode.status == 422) {
        console.warn(statusCode.responseJSON.errors);
        // display errors on each form field
        $.each(statusCode.responseJSON.errors, function(i, error) {
            var el = $(document).find('[name="' + i + '"]');
            console.log(el)
            el.after($('<p style="color: #a94442;background-color: #f2dede;border-color: #ebccd1;padding:1px 20px 1px 20px;">' + error[0] + '</p>'));
        })

    } else {
        console.log(statusCode);
        console.log(errorThrown);
        alertify.alert('Alerta...', '<h4 class="text-danger"><i class="text-danger fas fa-exclamation-triangle"></i> Error del Sistema</h4>', function() {
            alertify.success('Ok');
        });
    }


}

function performSignIn() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    //  headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    headers.append('Origin', 'http://localhost:3000');

    fetch(sign_in, {
            mode: 'cors',
            credentials: 'include',
            method: 'POST',
            headers: headers
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log('Authorization failed : ' + error.message));
}