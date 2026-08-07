export const validateTaskInput = (title: string, description: string, dueDate: Date) => {
    if (typeof title !== "string" || typeof description !== "string") {
        return { valid: false, error: "Please enter valid title and description" };
    }

    if (title.trim() === "" || description.trim() === "") {
          return { valid: false, error: "Title and description are required" };
    }

    if (dueDate) {
        let parsedDueDate = new Date(dueDate);
        console.log(parsedDueDate)

        if (isNaN(parsedDueDate.getTime())) {
            return {valid: false, error: "Date is not valid"}
        }
}

    return { valid: true, error: null };
}