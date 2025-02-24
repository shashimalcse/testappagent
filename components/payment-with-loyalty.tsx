import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentWithLoyaltyProps {
  onComplete: (usedLoyaltyPoints: boolean) => void
}

export function PaymentWithLoyalty({ onComplete }: PaymentWithLoyaltyProps) {
  const bookingDetails = {
    roomType: "Deluxe Room",
    checkIn: "2024-02-20",
    checkOut: "2024-02-22",
    nights: 2,
    basePrice: 200,
    tax: 40,
    total: 240
  }

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Room Type</span>
            <span>{bookingDetails.roomType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Check-in</span>
            <span>{bookingDetails.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Check-out</span>
            <span>{bookingDetails.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Number of Nights</span>
            <span>{bookingDetails.nights}</span>
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>${bookingDetails.basePrice}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Tax</span>
              <span>${bookingDetails.tax}</span>
            </div>
            <div className="flex justify-between mt-2 font-bold">
              <span>Total</span>
              <span>${bookingDetails.total}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => {
            // Simulate redirect to payment gateway
            onComplete(false)
          }}
        >
          Proceed to Payment Gateway
        </Button>
      </CardFooter>
    </Card>
  )
}
