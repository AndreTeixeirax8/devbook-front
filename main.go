package main

import (
	"devbook-front/src/config"
	"devbook-front/src/router"
	"devbook-front/src/utils"
	"fmt"
	"log"
	"net/http"
)

func main() {
	config.Carregar()
	utils.CarregarTemplates()
	r := router.Gerar()

	fmt.Println("Executando na porta 4200")
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", config.Porta), r))
}
