import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Rocket, Network } from "lucide-react";

const activities = [
    {
        icon: Users,
        title: "Community Empowerment",
        description: "We provide resources and training to empower local communities to take charge of their own development and create lasting change."
    },
    {
        icon: Rocket,
        title: "Grassroots Support",
        description: "We offer funding, mentorship, and logistical support to help grassroots initiatives get off the ground and achieve their goals."
    },
    {
        icon: Network,
        title: "Building Networks",
        description: "We connect changemakers, volunteers, and organizations to foster collaboration and build a strong network for social good."
    }
];

export default function WhatWeDoSection() {
    return (
        <section id="what-we-do">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
                        What We Do
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80">
                        Our work is focused on three key areas to maximize our impact and support sustainable, community-driven change.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {activities.map((activity) => (
                        <Card key={activity.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="items-center">
                                <div className="rounded-full bg-primary/10 p-4">
                                    <activity.icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-xl mt-4">{activity.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{activity.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
