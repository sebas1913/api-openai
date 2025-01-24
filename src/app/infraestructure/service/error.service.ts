export async function handleServiceError(response: Response) {
    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'An unknown error occurred';
        throw new Error(errorMessage);
    }
    return response.json();
}
