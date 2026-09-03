// Helper function to normalize input string with default protocol
export function normalizeUrlString(input: string): string {
    const trimmed = input.trim();

    // If it doesn't start with a scheme (e.g. http:// or https://), prepend https://
    if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
    }

    return trimmed;
}

export function isValidUrl(input: string): boolean {
    try {
        const normalized = normalizeUrlString(input);
        const url = new URL(normalized);

        // Ensure it has a valid hostname (e.g., must contain a domain dot like "example.com")
        return url.hostname.includes('.');
    } catch {
        return false;
    }
}