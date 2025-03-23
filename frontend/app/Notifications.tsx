"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Notification() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg">
      <CardHeader>
        <CardTitle>Reminder</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Do you remember this incident from yesterday?
        </CardDescription>
      </CardContent>
      <div className="flex justify-end p-4">
        <Button variant="outline" onClick={() => setIsVisible(false)}>
          Dismiss
        </Button>
      </div>
    </Card>
  )
}