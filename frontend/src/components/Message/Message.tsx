import "./Message.scss"

interface MessageProps {
    content: string;
}

export const Message = (props: MessageProps) => {
    return (
        <div className={"Message"}>
            {props.content}
        </div>
    )
}
