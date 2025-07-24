import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ministries = [
  {
    name: "Leadership",
    members: [
      { name: "John Doe", role: "Founder & CEO", initials: "JD", image: "https://placehold.co/100x100.png", hint: "man portrait" },
      { name: "Jane Smith", role: "Director of Operations", initials: "JS", image: "https://placehold.co/100x100.png", hint: "woman portrait" },
    ],
  },
  {
    name: "Community Engagement",
    members: [
      { name: "Samuel Green", role: "Community Manager", initials: "SG", image: "https://placehold.co/100x100.png", hint: "person smiling" },
      { name: "Emily White", role: "Lead Volunteer", initials: "EW", image: "https://placehold.co/100x100.png", hint: "woman smiling" },
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
              Who We Are
            </h2>
            <p className="text-foreground/80">
              BPM was founded on the simple principle that collective action can create profound change. We believe in the power of community and strive to provide the resources and support necessary for local movements to flourish. Our history is rooted in successful community projects, and our mission is to expand our reach to help even more initiatives get off the ground.
            </p>
            <p className="text-foreground/80">
              We work hand-in-hand with community leaders, volunteers, and donors to identify needs, develop strategies, and implement sustainable solutions that have a lasting impact.
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-bold tracking-tight text-primary font-headline sm:text-3xl text-center md:text-left">
              Meet Our Team
            </h3>
            {ministries.map((ministry) => (
              <div key={ministry.name}>
                <h4 className="mb-4 text-xl font-semibold tracking-tight text-accent font-headline sm:text-2xl text-center md:text-left">
                  {ministry.name} Ministry
                </h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2">
                  {ministry.members.map((member) => (
                    <div key={member.name} className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-2 border-2 border-primary/20">
                        <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.hint} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <h4 className="font-bold font-headline text-primary">{member.name}</h4>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}