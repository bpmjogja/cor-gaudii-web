import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center text-center">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Community gathering"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
        data-ai-hint="community people"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
      <div className="container relative z-20 mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl md:text-6xl">
            Building Purposeful Movements
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            BPM is dedicated to fostering positive change by empowering communities, supporting grassroots initiatives, and building a network of passionate changemakers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="#about">
              <Button size="lg">Learn More</Button>
            </Link>
            <Link href="#support">
              <Button size="lg" variant="outline" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))', borderColor: 'hsl(var(--accent))' }}>
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
