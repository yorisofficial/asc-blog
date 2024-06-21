/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "asiansurf.co",
				port: "",
				pathname: "/wp-content/uploads/**",
			},
		],
	},
};

export default nextConfig;
