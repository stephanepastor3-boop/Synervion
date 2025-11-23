/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                heading: ["var(--synervion-font-heading)", "sans-serif"],
                body: ["var(--synervion-font-body)", "sans-serif"],
            },
            spacing: {
                '0': 'var(--synervion-space-0)',
                '1': 'var(--synervion-space-1)',
                '2': 'var(--synervion-space-2)',
                '3': 'var(--synervion-space-3)',
                '4': 'var(--synervion-space-4)',
                '6': 'var(--synervion-space-6)',
                '8': 'var(--synervion-space-8)',
                '12': 'var(--synervion-space-12)',
                '16': 'var(--synervion-space-16)',
                '20': 'var(--synervion-space-20)',
                '24': 'var(--synervion-space-24)',
                '32': 'var(--synervion-space-32)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
