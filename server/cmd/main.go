package main

import (
	"fmt"

	"github.com/joho/godotenv"
	"github.com/mehtadhruv2104/geoPin/server/config"
	"github.com/mehtadhruv2104/geoPin/server/pkg"
)

func init(){
	err := godotenv.Load("../.env")
    if err != nil {
        fmt.Println("Error loading .env file:", err)
    }	
}

func main(){
	fmt.Println("This is the Geo Pin API Server")
	dB,err := config.ConnectToPostgres()
	if(err != nil){
		panic("Database not found")
	}
	router:= pkg.StartEngine(dB)
	router.Run(":8100")
	defer config.CloseDBConnection()
}