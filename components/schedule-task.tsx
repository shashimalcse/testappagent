"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"

export function ScheduleTask({
  onConfirm,
  onCancel
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Card className="mt-2">
      <CardContent className="pt-4">
        <CardDescription className="mb-4">
          I will continuously check for room availability and notify you when a better room becomes available.
        </CardDescription>
        <div className="flex gap-2">
          <Button onClick={onConfirm}>Confirm Schedule</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}
