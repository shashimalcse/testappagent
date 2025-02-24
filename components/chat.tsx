/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, User } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { HotelRooms } from "./hotel-rooms"
import { AuthorizationRequest } from "./authorization-request"
import { PaymentWithLoyalty } from "./payment-with-loyalty"
import { getAuthState, clearAuthState } from "@/utils/auth-helper"
import { Calendar } from "./calendar"
import { BookingDetails } from "./booking-details"
import { signOut } from "next-auth/react"
import { UpgradeRoom } from "./upgrade-room"
import { ScheduleTask } from "./schedule-task"
import { BotLoader } from "./bot-loader"

interface Message {
  role: "user" | "assistant"
  content: string
  type?: "rooms" | "auth" | "payment-with-loyalty" | "calendar" | "booking-details" | "upgrade-room" | "schedule-task"
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
  "I want to upgrade my room to Deluxe",
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
  const [showPayment, setShowPayment] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarLoading, setCalendarLoading] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [showScheduleTask, setShowScheduleTask] = useState(false)
  const [isProcessingBooking, setIsProcessingBooking] = useState(false);
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isProcessingSchedule, setIsProcessingSchedule] = useState(false);
  const [isFetchingRooms, setIsFetchingRooms] = useState(false);
  const [isProcessingPaymentSubmit, setIsProcessingPaymentSubmit] = useState(false);
  
  // Add ref for chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Add scroll to bottom effect
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Update messages effect to scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessingBooking, isProcessingAuth, isProcessingPayment, calendarLoading, isProcessingSchedule, isFetchingRooms, isProcessingPaymentSubmit]);

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

      if (lowerInput.includes("upgrade") || lowerInput.includes("update the room")) {
        setShowScheduleTask(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "I can help you with room upgrades by scheduling a task to check availability.",
            type: "schedule-task"
          },
        ]);
        return;
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
    setInput("");  // Clear input immediately
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
      } else if (lowerInput.includes("upgrade")) {
        setShowScheduleTask(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "I can help you with room upgrades by scheduling a task to check availability.",
            type: "schedule-task"
          },
        ]);
      }
    }, 1000)
  }

  const handleBooking = (roomType: string) => {
    setIsProcessingBooking(true);
    setTimeout(() => {
      setIsProcessingBooking(false);
      setSelectedRoom(roomType);
      setShowAuth(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: `Great! You've selected the ${roomType}. Please authorize the booking.`,
          type: "auth",
        },
      ]);
    }, 1500);
  };

  const handleAuthorization = (useLoyaltyPoints: boolean) => {
    setIsProcessingAuth(true);
    setTimeout(() => {
      setIsProcessingAuth(false);
      setShowAuth(false);
      setShowPayment(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: `Your booking is authorized${useLoyaltyPoints ? " with loyalty discount" : ""}. Please proceed with payment:`,
          type: "payment-with-loyalty",
        },
      ])
    }, 2000);
  };

  const handlePaymentComplete = (usedLoyaltyPoints: boolean) => {
    setIsProcessingPaymentSubmit(true);
    setTimeout(() => {
      setIsProcessingPaymentSubmit(false);
      setShowPayment(false);
      setShowCalendar(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: `Payment successful${usedLoyaltyPoints ? " with loyalty discount" : ""}! Your reservation is confirmed. Would you like to add it to your calendar?`,
          type: "calendar",
        },
      ]);
    }, 2000);
  };

  const handleUpgradeConfirm = () => {
    setShowUpgrade(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "Your room has been upgraded to Deluxe. Thank you!",
      },
    ]);
  };

  const handleUpgradeCancel = () => {
    setShowUpgrade(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "Understood. No upgrade has been processed.",
      },
    ]);
  };

  const handleScheduleConfirm = () => {
    setIsProcessingSchedule(true);
    setTimeout(() => {
      setIsProcessingSchedule(false);
      setShowScheduleTask(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Task scheduled! I'll notify you by email when a better room becomes available. You can continue with your current booking meanwhile.",
        },
      ]);
    }, 2000);
  };

  const handleScheduleCancel = () => {
    setShowScheduleTask(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "Understood. Let me know if you need anything else.",
      },
    ]);
  };

  const handleBookingDetailsSubmit = () => {
    setIsFetchingRooms(true);
    setTimeout(() => {
      setIsFetchingRooms(false);
      setShowRooms(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          role: "assistant", 
          content: "Here are our available rooms:", 
          type: "rooms" 
        },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end items-center p-4 border-b gap-2">
        <Button onClick={handleClearChat}>Clear Chat</Button>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
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
                {message.type === "payment-with-loyalty" && showPayment && <PaymentWithLoyalty onComplete={handlePaymentComplete} />}
                {message.type === "calendar" && showCalendar && !calendarLoading && (
                  <Calendar
                    onGoogleAuth={() => {
                      setCalendarLoading(true);
                      setTimeout(() => {
                        setCalendarLoading(false);
                        setShowCalendar(false);
                      }, 1500);
                    }}
                    onSkip={() => setShowCalendar(false)}
                  />
                )}
                {message.type === "calendar" && showCalendar && calendarLoading && (
                  <div className="flex items-center justify-center py-4">
                    <span>Adding to calendar...</span>
                  </div>
                )}
                {message.type === "booking-details" && (
                  <BookingDetails onContinue={handleBookingDetailsSubmit} />
                )}
                {message.type === "upgrade-room" && showUpgrade && (
                  <UpgradeRoom onConfirm={handleUpgradeConfirm} onCancel={handleUpgradeCancel} />
                )}
                {message.type === "schedule-task" && showScheduleTask && (
                  <ScheduleTask 
                    onConfirm={handleScheduleConfirm} 
                    onCancel={handleScheduleCancel}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        {isProcessingBooking && (
          <BotLoader message="Processing your room selection..." />
        )}
        {isProcessingAuth && (
          <BotLoader message="Verifying your authorization..." />
        )}
        {isProcessingPayment && (
          <BotLoader message="Processing payment..." />
        )}
        {calendarLoading && (
          <BotLoader message="Adding to your calendar..." />
        )}
        {isProcessingSchedule && (
          <BotLoader message="Scheduling upgrade check..." />
        )}
        {isFetchingRooms && (
          <BotLoader message="Fetching available rooms..." />
        )}
        {isProcessingPaymentSubmit && (
          <BotLoader message="Processing your payment..." />
        )}
      </div>
      <div className="border-t p-6">
        <div className="flex gap-2 mb-6">
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

