$("#nova-publicacao").on("submit", criarPublicacao);
$(document).on("click", ".curtir-publicacao", curtirPublicacao);

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
    })
    .fail(function () {
      alert("Erro ao  Curtir");
    })
    .always(function () {
      elementoClicado.prop("disabled", false);
    });
}
