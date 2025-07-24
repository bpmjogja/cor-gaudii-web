
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const articles = [
    {
      slug: "volunteer-drive-success",
      title: "Volunteer Drive Success",
      status: "Published",
      date: "2024-10-28"
    },
    {
      slug: "new-partnership-announced",
      title: "New Partnership Announced",
      status: "Published",
      date: "2024-09-05"
    }
];

export default function AdminArticlesPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Articles</h1>
                <Button className="ml-auto" size="sm" asChild>
                    <Link href="/admin/articles/new">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Article
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Articles</CardTitle>
                    <CardDescription>A list of all articles in your database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map(article => (
                                <TableRow key={article.slug}>
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>{article.status}</TableCell>
                                    <TableCell>{article.date}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/articles/${article.slug}`}>Edit</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
