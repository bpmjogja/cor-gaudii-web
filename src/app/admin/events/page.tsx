
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const events = [
    {
        id: "event-1",
        title: "Annual Community Gala",
        status: "Upcoming",
        date: "2024-11-15"
    },
    {
        id: "event-2",
        title: "Winter Holiday Market",
        status: "Upcoming",
        date: "2024-12-05"
    }
];

export default function AdminEventsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
                 <Button className="ml-auto" size="sm" asChild>
                    <Link href="/admin/events/new">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Event
                    </Link>
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
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{event.status}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/events/${event.id}`}>Edit</Link>
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
