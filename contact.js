function toggleLightContactPage() {
    let isNightMode = false;

    const btn = document.getElementById("dark-mode");
    const submitBtn = document.getElementById("submit");
    const inputs = document.querySelectorAll("input");
    const textarea = document.querySelector("textarea");
    const body = document.body;

    btn.addEventListener('click', () => {
        isNightMode = !isNightMode; // This way program takes the responsibilty for switching to proper state
        
        if(isNightMode) {            
            btn.innerText = "Toggle Light Mode";
            btn.classList.remove("bg-blue-500");
            btn.classList.remove("hover:bg-blue-600");
            btn.classList.add("bg-gray-700");
            btn.classList.add("hover:bg-gray-800"); 
            
            submitBtn.classList.remove("bg-indigo-600");
            submitBtn.classList.remove("hover:bg-indigo-500");
            submitBtn.classList.add("bg-gray-700");
            submitBtn.classList.add("hover:bg-gray-700");
        } else {
            btn.innerText = "Toggle Dark Mode";
            btn.classList.remove("bg-gray-700");
            btn.classList.remove("hover:bg-gray-800");
            btn.classList.add("bg-blue-500");
            btn.classList.add("hover:bg-blue-600");
            
            submitBtn.classList.add("bg-indigo-600");
            submitBtn.classList.add("hover:bg-indigo-500");
            submitBtn.classList.remove("bg-gray-700");
            submitBtn.classList.remove("hover:bg-gray-700");
        }

        body.classList.toggle("passive");
        textarea.classList.toggle("bg-gray-800");

        inputs.forEach(input => {
            input.classList.toggle("bg-gray-800");
        })
    })
}

function sendEmail() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const message = document.getElementById('message').value;

    if(
        firstName === '' ||
        lastName === '' ||
        email === '' ||
        company === '' ||
        phoneNumber === '' ||
        message === ''
        ) {
            alert('You cannot leave fields empty.');
            return;
        } else {
            // Construct mailto URL
            const mailtoURL = `mailto:your-email@example.com?subject=Contact Form Submission&body=First Name: ${firstName}%0ALast Name: ${lastName}%0AEmail: ${email}%0ACompany: ${company}%0APhone Number: ${phoneNumber}%0AMessage: ${message}`;    
            window.location.href = mailtoURL;
        }    
}

toggleLightContactPage();
