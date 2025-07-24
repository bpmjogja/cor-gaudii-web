import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Heart, CalendarClock } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const supportOptions = [
  {
    icon: Heart,
    title: "One-Time Donation",
    description: "Your single gift can provide immediate resources for our ongoing projects and community needs.",
    buttonText: "Donate Now",
    hint: "donation box"
  },
  {
    icon: CalendarClock,
    title: "Monthly Pledge",
    description: "Become a sustaining partner. Your monthly support ensures long-term stability and impact.",
    buttonText: "Pledge Monthly",
    hint: "calendar hands"
  },
  {
    icon: Handshake,
    title: "Volunteer",
    description: "Give the gift of your time and skills. Join our team of dedicated volunteers making a difference.",
    buttonText: "Get Involved",
    hint: "volunteers working"
  },
];

export default function SupportPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section id="support-page" className="py-16 sm:py-20 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
                                Ways to Support
                            </h1>
                            <p className="mt-4 text-lg text-foreground/80">
                                Your support is crucial for our work. Here are a few ways you can contribute to our cause and help us build a better future.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {supportOptions.map((option) => (
                            <Card key={option.title} className="flex flex-col text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="items-center">
                                <div className="rounded-full bg-primary/10 p-4">
                                <option.icon className="h-8 w-8 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardTitle className="font-headline text-xl">{option.title}</CardTitle>
                                <CardDescription className="mt-2">
                                {option.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="justify-center">
                                <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>{option.buttonText}</Button>
                            </CardFooter>
                            </Card>
                        ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
