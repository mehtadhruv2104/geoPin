package handler

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)


func (h *Handler)ListAllLocations(c *gin.Context){
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
	markedLocations,err := h.Service.ListLocations(ctx,user)
	if(err!=nil){
		c.JSON(http.StatusNotFound, gin.H{"error": "Locations not found in DB for this user"})
		return
	}
	c.JSON(http.StatusOK, markedLocations)
}