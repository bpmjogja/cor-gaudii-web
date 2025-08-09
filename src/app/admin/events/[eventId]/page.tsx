
'use client';

import { useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, UploadCloud } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

// In a real app, you'd fetch this from a CMS
const allEvents = [
    {
        id: "event-1",
        title: "Annual Community Gala",
        status: "Upcoming",
        date: "2024-11-15",
        description: "Join us for our biggest night of the year as we celebrate our achievements and look to the future.",
        image: "https://placehold.co/600x400.png"
    },
    {
        id: "event-2",
        title: "Winter Holiday Market",
        status: "Upcoming",
        date: "2024-12-05",
        description: "Get in the festive spirit at our annual holiday market. Support local artisans and find unique gifts for your loved ones.",
        image: "https://placehold.co/600x400.png"
    }
];

function getEventData(eventId: string) {
    if (eventId === 'new') {
        return {
            isNew: true,
            title: '',
            date: '',
            description: '',
            status: 'Upcoming',
            image: ''
        };
    }
    const event = allEvents.find(event => event.id === eventId);
    return event ? { ...event, isNew: false } : undefined;
}


export default function EditEventPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = Array.isArray(params.eventId) ? params.eventId[0] : params.eventId ?? '';
    
    const eventData = getEventData(eventId);
    
    if (!eventData) {
        notFound();
    }
    
    const {isNew, ...event} = eventData;
    const [imagePreview, setImagePreview] = useState<string | null>(event.image);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const pageTitle = isNew ? "Create New Event" : "Edit Event";
    const pageDescription = isNew ? "Fill in the details to create a new event." : `Editing the event: ${event.title}`;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.push('/admin/events')}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to events</span>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
                    <p className="text-muted-foreground">{pageDescription}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-6 w-6" />
                        <span>Event Details</span>
                    </CardTitle>
                    <CardDescription>
                       Fill out the form below to {isNew ? "create" : "update"} the event.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input id="title" defaultValue={event.title} placeholder="A catchy title for your event" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            id="description" 
                            defaultValue={event.description}
                            className="min-h-[150px]" 
                            placeholder="A brief description of the event." 
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="date">Event Date</Label>
                            <Input id="date" type="date" defaultValue={event.date} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select defaultValue={event.status}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                                    <SelectItem value="Past">Past</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image-upload">Featured Image</Label>
                         <div className="mt-1 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md space-y-4">
                            {imagePreview ? (
                                <div className="relative w-full h-48">
                                    <Image src={imagePreview} alt="Image preview" layout="fill" objectFit="contain" className="rounded-md" />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center text-muted-foreground">
                                    <UploadCloud className="h-12 w-12" />
                                    <p className="mt-2">No image uploaded</p>
                                </div>
                            )}
                            <div className="flex text-sm text-muted-foreground">
                                <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                </label>
                            </div>
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>{isNew ? "Publish Event" : "Save Changes"}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
