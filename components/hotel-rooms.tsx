import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface HotelRoomsProps {
  onBook: (roomType: string) => void
}

export function HotelRooms({ onBook }: HotelRoomsProps) {
  const rooms = [
    { type: "Standard Room", price: 100, description: "Comfortable room with basic amenities" },
    { type: "Deluxe Room", price: 150, description: "Spacious room with premium furnishings" },
    { type: "Suite", price: 250, description: "Luxurious suite with separate living area" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {rooms.map((room) => (
        <Card key={room.type} className="w-full">
          <CardHeader>
            <CardTitle>{room.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{room.description}</p>
            <p className="font-bold mt-2">${room.price} / night</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => onBook(room.type)}>Select</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

