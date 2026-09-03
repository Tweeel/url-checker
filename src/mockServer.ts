import type {ServerResponse} from './types';

export async function mockServerCheck(urlStr: string): Promise<ServerResponse> {
    // Simulate 500ms network latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    const url = new URL(urlStr);

    // Mock rule 1: URL path containing "404" returns non-existent
    if (url.pathname.includes('404')) {
        return { exists: false };
    }

    // Mock rule 2: Infer file vs folder based on path extension
    const isFolder = url.pathname.endsWith('/') || !url.pathname.includes('.');

    return {
        exists: true,
        type: isFolder ? 'folder' : 'file',
    };
}