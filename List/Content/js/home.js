/* Métodos */
function carregaLista() {
    fetch("/api/Tarefas")
        .then(function (response) {
            response.json().then(function (tarefas) {
                linhasHtml = preperaLinhaHtml(tarefas);
                if (linhasHtml !== "")
                    $('#tasks').append(linhasHtml);
                else
                    $('#tasks').append("<span id='nenhumaTarefa'>Nenhuma tarefa! Cadastre suas tarefas.</span>");
            });
        })
        .catch(function (err) {
            console.error(err);
        });
}

function criarTarefa(tarefa) {
    fetch("/api/Tarefas", {
        method: 'POST',
        body: JSON.stringify(tarefa),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(function (response) {
            $('#createModal').modal('hide');
            novoAlert("Tarefa criada com sucesso", "success");
            response.json().then(function (data) {
                
                linhasHtml = preperaLinhaHtml(new Array(data));

                if ($('#tasks li').length === 0)
                    $('#nenhumaTarefa').remove();

                $('#tasks').append(linhasHtml);

            });
        })
        .catch(function (err) {
            console.error(err);
            novoAlert("Problema ao editar", "danger");
        });
}

function deletaTarefa(id, linha) {
    fetch("/api/Tarefas/" + id, {
        method: 'DELETE'
    })
        .then(function (response) {
            response.text()
                .then(function (result) {
                    $(linha).parent().parent().remove();
                    novoAlert("Deletado com sucesso", "success");
                    if ($('#tasks li').length === 0)
                        $('#tasks').append("<span id='nenhumaTarefa'>Nenhuma tarefa! Cadastre suas tarefas.</span>");
                });
        })
        .catch(function (err) {
            console.error(err);
            novoAlert("Problema ao deletar", "danger");
        });
}

function editaTarefa(id, linha) {
    fetch("/api/Tarefas/" + id, {
        method: 'PUT',
        body: JSON.stringify(linha),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(function (response) {
            $('#tasks li[data-id=' + id + ']').data("titulo", linha.ds_titulo);
            $('#tasks li[data-id=' + id + ']').data("desc", linha.ds_descricao);
            $('#tasks li[data-id=' + id + '] h6').text(linha.ds_titulo);
            $('#tasks li[data-id=' + id + '] small').text(linha.ds_descricao);
            $('#editModal').modal('hide');
            novoAlert("Editado com sucesso", "success");
        })
        .catch(function (err) {
            console.error(err);
            novoAlert("Problema ao editar", "danger");
        });
}

function trocaEstado(id, estado) {
    novoEstado = (estado === 1 ? true : false); // inversão dos estados

    fetch("/api/Tarefas/" + id + "/" + novoEstado.toString())
        .then(function (response) {
            if (!estado) {
                $('#tasks li[data-id=' + id + '] div').addClass('text-success');
                $('#tasks li[data-id=' + id + '] small').addClass('text-success');
                $('#tasks li[data-id=' + id + '] small').removeClass('text-muted');
                $('#tasks li[data-id=' + id + '] .action-check-ok').removeClass('d-none');
                $('#tasks li[data-id=' + id + '] .action-check-nok').addClass('d-none');
            } else {
                $('#tasks li[data-id=' + id + '] div').removeClass('text-success');
                $('#tasks li[data-id=' + id + '] small').removeClass('text-success');
                $('#tasks li[data-id=' + id + '] small').addClass('text-muted');
                $('#tasks li[data-id=' + id + '] .action-check-nok').removeClass('d-none');
                $('#tasks li[data-id=' + id + '] .action-check-ok').addClass('d-none');
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

function preperaLinhaHtml(tarefas) {

    var linhaTarefa = "";

    for (i = 0; tarefas.length > i; i++)
        linhaTarefa += "<li class='list-group-item d-flex justify-content-between' data-id='" + tarefas[i].id + "' data-titulo='" + tarefas[i].ds_titulo + "' data-desc='" + tarefas[i].ds_descricao + "'>\
                            <div class='text-left " + ((tarefas[i].fg_finalizado) ? 'text-success' : ' ') + "'>\
                                <h6>" + tarefas[i].ds_titulo + "</h6>\
                                <small class='" + ((tarefas[i].fg_finalizado) ? 'text-success' : 'text-muted') + "'>" + ((tarefas[i].ds_descricao !== null) ? tarefas[i].ds_descricao : "") + "</small>\
                            </div>\
                            <span class='text-muted'>\
                                <i class='fa fa-dot-circle fa-2x action-check-ok " + (!tarefas[i].fg_finalizado ? "d-none" : "") + "' style='margin-left: 10px; cursor: pointer;'></i><i class='fa fa-circle fa-2x action-check-nok " + (tarefas[i].fg_finalizado ? "d-none" : "") + "' style='margin-left: 10px; cursor: pointer;'></i>\
                                <i class='fa fa-pen-square fa-2x action-edit' style='margin-left: 10px; cursor: pointer;' data-toggle='modal' data-target='#editModal'></i>\
                                <i class='fa fa-trash-alt fa-2x action-delete' style='margin-left: 10px; cursor: pointer;'></i>\
                            </span>\
                        </li>";

    return linhaTarefa;
}

function novoAlert(msg, type) {
    $('#textAlertCss').text(msg);
    $('#alertCss').addClass('alert-'+ type);
    $('#alertCss').removeClass('d-none');
    setTimeout(() => {
        $('#alertCss').addClass('d-none');
        $('#alertCss').removeClass('alert-' + type);
    }, 5000);
}


/* Eventos */
$('#tasks').on("click", ".action-check-ok", function () {
    trocaEstado($(this).parent().parent().data("id"), 1);
});

$('#tasks').on("click", ".action-check-nok", function () {
    trocaEstado($(this).parent().parent().data("id"), 0);
});

$('#salvarTarefa').on("click", function () {
    if ($("#createTitulo").val() !== "") {
        var tarefa = {};
        tarefa.ds_titulo = $("#createTitulo").val();
        tarefa.ds_descricao = $("#createDesc").val();
        criarTarefa(tarefa);
    } else {
        $('#createModal').modal('hide');
        novoAlert("É necessário um título para salvar a tarefa", "danger");
    }
});

$('#tasks').on("click", ".action-delete", function () {
    deletaTarefa($(this).parent().parent().data("id"), $(this));
});

$('#editarTarefa').on("click", function () {
    var tarefa = {};
    tarefa.ds_titulo = $("#titulo").val();
    tarefa.ds_descricao = $("#desc").val();
    tarefa.id = $('#editarTarefa').data("id");
    editaTarefa($('#editarTarefa').data("id"), tarefa);
});

$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var titulo = $(button).parent().parent().data('titulo');
    var desc = $(button).parent().parent().data('desc');
    var id = $(button).parent().parent().data('id');
    var modal = $(this);

    modal.find('.modal-title').text('Editar tarefa ' + titulo);
    modal.find('.modal-body #titulo').val(titulo);
    modal.find('.modal-body #desc').val(desc);
    modal.find('#editarTarefa').data("id", id);
});