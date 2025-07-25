package requisicoes

import (
	"devbook-front/src/cookies"
	"io"
	"net/http"
)

func FazerRequisicaoComAuteticacao(r *http.Request, metodo, url string, dados io.Reader) (*http.Response, error) {
	request, erro := http.NewRequest(metodo, url, dados)
	if erro != nil {
		return nil, erro
	}

	cookie, _ := cookies.Ler(r)
	request.Header.Add("Authorization", "Bearer "+cookie["token"])

	client := &http.Client{}
	response, erro := client.Do(request)
	if erro != nil {
		return nil, erro
	}

	return response, nil

}
