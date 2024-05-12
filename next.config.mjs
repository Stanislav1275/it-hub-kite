/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [
            {
                source:'/api/signup',
                destination:'http://77.222.53.231:8080/auth/signup'
            }, {
                source:'/api/signin',
                destination:'http://77.222.53.231:8080/auth/signup'
            }

        ]
    }
};

export default nextConfig;
