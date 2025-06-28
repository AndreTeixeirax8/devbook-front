$("#formulario-cadastro").on("submit", criarUsuario);

function criarUsuario(evento) {
  evento.preventDefault();

  if ($("#senha").val() != $("#confirmar-senha").val()) {
    console.log("Senha:", $("#senha").val());
    console.log("Confirmar:", $("#confirmar-senha").val());
    alert("As senhas não conferem");
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
  });
}
