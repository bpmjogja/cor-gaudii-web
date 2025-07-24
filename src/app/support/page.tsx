import { Button } from "@/components/ui/button";
import { Handshake, Heart } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const supportOptions = [
  {
    icon: Heart,
    title: "One-Time Donation",
    description: "Your single gift can provide immediate resources for our ongoing projects and community needs.",
    buttonText: "Donate Now",
    value: "one-time-donation",
  },
  {
    icon: Handshake,
    title: "Stipendium",
    description: "Give the gift of your time and skills. Join our team of dedicated volunteers making a difference.",
    buttonText: "Get Involved",
    value: "stipendium",
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
                        <div className="mt-12 max-w-2xl mx-auto">
                           <Tabs defaultValue={supportOptions[0].value} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    {supportOptions.map((option) => (
                                        <TabsTrigger key={option.value} value={option.value}>{option.title}</TabsTrigger>
                                    ))}
                                </TabsList>
                                {supportOptions.map((option) => (
                                <TabsContent key={option.value} value={option.value}>
                                    <Card className="text-center shadow-lg">
                                        <CardHeader className="items-center">
                                            <div className="rounded-full bg-primary/10 p-4">
                                                <option.icon className="h-10 w-10 text-primary" />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <CardTitle className="font-headline text-2xl">{option.title}</CardTitle>
                                            <CardDescription className="mt-4 text-lg">
                                            {option.description}
                                            </CardDescription>
                                        </CardContent>
                                        <CardFooter className="justify-center py-6">
                                            <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>{option.buttonText}</Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                                ))}
                            </Tabs>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
