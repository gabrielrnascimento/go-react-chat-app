package websocket

import "fmt"

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client := range pool.Clients {
				fmt.Println(client)
			}
			break
		case client := <-pool.Unregister:
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			removedClient := client
			delete(pool.Clients, client)
			for client := range pool.Clients {
				content := fmt.Sprintf("User %s Disconnected...", removedClient.Username)
				message := NewMessage(1, content, removedClient.Username)
				err := client.Conn.WriteJSON(message)
				if err != nil {
					return
				}
			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for client := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println("error: ", err)
					return
				}
			}

		}
	}
}
