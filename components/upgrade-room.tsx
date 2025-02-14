"use client"
import { Button } from "@/components/ui/button"

export function UpgradeRoom({
  onConfirm,
  onCancel
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex gap-2 py-2">
      <Button onClick={onConfirm}>Yes, upgrade me</Button>
      <Button variant="outline" onClick={onCancel}>No, thanks</Button>
    </div>
  );
}
