$(document).on('ready', function() {
    var objetoDataTables_clientes = '';
    $('#paises').load('paises.html');

    cargarProductos()

    function cargarProductos() {

        $.ajax({ // Busca el Tipo de Cliente
            url: "https://siglabweb.medlab.com.pe/desarrollo/clienteWeb/funcgral.php",
            type: "post",
            crossDomain: true,
            dataType: 'json',
            data: {
                'Tipo': 'CargaProductos',
                'P1': '',
                'P2': '',
                'P3': '',
                'P4': '',
                'P5': ''
            },
            success: function(productos) {
                console.log(productos)

                $("#productos").empty();
                $(productos).each(function(i, data1) {

                    if (data1.valor == productos.IdTipo || data1.valor == productos.IdTipo2 || data1.valor == productos.IdTipo3) {
                        $("#productos").append('<option selected value="' + data1.valor + '">' + data1.etiqueta + '</option>');
                    } else {
                        $("#productos").append('<option value="' + data1.valor + '">' + data1.etiqueta + '</option>');
                    }

                });

            },
            error: function(data) {
                alert("Error Sucedió un Error Inesperado", "gritter-error");
            }
        });

    }

    $('#modalClientes').on('show.bs.modal', function(event) {
        var $paises = $("#nacionalidad").select2();
        $paises.select2('destroy');
        $('.select2').select2({
            theme: 'bootstrap4',
            width: '100%',
            placeholder: "Seleccione un País",
            language: {
                noResults: function() {
                    return 'País no encontrado...';
                },
            },
            escapeMarkup: function(markup) {
                return markup;
            },
        });


        $('#productos').select2({
            theme: 'bootstrap4',
            width: '100%',
            placeholder: "Seleccione un País",
            language: {
                noResults: function() {
                    return '<button id="no-results-btn" onclick="noResultsButtonClicked()">Producto no existe - Click para agregarlo</a>';
                },
            },
            escapeMarkup: function(markup) {
                return markup;
            },
        });

    })

    $("#recibeCorreo").switchButton({
        on_label: 'Si',
        off_label: 'No'
    });

    $('.chosen-select', this).chosen('destroy').chosen({
        width: '100%',
        height: '200%',
        disable_search_threshold: 10,
        no_results_text: "Oops, busqueda no encontrada!"
    });

    cargaClientesss();

    function cargaClientesss() {


        $.fn.dataTable.ext.buttons.newCliente = {
            className: 'buttons-alert',
            action: function(e, dt, node, config) {
                $("#titleModalCliente").html('<i class="fas fa-user-plus"></i> Agregar nuevo Cliente.');
                $("#idCliente").val('');
                $("#modalClientes").modal('show');
            }
        };
        objetoDataTables_clientes = $('#datatable-clientes').DataTable({
            responsive: true,
            "bInfo": false,
            "searching": true,
            "order": [
                [0, "desc"]
            ],
            dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'B>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            buttons: [{
                extend: 'newCliente',
                text: '<i class="far fa-smile"></i> Nuevo Cliente '
            }],
            "paginationType": "input",
            "sPaginationType": "full_numbers",
            "language": {
                "searchPlaceholder": "Buscar",
                "sProcessing": "Procesando...",
                "sLengthMenu": " _MENU_ Clientes",
                "sZeroRecords": "No se encontró ningún Cliente con la Condición del Filtro",
                "sEmptyTable": "Ningún Cliente Agregado aún...",
                "sInfo": "Del _START_ al _END_ de un total de _TOTAL_ Clientes",
                "sInfoEmpty": "De 0 al 0 de un total de 0 Clientes",
                "sInfoFiltered": "(filtrado de un total de _MAX_ Clientes)",
                "sInfoPostFix": "",
                "sSearch": "",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": '<i class="text-info fa-2x fas fa-spinner fa-pulse"></i> espere cargando los Clientes...',
                "oPaginate": {
                    "sFirst": '<i class="fa fa-fast-backward" aria-hidden="true"></i>',
                    "sLast": '<i class="fa fa-fast-forward" aria-hidden="true"></i>',
                    "sNext": '<i class="fa fa-step-forward" aria-hidden="true"></i>',
                    "sPrevious": '<i class="fa fa-step-backward" aria-hidden="true"></i>',
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            "lengthMenu": [
                [5, 10, 20, 25, 50, -1],
                [5, 10, 20, 25, 50, "Todos"]
            ],
            "iDisplayLength": 10,
            "ajax": {
                "method": "POST",
                "crossDomain": true,
                "url": "https://siglabweb.medlab.com.pe/desarrollo/clienteWeb/FuncGral.php",
                "data": {
                    'Tipo': 'listarClientes',
                    'P1': '',
                    'P2': '',
                    'P3': '',
                    'P4': '',
                    'P5': ''
                }
            },
            "initComplete": function(settings, json) {

            },


        });

        // }).fail(function(xhr, textStatus, errorThrown) {
        //     alert(xhr.responseText);
        // });


    }


    function cargaClientes() {


    }


    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        guardarCliente();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();


    function guardarCliente() {
        alertify.confirm('Datos del Cliente', '<h4 class="text-info">Desea guardar este cliente ..?</h4>', function() {

            var idCliente = $("#idCliente").val();
            var nombres = $("#nombres").val();
            var apellidos = $("#apellidos").val();
            var fec_nacimiento = $("#fec_nacimiento").val();
            var direccion = $("#direccion").val();
            var nacionalidad = $("#nacionalidad").val();
            var ciudad = $("#ciudad").val();
            var fono_contacto = $("#fono_contacto").val();
            var recibeCorreo = $("#recibeCorreo").val();
            var email = $("#email").val();
            var productos = $("#productos").val();
            var observaciones = $("#observaciones").val();
            var datos = [];
            datos.push({
                'idCliente': idCliente,
                'nombres': nombres,
                'apellidos': apellidos,
                'fec_nacimiento': fec_nacimiento,
                'direccion': direccion,
                'nacionalidad': nacionalidad,
                'ciudad': ciudad,
                'fono_contacto': fono_contacto,
                'recibeCorreo': recibeCorreo,
                'email': email,
                'productos': productos,
                'observaciones': observaciones
            });

            datos = JSON.stringify(datos);

            $.ajax({
                url: "https://siglabweb.medlab.com.pe/desarrollo/clienteWeb/funcgral.php",
                type: 'POST',
                crossDomain: true,
                dataType: 'jsonp',
                data: {
                    'Tipo': 'guardarCliente',
                    'P1': datos,
                    'P2': '',
                    'P3': '',
                    'P4': '',
                    'P5': ''
                },
                beforeSend: function() {
                    loadingUI('Actualizando');
                }
            }).done(function(data) {
                console.log(data)
                $.unblockUI();
                alertify.success('Cliente registrado...');
                cargaClientesss();
                $("#modalClientes").modal('hide');

            }).fail(function(statusCode, errorThrown) {
                $.unblockUI();
                console.log(errorThrown);
                ajaxError(statusCode, errorThrown);
            });

            $('#form_register_cliente').each(function() {
                this.reset();
            });

        }, function() { // En caso de Cancelar              
            alertify.error('Se Cancelo el Proceso para Guardar este cliente.');
        }).set('labels', {
            ok: 'Confirmar',
            cancel: 'Cancelar'
        }).set({
            transition: 'zoom'
        }).set({
            modal: true,
            closableByDimmer: false
        });
    }

});