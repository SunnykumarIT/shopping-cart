// routes/routes.go
package routes

import (
	"shopping-cart/controllers"
	"shopping-cart/middleware"

	"github.com/gin-gonic/gin"

	"net/http"
)

// routes/routes.go (updated)
func RegisterRoutes(router *gin.Engine) {

	router.GET("/", func(c *gin.Context) {
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Backend Running</title>
			</head>
			<body style="font-family: sans-serif; text-align: center; padding-top: 100px;">
				<h1>✅ Backend is running successfully!</h1>
				<p>You can now access the API endpoints.</p>
			</body>
			</html>
		`))
	})
	// Public routes
	router.POST("/users", controllers.Register)
	router.POST("/users/login", controllers.Login)

	// Protected routes
	auth := router.Group("/")
	auth.Use(middleware.AuthMiddleware())

	auth.GET("/users", controllers.ListUsers)
	auth.POST("/items", controllers.CreateItem)
	auth.GET("/items", controllers.ListItems)
	auth.POST("/carts", controllers.AddToCart)
	auth.GET("/carts", controllers.ListCarts)
	auth.POST("/orders", controllers.CreateOrder)
	auth.GET("/orders", controllers.ListOrders)

}
