import { Button } from './ui/button';
import { api } from '../../convex/_generated/api';
// import { useMutation } from 'convex/react';
import { useAction } from 'convex/react';


export default function ChatWindow() {
    const sendMessage = useAction(api.messages.createMessage);

    async function handleClick() {
        const msg = await sendMessage({ textMessage: 'How are you doing?' });
        console.log(msg);
    }

    return (
        <div>
            <Button onClick={handleClick}>Ask AI</Button>
        </div>
    );
}
