$("#parar-de-seguir").on("click", pararDeSeguir);
$("#seguir").on("click", seguir);
$("#editar-usuario").on("submit", editar);
$("#atualizarSenha").on("submit", atualizarSenha);

function pararDeSeguir() {
  const usuarioId = $(this).data("usuario-id");
  $(this).prop("disabled", true);

  $.ajax({
    url: `/usuarios/${usuarioId}/parar-se-seguir`,
    method: "POST",
  })
    .done(function () {
      window.location = `/usuarios/${usuarioId}`;
    })
    .fail(function () {
      Swal.fire("Ops...", "Erro ao parar de seguir o usuário", "error");
      $("#parar-de-seguir").prop("disaled", false);
    });
}

function seguir() {
  const usuarioId = $(this).data("usuario-id");
  $(this).prop("disabled", true);

  $.ajax({
    url: `/usuarios/${usuarioId}/seguir`,
    method: "POST",
  })
    .done(function () {
      window.location = `/usuarios/${usuarioId}`;
    })
    .fail(function () {
      Swal.fire("Ops...", "Erro ao seguir o usuário", "error");
      $("seguir").prop("disaled", false);
    });
}

function editar(evento) {
  evento.preventDefault();

  $.ajax({
    url: "/editar-usuario",
    method: "PUT",
    data: {
      nome: $("#nome").val(),
      email: $("#email").val(),
      nick: $("#nick").val(),
    },
  })
    .done(function () {
      Swal.fire("Sucesso!", "Usuario Atualizado", "success").then(function () {
        window.location = "/perfil";
      });
    })
    .fail(function () {
      Swal.fire("Ops..", "Erro ao atualizar o usuario", "error");
    });
}

function atualizarSenha(evento) {
  evento.preventDefault();

  if ($("#nova-senha").val() != $("#confirmar-senha").val()) {
    Swal.fire("Ops...", "As Senhas não coincidem!", "warning");
    return;
  }

  $.ajax({
    url: "/atualizar-senha",
    method: "POST",
    data: {
      atual: $("#senha-atual").val(),
      nova: $("#nova-senha").val(),
    },
  })
    .done(function () {
      Swal.fire("Sucesso", "A Senha foi atualizada", "success").then(
        function () {
          window.location = "/perfil";
        }
      );
    })
    .fail(function () {
      Swal.fire("Ops...", "Falha ao alterar as senhas", "error");
    });
}
