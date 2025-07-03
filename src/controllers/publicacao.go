package controllers

import (
	"bytes"
	"devbook-front/src/config"
	"devbook-front/src/requisicoes"
	"devbook-front/src/respostas"
	"encoding/json"
	"fmt"
	"net/http"
)

type PublicacaoRequest struct {
	Titulo   string `json:"titulo"`
	Conteudo string `json:"conteudo"`
}

func CriarPublicacao(w http.ResponseWriter, r *http.Request) {
	var req PublicacaoRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respostas.JSON(w, http.StatusBadRequest, respostas.ErroApi{Erro: "Dados inválidos"})
		return
	}

	publicacao, erro := json.Marshal(map[string]string{
		"titulo":   req.Titulo,
		"conteudo": req.Conteudo,
	})

	url := fmt.Sprintf("%s/publicacoes", config.APIURL)
	response, erro :=
		requisicoes.FazerRequisicaoComAuteticacao(r, http.MethodPost, url, bytes.NewBuffer(publicacao))

	if erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroApi{Erro: erro.Error()})
	}
	defer response.Body.Close()

	if response.StatusCode >= 400 {
		respostas.TratarStatusCodeDeErro(w, response)
		return
	}

	respostas.JSON(w, response.StatusCode, nil)

}
