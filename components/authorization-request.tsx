import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthorizationRequestProps {
  onAuthorize: () => void
  roomType: string
}

export function AuthorizationRequest({ roomType, onAuthorize }: AuthorizationRequestProps) {
  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Confirm Your Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You are about to book:</p>
        <p className="font-medium mt-2">{roomType}</p>
        <p className="text-sm text-muted-foreground mt-4">
          Would you like to proceed with this booking?
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={onAuthorize}>Confirm Booking</Button>
      </CardFooter>
    </Card>
  )
}
