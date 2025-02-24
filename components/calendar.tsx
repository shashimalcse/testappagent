import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import 'material-symbols';

interface CalendarProps {
  onSkip: () => void
  onGoogleAuth: () => void
}

export function Calendar({ onSkip, onGoogleAuth }: CalendarProps) {
  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Add to Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">To add this reservation to your calendar, you'll need to connect your Google Calendar account first.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onSkip}>Skip</Button>
        <Button 
          onClick={onGoogleAuth} 
          className="flex items-center gap-2 border-blue-500 text-blue-500 hover:bg-blue-50" 
          variant="outline"
        >
          <span className="material-symbols-outlined">calendar_month</span>
          Connect Google Calendar
        </Button>
      </CardFooter>
    </Card>
  )
}
