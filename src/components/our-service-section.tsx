import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export default function OurServiceSection() {
    return (
        <section id="services">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt="Consultation meeting"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="consultation meeting"
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                            Our Services
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
                            Assistance and Consultation
                        </h2>
                        <p className="text-foreground/80">
                            We provide expert consultation to help organizations and community leaders develop effective strategies for social impact. Our team works closely with you to understand your unique challenges and opportunities, offering tailored guidance on project planning, fundraising, and community engagement.
                        </p>
                        <div className="mt-6">
                            <Link href="/contact">
                                <Button>Book a Consultation</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
