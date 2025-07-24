
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Eye } from "lucide-react";

const consultations = [
    {
        id: "consult-1",
        name: "John Doe",
        whatsapp: "+1234567890",
        date: "2024-07-28",
        status: "Pending",
    },
    {
        id: "consult-2",
        name: "Jane Smith",
        whatsapp: "+1987654321",
        date: "2024-07-27",
        status: "Completed",
    },
     {
        id: "consult-3",
        name: "Peter Jones",
        whatsapp: "+1122334455",
        date: "2024-07-25",
        status: "Pending",
    },
];

export default function AdminConsultationsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Consultations</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Consultation Requests</CardTitle>
                    <CardDescription>A list of all consultation requests submitted by users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>WhatsApp Number</TableHead>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {consultations.map((consultation) => (
                                <TableRow key={consultation.id}>
                                    <TableCell className="font-medium">{consultation.name}</TableCell>
                                    <TableCell>{consultation.whatsapp}</TableCell>
                                    <TableCell>{consultation.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={consultation.status === 'Completed' ? 'secondary' : 'default'}>
                                            {consultation.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                        </Button>
                                        {consultation.status === 'Pending' && (
                                            <Button variant="outline" size="sm">
                                                <Check className="h-4 w-4 mr-2" />
                                                Mark as Complete
                                            </Button>
                                        )}
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
