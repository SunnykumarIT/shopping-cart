// main.go
package main

import (
	"fmt"
	"log"
	"shopping-cart/database"
	"shopping-cart/routes"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize DB
	err := database.ConnectDB()
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	// Create Gin router
	r := gin.Default()
	// ✅ Custom CORS config
	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	r.Use(cors.New(config))

	// Register API routes
	routes.RegisterRoutes(r)

	// Start server
	port := ":8080"
	fmt.Println("Server running on http://localhost" + port)
	if err := r.Run(port); err != nil {
		log.Fatal("Failed to run server: ", err)
	}

}
