
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square } from "lucide-react";

type Article = {
    image: string;
    date: string;
    title: string;
    description: string;
    slug: string;
    hint: string;
    content: string;
};

export default function ArticleClient({ article }: { article: Article }) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speech, setSpeech] = useState<SpeechSynthesis | null>(null);

    useEffect(() => {
        // Ensure this code runs only on the client
        if (typeof window !== 'undefined') {
            setSpeech(window.speechSynthesis);
        }
    }, []);

    useEffect(() => {
        // Cleanup speech synthesis on component unmount
        return () => {
            if (speech) {
                speech.cancel();
            }
        };
    }, [speech]);

    const extractTextFromHtml = (html: string) => {
        if (typeof window === 'undefined') return '';
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const handlePlay = () => {
        if (!speech || !article) return;

        if (isPaused) {
            speech.resume();
            setIsPaused(false);
        } else {
            const textToSpeak = extractTextFromHtml(article.content);
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };
            speech.cancel(); // Clear any previous speech
            speech.speak(utterance);
        }
        setIsSpeaking(true);
    };

    const handlePause = () => {
        if (speech) {
            speech.pause();
            setIsPaused(true);
            setIsSpeaking(false);
        }
    };

    const handleStop = () => {
        if (speech) {
            speech.cancel();
            setIsSpeaking(false);
            setIsPaused(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <article>
                    <header className="py-12 md:py-16 bg-secondary">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="max-w-3xl mx-auto text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl md:text-5xl">{article.title}</h1>
                                <p className="mt-4 text-sm text-muted-foreground">{article.date}</p>
                            </div>
                        </div>
                    </header>

                    <div className="container mx-auto px-4 md:px-6 py-8">
                         <div className="max-w-4xl mx-auto">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg my-8">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    layout="fill"
                                    objectFit="cover"
                                    data-ai-hint={article.hint}
                                />
                            </div>

                            <div className="my-6 flex items-center gap-4">
                                {!isSpeaking && !isPaused ? (
                                     <Button onClick={handlePlay} aria-label="Listen to article">
                                        <Play className="mr-2 h-5 w-5" />
                                        Listen
                                    </Button>
                                ) : (
                                    <>
                                        {isPaused ? (
                                            <Button onClick={handlePlay} aria-label="Resume article">
                                                <Play className="mr-2 h-5 w-5" />
                                                Resume
                                            </Button>
                                        ) : (
                                            <Button onClick={handlePause} aria-label="Pause article">
                                                <Pause className="mr-2 h-5 w-5" />
                                                Pause
                                            </Button>
                                        )}
                                        <Button onClick={handleStop} variant="destructive" aria-label="Stop listening">
                                            <Square className="mr-2 h-5 w-5" />
                                            Stop
                                        </Button>
                                    </>
                                )}
                            </div>

                            <div className="prose prose-lg max-w-none mx-auto text-foreground/80" dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
