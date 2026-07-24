// Dynamic Sub-Categories Configuration
const subCategoriesData = {
    "Manufacturer": [
        "Textile & Garment Manufacturing",
        "Industrial Machinery & Equipment",
        "Plastic & Rubber Products",
        "Chemicals & Pharmaceuticals",
        "Metal & Hardware Fabrication",
        "Packaging & Paper Goods",
        "Other Manufacturing Unit"
    ],
    "Services": [
        "Real Estate Consultancy",
        "Legal & Chartered Accountancy (CA)",
        "Interior Design & Architecture",
        "IT & Software Development Services",
        "Education, Coaching Classes & Academy",
        "Medical, Clinic & Healthcare Services",
        "Digital Marketing Agency",
        "Event Management & Photography",
        "Other Professional Services"
    ],
    "Distributor": [
        "FMCG & Food Products Wholesale",
        "Electronics & Appliances Distribution",
        "Pharmaceutical & Medical Supplier",
        "Construction & Building Materials",
        "Auto Parts & Machinery Spares",
        "Agricultural Goods & Fertilizer Distributor",
        "Other General Wholesale & Distribution"
    ],
    "Retail": [
        "Clothing & Fashion Boutique",
        "Grocery, Supermarket & Kirana",
        "Footwear & Accessories Store",
        "Jewelry & Luxury Watches",
        "Mobile, Gadgets & Electronics Retail",
        "Hardware & Sanitary Store",
        "Other Retail Store"
    ],
    "Other": [
        "Salon, Spa & Beauty Parlor",
        "Furniture Showroom & Carpentry Studio",
        "Café, Restaurant & Cloud Kitchen",
        "Gym, Fitness Center & Sports Club",
        "Travel & Tour Operator Agency",
        "Car Wash, Detailing & Auto Garage",
        "Other Local Service / Business"
    ]
};

// Handle Cascade Dropdown for Sub-Categories
const mainCategorySelect = document.getElementById('mainCategory');
const subCategorySelect = document.getElementById('subCategory');

if (mainCategorySelect && subCategorySelect) {
    mainCategorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        subCategorySelect.innerHTML = '<option value="" disabled selected>Select specific sub-category</option>';
        
        if (subCategoriesData[selectedCategory]) {
            subCategoriesData[selectedCategory].forEach(subCat => {
                const option = document.createElement('option');
                option.value = subCat;
                option.textContent = subCat;
                subCategorySelect.appendChild(option);
            });
        }
    });
}

// Mobile Hamburger Menu Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Form Submission & Email Dispatch Handler
const projectForm = document.getElementById('projectForm');
const successModal = document.getElementById('successModal');
const submitBtn = document.getElementById('submitBtn');

if (projectForm) {
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state on button
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending to Mail...';
        submitBtn.disabled = true;

        // Collect values for summary modal & whatsapp handover
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const businessName = document.getElementById('businessName').value;
        const mainCategory = document.getElementById('mainCategory').value;
        const subCategory = document.getElementById('subCategory').value;
        const webPackage = document.getElementById('webPackage').value;

        // Populate Success Dashboard Data
        document.getElementById('clientNameDisplay').textContent = fullname;
        document.getElementById('sumBusiness').textContent = businessName;
        document.getElementById('sumCategory').textContent = `${mainCategory} › ${subCategory}`;
        document.getElementById('sumPackage').textContent = webPackage;

        // Construct WhatsApp Message Handover Backup
        let waMessage = `🚀 *DOCUMENT HANDOVER FOR QWICKDESK*%0A%0A` +
                        `👤 *Client Name:* ${encodeURIComponent(fullname)}%0A` +
                        `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
                        `🏢 *Business Name:* ${encodeURIComponent(businessName)}%0A` +
                        `💻 *Package:* ${encodeURIComponent(webPackage)}%0A%0A` +
                        `Hi QwickDesk team, I have submitted my form on the website. Here are my logo and details:`;
        
        const whatsappLink = `https://wa.me/919920048859?text=${waMessage}`;
        document.getElementById('whatsappHandoverBtn').setAttribute('href', whatsappLink);

        // Send via AJAX to FormSubmit endpoint pointing to Outlook email
        const formData = new FormData(projectForm);

        fetch("https://formsubmit.co/ajax/qwickdesksolutions@outlook.com", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            successModal.classList.add('active');
            projectForm.reset();
        })
        .catch(error => {
            // Fallback in case of network restriction, still show success modal & WhatsApp
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            successModal.classList.add('active');
        });
    });
}

// Sticky Navbar on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        window.scrollY > 20 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    }
});
