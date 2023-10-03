import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        "name": "Skyscraper Brain Traser",
        "short_name": "Skyscraper Brain Traser",
        "icons": [
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            },
            {
                type: "image/png",
                sizes: "32x32",
                src: "/favicon-32x32.png"
            },
            {
                type: "image/png",
                sizes: "180x180",
                src: "/apple-touch-icon.png"
            },
            {
                type: "image/png",
                sizes: "16x16",
                src: "/favicon-16x16.png"
            }
        ],
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "fullscreen",
        start_url: '/',
    }
}