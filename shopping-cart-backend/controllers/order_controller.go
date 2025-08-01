// controllers/order_controller.go
package controllers

import (
	"net/http"
	"shopping-cart/database"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
)

// POST /orders - Convert user's cart to order
func CreateOrder(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	var cart models.Cart
	if err := database.DB.Preload("Items").Where("user_id = ?", userID).First(&cart).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cart not found"})
		return
	}

	if len(cart.Items) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cart is empty"})
		return
	}

	// Create new order with same items
	order := models.Order{
		UserID: userID,
		Items:  cart.Items,
	}
	if err := database.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	// Clear user's cart
	if err := database.DB.Model(&cart).Association("Items").Clear(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear cart"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Order created", "order_id": order.ID})
}

// GET /orders - List all orders (or filter by user)
func ListOrders(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var orders []models.Order

	if err := database.DB.Preload("Items").Where("user_id = ?", userID).Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch orders"})
		return
	}

	c.JSON(http.StatusOK, orders)
}
