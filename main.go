package main

import (
	"devbook-front/src/router"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Rodando app web com Go!")
	r := router.Gerar()
	log.Fatal(http.ListenAndServe(":8080", r))
}
