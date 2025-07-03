package rotas

import (
	"devbook-front/src/controllers"
	"net/http"
)

var rotasPublicacoes = []Rotas{
	{
		URI:                "/publicacoes",
		Metodo:             http.MethodPost,
		Funcao:             controllers.CriarPublicacao,
		RequerAutenticacao: true,
	},
}
