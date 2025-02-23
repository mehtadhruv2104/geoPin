package pkg

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	locationHandler "github.com/mehtadhruv2104/geoPin/server/pkg/locations/handler"
)


func StartEngine(dB *pgxpool.Pool) *gin.Engine{
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length", "Content-Range", "X-Total-Count"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	
	apiRoutes := router.Group("/api")
	apiRoutes.Use(Middleware)
	lh := locationHandler.NewHandler(dB)
	locationHandler.InitLocationRoutes(apiRoutes,lh)
	return router
}

