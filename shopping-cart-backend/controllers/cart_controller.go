// controllers/cart_controller.go
package controllers

import (
	"net/http"
	"shopping-cart/database"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
)

// POST /carts - Add item to user's cart
func AddToCart(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	var input struct {
		ItemID uint `json:"item_id"`
	}
	if err := c.ShouldBindJSON(&input); err != nil || input.ItemID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid item_id"})
		return
	}

	var item models.Item
	if err := database.DB.First(&item, input.ItemID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}

	var cart models.Cart
	// Check if user already has a cart
	if err := database.DB.Preload("Items").Where("user_id = ?", userID).First(&cart).Error; err != nil {
		// No cart yet: create new cart
		cart = models.Cart{UserID: userID, Items: []models.Item{item}}
		if err := database.DB.Create(&cart).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create cart"})
			return
		}
	} else {
		// Cart exists: append item
		if err := database.DB.Model(&cart).Association("Items").Append(&item).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add item to cart"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Item added to cart", "cart_id": cart.ID})
}

// GET /carts - List all carts with items
func ListCarts(c *gin.Context) {
	var carts []models.Cart
	if err := database.DB.Preload("Items").Find(&carts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list carts"})
		return
	}

	c.JSON(http.StatusOK, carts)
}
