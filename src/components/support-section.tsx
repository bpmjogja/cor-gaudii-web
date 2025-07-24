import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Handshake, Heart, CalendarClock } from "lucide-react";

export default function SupportSection() {
  return (
    <section id="support">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            Get Involved
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
            Ways to Support
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Your support is crucial for our work. Whether through donations or volunteering, your contribution helps us build a better future.
          </p>
        </div>
        <div className="mt-12 text-center">
            <Link href="/support">
                <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                    Learn How to Support
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
