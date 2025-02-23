package pkg

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mehtadhruv2104/geoPin/server/pkg/user"
)


func Middleware(c *gin.Context){

	ctx := context.Context(c)
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" && !strings.HasPrefix(authHeader,"Bearer") {
		c.JSON(http.StatusUnauthorized, gin.H{"error":"Auth Token not found"})
		return
	}
	token := strings.TrimPrefix(authHeader, "Bearer ")
	userID,err := user.DecodeToken(ctx,token)
	if(err!=nil){
		c.JSON(http.StatusUnauthorized, gin.H{"error":err})
		return
	}
	c.Set("userid",userID)
	c.Next()
}