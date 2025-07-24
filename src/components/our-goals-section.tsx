import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Leaf } from "lucide-react";

const goals = [
    {
        icon: Target,
        title: "Strategic Impact",
        description: "Focus on long-term, sustainable projects that address root causes of community challenges and create lasting positive change."
    },
    {
        icon: TrendingUp,
        title: "Expand Our Reach",
        description: "Grow our network of volunteers and partners to support more grassroots movements in new communities and regions."
    },
    {
        icon: Leaf,
        title: "Promote Sustainability",
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
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {goals.map((goal) => (
                        <Card key={goal.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="items-center">
                                <div className="rounded-full bg-primary/10 p-4">
                                    <goal.icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-xl mt-4">{goal.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{goal.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
