import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHashElement() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const scrollToElement = () => {
                const element = document.getElementById(location.hash.slice(1));
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                    return true;
                }
                return false;
            };

            // Try immediately
            if (!scrollToElement()) {
                // Retry at intervals
                const timeouts = [100, 300, 600, 1000].map(delay =>
                    setTimeout(() => scrollToElement(), delay)
                );

                return () => timeouts.forEach(clearTimeout);
            }
        } else {
            // Scroll to top if no hash
            window.scrollTo(0, 0);
        }
    }, [location]);

    return null;
}
