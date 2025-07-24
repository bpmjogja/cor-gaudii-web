
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, X } from "lucide-react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold md:text-2xl">Profile Management</h1>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Your Profile</CardTitle>
                        <CardDescription>
                            {isEditing ? "Update your personal information." : "View your profile details."}
                        </CardDescription>
                    </div>
                     <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                        <span className="sr-only">{isEditing ? "Cancel" : "Edit Profile"}</span>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                         <Avatar className="h-24 w-24">
                            <AvatarImage src="https://placehold.co/400x400.png" alt="User avatar" data-ai-hint="user portrait" />
                            <AvatarFallback>
                                <User className="h-12 w-12" />
                            </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                            <div className="space-y-1">
                                <Label htmlFor="picture">Profile Picture</Label>
                                <Input id="picture" type="file" />
                                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        )}
                    </div>
                     <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="Admin User" disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="admin@example.com" disabled />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us a little about yourself"
                            disabled={!isEditing}
                        />
                    </div>
                </CardContent>
                {isEditing && (
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save Changes</Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
