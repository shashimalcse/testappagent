import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface CalendarProps {
  onAdd: () => void
  onSkip: () => void
}

export function Calendar({ onAdd, onSkip }: CalendarProps) {
  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Add to Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Would you like to add this reservation to your calendar?</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onSkip}>Skip</Button>
        <Button onClick={onAdd}>Add</Button>
      </CardFooter>
    </Card>
  )
}
