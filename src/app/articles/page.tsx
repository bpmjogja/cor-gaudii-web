'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import useSWR from 'swr';
import { Article, Prisma } from '@/generated/prisma';
import { fetcher } from '@/lib/fetcher';
import ImageWrapper from '@/components/image-wrapper';
import { createFetchUrl } from '@/lib/create-fetch-url';
import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

export default function ArticlesPage() {
	const [args, setArgs] = useState<Prisma.ArticleFindManyArgs>({ take: 6, orderBy: { publishedAt: 'desc' }, skip: 0 });
	const { data, error, isLoading, mutate } = useSWR(createFetchUrl('/api/article', args), fetcher<Article[]>);
	return (
		<div className="flex flex-col min-h-screen bg-background">
			<Header />
			<main className="flex-1">
				<section
					id="articles-page"
					className="py-16 sm:py-20 md:py-24"
				>
					<div className="container mx-auto px-4 md:px-6">
						<div className="max-w-3xl mx-auto text-center">
							<h1 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">Latest Articles</h1>
							<p className="mt-4 text-lg text-foreground/80">Keep up with our latest activities and announcements.</p>
						</div>
						{error ? (
							<div className="text-center text-red-500 mt-10 flex flex-col items-center gap-4">
								<span>Failed to load articles</span>
								<Button onClick={() => mutate()}>
									Refresh
									<RefreshCw />
								</Button>
							</div>
						) : isLoading ? (
							<div className="text-center mt-10">Loading articles...</div>
						) : (
							<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
								{data!.map((item) => (
									<Card
										key={item.title}
										className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
									>
										<Link
											href={`/articles/${item.id}`}
											className="block"
										>
											<CardHeader className="p-0">
												<ImageWrapper
													src={item.mainImageId}
													alt={item.title}
													width={600}
													height={400}
													className="w-full h-48 object-cover"
													data-ai-hint={item.title}
												/>
											</CardHeader>
											<CardContent className="p-6">
												{/* <p className="text-sm text-muted-foreground">{item.publishedAt?.toISOString()}</p> */}
												<CardTitle className="mt-2 font-headline text-xl">{item.title}</CardTitle>
												<p className="mt-2 text-sm text-muted-foreground">{item.tags.join(', ')}</p>
											</CardContent>
											<CardFooter>
												<Button
													variant="link"
													className="p-0 text-primary hover:text-accent"
												>
													Read Article →
												</Button>
											</CardFooter>
										</Link>
									</Card>
								))}
							</div>
						)}
					</div>
					<div className='mt-4'>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious href="#" />
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#">1</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
								<PaginationItem>
									<PaginationNext href="#" />
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
