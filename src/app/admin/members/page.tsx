
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const members = [
    {
        id: "usr-1",
        name: "Alex Johnson",
        email: "alex.j@example.com",
        role: "Admin",
        dateJoined: "2023-01-15"
    },
    {
        id: "usr-2",
        name: "Maria Garcia",
        email: "maria.g@example.com",
        role: "Member",
        dateJoined: "2023-02-20"
    }
];


export default function AdminMembersPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Members</h1>
                 <Button className="ml-auto" size="sm" asChild>
                    <Link href="/admin/members/new">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Member
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Members</CardTitle>
                    <CardDescription>A list of all members.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>{member.dateJoined}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/members/${member.id}`}>Edit</Link>
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
