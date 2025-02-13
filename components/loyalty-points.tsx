import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LoyaltyPointsProps {
  onApplyPoints: () => void
}

export function LoyaltyPoints({ onApplyPoints }: LoyaltyPointsProps) {
  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Apply Loyalty Points</CardTitle>
      </CardHeader>
      <CardContent>
        <p>You have 500 loyalty points available. Would you like to apply them to this booking?</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">No, Thanks</Button>
        <Button onClick={onApplyPoints}>Apply Points</Button>
      </CardFooter>
    </Card>
  )
}

