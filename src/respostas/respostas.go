package respostas

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

type ErroApi struct {
	Erro string `json:"erro"`
}

func JSON(w http.ResponseWriter, statusCode int, dados interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if statusCode != http.StatusNoContent {
		if erro := json.NewEncoder(w).Encode(dados); erro != nil {
			log.Fatal(erro)
		}
	}
}

func TratarStatusCodeDeErro(w http.ResponseWriter, r *http.Response) {
	var erro ErroApi
	bodyBytes, _ := io.ReadAll(r.Body)
	log.Printf("Erro recebido do backend: %s\n", string(bodyBytes))
	json.NewDecoder(r.Body).Decode(&erro)
	JSON(w, r.StatusCode, erro)
}
