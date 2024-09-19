export const isValidEmail=(email: string): boolean=> {
    // Regular expression pattern for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Test the email against the regular expression
    return emailRegex.test(email);
  }


  export const isValidName=(name: string): boolean=> {
    // Name should contain at least two non-whitespace characters
    if (name.trim().length < 2) {
      return false;
    }
  
    // Name should only contain letters, hyphens, and spaces
    const nameRegex = /^[a-zA-Z\s-]+$/;
    return nameRegex.test(name);
  }