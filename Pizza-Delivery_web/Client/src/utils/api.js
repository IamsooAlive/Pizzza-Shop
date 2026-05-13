export const parseApiResponse = async (response, fallbackMessage) => {
    let payload = null;

    try {
        payload = await response.json();
    } catch (error) {
        payload = null;
    }

    if (!response.ok) {
        const message =
            payload?.error ||
            payload?.message ||
            fallbackMessage;

        throw new Error(message);
    }

    return payload;
};
