
"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const consultationFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    address: z.string().min(10, "Address must be at least 10 characters."),
    whatsappNumber: z.string().min(10, "Please enter a valid WhatsApp number."),
    age: z.coerce.number().min(1, "Please enter a valid age."),
    gender: z.enum(["male", "female"], {
        required_error: "You need to select a gender.",
    }),
    problem: z.string().min(10, "Please describe your problem in at least 10 characters."),
});

export default function OurServiceSection() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof consultationFormSchema>>({
        resolver: zodResolver(consultationFormSchema),
        defaultValues: {
            name: "",
            address: "",
            whatsappNumber: "",
            age: undefined,
            problem: "",
        },
    });

    function onSubmit(values: z.infer<typeof consultationFormSchema>) {
        console.log(values);
        toast({
            title: "Consultation Request Sent!",
            description: "Thank you for reaching out. We will get back to you shortly.",
        });
        form.reset();
    }

    return (
        <section id="services">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt="Consultation meeting"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="consultation meeting"
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                            Our Services
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
                            Assistance and Consultation
                        </h2>
                        <p className="text-foreground/80">
                            We provide expert consultation to help organizations and community leaders develop effective strategies for social impact. Our team works closely with you to understand your unique challenges and opportunities, offering tailored guidance on project planning, fundraising, and community engagement.
                        </p>
                        <div className="mt-6">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Schedule a Consultation</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle>Schedule a Consultation</DialogTitle>
                                        <DialogDescription>
                                            Please fill out the form below and we will get back to you as soon as possible.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Full Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="address"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Address</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="123 Main St, Anytown, USA" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="whatsappNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>WhatsApp Number</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+1234567890" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="age"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Age</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="30" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="gender"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3">
                                                        <FormLabel>Gender</FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex flex-row space-x-4"
                                                            >
                                                                <FormItem className="flex items-center space-x-2">
                                                                    <FormControl><RadioGroupItem value="male" /></FormControl>
                                                                    <FormLabel className="font-normal">Male</FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-2">
                                                                    <FormControl><RadioGroupItem value="female" /></FormControl>
                                                                    <FormLabel className="font-normal">Female</FormLabel>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="problem"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Describe your problem</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Please describe the issue you are facing..." className="min-h-[100px]" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <DialogFooter>
                                                <Button type="submit" size="lg" className="w-full">Submit Request</Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
