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
            }
        ],
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone"
    }
}