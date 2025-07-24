
import OurServiceSection from "@/components/our-service-section";

export default function ConsultationPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold md:text-2xl">Schedule a Consultation</h1>
            <p className="text-muted-foreground">Need personalized help? Fill out the form in our services section to schedule a consultation with our experts.</p>
            <div className="mt-8">
                <OurServiceSection />
            </div>
        </div>
    )
}
