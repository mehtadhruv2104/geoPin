package config

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)



var dB *pgxpool.Pool


func ConnectToPostgres() (*pgxpool.Pool, error){

	databaseURL:= os.Getenv("DATABASE_URL")
	var err error
	
	dB, err = pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		return nil,err
	}
	fmt.Println("Connected Database Successfully")
	return dB,nil
	
}

func GetDB() *pgxpool.Pool {
	if(dB == nil){
		fmt.Println("Database not found")
		os.Exit(1)
	}
	return dB
}



func CloseDBConnection(){
	if(dB!=nil){
		dB.Close()
		fmt.Println("DB connection has been closed")
	}
}
