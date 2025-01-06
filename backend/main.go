package main

import (
	"fmt"
	"net/http"
)

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintf(w, "Simple Server")

		if err != nil {
			return
		}
	})
}

func main() {
	setupRoutes()
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return
	}
}
