package user

import (
	"context"
	"fmt"
	"os"

	"github.com/Nerzal/gocloak/v13"
)


func DecodeToken (c context.Context, token string)(string,error) {

	keycloakURL:= os.Getenv("KEYCLOAK_URL")
	keycloakRealm := os.Getenv("KEYCLOAK_REALM")
	client := gocloak.NewClient(keycloakURL)
	_, claims, err := client.DecodeAccessToken(c,token,keycloakRealm)
	if err != nil {
		return "", fmt.Errorf("authentication with keycloak failed %w",err)
	}
	value, exists := (*claims)["sub"]
	if(!exists){
		return "", fmt.Errorf("user id not found in JWT CLaim %w",err)
	}
	userID, ok := value.(string)
	if !ok {
		return "", fmt.Errorf("wrong format of userid %w",err)
	}
	return userID, nil
}