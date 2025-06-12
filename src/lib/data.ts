export const getData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "Hello from the server!",
                timestamp: new Date().toISOString(),
            });
        }, 1000);
    });
}