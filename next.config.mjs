/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: `/${process.env.DEFAULT_PROFILE}`,
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
