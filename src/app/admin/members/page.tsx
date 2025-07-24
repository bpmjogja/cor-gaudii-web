
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export default function AdminMembersPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Members</h1>
                 <Button className="ml-auto" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Member
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
                            <TableRow>
                                <TableCell>Alex Johnson</TableCell>
                                <TableCell>alex.j@example.com</TableCell>
                                <TableCell>Admin</TableCell>
                                <TableCell>2023-01-15</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>Maria Garcia</TableCell>
                                <TableCell>maria.g@example.com</TableCell>
                                <TableCell>Member</TableCell>
                                <TableCell>2023-02-20</TableCell>
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
