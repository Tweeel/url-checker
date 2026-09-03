import { isValidUrl, normalizeUrlString } from './validator';
import { mockServerCheck } from './mockServer';
import { debounceCheck } from './debounce';

const urlInput = document.querySelector<HTMLInputElement>('#url-input')!;
const statusDiv = document.querySelector<HTMLDivElement>('#status-display')!;

async function processUrlCheck(input: string) {
    const trimmed = input.trim();

    if (trimmed === '') {
        statusDiv.textContent = '';
        return;
    }

    // Step A: Format Validation
    if (!isValidUrl(trimmed)) {
        statusDiv.textContent = 'Invalid URL format (e.g., tuta.com or https://tuta.com)';
        statusDiv.style.color = 'red';
        return;
    }

    // Normalize the input (e.g. convert "tuta.com" -> "https://tuta.com")
    const normalizedUrl = normalizeUrlString(trimmed);

    // Step B: Format Valid -> Mock Server Check
    statusDiv.textContent = 'Checking server...';
    statusDiv.style.color = 'gray';

    try {
        const response = await mockServerCheck(normalizedUrl);

        if (response.exists) {
            statusDiv.textContent = `URL Exists! Resource type: ${response.type}`;
            statusDiv.style.color = 'green';
        } else {
            statusDiv.textContent = 'URL format valid, but resource does not exist (404)';
            statusDiv.style.color = 'red';
        }
    } catch (error) {
        statusDiv.textContent = 'Server check failed';
        statusDiv.style.color = 'red';
    }
}

urlInput.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;

    debounceCheck(target.value, (val) => {
        processUrlCheck(val).then(_ => {});
    });
});