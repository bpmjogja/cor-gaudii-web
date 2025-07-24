
"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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
    const [progress, setProgress] = useState(0);

    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const articleTextRef = useRef<string>("");

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setSpeech(window.speechSynthesis);
            articleTextRef.current = article.content;
        }

        // Cleanup speech synthesis on component unmount
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, [article.content]);

    const handlePlay = () => {
        if (!speech || !articleTextRef.current) return;

        if (speech.paused && isPaused) {
            speech.resume();
            setIsPaused(false);
            setIsSpeaking(true);
        } else {
            speech.cancel(); // Stop any previous speech
            
            const utterance = new SpeechSynthesisUtterance(articleTextRef.current);
            utteranceRef.current = utterance;

            utterance.onboundary = (event) => {
                if (event.name === 'word') {
                    const charIndex = event.charIndex;
                    const totalLength = articleTextRef.current.length;
                    setProgress(totalLength > 0 ? (charIndex / totalLength) * 100 : 0);
                }
            };

            utterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
                setProgress(100);
                 setTimeout(() => setProgress(0), 1000);
            };
            
            utterance.onerror = (event) => {
                console.error("SpeechSynthesisUtterance.onerror", event);
                setIsSpeaking(false);
                setIsPaused(false);
            };

            speech.speak(utterance);
            setIsSpeaking(true);
            setIsPaused(false);
        }
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
            setProgress(0);
        }
    };

    const handleSliderChange = (value: number[]) => {
        const newProgress = value[0];
        setProgress(newProgress);

        if (speech && articleTextRef.current) {
             const wasSpeaking = isSpeaking || isPaused;
             speech.cancel();
             setIsSpeaking(false);
             setIsPaused(false);

             if (wasSpeaking) {
                const newStartIndex = Math.floor((articleTextRef.current.length * newProgress) / 100);
                const textToSpeak = articleTextRef.current.substring(newStartIndex);
                
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utteranceRef.current = utterance;

                utterance.onboundary = (event) => {
                     if (event.name === 'word') {
                        const charIndex = newStartIndex + event.charIndex;
                        const totalLength = articleTextRef.current.length;
                        setProgress(totalLength > 0 ? (charIndex / totalLength) * 100 : 0);
                    }
                };

                utterance.onend = () => {
                    setIsSpeaking(false);
                    setIsPaused(false);
                    setProgress(100);
                    setTimeout(() => setProgress(0), 1000);
                };

                 utterance.onerror = (event) => {
                    console.error("SpeechSynthesisUtterance.onerror", event);
                    setIsSpeaking(false);
                    setIsPaused(false);
                };
                
                speech.speak(utterance);
                setIsSpeaking(true);
             }
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

                            <div className="p-4 rounded-lg bg-muted/50 my-6">
                                <div className="flex items-center gap-4">
                                    {!isSpeaking && !isPaused ? (
                                        <Button onClick={handlePlay} aria-label="Listen to article" size="icon">
                                            <Play className="h-5 w-5" />
                                        </Button>
                                    ) : (
                                        <>
                                            {isPaused ? (
                                                <Button onClick={handlePlay} aria-label="Resume article" size="icon">
                                                    <Play className="h-5 w-5" />
                                                </Button>
                                            ) : (
                                                <Button onClick={handlePause} aria-label="Pause article" size="icon">
                                                    <Pause className="h-5 w-5" />
                                                </Button>
                                            )}
                                        </>
                                    )}
                                     <Slider
                                        value={[progress]}
                                        onValueChange={handleSliderChange}
                                        max={100}
                                        step={1}
                                        className="flex-1"
                                        aria-label="Article playback progress"
                                    />
                                    {isSpeaking || isPaused ? (
                                         <Button onClick={handleStop} variant="destructive" aria-label="Stop listening" size="icon">
                                            <Square className="h-5 w-5" />
                                        </Button>
                                    ) : null}
                                </div>
                            </div>

                            <div className="prose prose-lg max-w-none mx-auto text-foreground/80">
                               <pre className="whitespace-pre-wrap font-body text-base">
                                {article.content}
                               </pre>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
