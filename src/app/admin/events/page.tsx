
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export default function AdminEventsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
                 <Button className="ml-auto" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Event
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Events</CardTitle>
                    <CardDescription>A list of all upcoming and past events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Event Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Annual Community Gala</TableCell>
                                <TableCell>Upcoming</TableCell>
                                <TableCell>2024-11-15</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>Winter Holiday Market</TableCell>
                                <TableCell>Upcoming</TableCell>
                                <TableCell>2024-12-05</TableCell>
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
