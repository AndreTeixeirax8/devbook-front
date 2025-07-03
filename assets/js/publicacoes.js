$("#nova-publicacao").on("submit", criarPublicacao);

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
