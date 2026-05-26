export const validateTaskInput = (title: string, description: string) => {
    if (typeof title !== "string" || typeof description !== "string") {
        return { valid: false, error: "Please enter valid title and description" };
    }

    if (title.trim() === "" || description.trim() === "") {
        return { valid: false, error: "Title and description are required" };
    }

    return { valid: true, error: null };
}