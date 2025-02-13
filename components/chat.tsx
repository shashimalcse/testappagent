"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, User } from "lucide-react"
import { useState, useEffect } from "react"
import { HotelRooms } from "./hotel-rooms"
import { AuthorizationRequest } from "./authorization-request"
import { LoyaltyPoints } from "./loyalty-points"
import { Payment } from "./payment"
import { getAuthState, clearAuthState } from "@/utils/auth-helper"
import { Calendar } from "./calendar"
import { BookingDetails } from "./booking-details"

interface Message {
  role: "user" | "assistant"
  content: string
  type?: "rooms" | "auth" | "loyalty" | "payment" | "calendar" | "booking-details"
}

const botResponses = [
  "I'd be happy to help you with that.",
  "Great question! Let me fetch that information for you.",
  "I'm checking our system for the most up-to-date information.",
  "I can assist you with that request.",
  "Thank you for your inquiry. Let me pull up those details for you.",
]

const sampleQueries = [
  "I like to book a room",
  "Show me available rooms",
  "What rooms do you have?"
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to our hotel booking service! How may I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [showRooms, setShowRooms] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showLoyalty, setShowLoyalty] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [showCalendar, setShowCalendar] = useState(false)

  // Check for returning from auth
  useEffect(() => {
    if (getAuthState()) {
      handleAuthorization()
      clearAuthState()
    }
  }, [])

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages))
  }, [messages])

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Welcome to our hotel booking service! How may I assist you today?",
      },
    ])
    localStorage.removeItem("chatMessages")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    // Simulate a delay before the bot responds
    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      
      // Check for various room-related phrases
      if (lowerInput.includes("i like to book a room")) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { 
            role: "assistant", 
            content: "Please provide your booking details:",
            type: "booking-details"
          },
        ])
        return
      }

      // Default response if no specific command is matched
      const randomBotResponse: Message = {
        role: "assistant",
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
      }
      setMessages((prevMessages) => [...prevMessages, randomBotResponse])
    }, 1000)
  }

  const handleSampleQuery = (query: string) => {
    setInput(query)
    // Simulate form submission with the selected query
    const userMessage: Message = { role: "user", content: query }
    setMessages((prevMessages) => [...prevMessages, userMessage])

    setTimeout(() => {
      const lowerInput = query.toLowerCase()
      if (lowerInput.includes("i like to book a room")) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { 
            role: "assistant", 
            content: "Please provide your booking details:",
            type: "booking-details"
          },
        ])
      }
      // ...rest of your handleSubmit logic...
    }, 1000)
  }

  const handleBooking = (roomType: string) => {
    setSelectedRoom(roomType)
    setShowAuth(true)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: `Great! You've selected the ${roomType}. Please authorize the booking.`,
        type: "auth",
      },
    ])
  }

  const handleAuthorization = () => {
    setShowAuth(false)
    setShowLoyalty(true)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: `Perfect! Your ${selectedRoom} booking is authorized. Would you like to apply loyalty points to your booking?`,
        type: "loyalty",
      },
    ])
  }

  const handleApplyPoints = () => {
    setShowLoyalty(false)
    setShowPayment(true)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "Loyalty points applied! Please proceed with payment.",
        type: "payment",
      },
    ])
  }

  const handlePaymentComplete = () => {
    setShowPayment(false)
    setShowCalendar(true)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "Your reservation is confirmed. Would you like to add it to your calendar?",
        type: "calendar",
      },
    ])
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <Button onClick={handleClearChat}>Clear Chat</Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, i) => (
          <div key={i} className={`flex flex-col space-y-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 shrink-0">
                {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </Avatar>
              <div className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {message.content}
                </div>
                {message.type === "rooms" && showRooms && <HotelRooms onBook={handleBooking} />}
                {message.type === "auth" && showAuth && (
                  <AuthorizationRequest 
                    onAuthorize={handleAuthorization} 
                    roomType={selectedRoom}
                  />
                )}
                {message.type === "loyalty" && showLoyalty && <LoyaltyPoints onApplyPoints={handleApplyPoints} />}
                {message.type === "payment" && showPayment && <Payment onPaymentComplete={handlePaymentComplete} />}
                {message.type === "calendar" && showCalendar && <Calendar onAdd={() => {/* ... */}} onSkip={() => setShowCalendar(false)} />}
                {message.type === "booking-details" && (
                  <BookingDetails onContinue={() => {
                    setShowRooms(true)
                    setMessages((prevMessages) => [
                      ...prevMessages,
                      { 
                        role: "assistant", 
                        content: "Here are our available rooms:", 
                        type: "rooms" 
                      },
                    ])
                  }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2 mb-2">
          {sampleQueries.map((query) => (
            <Button
              key={query}
              variant="outline"
              size="sm"
              onClick={() => handleSampleQuery(query)}
            >
              {query}
            </Button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

