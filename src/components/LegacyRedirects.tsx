import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const redirects: Record<string, string> = {
    '/research/cordyceps-for-athletes-vo2-max': '/cordyceps-militaris-benefits',
    '/research/how-to-take-cordyceps-coffee-smoothies': '/when-to-take-cordyceps', // Best guess mapping
    '/research/sustainable-mushroom-cultivation-vs-wild-harvest': '/cordyceps-manufacturer-india',
    '/research/the-science-of-cordyceps-clinical-review': '/cordyceps-militaris-benefits',
};

export function LegacyRedirects() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check for exact match
        const targetPath = redirects[location.pathname];

        if (targetPath) {
            navigate(targetPath, { replace: true });
            return;
        }

        // Catch-all for any other /research/ URLs not explicitly mapped
        if (location.pathname.startsWith('/research/')) {
            navigate('/', { replace: true });
        }
    }, [location, navigate]);

    return null;
}
