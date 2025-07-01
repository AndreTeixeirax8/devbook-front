package rotas

import(
	"net/http"
	"devbook-front/src/controllers"
)

var rotaPaginaPrincipal = Rotas{
URI: "/home",
Metodo: http.MethodGet,
Funcao: controllers.CarregarPaginaPrincipal,
RequerAutenticacao: true,

}