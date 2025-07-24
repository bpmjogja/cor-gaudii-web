import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const teamMembers = [
    {
        name: "Alex Johnson",
        role: "Executive Director",
        image: "https://placehold.co/400x400.png",
        hint: "portrait person"
    },
    {
        name: "Maria Garcia",
        role: "Program Coordinator",
        image: "https://placehold.co/400x400.png",
        hint: "portrait woman"
    },
    {
        name: "James Smith",
        role: "Community Outreach Lead",
        image: "https://placehold.co/400x400.png",
        hint: "portrait man"
    },
     {
        name: "Emily White",
        role: "Creative Director",
        image: "https://placehold.co/400x400.png",
        hint: "portrait woman smiling"
    }
];

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section id="about-hero" className="py-20 text-center bg-secondary">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline sm:text-5xl">About BPM</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                            Learn more about our mission, vision, and the dedicated team behind Building Purposeful Movements.
                        </p>
                    </div>
                </section>

                <section id="about-content" className="py-16 sm:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight text-primary font-headline">Our Story</h2>
                                <p className="text-foreground/80">
                                    BPM was founded on the simple principle that collective action can create profound change. We believe in the power of community and strive to provide the resources and support necessary for local movements to flourish. Our history is rooted in successful community projects, and our mission is to expand our reach to help even more initiatives get off the ground.
                                </p>
                                <p className="text-foreground/80">
                                    We work hand-in-hand with community leaders, volunteers, and donors to identify needs, develop strategies, and implement sustainable solutions that have a lasting impact. Our approach is collaborative, data-driven, and always focused on the long-term well-being of the communities we serve.
                                </p>
                            </div>
                             <div className="relative h-80 w-full overflow-hidden rounded-lg">
                                <Image
                                    src="https://placehold.co/600x400.png"
                                    alt="Our team in a meeting"
                                    layout="fill"
                                    objectFit="cover"
                                    data-ai-hint="team collaboration"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team" className="py-16 sm:py-20 bg-card">
                     <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
                                Meet the Team
                            </h2>
                            <p className="mt-4 text-lg text-foreground/80">
                                We are a group of passionate individuals dedicated to making a difference.
                            </p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {teamMembers.map((member) => (
                                <Card key={member.name} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={member.image}
                                            alt={`Portrait of ${member.name}`}
                                            layout="fill"
                                            objectFit="cover"
                                            data-ai-hint={member.hint}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-headline font-semibold text-accent">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                    </div>
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
