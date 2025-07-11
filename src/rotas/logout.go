package rotas

import (
	"devbook-front/src/controllers"
	"net/http"
)

var rotaLogout = Rotas{
	URI:                "/logout",
	Metodo:             http.MethodGet,
	Funcao:             controllers.FazerLogout,
	RequerAutenticacao: true,
}
