
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const courses = [
    {
        id: "intro-to-community-building",
        title: "Introduction to Community Building",
        status: "Published",
        enrolled: 150
    },
    {
        id: "effective-fundraising-strategies",
        title: "Effective Fundraising Strategies",
        status: "Draft",
        enrolled: 75
    }
];

export default function AdminCoursesPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Courses</h1>
                <Button className="ml-auto" size="sm" asChild>
                    <Link href="/admin/courses/new">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Course
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Courses</CardTitle>
                    <CardDescription>A list of all courses in your learning platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Enrolled Members</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {courses.map(course => (
                             <TableRow key={course.id}>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.status}</TableCell>
                                <TableCell>{course.enrolled}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/courses/${course.id}`}>Edit</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                           ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
