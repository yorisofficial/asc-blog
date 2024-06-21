import Link from "next/link";
import React from "react";

export async function generateStaticParams() {
	const res = await fetch("https://asiansurf.co/wp-json/wp/v2/posts/?per_page=10");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const data = await res.json();

	return data.map((post: any) => ({
		id: post.id.toString(),
	}));
}

async function getData(id: string) {
	const res = await fetch(`https://asiansurf.co/wp-json/wp/v2/posts/${id}`);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const BlogPage = async ({ params }: { params: { id: string } }) => {
	const data = await getData(params.id);
	console.log();

	return (
		<div className="max-w-5xl mx-auto container py-32">
			<div className="pb-8 mb-4 border-b-2">
				<Link
					href="/blog"
					className="px-6 py-3 bg-white text-black rounded-xl"
				>
					Back to blog
				</Link>
			</div>
			<div className="p-4 mb-8 border-2 rounded-xl">
				<h1>{data.title.rendered}</h1>
				<p>{data.date}</p>
			</div>
			<article className="prose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-p:text-white prose-strong:text-white">
				<div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
			</article>
		</div>
	);
};

export default BlogPage;
