// models/order.go
package models

import "github.com/jinzhu/gorm"

type Order struct {
	gorm.Model
	UserID uint
	Items  []Item `gorm:"many2many:order_items;"`
}
