"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { fetchUserFlashcards } from "@/lib/firebase"; // Import the fetchFlashcards function

type Flashcard = {
  title: string
  content: string
  date?: string
  category?: string
}

export default function ReviewFlashcardsPage() {
  const { user } = useAuth()
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Mock categories
  const categories = ["Medications", "Symptoms", "Procedures", "Doctor's Advice", "All"]

  useEffect(() => {
  const loadFlashcards = async () => {
    if (!user?.id) return
    try {
      const fetchedFlashcards = await fetchUserFlashcards(user.id)
      setFlashcards(fetchedFlashcards)
      setFilteredFlashcards(fetchedFlashcards)
    } catch (error) {
      console.error("Error fetching flashcards:", error)
    }
  }

  loadFlashcards()
}, [user?.id])

  useEffect(() => {
    // Filter flashcards based on search term and category
    let filtered = [...flashcards]

    if (searchTerm) {
      filtered = filtered.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((card) => card.category === selectedCategory)
    }

    setFilteredFlashcards(filtered)
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [searchTerm, selectedCategory, flashcards])

  const nextCard = () => {
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <DashboardLayout role={user?.role || "patient"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Flashcards</h1>
          <p className="text-muted-foreground">Review and study your medical flashcards.</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search flashcards..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={clearSearch}>
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <div className="flex gap-2 overflow-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category || (category === "All" && !selectedCategory) ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="flashcards" className="space-y-4">
          <TabsList>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards" className="space-y-4">
            {filteredFlashcards.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="relative h-64 w-full cursor-pointer perspective" onClick={toggleFlip}>
                      <div
                        className={`absolute inset-0 backface-hidden rounded-xl border bg-card p-6 shadow-md transition-all duration-500 ${
                          isFlipped ? "rotate-y-180" : ""
                        }`}
                      >
                        <div className="flex h-full flex-col items-center justify-center text-center">
                          <h3 className="text-2xl font-bold">{filteredFlashcards[currentIndex].title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">Click to reveal answer</p>
                        </div>
                      </div>
                      <div
                        className={`absolute inset-0 backface-hidden rounded-xl border bg-card p-6 shadow-md transition-all duration-500 rotate-y-180 ${
                          isFlipped ? "rotate-y-0" : ""
                        }`}
                      >
                        <div className="flex h-full flex-col items-center justify-center text-center">
                          <p>{filteredFlashcards[currentIndex].content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" onClick={prevCard} disabled={currentIndex === 0}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous card</span>
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    {currentIndex + 1} of {filteredFlashcards.length}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextCard}
                    disabled={currentIndex === filteredFlashcards.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next card</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No flashcards found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchTerm || selectedCategory
                    ? "Try adjusting your search or filters"
                    : "Create some flashcards to get started"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            {filteredFlashcards.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFlashcards.map((card, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      {card.category && <CardDescription>{card.category}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{card.content}</p>
                    </CardContent>
                    {card.date && (
                      <CardFooter className="pt-0">
                        <p className="text-xs text-muted-foreground">Created: {card.date}</p>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No flashcards found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchTerm || selectedCategory
                    ? "Try adjusting your search or filters"
                    : "Create some flashcards to get started"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

