export const validateUserInput = (username: string, password: string, email: string) => {
    if (typeof username !== "string" || typeof password !== "string") {
        return { valid: false, error: "Please enter valid username and password" };
    }

    if (username.trim() === "" || password.trim() === "" || email.trim() === "") {
        return { valid: false, error: "All fields are required" };
    }

    if (password.length < 8) {
        return { valid: false, error: "Password must be at least 8 characters long" };
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return { valid: false, error: "Username can only contain letters and numbers" };
    }

    if (!/[A-Z]/.test(password)) {
        return { valid: false, error: "Password must contain at least one uppercase letter" };
    }

    if (!/[a-z]/.test(password)) {
        return { valid: false, error: "Password must contain at least one lowercase letter" };
    }

    if (!/[0-9]/.test(password)) {
        return { valid: false, error: "Password must contain at least one number" };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { valid: false, error: "Please enter a valid email address" };
    }
    
    return { valid: true, error: null };
}