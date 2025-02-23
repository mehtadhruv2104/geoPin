package handler

import (
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mehtadhruv2104/geoPin/server/pkg/locations/service"
)

type Handler struct{
	Service service.Service
}

func NewHandler(dB *pgxpool.Pool) Handler {
	return Handler{
		Service: service.NewService(dB),
	}
}