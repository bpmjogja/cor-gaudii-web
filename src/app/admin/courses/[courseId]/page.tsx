
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Megaphone, HelpCircle, ArrowLeft, PlusCircle, Edit, Trash2 } from "lucide-react";
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

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
    const course = getCourseData(params.courseId);

    if (!course) {
        notFound();
    }
    
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/courses">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to courses</span>
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Course</h1>
                        <p className="text-muted-foreground">{course.title}</p>
                    </div>
                </div>
                 <Button>Save Changes</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <BookOpen className="h-6 w-6" />
                            <span>Course Content</span>
                        </div>
                        <Button variant="outline" size="sm">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Module
                        </Button>
                    </CardTitle>
                    <CardDescription>
                       Manage modules and learning materials for this course.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                        {course.modules.map((module: any, index: number) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                    <div className="flex items-center justify-between w-full pr-4">
                                       <span>{module.title}</span>
                                       <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                             <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                       </div>
                                    </div>
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
                                                     <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </Button>
                                                         <Button variant="outline" size="sm" variant="destructive">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                        <li className="flex justify-center mt-4">
                                            <Button variant="outline" size="sm">
                                                <PlusCircle className="h-4 w-4 mr-2" />
                                                Add Material
                                            </Button>
                                        </li>
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
