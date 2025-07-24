
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const enrolledCourses = [
    {
        id: "intro-to-community-building",
        title: "Introduction to Community Building",
        description: "Learn the fundamentals of building and nurturing a thriving community.",
        image: "https://placehold.co/600x400.png",
        hint: "community group"
    },
    {
        id: "effective-fundraising-strategies",
        title: "Effective Fundraising Strategies",
        description: "Discover proven strategies to raise funds for your non-profit initiatives.",
        image: "https://placehold.co/600x400.png",
        hint: "money chart"
    },
    {
        id: "social-media-for-social-good",
        title: "Social Media for Social Good",
        description: "Harness the power of social media to amplify your message and impact.",
        image: "https://placehold.co/600x400.png",
        hint: "social media icons"
    },
     {
        id: "volunteer-management-101",
        title: "Volunteer Management 101",
        description: "Best practices for recruiting, training, and retaining dedicated volunteers.",
        image: "https://placehold.co/600x400.png",
        hint: "team of volunteers"
    }
];

export default function LearningPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold md:text-2xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    My Courses
                </h1>
                <p className="text-muted-foreground">
                    Here are the courses you are currently enrolled in.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-4">
                {enrolledCourses.map((course) => (
                    <Card key={course.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <CardHeader className="p-0">
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover"
                                data-ai-hint={course.hint}
                            />
                        </CardHeader>
                        <CardContent className="p-6 flex-grow">
                            <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                            <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                        </CardContent>
                        <CardFooter>
                           <Button asChild>
                                <Link href={`/member/learning/${course.id}`}>Continue Learning</Link>
                           </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
