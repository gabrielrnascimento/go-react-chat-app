package main

import (
	"fmt"
	"net/http"

	"backend/pkg/websocket"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		_, err := fmt.Fprintf(w, "%+v\n", err)
		if err != nil {
			return
		}
	}

	client := websocket.NewClient(conn, pool)

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})

}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	setupRoutes()
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return
	}
}
