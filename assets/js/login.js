$("#login").on("submit", fazerLogin);

function fazerLogin(event) {
  event.preventDefault();

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
    .fail(function (erro) {
      console.log(erro);
      alert("Usuario ou senha invalidos.");
    });
}
