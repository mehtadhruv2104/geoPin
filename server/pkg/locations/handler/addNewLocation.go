package handler

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mehtadhruv2104/geoPin/server/pkg/locations/models"
)


func (h *Handler) AddLocation(c *gin.Context){
	ctx := context.Context(c)
	userID,exists := c.Get("userid")
	if(!exists){
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not set in middleware"})
		return
	}
	user:=""
	if str, ok := userID.(string); ok {
        user=str
    } else {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "User ID is not a string"})
		return
    }
	var req models.Location
	err := c.BindJSON(&req)
	if(err!=nil){
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request Body"})
		return
	}
	if req.Longitude == 0 || req.Latitude == 0 || req.Name == ""{
        c.JSON(http.StatusBadRequest, gin.H{"error": "Longitude, latitude, name"})
        return
    }

    if req.Longitude < -180 || req.Longitude > 180 || req.Latitude < -90 || req.Latitude > 90 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid coordinates"})
        return
    }
	
	req.UserID = user
	err = h.Service.AddLocation(ctx, req)
	if(err!=nil){
		c.JSON(http.StatusNotFound, gin.H{"error": "Cannot add location"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Message": "Location Added to the list successfully"})
}