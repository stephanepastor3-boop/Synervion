import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHashElement() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                // Retry once in case content is loading
                setTimeout(() => {
                    const retryElement = document.getElementById(location.hash.slice(1));
                    if (retryElement) {
                        retryElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 500);
            }
        }
    }, [location]);

    return null;
}
