
'use client';

import { useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Newspaper, UploadCloud } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

// In a real app, you'd fetch this from a CMS
const allArticles = [
    {
      image: "https://placehold.co/600x400.png",
      date: "2024-10-28",
      title: "Volunteer Drive Success",
      description: "A huge thank you to everyone who signed up during our fall volunteer drive. Your support is invaluable. We welcomed over 50 new volunteers to our team.",
      slug: "volunteer-drive-success",
      status: "Published",
      content: "Our recent volunteer drive was a massive success, and we couldn't be more grateful for the overwhelming support from our community. More than 50 new volunteers have joined our ranks, ready to contribute their time and skills to our various projects. This influx of new energy will allow us to expand our programs and reach even more people in need.\n\nWe have several orientation sessions scheduled for our new members to get them acquainted with our mission, values, and ongoing initiatives. We are excited to see the positive impact these new volunteers will bring."
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "2024-09-05",
      title: "New Partnership Announced",
      description: "We're excited to partner with Local Corp to expand our reach and impact in the community. This partnership will help us launch three new initiatives in the coming year.",
      slug: "new-partnership-announced",
      status: "Published",
      content: "We are thrilled to announce a new strategic partnership with Local Corp, a leading company in our city. This collaboration will enable us to launch three new community-focused initiatives over the next year, addressing critical areas such as education, health, and environmental sustainability. Local Corp's commitment to social responsibility makes them an ideal partner for our mission.\n\nTogether, we aim to create a lasting, positive impact on the lives of the people we serve. Stay tuned for more details about the upcoming projects and how you can get involved."
    },
];

function getArticleData(slug: string) {
    if (slug === 'new') {
        return {
            isNew: true,
            title: '',
            slug: '',
            description: '',
            content: '',
            status: 'Draft',
            image: ''
        };
    }
    const article = allArticles.find(article => article.slug === slug);
    return article ? { ...article, isNew: false } : undefined;
}


export default function EditArticlePage() {
    const params = useParams();
    const router = useRouter();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    
    const articleData = getArticleData(slug);
    
    if (!articleData) {
        notFound();
    }
    
    const {isNew, ...article} = articleData;
    const [imagePreview, setImagePreview] = useState<string | null>(article.image);

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

    const pageTitle = isNew ? "Create New Article" : "Edit Article";
    const pageDescription = isNew ? "Fill in the details to publish a new article." : `Editing the article: ${article.title}`;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.push('/admin/articles')}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to articles</span>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
                    <p className="text-muted-foreground">{pageDescription}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Newspaper className="h-6 w-6" />
                        <span>Article Content</span>
                    </CardTitle>
                    <CardDescription>
                       Fill out the form below to {isNew ? "create" : "update"} the article.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Article Title</Label>
                            <Input id="title" defaultValue={article.title} placeholder="A catchy title for your article" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" defaultValue={article.slug} placeholder="a-unique-slug-for-url" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="description">Excerpt / Description</Label>
                        <Textarea id="description" defaultValue={article.description} placeholder="A short summary of the article." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="content">Main Content (Markdown)</Label>
                        <Textarea 
                            id="content" 
                            defaultValue={article.content}
                            className="min-h-[350px] font-mono text-sm" 
                            placeholder="## Start writing your article content here using Markdown..." 
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
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
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select defaultValue={article.status}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Published">Published</SelectItem>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>{isNew ? "Publish Article" : "Save Changes"}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
