package models

import "time"

type Location struct {
	ID          int       `json:"id"`
	Longitude   float32   `json:"longitude"`
	Latitude    float32   `json:"latitude"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	UserID      string    `json:"user_id"`
	CreatedAt   time.Time	`json:"created_at"`
}
