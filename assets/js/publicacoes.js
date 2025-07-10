$("#nova-publicacao").on("submit", criarPublicacao);
$(document).on("click", ".curtir-publicacao", curtirPublicacao);
$(document).on("click", ".descurtir-publicacao", descurtirPublicacao);
$("#atualizar-publicacao").on("click", atualizarPublicacao);
//$(".deletar-publicacao").on("click", deletarPublicacao);
$(document).on("click", ".deletar-publicacao", deletarPublicacao);

function criarPublicacao(evento) {
  evento.preventDefault(); // <-- CERTO

  $.ajax({
    url: "/publicacoes",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      titulo: $("#titulo").val(),
      conteudo: $("#conteudo").val(),
    }),
  })
    .done(function () {
      window.location = "/home";
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(
        "Erro ao criar Publicacao: " + jqXHR.status + " - " + jqXHR.responseText
      );
      console.error(jqXHR, textStatus, errorThrown);
    });
}

function curtirPublicacao(evento) {
  evento.preventDefault();

  const elementoClicado = $(evento.target);
  const publicacaoId = elementoClicado.closest("div").data("publicacao-id");
  elementoClicado.prop("disabled", true);
  $.ajax({
    url: `publicacoes/${publicacaoId}/curtir`,
    method: "POST",
  })
    .done(function () {
      const contadorDeCurtidas = elementoClicado.next("span");
      const quantidadeDeCurtidas = parseInt(contadorDeCurtidas.text());
      contadorDeCurtidas.text(quantidadeDeCurtidas + 1);
      elementoClicado.addClass("descurtir-publicacao");
      elementoClicado.addClass("text-danger");
      elementoClicado.removeClass("curtir-publicacao");
    })
    .fail(function () {
      alert("Erro ao  Curtir");
    })
    .always(function () {
      elementoClicado.prop("disabled", false);
    });
}
//TODO:Criar uma lógica no back-end pára descurtir e curtir e remover essa feita por JS
function descurtirPublicacao(evento) {
  evento.preventDefault();

  const elementoClicado = $(evento.target);
  const publicacaoId = elementoClicado.closest("div").data("publicacao-id");

  elementoClicado.prop("disabled", true);
  $.ajax({
    url: `publicacoes/${publicacaoId}/descurtir`,
    method: "POST",
  })
    .done(function () {
      const contadorDeCurtidas = elementoClicado.next("span");
      const quantidadeDeCurtidas = parseInt(contadorDeCurtidas.text());
      contadorDeCurtidas.text(quantidadeDeCurtidas - 1);
      elementoClicado.removeClass("descurtir-publicacao");
      elementoClicado.removeClass("text-danger");
      elementoClicado.addClass("curtir-publicacao");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert("Erro ao  Curtir");
    })
    .always(function () {
      elementoClicado.prop("disabled", false);
    });
}

function atualizarPublicacao(evento) {
  $(this).prop("disabled", true);

  const publicacaoId = $(this).data("publicacao-id");

  $.ajax({
    url: `/publicacoes/${publicacaoId}`,
    method: "PUT",
    data: {
      titulo: $("#titulo").val(),
      conteudo: $("#conteudo").val(),
    },
  })
    .done(function () {
      Swal.fire("Sucesso!", "Publicação atualizada", "success").then(
        function () {
          window.location = "/home";
        }
      );
    })
    .fail(function () {
      alert("Erro ao editar publicacao");
    })
    .always(function () {
      $("#atualizar-publicacao").prop("disabled", false);
    });
}

function deletarPublicacao(evento) {
  evento.preventDefault();

  Swal.fire({
    title: "Atencao!",
    text: "Tem certeza que deseja excluir",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    icon: "warning",
  }).then(function (confirmacao) {
    if (!confirmacao.value) return;

    const elementoClicado = $(evento.target);
    const publicacao = elementoClicado.closest("div");
    const publicacaoId = publicacao.data("publicacao-id");

    elementoClicado.prop("disabled", true);

    $.ajax({
      url: `/publicacoes/${publicacaoId}`,
      method: "DELETE",
      dataType: "text", // <-- AQUI
    })
      .done(function () {
        publicacao.fadeOut("slow", function () {
          $(this).remove();
        });
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error(
          "Erro ao deletar:",
          jqXHR.status,
          jqXHR.responseText,
          textStatus,
          errorThrown
        );
        alert("Erro ao deletar publicacao");
      });
  });

  /*
  $.ajax({
    url: `/publicacoes/${publicacaoId}`,
    method: "DELETE",
    dataType: "text", // <-- AQUI
  })
    .done(function (respostaTexto) {
      try {
        const resposta = JSON.parse(respostaTexto);
        alert(resposta.mensagem || "Removido!");
      } catch {
        alert("Removido! (resposta não era JSON)");
      }
      publicacao.fadeOut("slow", function () {
        $(this).remove();
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error(
        "Erro ao deletar:",
        jqXHR.status,
        jqXHR.responseText,
        textStatus,
        errorThrown
      );
      alert("Erro ao deletar publicacao");
    });*/
}
