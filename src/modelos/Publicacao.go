package modelos

import "time"

type Publicacoes struct {
	ID        uint64    `json:"id"`
	Titulo    string    `json:"titulo,omitempty"`
	Conteudo  string    `json:"conteudo,omitempty"`
	AutorID   uint64    `json:"autorId,omitempty"`
	AutorNick string    `json:"autorNick,omitempty"`
	Curtidas  uint64    `json:"curtidas`
	CriadaEm  time.Time `json:"criadaEm,omitempty"`
}
