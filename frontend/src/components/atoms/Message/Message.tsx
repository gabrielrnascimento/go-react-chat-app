import './Message.scss';

interface MessageProps {
    user: string;
    content: string;
    isCurrentUser: boolean;
}

export const Message = (props: MessageProps) => {
    return (
        <div
            className={`MessageWrapper ${props.isCurrentUser ? 'CurrentUser' : ''}`}
        >
            <div className="User">{props.user}:</div>
            <div className="Message">{props.content}</div>
        </div>
    );
};
