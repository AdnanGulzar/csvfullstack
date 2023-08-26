function validateEmailSyntax(email) {
    // Remove leading and trailing spaces
    email = email.trim();
  
    // Check for empty string
    if (email === '') {
      return false;
    }
  
    // Check for a single "@" symbol
    const atIndex = email.indexOf('@');
    if (atIndex === -1 || atIndex !== email.lastIndexOf('@')) {
      return false;
    }
  
    // Split the email into local part and domain part
    const [localPart, domainPart] = email.split('@');
  
    // Check local part and domain part lengths
    if (localPart.length === 0 || domainPart.length < 3) {
      return false;
    }
  
    // Check for at least one dot in the domain part
    if (!domainPart.includes('.')) {
      return false;
    }
  
    // Check the last part of the domain for length
    const domainParts = domainPart.split('.');
    const lastDomainPart = domainParts[domainParts.length - 1];
    if (lastDomainPart.length < 2) {
      return false;
    }
  
    return true;
  }
  
  // Test cases
  const testCases = [
    'user@example.com',
    'user.name@example.co.uk',
    'info@sub.domain.com',
    'user@',
    '@example.com',
    'user@domain.',
    'user@domain.c',
    'user@example',
  
  ];
  
  for (const email of testCases) {
    console.log(`${email}: ${validateEmailSyntax(email)}`);
  }
  