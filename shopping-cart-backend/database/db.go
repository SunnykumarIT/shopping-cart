// database/db.go
package database

import (
	"log"
	"shopping-cart/models"

	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
)

var DB *gorm.DB

func ConnectDB() error {
	var err error

	DB, err = gorm.Open("sqlite3", "shopping_cart.db")
	if err != nil {
		return err
	}

	// Auto-migrate all models
	err = DB.AutoMigrate(
		&models.User{},
		&models.Item{},
		&models.Cart{},
		&models.Order{},
	).Error

	if err != nil {
		log.Println("Auto migration failed:", err)
		return err
	}

	log.Println("Connected to database and migrated models.")
	return nil
}
