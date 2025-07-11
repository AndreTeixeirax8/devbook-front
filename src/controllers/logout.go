package controllers

import (
	"devbook-front/src/cookies"
	"net/http"
)

func FazerLogout(w http.ResponseWriter, r *http.Request) {
	cookies.Deletar(w)
	http.Redirect(w, r, "/login", 302)
}
