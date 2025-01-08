package websocket

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
	User string `json:"user"`
}

func NewMessage(messageType int, body, user string) Message {
	return Message{
		Type: messageType,
		Body: body,
		User: user,
	}
}
