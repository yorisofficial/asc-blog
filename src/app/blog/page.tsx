import Link from "next/link";
import React from "react";

async function getData() {
	const res = await fetch("https://asiansurf.co/wp-json/wp/v2/posts/", {
		cache: "no-store",
		next: {
			revalidate: 10,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const data = await res.json();
	return data;
}

const BlogPage = async () => {
	const data = await getData();
	console.log(data.length);

	return (
		<div className="container mx-auto w-full max-w-5xl min-h-screen py-32 space-y-8">
			<h1 className="text-3xl font-black">Blog Page</h1>
			<div className="grid grid-cols-3 gap-4">
				{data.length > 0 &&
					data.map((post: any) => (
						<div
							key={post.id}
							className="card flex flex-col justify-between items-start p-4 border-2"
						>
							<div className="">
								<h1>{post.title.rendered}</h1>
								<p>Post at :{post.date}</p>
								<p>Author at :{post.author}</p>
							</div>
							<div className="w-full mt-4">
								<Link
									href={`/blog/${post.id}`}
									className="underline underline-offset-8"
								>
									Read More
								</Link>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default BlogPage;
