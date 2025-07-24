
'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Megaphone, HelpCircle, ArrowLeft, PlusCircle, Edit, Trash2, Upload, GripVertical } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { cn } from '@/lib/utils';

const allCoursesData = {
    "intro-to-community-building": {
        title: "Introduction to Community Building",
        description: "Learn the fundamentals of building and nurturing a thriving community.",
        modules: [
            {
                id: 'mod1',
                title: "Module 1: The Basics",
                materials: [
                    { id: 'mat1-1', type: "announcement", title: "Welcome to the course!" },
                    { id: 'mat1-2', type: "pdf", title: "Course Syllabus", link: "#" },
                    { id: 'mat1-3', type: "quiz", title: "Introductory Quiz", link: "#" },
                ]
            },
            {
                id: 'mod2',
                title: "Module 2: Engagement Strategies",
                materials: [
                    { id: 'mat2-1', type: "pdf", title: "Reading: Fostering Online Discussions", link: "#" },
                    { id: 'mat2-2', type: "pdf", title: "Case Study: The Reddit Model", link: "#" },
                    { id: 'mat2-3', type: "quiz", title: "Quiz: Engagement Techniques", link: "#" },
                ]
            },
            {
                id: 'mod3',
                title: "Module 3: Scaling Your Community",
                materials: [
                    { id: 'mat3-1', type: "announcement", title: "Live Q&A Session next week" },
                    { id: 'mat3-2', type: "pdf", title: "Guide to Community Moderation", link: "#" },
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
    id: string;
    type: keyof typeof materialIcons;
    title: string;
    link?: string;
}

type Module = {
    id: string;
    title: string;
    materials: Material[];
}

type Course = {
    title: string;
    description: string;
    modules: Module[];
}

function getCourseData(courseId: string): Course | undefined {
    // @ts-ignore
    return allCoursesData[courseId];
}

export default function EditCoursePage() {
    const params = useParams();
    const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;

    const [course, setCourse] = useState<Course | null>(null);
    const [draggedOverModule, setDraggedOverModule] = useState<number | null>(null);
    const [draggedItem, setDraggedItem] = useState<{ moduleIndex: number; materialIndex?: number } | null>(null);

     useEffect(() => {
        const data = getCourseData(courseId);
        if (data) {
            setCourse(data);
        }
    }, [courseId]);


    if (!course) {
        // You can return a loading state or a not found component
        const initialCourse = getCourseData(courseId);
        if (!initialCourse) {
             notFound();
        }
        // This is a temporary fix for the initial load, a better solution might be a loading state
        setCourse(initialCourse);
        return <div>Loading...</div>;
    }


    const handleFileUploadDrop = (e: React.DragEvent<HTMLDivElement>, moduleIndex: number) => {
        e.preventDefault();
        setDraggedOverModule(null);
        if (draggedItem !== null) return; // This drop is for reordering, not file upload

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            console.log(`Files dropped in module ${moduleIndex + 1}:`, files.map(f => f.name));
            // Here you would typically handle the file upload
            alert(`${files.length} file(s) dropped in ${course.modules[moduleIndex].title}. Check the console for details.`);
        }
    };
    
    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent, moduleIndex: number, materialIndex?: number) => {
        setDraggedItem({ moduleIndex, materialIndex });
        e.dataTransfer.effectAllowed = 'move';
        if (materialIndex !== undefined) {
             e.dataTransfer.setData('text/plain', `material:${moduleIndex}:${materialIndex}`);
        } else {
             e.dataTransfer.setData('text/plain', `module:${moduleIndex}`);
        }
    };

    const handleDragOver = (e: React.DragEvent, moduleIndex: number, materialIndex?: number) => {
        e.preventDefault();
        if (!draggedItem) { // This is for file upload
             if (e.currentTarget.id === `dropzone-${moduleIndex}`) {
                setDraggedOverModule(moduleIndex);
                e.dataTransfer.dropEffect = 'copy';
             }
             return;
        }

        const dropTargetModuleIndex = moduleIndex;
        
        if (draggedItem.materialIndex !== undefined) { // Reordering materials
            e.dataTransfer.dropEffect = 'move';
        } else { // Reordering modules
            if (draggedItem.moduleIndex !== dropTargetModuleIndex) {
                e.dataTransfer.dropEffect = 'move';
            } else {
                e.dataTransfer.dropEffect = 'none';
            }
        }
    };

    const handleDrop = (e: React.DragEvent, targetModuleIndex: number, targetMaterialIndex?: number) => {
        e.preventDefault();
        setDraggedOverModule(null);
        if (!draggedItem || !course) {
             if (!draggedItem && e.currentTarget.id.startsWith('dropzone-')) {
                const moduleIndex = parseInt(e.currentTarget.id.split('-')[1]);
                handleFileUploadDrop(e, moduleIndex);
             }
             return;
        }

        const newCourse = JSON.parse(JSON.stringify(course));
        
        if (draggedItem.materialIndex !== undefined) { // Moving a material
            const sourceModuleIndex = draggedItem.moduleIndex;
            const sourceMaterialIndex = draggedItem.materialIndex;
            
            const [movedMaterial] = newCourse.modules[sourceModuleIndex].materials.splice(sourceMaterialIndex, 1);
            
            if (targetMaterialIndex !== undefined) {
                newCourse.modules[targetModuleIndex].materials.splice(targetMaterialIndex, 0, movedMaterial);
            } else {
                 newCourse.modules[targetModuleIndex].materials.push(movedMaterial);
            }
            

        } else { // Moving a module
            const sourceModuleIndex = draggedItem.moduleIndex;
            const [movedModule] = newCourse.modules.splice(sourceModuleIndex, 1);
            newCourse.modules.splice(targetModuleIndex, 0, movedModule);
        }

        setCourse(newCourse);
        setDraggedItem(null);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setDraggedOverModule(null);
    };

    const handleModuleDragOver = (e: React.DragEvent, moduleIndex: number) => {
        e.preventDefault();
        if (draggedItem && draggedItem.materialIndex === undefined) {
            handleDragOver(e, moduleIndex);
        }
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
                       Manage modules and learning materials. Drag and drop to reorder content or upload files.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
                        {course.modules.map((module: Module, index: number) => (
                             <div
                                key={module.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleModuleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className="border rounded-lg bg-card"
                            >
                            <AccordionItem 
                                value={`item-${index}`} 
                                className="border-b-0"
                            >
                                <div className="flex items-center hover:bg-muted/50 rounded-t-md">
                                     <div className="p-4 cursor-grab">
                                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <AccordionTrigger className="text-lg font-semibold hover:no-underline flex-1 text-left px-0 py-4">
                                        {module.title}
                                    </AccordionTrigger>
                                     <div className="flex items-center gap-2 mr-4">
                                        <Button variant="ghost" size="icon" onClick={() => alert('Edit clicked')}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                            variant="outline"
                                            size="icon" 
                                            onClick={() => alert('Trash clicked')}
                                            className="hover:bg-destructive hover:text-destructive-foreground"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <AccordionContent>
                                    <div
                                        className="pt-0 p-4"
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                    >
                                        <ul className="space-y-4">
                                            {module.materials.map((material: Material, matIndex: number) => {
                                                const Icon = materialIcons[material.type];
                                                return (
                                                    <li 
                                                        key={material.id} 
                                                        className="flex items-center justify-between p-4 rounded-md bg-muted/50"
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, index, matIndex)}
                                                        onDragOver={(e) => handleDragOver(e, index, matIndex)}
                                                        onDrop={(e) => handleDrop(e, index, matIndex)}
                                                        onDragEnd={handleDragEnd}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="cursor-grab">
                                                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                                                            </div>
                                                            <Icon className="h-5 w-5 text-primary" />
                                                            <span className="font-medium">{material.title}</span>
                                                        </div>
                                                         <div className="flex items-center gap-2">
                                                            <Button variant="outline" size="sm">
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </Button>
                                                             <Button 
                                                                variant="outline"
                                                                size="sm"
                                                                className="hover:bg-destructive hover:text-destructive-foreground"
                                                                onClick={() => {/* Implement delete logic */}}
                                                             >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div
                                        id={`dropzone-${index}`}
                                        className={cn(
                                            "mx-4 mb-4 border-2 border-dashed border-muted-foreground/20 rounded-lg transition-colors duration-200",
                                            draggedOverModule === index && draggedItem === null && "border-primary bg-primary/10"
                                        )}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDragEnter={(e) => { e.preventDefault(); if(draggedItem === null) setDraggedOverModule(index); }}
                                        onDragLeave={(e) => { e.preventDefault(); if(draggedItem === null) setDraggedOverModule(null); }}
                                        onDrop={(e) => handleDrop(e, index)}
                                    >
                                        <div className="p-4 w-full">
                                            <div className="w-full pointer-events-none text-center">
                                                <Button variant="outline" size="sm" className="w-full pointer-events-none">
                                                    <PlusCircle className="h-4 w-4 mr-2" />
                                                    Add Material
                                                </Button>
                                                {draggedOverModule === index && draggedItem === null ? (
                                                    <div className="flex flex-col items-center justify-center pointer-events-none text-primary pt-4">
                                                        <Upload className="h-8 w-8 mb-2" />
                                                        <p className="font-semibold">Drop files to upload</p>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-muted-foreground mt-2">or drop files here</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            </div>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
