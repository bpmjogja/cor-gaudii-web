
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

const quizzes = [
    {
        title: "Community Building Basics",
        description: "Test your knowledge on the core concepts of community empowerment.",
        status: "Not Started",
        questions: 10,
    },
    {
        title: "Fundraising Fundamentals",
        description: "Assess your understanding of effective fundraising techniques.",
        status: "In Progress (5/15)",
        questions: 15,
    },
    {
        title: "Social Media Mastery",
        description: "Check your skills in using social media for non-profits.",
        status: "Completed (9/10)",
        questions: 10,
    }
];

export default function QuizzesPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl flex items-center gap-2">
                    <FileQuestion className="h-6 w-6" />
                    Quizzes
                </h1>
            </div>
             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {quizzes.map((quiz) => (
                    <Card key={quiz.title} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline">{quiz.title}</CardTitle>
                            <CardDescription>{quiz.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                           <p className="text-sm text-muted-foreground">
                                {quiz.questions} questions
                           </p>
                            <p className="text-sm font-semibold mt-2">
                                Status: <span className="text-primary">{quiz.status}</span>
                           </p>
                        </CardContent>
                        <CardFooter>
                           <Button>
                                {quiz.status.startsWith('Completed') ? 'Review Quiz' : 'Start Quiz'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    )
}
