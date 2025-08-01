// models/user.go
package models

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
	Token    string `gorm:"-"` // Not stored in DB, used for auth response
}
