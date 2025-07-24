
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Handshake, Calendar, FileText, Copy, Church } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const bankAccountNumber = "123-456-7890";

const prayerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  prayer: z.string().min(10, "Prayer request must be at least 10 characters."),
});

const quickLinks = [
  {
    icon: Heart,
    title: "Donate",
    description: "Support our cause with a one-time or recurring donation.",
    link: "#",
    hint: "donation icon"
  },
  {
    icon: Church,
    title: "Prayer Request",
    description: "Submit your prayer requests to our dedicated prayer team.",
    link: "#",
    hint: "prayer icon"
  },
  {
    icon: Calendar,
    title: "Upcoming Events",
    description: "Find out about our upcoming community events and workshops.",
    link: "/events",
    hint: "calendar icon"
  },
  {
    icon: FileText,
    title: "Latest Articles",
    description: "Read our latest articles and stay informed about our work.",
    link: "/articles",
    hint: "document icon"
  },
];

export default function QuickLinksSection() {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const prayerForm = useForm<z.infer<typeof prayerFormSchema>>({
      resolver: zodResolver(prayerFormSchema),
      defaultValues: {
        name: "",
        prayer: "",
      },
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(bankAccountNumber);
        setCopied(true);
        toast({ title: "Copied!", description: "Bank account number copied to clipboard." });
        setTimeout(() => setCopied(false), 2000);
    };

    function onPrayerSubmit(values: z.infer<typeof prayerFormSchema>) {
      console.log(values);
      toast({
        title: "Prayer Request Sent!",
        description: "Thank you for sharing. Our team will be praying for you.",
      });
      prayerForm.reset();
    }

  return (
    <section id="quick-links" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
              Quick Link
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
                There are many ways to support our mission. Find the one that's right for you.
            </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Card key={link.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{link.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{link.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                {link.title === 'Donate' ? (
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className="p-0 text-primary hover:text-accent">
                                Donate Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Thank You for Your Support</DialogTitle>
                                <DialogDescription>
                                    Your generosity helps us continue our mission.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="rounded-md overflow-hidden">
                                    <Image src="https://placehold.co/400x300.png" alt="Thank you for your donation" width={400} height={300} className="w-full" data-ai-hint="donation gratitude" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    To complete your donation, you can transfer to the bank account below. Every contribution, no matter the size, makes a significant impact.
                                </p>
                                <div className="flex items-center space-x-2">
                                    <Input value={bankAccountNumber} readOnly className="flex-1" />
                                    <Button variant="outline" size="icon" onClick={handleCopy}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                ) : link.title === 'Prayer Request' ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0 text-primary hover:text-accent">
                          Submit Request <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Prayer Request</DialogTitle>
                          <DialogDescription>
                            Let us know how we can pray for you. Your requests are confidential.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...prayerForm}>
                          <form onSubmit={prayerForm.handleSubmit(onPrayerSubmit)} className="space-y-6">
                            <FormField
                              control={prayerForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Your Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={prayerForm.control}
                              name="prayer"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Prayer Request</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Please pray for..." className="min-h-[120px]" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" size="lg" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                              Submit Prayer Request
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                ) : (
                    <Button asChild variant="link" className="p-0 text-primary hover:text-accent">
                        <Link href={link.link}>
                            {link.title === 'Upcoming Events' ? 'View Events' : 'Read Articles'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
