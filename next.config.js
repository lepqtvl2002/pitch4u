/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        nextScriptWorkers: true,
    },
}

module.exports = nextConfig
