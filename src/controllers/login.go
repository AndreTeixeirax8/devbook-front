package controllers

import (
	"bytes"
	"devbook-front/src/config"
	"devbook-front/src/cookies"
	"devbook-front/src/modelos"
	"devbook-front/src/respostas"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func FazerLogin(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()

	// Log de depuração - NÃO usar em produção!
	fmt.Printf("*******Login recebido: email=%s, senha=%s\n",
		r.FormValue("email"), r.FormValue("senha"))

	usuario, erro := json.Marshal(map[string]string{
		"email": r.FormValue("email"),
		"senha": r.FormValue("senha"),
	})

	if erro != nil {
		respostas.JSON(w, http.StatusBadRequest, respostas.ErroApi{Erro: erro.Error()})
		return
	}

	url := fmt.Sprintf("%s/login", config.APIURL)
	response, erro := http.Post(url, "application/json", bytes.NewBuffer(usuario))

	if erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroApi{Erro: erro.Error()})
		return
	}

	defer response.Body.Close()

	fmt.Println("====> RETORNO DO BACK")
	var bodyBytes []byte
	bodyBytes, _ = io.ReadAll(response.Body)
	fmt.Printf("Resposta do backend: %s\n", string(bodyBytes))
	// Para decodificar depois, é preciso criar um novo io.Reader:
	response.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

	if response.StatusCode >= 400 {
		respostas.TratarStatusCodeDeErro(w, response)
		return
	}

	var dadosAutenticacao modelos.DadosAutenticacao
	if erro = json.NewDecoder(response.Body).Decode(&dadosAutenticacao); erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroApi{Erro: erro.Error()})
		return
	}

	if erro = cookies.Salvar(w, dadosAutenticacao.ID, dadosAutenticacao.Token); erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroApi{Erro: erro.Error()})
		return
	}

	respostas.JSON(w, http.StatusOK, map[string]string{"mensagem": "login realizado com sucesso"})

}
