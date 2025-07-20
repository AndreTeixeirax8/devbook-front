$("#parar-de-seguir").on("click", pararDeSeguir);
$("#seguir").on("click", seguir);
$("#editar-usuario").on("submit", editar);
$("#atualizar-senha").on("submit", atualizarSenha);
$("#deletar-usuario").on("click", deletarUsuario);

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

  const senhaAtual = $("#senha-atual").val();
  const novaSenha = $("#nova-senha").val();
  const confirmarSenha = $("#confirmar-senha").val();

  if (novaSenha !== confirmarSenha) {
    Swal.fire("Ops...", "As senhas não coincidem!", "warning");
    return;
  }

  $.ajax({
    url: "/atualizar-senha",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      atual: senhaAtual,
      nova: novaSenha,
    }),
  })
    .done(function () {
      Swal.fire("Sucesso!", "Senha atualizada com sucesso!", "success").then(
        function () {
          window.location = "/perfil";
        }
      );
    })
    .fail(function () {
      Swal.fire("Ops...", "Falha ao atualizar a senha!", "error");
    });
}

function deletarUsuario(evento) {
  Swal.fire({
    title: "Atenção!",
    text: "Tem certeza que deseja apagar? Ação é irreversivel",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    icon: "warning",
  }).then(function (confirmacao) {
    if (confirmacao.value) {
      $.ajax({
        url: "/deletarUsuario",
        method: "DELETE",
      })
        .done(function () {
          Swal.fire("Sucesso!", "Seu usuario foi excluido", "success").then(
            function () {
              window.location = "/logout";
            }
          );
        })
        .fail(function () {
          Swal.fire("Ops..", "Ocorreu um erro ao excluir o usuario", "error");
        });
    }
  });
}
