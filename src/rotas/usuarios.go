package rotas

import (
	"devbook-front/src/controllers"
	"net/http"
)

var rotasUsuarios = []Rotas{
	{
		URI:                "/criar-usuario",
		Metodo:             http.MethodGet,
		Funcao:             controllers.CarregarPaginaDeCadastroDeUsuario,
		RequerAutenticacao: false,
	},
	{
		URI:                "/usuarios",
		Metodo:             http.MethodGet,
		Funcao:             controllers.CriarUsuario,
		RequerAutenticacao: false,
	},
}
