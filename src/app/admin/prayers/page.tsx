
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Trash2 } from "lucide-react";

const prayerRequests = [
    {
        id: "prayer-1",
        name: "Alice Williams",
        request: "Praying for my mother's health and speedy recovery from surgery.",
        date: "2024-07-29",
        status: "Pending",
    },
    {
        id: "prayer-2",
        name: "David Brown",
        request: "Please pray for guidance and wisdom in making a major career decision.",
        date: "2024-07-28",
        status: "Prayed For",
    },
     {
        id: "prayer-3",
        name: "Anonymous",
        request: "Praying for peace and comfort for a grieving family.",
        date: "2024-07-27",
        status: "Pending",
    },
];

export default function AdminPrayersPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Prayer Requests</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Prayer Requests</CardTitle>
                    <CardDescription>A list of all prayer requests submitted by users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="w-[50%]">Request</TableHead>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prayerRequests.map((prayer) => (
                                <TableRow key={prayer.id}>
                                    <TableCell className="font-medium">{prayer.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{prayer.request}</TableCell>
                                    <TableCell>{prayer.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={prayer.status === 'Prayed For' ? 'secondary' : 'default'}>
                                            {prayer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        {prayer.status === 'Pending' && (
                                            <Button variant="outline" size="sm">
                                                <Check className="h-4 w-4 mr-2" />
                                                Mark as Prayed For
                                            </Button>
                                        )}
                                        <Button variant="outline" size="icon" className="hover:bg-destructive hover:text-destructive-foreground">
                                            <Trash2 className="h-4 w-4" />
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
