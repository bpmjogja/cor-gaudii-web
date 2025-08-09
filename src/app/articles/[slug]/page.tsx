
import { notFound } from "next/navigation";
import ArticleClient from "@/components/article-client";

// In a real app, you'd fetch this from a CMS
const allArticles = [
    {
      image: "https://placehold.co/600x400.png",
      date: "October 28, 2024",
      title: "Volunteer Drive Success",
      keywords: "volunteers, community, support",
      slug: "volunteer-drive-success",
      hint: "volunteers group",
      content: "Our recent volunteer drive was a massive success, and we couldn't be more grateful for the overwhelming support from our community. More than 50 new volunteers have joined our ranks, ready to contribute their time and skills to our various projects. This influx of new energy will allow us to expand our programs and reach even more people in need.\n\nWe have several orientation sessions scheduled for our new members to get them acquainted with our mission, values, and ongoing initiatives. We are excited to see the positive impact these new volunteers will bring."
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "September 5, 2024",
      title: "New Partnership Announced",
      keywords: "partnership, community, initiatives",
      slug: "new-partnership-announced",
      hint: "business handshake",
      content: "We are thrilled to announce a new strategic partnership with Local Corp, a leading company in our city. This collaboration will enable us to launch three new community-focused initiatives over the next year, addressing critical areas such as education, health, and environmental sustainability. Local Corp's commitment to social responsibility makes them an ideal partner for our mission.\n\nTogether, we aim to create a lasting, positive impact on the lives of the people we serve. Stay tuned for more details about the upcoming projects and how you can get involved."
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "August 12, 2024",
      title: "Summer Youth Program Wraps Up",
      keywords: "youth, summer program, education",
      slug: "summer-youth-program-wraps-up",
      hint: "children learning",
      content: "Our annual Summer Youth Program has come to a successful end, culminating in a fantastic showcase event where participants presented their projects. This year's program focused on digital literacy and creative arts, providing a platform for young people to develop new skills and express their creativity. The projects ranged from short films to interactive websites, all demonstrating the incredible talent and hard work of our youth.\n\nWe are incredibly proud of all the participants and grateful to our mentors and sponsors for making this program possible."
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "July 20, 2024",
      title: "Community Garden Harvest Day",
      keywords: "garden, community, harvest, food",
      slug: "community-garden-harvest-day",
      hint: "community garden",
      content: "The sun was shining on our Community Garden Harvest Day, where volunteers and community members came together to reap the fruits (and vegetables) of their labor. This season's harvest was one of our best yet, with a wide variety of fresh, organic produce. All the food was distributed to local families and food banks, helping to combat food insecurity in our neighborhood.\n\nA huge thank you to all the dedicated gardeners who tended to the plots all season long. Your hard work has made a real difference."
    },
    {
      image: "https://placehold.co/600x400.png",
      date: "June 1, 2024",
      title: "BPM Receives Grant for Tech Education",
      keywords: "grant, tech education, youth, coding",
      slug: "bpm-receives-grant-for-tech-education",
      hint: "computer workshop",
      content: "Exciting news! BPM has been awarded a significant grant from the Tech for Good Foundation. This funding will be used to launch a new series of free coding workshops for underprivileged youth in our community. The program aims to bridge the digital divide and provide young people with valuable skills for the future job market.\n\nThe curriculum will cover web development, programming basics, and digital design. We are currently recruiting instructors and finalizing the schedule. More information will be available on our website soon."
    },
];

function getArticleData(slug: string) {
    return allArticles.find(article => article.slug === slug);
}

// This function runs on the server during build time
export async function generateStaticParams() {
    return allArticles.map(article => ({
        slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const article = getArticleData((await params).slug);

    if (!article) {
        notFound();
    }

    return <ArticleClient article={article} />;
}
