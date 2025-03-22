"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CalendarIcon, Filter, SearchIcon, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type MedicalRecord = {
  id: string
  patient: string
  doctor: string
  date: string
  diagnosis: string
  symptoms: string
  notes: string
  type: "consultation" | "test" | "procedure"
}

export default function SearchPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [recordType, setRecordType] = useState<string | undefined>(undefined)
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Mock medical records
  const mockRecords: MedicalRecord[] = [
    {
      id: "1",
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      date: "2023-05-15",
      diagnosis: "Hypertension",
      symptoms: "Headache, dizziness, fatigue",
      notes: "Blood pressure: 140/90. Prescribed Lisinopril 10mg daily.",
      type: "consultation",
    },
    {
      id: "2",
      patient: "Emily Johnson",
      doctor: "Dr. Michael Chen",
      date: "2023-05-10",
      diagnosis: "Type 2 Diabetes",
      symptoms: "Increased thirst, frequent urination, fatigue",
      notes: "A1C: 7.2%. Prescribed Metformin 500mg twice daily.",
      type: "consultation",
    },
    {
      id: "3",
      patient: "Robert Davis",
      doctor: "Dr. Sarah Johnson",
      date: "2023-04-28",
      diagnosis: "Hypercholesterolemia",
      symptoms: "None",
      notes: "Cholesterol: 240 mg/dL. Prescribed Atorvastatin 20mg daily.",
      type: "consultation",
    },
    {
      id: "4",
      patient: "John Smith",
      doctor: "Dr. James Wilson",
      date: "2023-04-15",
      diagnosis: "N/A",
      symptoms: "N/A",
      notes: "Echocardiogram performed. Results: Normal heart function.",
      type: "test",
    },
    {
      id: "5",
      patient: "Maria Garcia",
      doctor: "Dr. Lisa Brown",
      date: "2023-05-05",
      diagnosis: "Appendicitis",
      symptoms: "Abdominal pain, fever, nausea",
      notes: "Appendectomy performed. Patient recovering well.",
      type: "procedure",
    },
    {
      id: "6",
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      date: "2023-03-20",
      diagnosis: "Hypertension",
      symptoms: "Headache, dizziness",
      notes: "Blood pressure: 145/95. Increased Lisinopril to 20mg daily.",
      type: "consultation",
    },
  ]

  const handleSearch = () => {
    let results = [...mockRecords]

    // Filter by patient name if user is a caregiver
    if (user?.role === "caregiver" && searchTerm) {
      results = results.filter(
        (record) =>
          record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.notes.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    } else if (user?.role === "patient" && searchTerm) {
      // For patients, only show their own records
      results = results.filter(
        (record) =>
          record.patient === "John Smith" &&
          (record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.notes.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    } else if (user?.role === "patient") {
      // For patients with no search term, only show their own records
      results = results.filter((record) => record.patient === "John Smith")
    }

    // Filter by record type
    if (recordType) {
      results = results.filter((record) => record.type === recordType)
    }

    // Filter by date range
    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      results = results.filter((record) => new Date(record.date) >= fromDate)
    }

    if (dateTo) {
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999) // End of the day
      results = results.filter((record) => new Date(record.date) <= toDate)
    }

    setFilteredRecords(results)
    setHasSearched(true)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setRecordType(undefined)
    setDateFrom(undefined)
    setDateTo(undefined)
    setFilteredRecords([])
    setHasSearched(false)
  }

  return (
    <DashboardLayout role={user?.role || "patient"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Medical Records</h1>
          <p className="text-muted-foreground">Search and filter through your medical records.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
            <CardDescription>Use the filters below to find specific medical records.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Term</Label>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by keyword..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="record-type">Record Type</Label>
                <Select value={recordType} onValueChange={setRecordType}>
                  <SelectTrigger id="record-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button onClick={handleSearch}>
                <SearchIcon className="mr-2 h-4 w-4" />
                Search Records
              </Button>
            </div>
          </CardContent>
        </Card>

        {hasSearched && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Search Results</h2>
              <div className="text-sm text-muted-foreground">{filteredRecords.length} records found</div>
            </div>

            {filteredRecords.length > 0 ? (
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <Card key={record.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-lg">{record.patient}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{record.date}</span>
                        </div>
                      </div>
                      <CardDescription>
                        {record.doctor} • {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Diagnosis:</span> {record.diagnosis}
                        </div>
                        <div>
                          <span className="font-medium">Symptoms:</span> {record.symptoms}
                        </div>
                        <div>
                          <span className="font-medium">Notes:</span> {record.notes}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No records found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Search for Medical Records</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Use the search filters above to find specific medical records.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

