// Framer Contact Form Submission Code
// Add this to your Framer interaction on button click

const submitContactForm = async () => {
  // Get form data from your Framer inputs
  // Replace these with your actual Framer input variable names
  const firstName = firstNameInput.value; // Your Framer input variable
  const lastName = lastNameInput.value;   // Your Framer input variable
  const email = emailInput.value;        // Your Framer input variable
  const countryName = countryInput.value; // Your Framer input variable
  const companyType = companyTypeInput.value; // Your Framer input variable
  const message = messageInput.value;    // Your Framer input variable

  // Show loading state
  console.log('Submitting form...');
  
  // Validate required fields
  if (!firstName || !lastName || !email || !countryName || !companyType || !message) {
    console.error('All fields are required');
    // Show error message to user
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('Please provide a valid email address');
    // Show error message to user
    return;
  }

  try {
    const response = await fetch('https://your-domain.vercel.app/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        countryName,
        companyType,
        message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Contact form submitted successfully!');
      console.log('Response:', data);
      
      // Show success message to user
      // You can trigger a success state in Framer here
      
      // Optional: Clear form fields
      firstNameInput.value = '';
      lastNameInput.value = '';
      emailInput.value = '';
      countryInput.value = '';
      companyTypeInput.value = '';
      messageInput.value = '';
    } else {
      console.error('❌ Error:', data.error);
      // Show error message to user
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    // Show network error message to user
  }
};

// Call this function on your button click
submitContactForm();