package controllers

import (
	"bytes"
	"devbook-front/src/respostas"
	"encoding/json"
	"log"
	"net/http"
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
		log.Fatal(erro)
	}

	response, erro :=
		http.Post("http://localhost:3000/usuarios", "application/json", bytes.NewBuffer(usuario))

	if erro != nil {
		log.Fatal(erro)
	}
	defer response.Body.Close()

	respostas.JSON(w, response.StatusCode, nil)

}
