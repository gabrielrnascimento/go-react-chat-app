import './Message.scss';

interface MessageProps {
    user: string;
    content: string;
}

export const Message = (props: MessageProps) => {
    return (
        <div className="MessageWrapper">
            <div className="User">{'User: ' + props.user}</div>
            <div className="Message">{'Message: ' + props.content}</div>
        </div>
    );
};
