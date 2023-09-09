import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            //resource : https://animista.net/
            animation: {
                "scale-out-center": "scale-out-center 0.25s cubic-bezier(0.550, 0.085, 0.680, 0.530) forwards",
                "scale-in-center": "scale-in-center 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards",
                "shadow-pulse": "shadow-pulse 2s infinite",
                "bounce-in-top": "bounce-in-top 1.1s both",
                "pulsate-bck": "pulsate-bck 0.5s ease-in-out infinite both",
                "fade-in-bottom": "fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) forwards",
            },
            keyframes: {
                "scale-out-center": {
                    "0%": {
                        opacity: "1",
                        transform: "scale(1)"
                    },
                    "100%": {
                        opacity: "0",
                        transform: "scale(0)"
                    }
                },
                "scale-in-center": {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0)"
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1)"
                    }
                },
                "shadow-pulse": {
                    "0%": {
                        boxShadow: "0px 0px 5px 0px #7e22ce"
                    },
                    "50%": {
                        boxShadow: "0px 0px 15px 0px #7e22ce"
                    },
                    "100%": {
                        boxShadow: "0px 0px 5px 0px #7e22ce"
                    }
                },
                'bounce-in-top': {
                    '0%': {
                        transform: 'translateY(-500px)',
                        'animation-timing-function': 'ease-in',
                        opacity: "0",
                    },
                    '38%': {
                        transform: 'translateY(0)',
                        'animation-timing-function': 'ease-out',
                        opacity: "1",
                    },
                    '55%': {
                        transform: 'translateY(-65px)',
                        'animation-timing-function': 'ease-in',
                    },
                    '72%': {
                        transform: 'translateY(0)',
                        'animation-timing-function': 'ease-out',
                    },
                    '81%': {
                        transform: 'translateY(-28px)',
                        'animation-timing-function': 'ease-in',
                    },
                    '90%': {
                        transform: 'translateY(0)',
                        'animation-timing-function': 'ease-out',
                    },
                    '95%': {
                        transform: 'translateY(-8px)',
                        'animation-timing-function': 'ease-in',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        'animation-timing-function': 'ease-out',
                    },
                },
                'pulsate-bck': {
                    '0%': {
                        transform: 'scale(1)',
                    },
                    '50%': {
                        transform: 'scale(0.9)',
                    },
                    '100%': {
                        transform: 'scale(1)',
                    },
                },
                "fade-in-bottom": {
                    '0%': {
                        opacity: '0',
                        transform: "translateY(50px)"
                    },
                    '100%': {
                        opacity: '1',
                        transform: "translateY(0)"
                    },
                },
            }
        }
    }
}
export default config
