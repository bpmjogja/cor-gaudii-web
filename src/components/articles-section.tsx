import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const articleItems = [
  {
    image: "https://placehold.co/600x400.png",
    date: "October 28, 2024",
    title: "Volunteer Drive Success",
    description: "A huge thank you to everyone who signed up during our fall volunteer drive. Your support is invaluable.",
    link: "/articles",
    hint: "volunteers group"
  },
  {
    image: "https://placehold.co/600x400.png",
    date: "September 5, 2024",
    title: "New Partnership Announced",
    description: "We're excited to partner with Local Corp to expand our reach and impact in the community.",
    link: "/articles",
    hint: "business handshake"
  },
  {
    image: "https://placehold.co/600x400.png",
    date: "August 12, 2024",
    title: "Summer Youth Program Wraps Up",
    description: "Our summer youth program concluded with a showcase of the amazing projects created by the participants.",
    link: "/articles",
    hint: "children learning"
  },
];

export default function ArticlesSection() {
  return (
    <section id="articles" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            Stay Updated
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Keep up with our latest activities and announcements.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articleItems.map((item) => (
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
                  <Button variant="link" className="p-0 text-primary hover:text-accent">Read More →</Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Link href="/articles">
                <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                    View All Articles
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
