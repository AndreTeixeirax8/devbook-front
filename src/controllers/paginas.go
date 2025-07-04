package controllers

import (
	"devbook-front/src/config"
	"devbook-front/src/cookies"
	"devbook-front/src/modelos"
	"devbook-front/src/requisicoes"
	"devbook-front/src/respostas"
	"devbook-front/src/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func CarregarTelaDeLogin(w http.ResponseWriter, r *http.Request) {
	utils.ExecutarTemplate(w, "login.html", nil)
}
func CarregarPaginaDeCadastroDeUsuario(w http.ResponseWriter, r *http.Request) {
	utils.ExecutarTemplate(w, "cadastro.html", nil)
}

func CarregarPaginaPrincipal(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf("%s/publicacoes", config.APIURL)
	response, erro := requisicoes.FazerRequisicaoComAuteticacao(r, http.MethodGet, url, nil)
	if erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroApi{Erro: erro.Error()})
		return
	}
	defer response.Body.Close()

	if response.StatusCode >= 400 {
		respostas.TratarStatusCodeDeErro(w, response)
		return
	}

	var publicacoes []modelos.Publicacoes
	if erro = json.NewDecoder(response.Body).Decode(&publicacoes); erro != nil {
		respostas.JSON(w, http.StatusUnprocessableEntity, respostas.ErroApi{Erro: erro.Error()})
		return
	}

	cookie, _ := cookies.Ler(r)
	usuarioID, _ := strconv.ParseUint(cookie["id"], 10, 64)

	utils.ExecutarTemplate(w, "home.html", struct {
		Publicacoes []modelos.Publicacoes
		UsuarioID   uint64
	}{
		Publicacoes: publicacoes,
		UsuarioID:   usuarioID,
	})
}
