package handler

import (
	"github.com/gin-gonic/gin"
)

func InitLocationRoutes(r *gin.RouterGroup, h Handler){

	locationRoutes := r.Group("/location")
	{
		locationRoutes.GET("", h.ListAllLocations)
		locationRoutes.GET("/:id",h.GetLocationByID)
		locationRoutes.PUT("/:id",)
		locationRoutes.POST("",h.AddLocation)
		locationRoutes.DELETE("/:id",)
	}
}
