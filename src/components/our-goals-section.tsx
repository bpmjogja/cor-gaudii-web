import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, TrendingUp, Leaf } from "lucide-react";
import Image from "next/image";

const goals = [
    {
        icon: Target,
        title: "Strategic Impact",
        value: "strategic-impact",
        image: "https://placehold.co/600x400.png",
        hint: "community meeting",
        description: "Focus on long-term, sustainable projects that address root causes of community challenges and create lasting positive change."
    },
    {
        icon: TrendingUp,
        title: "Expand Our Reach",
        value: "expand-reach",
        image: "https://placehold.co/600x400.png",
        hint: "global network",
        description: "Grow our network of volunteers and partners to support more grassroots movements in new communities and regions."
    },
    {
        icon: Leaf,
        title: "Promote Sustainability",
        value: "promote-sustainability",
        image: "https://placehold.co/600x400.png",
        hint: "green energy",
        description: "Champion and implement eco-friendly practices across all our projects, ensuring a healthier planet for future generations."
    }
];

export default function OurGoalsSection() {
    return (
        <section id="our-goals" className="bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
                        Our Goals
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80">
                        We are committed to achieving ambitious goals that drive our mission forward and create a better future for all.
                    </p>
                </div>
                <div className="mt-12">
                    <Tabs defaultValue={goals[0].value} className="w-full max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-3">
                            {goals.map((goal) => (
                                <TabsTrigger key={goal.value} value={goal.value} className="flex gap-2 items-center">
                                    <goal.icon className="h-5 w-5" />
                                    <span>{goal.title}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {goals.map((goal) => (
                            <TabsContent key={goal.value} value={goal.value} className="mt-6">
                                <div className="p-6 bg-secondary/30 rounded-lg grid md:grid-cols-2 gap-8 items-center">
                                    <div className="relative h-64 w-full overflow-hidden rounded-lg">
                                        <Image
                                            src={goal.image}
                                            alt={goal.title}
                                            layout="fill"
                                            objectFit="cover"
                                            data-ai-hint={goal.hint}
                                        />
                                    </div>
                                    <div className="text-left">
                                      <p className="text-muted-foreground">{goal.description}</p>
                                    </div>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </section>
    );
}
