package rotas

import (
	"devbook-front/src/controllers"
	"net/http"
)

var rotaPaginaPrincipal = Rotas{
	URI:                "/home",
	Metodo:             http.MethodGet,
	Funcao:             controllers.CarregarPaginaPrincipal,
	RequerAutenticacao: true,
}
