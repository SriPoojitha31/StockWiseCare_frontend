"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink } from "lucide-react"

// Sample charity organizations data
const charityOrganizations = [
  {
    id: "1",
    name: "Tata Trust",
    description: "Working towards sustainable development and improving quality of life for communities across India.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Education",
    website: "https://www.tatatrusts.org/",
    selected: true,
  },
  {
    id: "2",
    name: "Reliance Foundation",
    description:
      "Addressing India's development challenges in areas of rural transformation, education, health, and more.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Healthcare",
    website: "https://reliancefoundation.org/",
    selected: true,
  },
  {
    id: "3",
    name: "Bill & Melinda Gates Foundation",
    description: "Fighting poverty, disease, and inequity around the world through various initiatives and programs.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Global Health",
    website: "https://www.gatesfoundation.org/",
    selected: true,
  },
  {
    id: "4",
    name: "Red Cross",
    description: "Providing humanitarian aid during emergencies and disasters, and promoting humanitarian principles.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Disaster Relief",
    website: "https://www.redcross.org/",
    selected: true,
  },
  {
    id: "5",
    name: "UNICEF",
    description: "Working to save children's lives, defend their rights, and help them fulfill their potential.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Children",
    website: "https://www.unicef.org/",
    selected: false,
  },
  {
    id: "6",
    name: "World Wildlife Fund",
    description: "Leading organization in wildlife conservation and endangered species protection.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Environment",
    website: "https://www.worldwildlife.org/",
    selected: false,
  },
  {
    id: "7",
    name: "Akshaya Patra Foundation",
    description: "Implementing school meal programs across India to address hunger and promote education.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Food Security",
    website: "https://www.akshayapatra.org/",
    selected: false,
  },
  {
    id: "8",
    name: "Doctors Without Borders",
    description:
      "Providing medical assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "Healthcare",
    website: "https://www.doctorswithoutborders.org/",
    selected: false,
  },
]

export function CharityList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [charities, setCharities] = useState(charityOrganizations)

  const handleToggleSelect = (id: string) => {
    setCharities(
      charities.map((charity) => (charity.id === id ? { ...charity, selected: !charity.selected } : charity)),
    )
  }

  const filteredCharities = charities.filter((charity) => {
    const matchesSearch =
      charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "selected") return matchesSearch && charity.selected
    if (activeTab === "category") return matchesSearch && charity.category.toLowerCase() === activeTab.toLowerCase()

    return matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search charities..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="selected">Selected</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCharities.map((charity) => (
          <Card key={charity.id} className={charity.selected ? "border-primary" : ""}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 shrink-0">
                  <img
                    src={charity.logo || "/placeholder.svg"}
                    alt={charity.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{charity.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {charity.category}
                      </Badge>
                    </div>
                    <Button
                      variant={charity.selected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleSelect(charity.id)}
                    >
                      {charity.selected ? "Selected" : "Select"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{charity.description}</p>
                  <div className="mt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
                      <a href={charity.website} target="_blank" rel="noopener noreferrer">
                        Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
