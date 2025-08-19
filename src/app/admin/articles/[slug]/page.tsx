import EditArticlePage from '@/components/article-edit-page';

// In a real app, you'd fetch this from a CMS
const allArticles = [
	{
		image: 'https://placehold.co/600x400.png',
		date: '2024-10-28',
		title: 'Volunteer Drive Success',
		slug: 'volunteer-drive-success',
		status: 'Published',
		content:
			"Our recent volunteer drive was a massive success, and we couldn't be more grateful for the overwhelming support from our community. More than 50 new volunteers have joined our ranks, ready to contribute their time and skills to our various projects. This influx of new energy will allow us to expand our programs and reach even more people in need.\n\nWe have several orientation sessions scheduled for our new members to get them acquainted with our mission, values, and ongoing initiatives. We are excited to see the positive impact these new volunteers will bring.",
		keywords: 'volunteers, community, support',
	},
	{
		image: 'https://placehold.co/600x400.png',
		date: '2024-09-05',
		title: 'New Partnership Announced',
		slug: 'new-partnership-announced',
		status: 'Published',
		content:
			"We are thrilled to announce a new strategic partnership with Local Corp, a leading company in our city. This collaboration will enable us to launch three new community-focused initiatives over the next year, addressing critical areas such as education, health, and environmental sustainability. Local Corp's commitment to social responsibility makes them an ideal partner for our mission.\n\nTogether, we aim to create a lasting, positive impact on the lives of the people we serve. Stay tuned for more details about the upcoming projects and how you can get involved.",
		keywords: 'partnership, community, initiatives',
	},
];

function getArticleData(slug: string) {
	if (slug === 'new') {
		return {
			isNew: true,
			title: '',
			slug: '',
			keywords: '',
			content: '',
			status: 'Draft',
			image: '',
		};
	}
	const article = allArticles.find((article) => article.slug === slug);
	return article ? { ...article, isNew: false } : undefined;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const articleData = getArticleData((await params).slug);
	return <EditArticlePage articleData={articleData} />;
}
