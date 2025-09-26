import { FullPageChat } from "flowise-embed-react"
import { FlowiseChatbot } from "@/components/chatbot/FlowiseChatbot"
import logoImage from "@/assets/logo.jpeg";

export const FraudAnalyticsChatbot = () => {
    return (
        <FlowiseChatbot
            logoSrc={logoImage}
        />
    );
};