// Simulate a network delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitFeedbackAction(prevState, formData) {
    // Simulate 2 seconds of "Saving..."
    await sleep(2000);

    const rating = formData.get("rating");
    const comment = formData.get("comment");

    // Validation check
    if (!comment || comment.length < 5) {
        return { error: "Comment must be at least 5 characters long." };
    }

    // Return the "Server" response
    return {
        success: true,
        message: "Feedback submitted successfully!",
        newEntry: {
            id: Date.now(),
            rating,
            comment,
        }
    };
}