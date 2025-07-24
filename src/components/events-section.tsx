import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const eventItems = [
  {
    image: "https://placehold.co/600x400.png",
    date: "November 15, 2024",
    title: "Annual Community Gala",
    description: "Join us for our biggest night of the year as we celebrate our achievements and look to the future.",
    link: "/events",
    hint: "gala event"
  },
  {
    image: "https://placehold.co/600x400.png",
    date: "December 5, 2024",
    title: "Winter Holiday Market",
    description: "Get in the festive spirit at our annual holiday market. Support local artisans and find unique gifts.",
    link: "/events",
    hint: "holiday market"
  },
  {
    image: "https://placehold.co/600x400.png",
    date: "January 25, 2025",
    title: "New Year Goal Setting Workshop",
    description: "Start the new year right with our popular workshop on setting and achieving personal and community goals.",
    link: "/events",
    hint: "workshop presentation"
  },
];

export default function EventsSection() {
  return (
    <section id="events">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            Be a Part of It
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Join us at our upcoming events and connect with the community.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {eventItems.map((item) => (
            <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href={item.link} className="block">
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
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 text-primary hover:text-accent">View Event →</Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Link href="/events">
                <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                    View All Events
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
