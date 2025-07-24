import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Handshake, Calendar, FileText } from "lucide-react";

const quickLinks = [
  {
    icon: Heart,
    title: "Donate",
    description: "Support our cause with a one-time or recurring donation.",
    link: "/support",
    hint: "donation icon"
  },
  {
    icon: Handshake,
    title: "Get Involved",
    description: "Join our team of volunteers and make a hands-on difference.",
    link: "/support",
    hint: "volunteer icon"
  },
  {
    icon: Calendar,
    title: "Upcoming Events",
    description: "Find out about our upcoming community events and workshops.",
    link: "/events",
    hint: "calendar icon"
  },
  {
    icon: FileText,
    title: "Latest Articles",
    description: "Read our latest articles and stay informed about our work.",
    link: "/articles",
    hint: "document icon"
  },
];

export default function QuickLinksSection() {
  return (
    <section id="quick-links" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
              Get Involved
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
                There are many ways to support our mission. Find the one that's right for you.
            </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Card key={link.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{link.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{link.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="link" className="p-0 text-primary hover:text-accent">
                    <Link href={link.link}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}