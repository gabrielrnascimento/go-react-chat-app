package websocket

import (
	"encoding/json"
	"fmt"
	"log"
	"sync/atomic"

	"github.com/gorilla/websocket"
)

var clientIdCounter uint64

type Client struct {
	ID       string
	Username string
	Conn     *websocket.Conn
	Pool     *Pool
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
		_, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		var msg map[string]string
		err = json.Unmarshal(p, &msg)
		if err != nil {
			log.Println(err)
			return
		}

		messageType, ok := msg["type"]
		if !ok {
			log.Println("Message type not found")
			return
		}

		messageContent, ok := msg["content"]
		if !ok {
			log.Println("Message content not found")
			return
		}

		switch messageType {
		case "chat":
			c.Pool.Broadcast <- NewMessage(1, messageContent, c.Username)
		case "username":
			c.Username = messageContent
			c.Pool.Broadcast <- NewMessage(1, fmt.Sprintf("%s has joined the chat", c.Username), c.Username)
		}

		log.Printf("Message Received: %+v\n", msg["body"])
	}
}
