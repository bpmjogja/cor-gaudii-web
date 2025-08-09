
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// In a real app, you'd fetch this from a CMS or database
const allMembers = [
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

function getMemberData(memberId: string) {
    if (memberId === 'new') {
        return {
            isNew: true,
            name: '',
            email: '',
            role: 'Member',
            dateJoined: Date.now().toString()
        };
    }
    const member = allMembers.find(m => m.id === memberId);
    return member ? { ...member, isNew: false } : undefined;
}


export default function EditMemberPage() {
    const params = useParams();
    const router = useRouter();
    const memberId = Array.isArray(params.memberId) ? params.memberId[0] : params.memberId ?? '';
    
    const memberData = getMemberData(memberId);
    
    if (!memberData) {
        notFound();
    }
    
    const { isNew, ...member } = memberData;

    const pageTitle = isNew ? "Add New Member" : "Edit Member";
    const pageDescription = isNew ? "Fill in the details to add a new member." : `Editing the profile for ${member.name}`;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.push('/admin/members')}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to members</span>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
                    <p className="text-muted-foreground">{pageDescription}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-6 w-6" />
                        <span>Member Information</span>
                    </CardTitle>
                    <CardDescription>
                       Fill out the form below to {isNew ? "add" : "update"} the member.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={member.name} placeholder="e.g. John Doe" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={member.email} placeholder="e.g. member@example.com" />
                        </div>
                    </div>
                     <div className="grid gap-4 md:grid-cols-2">
                         <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select defaultValue={member.role}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Member">Member</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                           {isNew ? (
                            <>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Create a password" />
                            </>
                           ) : (
                             <>
                                <Label htmlFor="dateJoined">Date Joined</Label>
                                <Input id="dateJoined" defaultValue={member.dateJoined} disabled />
                            </>
                           )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>{isNew ? "Add Member" : "Save Changes"}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
