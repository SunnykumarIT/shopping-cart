// models/cart.go
package models

import "github.com/jinzhu/gorm"

type Cart struct {
	gorm.Model
	UserID uint
	Items  []Item `gorm:"many2many:cart_items;"`
}
