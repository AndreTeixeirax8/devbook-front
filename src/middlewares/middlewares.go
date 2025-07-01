package middlewares

import (
	"devbook-front/src/cookies"
	"log"
	"net/http"
)

func Logger(proximaFuncao http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Logica de log
		log.Printf("\n %s %s %s", r.Method, r.RequestURI, r.Host)
		proximaFuncao(w, r)
	}
}

func Autenticar(proximaFuncao http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Logica de autenticacao
		if _, erro := cookies.Ler(r); erro != nil {
			http.Redirect(w, r, "/login", http.StatusFound)
		}

		proximaFuncao(w, r)
	}

}
