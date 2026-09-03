export interface ServerResponse {
    exists: boolean;
    type?: 'file' | 'folder';
}