package service

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mehtadhruv2104/geoPin/server/pkg/locations/models"
)

type Service interface{
	AddLocation(ctx context.Context, l models.Location) error
	GetLocationByID(ctx context.Context,id int)(models.Location, error)
	ListLocations(ctx context.Context, user_id string)([]models.Location, error)
	UpdateLocation()
	DeleteLocation()
}

type LocationService struct{
	DB *pgxpool.Pool
}


func NewService(dB *pgxpool.Pool) Service{	
	return &LocationService{
		DB: dB,
	}
}


func (svc *LocationService) AddLocation(ctx context.Context, l models.Location) error{
	query := `
        INSERT INTO locations (longitude, latitude, name, description, user_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, created_at
    `
    err := svc.DB.QueryRow(ctx, query, l.Longitude, l.Latitude, l.Name, l.Description, l.UserID).
        Scan(&l.ID, &l.CreatedAt)
    if err != nil {
        return fmt.Errorf("failed to add marked location: %w", err)
    }
    return nil
}

func (svc *LocationService) GetLocationByID(ctx context.Context,id int)(models.Location, error){
	var loc models.Location
	query := `
		SELECT id, longitude, latitude, name, description, user_id, created_at
		FROM locations
		WHERE id = $1`
	
	err := svc.DB.QueryRow(ctx,query, id).Scan(&loc.ID,&loc.Longitude,&loc.Latitude,&loc.Name,&loc.Description, &loc.UserID, &loc.CreatedAt)
	if (err!=nil){
		return models.Location{}, fmt.Errorf("failed to get location: %w", err)
	}
	return loc, nil
}

func (svc *LocationService) ListLocations(ctx context.Context, user_id string)([]models.Location, error){
	query := `
        SELECT id, longitude, latitude, name, description, user_id, created_at
        FROM locations
        WHERE user_id = $1
        ORDER BY created_at DESC`
    
    rows, err := svc.DB.Query(ctx, query, user_id)
    if err != nil {
        return nil, fmt.Errorf("failed to list locations: %w", err)
    }
    defer rows.Close()

    var markedlocations []models.Location
    for rows.Next() {
        var l models.Location
        err := rows.Scan(&l.ID, &l.Longitude, &l.Latitude, &l.Name, &l.Description, &l.UserID, &l.CreatedAt)
        if err != nil {
            return nil, fmt.Errorf("failed to scan location: %w", err)
        }
        markedlocations = append(markedlocations, l)
    }
    if err = rows.Err(); err != nil {
        return nil, fmt.Errorf("error iterating locations: %w", err)
    }
    return markedlocations, nil
}

func (svc *LocationService) UpdateLocation(){

}

func (svc *LocationService) DeleteLocation(){

}





