package websocket

import (
	"fmt"
	"log"
	"sync/atomic"

	"github.com/gorilla/websocket"
)

var clientIdCounter uint64

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
}

func NewClient(conn *websocket.Conn, pool *Pool) *Client {
	id := atomic.AddUint64(&clientIdCounter, 1)
	return &Client{
		ID:   fmt.Sprintf("%d", id),
		Conn: conn,
		Pool: pool,
	}
}

func (c *Client) String() string {
	return fmt.Sprintf("Client ID: %s", c.ID)
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		err := c.Conn.Close()
		if err != nil {
			return
		}
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		message := NewMessage(messageType, string(p), c.ID)
		c.Pool.Broadcast <- message
		log.Printf("Message Received: %+v\n", message)
	}
}
