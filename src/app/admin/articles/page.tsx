
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export default function AdminArticlesPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Articles</h1>
                <Button className="ml-auto" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Article
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Articles</CardTitle>
                    <CardDescription>A list of all articles in your database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Volunteer Drive Success</TableCell>
                                <TableCell>Published</TableCell>
                                <TableCell>2024-10-28</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>New Partnership Announced</TableCell>
                                <TableCell>Published</TableCell>
                                <TableCell>2024-09-05</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
