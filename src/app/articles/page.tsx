
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const allArticles = [
    {
      image: "https://placehold.co/600x400.png",
      date: "October 28, 2024",
      title: "Volunteer Drive Success",
      keywords: "volunteers, community, support",
      slug: "volunteer-drive-success",
      hint: "volunteers group"
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "September 5, 2024",
      title: "New Partnership Announced",
      keywords: "partnership, community, initiatives",
      slug: "new-partnership-announced",
      hint: "business handshake"
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "August 12, 2024",
      title: "Summer Youth Program Wraps Up",
      keywords: "youth, summer program, education",
      slug: "summer-youth-program-wraps-up",
      hint: "children learning"
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "July 20, 2024",
      title: "Community Garden Harvest Day",
      keywords: "garden, community, harvest, food",
      slug: "community-garden-harvest-day",
      hint: "community garden"
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "June 1, 2024",
      title: "BPM Receives Grant for Tech Education",
      keywords: "grant, tech education, youth, coding",
      slug: "bpm-receives-grant-for-tech-education",
      hint: "computer workshop"
    },
  ];

export default function ArticlesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section id="articles-page" className="py-16 sm:py-20 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
                                Latest Articles
                            </h1>
                            <p className="mt-4 text-lg text-foreground/80">
                                Keep up with our latest activities and announcements.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {allArticles.map((item) => (
                            <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Link href={`/articles/${item.slug}`} className="block">
                                <CardHeader className="p-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                    data-ai-hint={item.hint}
                                />
                                </CardHeader>
                                <CardContent className="p-6">
                                <p className="text-sm text-muted-foreground">{item.date}</p>
                                <CardTitle className="mt-2 font-headline text-xl">{item.title}</CardTitle>
                                <p className="mt-2 text-sm text-muted-foreground">{item.keywords}</p>
                                </CardContent>
                                <CardFooter>
                                <Button variant="link" className="p-0 text-primary hover:text-accent">Read Article →</Button>
                                </CardFooter>
                            </Link>
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
