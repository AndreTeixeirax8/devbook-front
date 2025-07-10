$("#nova-publicacao").on("submit", criarPublicacao);
$(document).on("click", ".curtir-publicacao", curtirPublicacao);
$(document).on("click", ".descurtir-publicacao", descurtirPublicacao);
$("#atualizar-publicacao").on("click", atualizarPublicacao);

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
      alert("Publicacao editada");
    })
    .fail(function () {
      alert("Erro ao editar publicacao");
    })
    .always(function () {
      $("#atualizar-publicacao").prop("disabled", false);
    });
}
