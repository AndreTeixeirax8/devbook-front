package controllers

import (
	"bytes"
	"devbook-front/src/respostas"
	"encoding/json"
	"net/http"
	"fmt"
	"devbook-front/src/config"
)

func CriarUsuario(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	usuario, erro := json.Marshal(map[string]string{
		"nome":  r.FormValue("nome"),
		"email": r.FormValue("email"),
		"nick":  r.FormValue("nick"),
		"senha": r.FormValue("senha"),
	})

	if erro != nil {
		respostas.JSON(w, http.StatusBadRequest, respostas.ErroApi{Erro: erro.Error()})
	}

	url := fmt.Sprintf("%s/usuarios", config.APIURL)
	response, erro :=
		http.Post(url, "application/json", bytes.NewBuffer(usuario))

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
