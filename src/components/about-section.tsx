import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const ministries = [
  {
    name: "Leadership",
    image: "https://placehold.co/300x200.png",
    hint: "team meeting"
  },
  {
    name: "Community Engagement",
    image: "https://placehold.co/300x200.png",
    hint: "community event"
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
              Who We Are
            </h2>
            <p className="text-foreground/80">
              BPM was founded on the simple principle that collective action can create profound change. We believe in the power of community and strive to provide the resources and support necessary for local movements to flourish. Our history is rooted in successful community projects, and our mission is to expand our reach to help even more initiatives get off the ground.
            </p>
            <p className="text-foreground/80">
              We work hand-in-hand with community leaders, volunteers, and donors to identify needs, develop strategies, and implement sustainable solutions that have a lasting impact.
            </p>
            <div className="mt-6">
                <Link href="/about">
                    <Button>Learn More</Button>
                </Link>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-bold tracking-tight text-primary font-headline sm:text-3xl text-center md:text-left">
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {ministries.map((ministry) => (
                <div key={ministry.name} className="flex flex-col items-center text-center">
                  <div className="w-full h-48 relative overflow-hidden rounded-lg mb-4">
                     <Image 
                        src={ministry.image} 
                        alt={ministry.name + " Ministry"} 
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={ministry.hint} 
                      />
                  </div>
                  <h4 className="text-xl font-semibold tracking-tight text-accent font-headline">
                    {ministry.name} Ministry
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
