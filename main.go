package main

import (
	"devbook-front/src/router"
	"devbook-front/src/utils"
	"fmt"
	"log"
	"net/http"
)

func main() {

	utils.CarregarTemplates()
	r := router.Gerar()

	fmt.Println("Executando na porta 4200")
	log.Fatal(http.ListenAndServe(":4200", r))
}
