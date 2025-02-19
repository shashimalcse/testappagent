"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export function PaymentWithLoyalty({
  onComplete
}: {
  onComplete: (useLoyaltyPoints: boolean) => void;
}) {
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false)

  return (
    <Card className="w-full max-w-md mt-2">
      <CardHeader>
        <CardTitle>Complete Your Booking</CardTitle>
        <CardDescription>Review and confirm your payment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p>Apply Loyalty Points</p>
            <p className="text-sm text-muted-foreground">Use 1000 points to get 10% off</p>
          </div>
          <Switch
            checked={useLoyaltyPoints}
            onCheckedChange={setUseLoyaltyPoints}
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$200.00</span>
          </div>
          {useLoyaltyPoints && (
            <div className="flex justify-between text-green-600">
              <span>Loyalty Discount</span>
              <span>-$20.00</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{useLoyaltyPoints ? "$180.00" : "$200.00"}</span>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={() => onComplete(useLoyaltyPoints)}
        >
          Pay Now
        </Button>
      </CardContent>
    </Card>
  )
}
