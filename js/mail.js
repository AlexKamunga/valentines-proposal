        const EMAILJS_PUBLIC_KEY = "WXt0Eb2DG4Pyx0cfV";
        const EMAILJS_SERVICE_ID = "service_xb8ctng";
        const EMAILJS_TEMPLATE_ID = "template_kt9i3fi";
        
        // Set your redirect URL (can be relative or absolute)
        const REDIRECT_URL = "lastpage.html"; 
        
        // Redirect delay in milliseconds
        const REDIRECT_DELAY = 2000;

// Initialize EmailJS with your public key
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY); // EmailJS public key
})();

        document.getElementById('dataForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const button = document.getElementById('submitBtn');
            const messageDiv = document.getElementById('message');
            
            // Disable button and show loading state
            button.disabled = true;
            button.textContent = 'Sending...';
            messageDiv.style.display = 'none';
            
            // Get form data
            const datetime = document.getElementById('datetime').value;
            const choice = document.querySelector('input[name="choice"]:checked').value;
            
            // Format datetime for better readability
            const formattedDate = new Date(datetime).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
            
            // Prepare template parameters
            const templateParams = {
                datetime: formattedDate,
                choice: choice,
                raw_datetime: datetime,
                submission_time: new Date().toLocaleString()
            };
            
            try {
                // Send email using EmailJS
                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,   
                    EMAILJS_TEMPLATE_ID,   
                    templateParams
                );
                
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                messageDiv.textContent = `✓ Form submitted successfully! Redirecting in ${REDIRECT_DELAY/1000} seconds...`;
                messageDiv.className = 'message success';
                messageDiv.style.display = 'block';
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = REDIRECT_URL;
                }, REDIRECT_DELAY);
                
            } catch (error) {
                console.error('FAILED...', error);
                
                // Show error message
                messageDiv.textContent = '✗ Failed to send email: ' + (error.text || error.message);
                messageDiv.className = 'message error';
                messageDiv.style.display = 'block';
            } finally {
                // Re-enable button
                button.disabled = false;
                button.textContent = 'Submit Form';
            }
        });