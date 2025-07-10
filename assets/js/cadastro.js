$("#formulario-cadastro").on("submit", criarUsuario);

function criarUsuario(evento) {
  evento.preventDefault();

  if ($("#senha").val() != $("#confirmar-senha").val()) {
    Swal.fire("Ops...", "As senhas não conferem", error);
    return;
  }

  $.ajax({
    url: "http://localhost:3000/usuarios",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      nome: $("#nome").val(),
      email: $("#email").val(),
      nick: $("#nick").val(),
      senha: $("#senha").val(),
    }),
  })
    .done(function () {
      //faz o cadastro de usuario e já chama rota de login
      Swal.fire("Sucesso!", "Usuário cadastrado com sucesso!", "success").then(
        function () {
          $.ajax({
            url: "/login",
            method: "POST",
            data: {
              email: $("#email").val(),
              senha: $("#senha").val(),
            },
          })
            .done(function () {
              window.location = "/home";
            })
            .fail(function () {
              Swal.fire("Ops...", "Erro ao cadastrar usuario", error);
            });
        }
      );
    })
    .fail(function (erro) {
      Swal.fire("Ops...", "Erro ao cadastrar usuario", error);
    });
}
