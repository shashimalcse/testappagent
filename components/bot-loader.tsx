"use client"

export function BotLoader({ message }: { message: string }) {
  return (
    <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg animate-pulse">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
}
