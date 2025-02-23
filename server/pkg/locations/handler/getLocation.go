package handler

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)




func (h *Handler) GetLocationByID(c *gin.Context){
	_,exists := c.Get("userid")
	if(!exists){
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not set in middleware"})
		return
	}
	
	ctx := context.Context(c)
	
	var id = c.Param("id")
	locID,err := strconv.Atoi(id)
	if(err!=nil){
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid location ID"})
		return
	}
	markedLocation,err := h.Service.GetLocationByID(ctx,locID)
	if(err!=nil){
		c.JSON(http.StatusNotFound, gin.H{"error": "Location not found in DB"})
		return
	}
	c.JSON(http.StatusOK, markedLocation)
}