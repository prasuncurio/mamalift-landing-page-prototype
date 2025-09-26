import { useEffect } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'flowise-fullchatbot': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
  interface Window {
    Chatbot: {
      initFull: (config: any) => void
    }
  }
}

interface FlowiseChatbotProps {
  // Required props
  chatflowid?: string
  apiHost?: string
  
  // Header customization
  title?: string
  logoSrc?: string
  headerBackgroundColor?: string
  headerTextColor?: string
  
  // Messages customization
  welcomeMessage?: string
  errorMessage?: string
  
  // Styling
  backgroundColor?: string
  fontSize?: number
  
  // Bot message styling
  botMessageBackgroundColor?: string
  botMessageTextColor?: string
  showBotAvatar?: boolean
  botAvatarSrc?: string
  
  // User message styling
  userMessageBackgroundColor?: string
  userMessageTextColor?: string
  showUserAvatar?: boolean
  userAvatarSrc?: string
  
  // Input styling
  inputPlaceholder?: string
  inputBackgroundColor?: string
  inputTextColor?: string
  sendButtonColor?: string
  
  // Footer customization
  footerText?: string
  footerCompany?: string
  footerCompanyLink?: string
  footerTextColor?: string
}

export const FlowiseChatbot = ({
  // Default values
  chatflowid = "601e4c0f-9e6a-47d2-9739-17eebf352491",
  apiHost = "https://indiana-fraud-analytics-b5f3dfe5hkgwfqbr.z01.azurefd.us",
  
  // Header defaults
  title = "CURIO - Conversational Understanding for Recovery Investigation Operations",
  logoSrc = "../../assets/curio-logo.jpg",
  headerBackgroundColor = "#65a49b",
  headerTextColor = "#ffffff",
  
  // Message defaults
  welcomeMessage = "Hello! I'm Intelligence Bot, ready to assist you with intelligent insights and analysis.",
  errorMessage = "I apologize, but I'm having trouble connecting. Please try again.",
  
  // Styling defaults
  backgroundColor = "#ffffff",
  fontSize = 16,
  
  // Bot message defaults
  botMessageBackgroundColor = "#f8fafc",
  botMessageTextColor = "#1a202c",
  showBotAvatar = false,
  botAvatarSrc = "",
  
  // User message defaults
  userMessageBackgroundColor = "#65a49b",
  userMessageTextColor = "#ffffff",
  showUserAvatar = false,
  userAvatarSrc = "",
  
  // Input defaults
  inputPlaceholder = "Ask me anything...",
  inputBackgroundColor = "#ffffff",
  inputTextColor = "#1a202c",
  sendButtonColor = "#65a49b",
  
  // Footer defaults
  footerText = "Powered by",
  footerCompany = "Curio Digital Therapeutics Inc",
  footerCompanyLink = "#",
  footerTextColor = "#64748b",
}: FlowiseChatbotProps) => {
  
  useEffect(() => {
    const initializeChatbot = async () => {
      await import('flowise-embed/dist/web.js')
      
      setTimeout(() => {
        if (window.Chatbot) {
          window.Chatbot.initFull({
            chatflowid,
            apiHost,
            theme: {
              chatWindow: {
                showTitle: true,
                title,
                titleAvatarSrc: logoSrc,
                titleBackgroundColor: headerBackgroundColor,
                titleTextColor: headerTextColor,
                welcomeMessage,
                errorMessage,
                backgroundColor,
                fontSize,
                botMessage: {
                  backgroundColor: botMessageBackgroundColor,
                  textColor: botMessageTextColor,
                  showAvatar: showBotAvatar,
                  avatarSrc: botAvatarSrc,
                },
                userMessage: {
                  backgroundColor: userMessageBackgroundColor,
                  textColor: userMessageTextColor,
                  showAvatar: showUserAvatar,
                  avatarSrc: userAvatarSrc,
                },
                textInput: {
                  placeholder: inputPlaceholder,
                  backgroundColor: inputBackgroundColor,
                  textColor: inputTextColor,
                  sendButtonColor: sendButtonColor,
                },
                footer: {
                  textColor: footerTextColor,
                  text: footerText,
                  company: footerCompany,
                  companyLink: footerCompanyLink,
                },
              },
            }
          })
        }
      }, 200)
    }

    initializeChatbot()
  }, [
    chatflowid, apiHost, title, logoSrc, headerBackgroundColor, headerTextColor,
    welcomeMessage, errorMessage, backgroundColor, fontSize,
    botMessageBackgroundColor, botMessageTextColor, showBotAvatar, botAvatarSrc,
    userMessageBackgroundColor, userMessageTextColor, showUserAvatar, userAvatarSrc,
    inputPlaceholder, inputBackgroundColor, inputTextColor, sendButtonColor,
    footerText, footerCompany, footerCompanyLink, footerTextColor
  ])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <flowise-fullchatbot />
    </div>
  )
}
