
'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Megaphone, HelpCircle, ArrowLeft, PlusCircle, Edit, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { cn } from '@/lib/utils';

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

export default function EditCoursePage() {
    const params = useParams();
    const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;
    const course = getCourseData(courseId);
    const [draggedOverModule, setDraggedOverModule] = useState<number | null>(null);

    if (!course) {
        notFound();
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setDraggedOverModule(index);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggedOverModule(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setDraggedOverModule(null);
        const files = Array.from(e.dataTransfer.files);
        console.log(`Files dropped in module ${index + 1}:`, files.map(f => f.name));
        // Here you would typically handle the file upload
        alert(`${files.length} file(s) dropped in ${course.modules[index].title}. Check the console for details.`);
    };
    
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
                       Manage modules and learning materials for this course. Drag and drop files to upload.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                        {course.modules.map((module: any, index: number) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <div className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded-md">
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline flex-1 text-left px-4 py-2">
                                        <span>{module.title}</span>
                                    </AccordionTrigger>
                                    <div className="flex items-center gap-2 ml-4 pr-4">
                                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); alert('Edit clicked'); }}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); alert('Trash clicked'); }}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <AccordionContent>
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, index)}
                                        className={cn(
                                            "border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 transition-colors duration-200",
                                            draggedOverModule === index && "border-primary bg-primary/10"
                                        )}
                                    >
                                        <ul className="space-y-4">
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
                                                             <Button variant="outline" size="sm" color="destructive">
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
                                         {draggedOverModule === index && (
                                            <div className="flex flex-col items-center justify-center pointer-events-none text-primary pt-4">
                                                <Upload className="h-8 w-8 mb-2" />
                                                <p className="font-semibold">Drop files to upload</p>
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
