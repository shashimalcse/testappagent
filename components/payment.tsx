import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentProps {
  onPaymentComplete: () => void
}

export function Payment({ onPaymentComplete }: PaymentProps) {
  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Complete Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total amount after loyalty points: $180</p>
        <p className="text-sm text-muted-foreground mt-2">Choose your payment method:</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button onClick={onPaymentComplete} className="w-full">Pay Now</Button>
        <Button variant="outline" className="w-full">Pay at Hotel</Button>
      </CardFooter>
    </Card>
  )
}
