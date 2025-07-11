"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { format, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const allEvents = [
    {
      image: "https://placehold.co/600x400.png",
      date: new Date("2024-11-15T12:00:00Z"),
      title: "Annual Community Gala",
      description: "Join us for our biggest night of the year as we celebrate our achievements and look to the future. It was a wonderful event with over 200 attendees and we raised a significant amount for our projects.",
      link: "#",
      hint: "gala event"
    },
    {
      image: "https://placehold.co/600x400.png",
      date: new Date("2024-12-05T12:00:00Z"),
      title: "Winter Holiday Market",
      description: "Get in the festive spirit at our annual holiday market. Support local artisans and find unique gifts for your loved ones.",
      link: "#",
      hint: "holiday market"
    },
    {
      image: "https://placehold.co/600x400.png",
      date: new Date("2025-01-25T12:00:00Z"),
      title: "New Year Goal Setting Workshop",
      description: "Start the new year right with our popular workshop on setting and achieving personal and community goals.",
      link: "#",
      hint: "workshop presentation"
    },
  ];

export default function EventsPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    
    const eventDays = allEvents.map(event => event.date);

    const selectedEvents = selectedDate 
        ? allEvents.filter(event => isSameDay(event.date, selectedDate))
        : [];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section id="events-page" className="py-16 sm:py-20 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
                                Events Calendar
                            </h1>
                            <p className="mt-4 text-lg text-foreground/80">
                                Explore our upcoming events. Select a date on the calendar to see what's happening.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
                            <div className="flex justify-center">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md border"
                                    modifiers={{
                                        events: eventDays
                                    }}
                                    modifiersStyles={{
                                        events: {
                                            color: 'hsl(var(--primary-foreground))',
                                            backgroundColor: 'hsl(var(--primary))',
                                        }
                                    }}
                                />
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold tracking-tight text-primary font-headline">
                                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : 'Select a date'}
                                </h2>
                                {selectedEvents.length > 0 ? (
                                    <div className="space-y-8">
                                        {selectedEvents.map((event) => (
                                            <Card key={event.title} className="overflow-hidden shadow-lg">
                                                <Link href={event.link} className="block">
                                                    <CardHeader className="p-0">
                                                        <Image
                                                            src={event.image}
                                                            alt={event.title}
                                                            width={600}
                                                            height={400}
                                                            className="w-full h-48 object-cover"
                                                            data-ai-hint={event.hint}
                                                        />
                                                    </CardHeader>
                                                    <CardContent className="p-6">
                                                        <CardTitle className="mt-2 font-headline text-xl">{event.title}</CardTitle>
                                                        <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                                                    </CardContent>
                                                </Link>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card>
                                        <CardContent className="p-6">
                                            <p className="text-muted-foreground">No events scheduled for this day.</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
