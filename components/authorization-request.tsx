import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface AuthorizationRequestProps {
  onAuthorize: (useLoyaltyPoints: boolean) => void
  roomType: string
}

export function AuthorizationRequest({ roomType, onAuthorize }: AuthorizationRequestProps) {
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  
  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Confirm Your Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You are about to book:</p>
        <p className="font-medium mt-2">{roomType}</p>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="loyalty"
            checked={useLoyaltyPoints}
            onCheckedChange={(checked) => setUseLoyaltyPoints(checked as boolean)}
          />
          <label
            htmlFor="loyalty"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Apply Loyalty Points (10% discount)
          </label>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Would you like to proceed with this booking?
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={() => onAuthorize(useLoyaltyPoints)}>Confirm Booking</Button>
      </CardFooter>
    </Card>
  )
}
