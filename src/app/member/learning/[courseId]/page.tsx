
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Megaphone, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const courseData = {
    "intro-to-community-building": {
        title: "Introduction to Community Building",
        description: "Learn the fundamentals of building and nurturing a thriving community.",
        modules: [
            {
                title: "Module 1: The Basics",
                materials: [
                    { type: "announcement", title: "Welcome to the course!" },
                    { type: "pdf", title: "Course Syllabus", link: "#" },
                    { type: "quiz", title: "Introductory Quiz", link: "#" },
                ]
            },
            {
                title: "Module 2: Engagement Strategies",
                materials: [
                    { type: "pdf", title: "Reading: Fostering Online Discussions", link: "#" },
                    { type: "pdf", title: "Case Study: The Reddit Model", link: "#" },
                    { type: "quiz", title: "Quiz: Engagement Techniques", link: "#" },
                ]
            },
            {
                title: "Module 3: Scaling Your Community",
                materials: [
                    { type: "announcement", title: "Live Q&A Session next week" },
                    { type: "pdf", title: "Guide to Community Moderation", link: "#" },
                ]
            }
        ]
    },
    // In a real app, you would have data for all courses
};

const materialIcons = {
    announcement: Megaphone,
    pdf: FileText,
    quiz: HelpCircle,
};

type Material = {
    type: keyof typeof materialIcons;
    title: string;
    link?: string;
}

function getCourseData(courseId: string) {
    // @ts-ignore
    return courseData[courseId];
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
    const course = getCourseData(params.courseId);

    if (!course) {
        notFound();
    }
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/member/learning">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to courses</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
                    <p className="text-muted-foreground">{course.description}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        <span>Course Materials</span>
                    </CardTitle>
                    <CardDescription>
                        Work your way through the modules below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {course.modules.map((module: any, index: number) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-lg font-semibold">
                                    {module.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-4 pt-4">
                                        {module.materials.map((material: Material, matIndex: number) => {
                                            const Icon = materialIcons[material.type];
                                            return (
                                                <li key={matIndex} className="flex items-center justify-between p-4 rounded-md bg-muted/50">
                                                    <div className="flex items-center gap-4">
                                                        <Icon className="h-5 w-5 text-primary" />
                                                        <span className="font-medium">{material.title}</span>
                                                    </div>
                                                    {material.link && (
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={material.link}>
                                                                {material.type === 'quiz' ? 'Start Quiz' : 'Open'}
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
