
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const learningMaterials = [
    {
        title: "Introduction to Community Building",
        description: "Learn the fundamentals of building and nurturing a thriving community.",
        image: "https://placehold.co/600x400.png",
        hint: "community group"
    },
    {
        title: "Effective Fundraising Strategies",
        description: "Discover proven strategies to raise funds for your non-profit initiatives.",
        image: "https://placehold.co/600x400.png",
        hint: "money chart"
    },
    {
        title: "Social Media for Social Good",
        description: "Harness the power of social media to amplify your message and impact.",
        image: "https://placehold.co/600x400.png",
        hint: "social media icons"
    },
     {
        title: "Volunteer Management 101",
        description: "Best practices for recruiting, training, and retaining dedicated volunteers.",
        image: "https://placehold.co/600x400.png",
        hint: "team of volunteers"
    }
];

export default function LearningPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    Learning Materials
                </h1>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {learningMaterials.map((material) => (
                    <Card key={material.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="p-0">
                            <Image
                                src={material.image}
                                alt={material.title}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover"
                                data-ai-hint={material.hint}
                            />
                        </CardHeader>
                        <CardContent className="p-6">
                            <CardTitle className="font-headline text-xl">{material.title}</CardTitle>
                            <p className="mt-2 text-sm text-muted-foreground">{material.description}</p>
                        </CardContent>
                        <CardFooter>
                           <Button>Start Learning</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
