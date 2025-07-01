package main

import (
	"devbook-front/src/config"
	"devbook-front/src/router"
	"devbook-front/src/utils"
	 "devbook-front/src/cookies"
	"fmt"
	"log"
	"net/http"
)

func main() {
	config.Carregar()
	cookies.Configurar()
	utils.CarregarTemplates()
	r := router.Gerar()

	fmt.Println("Executando na porta 4200")
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", config.Porta), r))
}
