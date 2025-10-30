const { createClient } = supabase;
  const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // Get the modal
  var modal = document.getElementById("beta-modal");

  // Get the button that opens the modal
  var btn = document.getElementById("login-btn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Handle form submission
  document.getElementById('join-beta-btn').addEventListener('click', async () => {
    const email = document.getElementById('email-input').value;

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Insert the email into the Supabase table
    const { data, error } = await _supabase
      .from('beta_registrations')
      .insert([{ email: email }]);

    if (error) {
      console.error('Error inserting email:', error);
      alert('An error occurred. Please try again.');
    } else {
      // Show the "thank you" message
      var thankYouMessage = document.getElementById('thank-you-message');
      thankYouMessage.style.display = 'block';

      // Hide the modal
      modal.style.display = "none";

      // Hide the "thank you" message after 5 seconds
      setTimeout(() => {
        thankYouMessage.style.display = 'none';
      }, 5000);
    }
  });