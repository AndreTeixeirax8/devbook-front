$("#formulario-cadastro").on("submit", criarUsuario);

function criarUsuario(evento) {
  evento.preventDefault();

  if ($("#senha").val() != $("#confirmarSenha").val()) {
    alert("As senhas não conferem");
    return;
  }
}
