Sunita Sharma - Professional Makeup Artist Portfolio
Welcome to the official portfolio website for Glamour by Sarah, a professional makeup artist. This platform showcases Sarah's stunning work, provides information about her services, and offers an easy way for clients to get in touch.


✨ Features
Responsive Design: Looks great on desktops, tablets, and mobile devices.

Dynamic Portfolio Slider: A beautiful, auto-playing image carousel to showcase Sarah's best work, with smooth transitions and subtle animations.

About Section: Detailed information about Sarah's background, philosophy, and experience.

Video Gallery: Dedicated section for showcasing video content (tutorials, behind-the-scenes, etc.).

Mixed Gallery: A section for a combination of images and videos.

Services Section: Clearly outlines the various makeup services offered.

Testimonials: Displays client feedback and reviews.

Sticky Header Navigation: Easy access to specific sections (About, Video Gallery, Mixed Gallery, Services) with active link highlighting. Clicking the brand name navigates to the Portfolio section.

Smooth Scroll Navigation: Seamless scrolling to sections when header or footer links are clicked.

Prominent WhatsApp Contact: A floating, animated WhatsApp button for instant client communication, using a proper WhatsApp icon.

Stylish Footer: Contains brand information, quick links (matching main navigation sections), and contact details.

Custom Animations: Subtle animations using Tailwind CSS for an enhanced user experience.

🛠️ Technologies Used
This project is built with modern web technologies:

React.js: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Lucide React: A beautiful, customizable, and lightweight icon library for React components (used for general icons in Header/Footer).

React Icons: Provides a wide collection of popular icons (e.g., Font Awesome) as React components (specifically used for the WhatsApp icon).


Absolutely! Here's the most up-to-date README.md file for your React portfolio project, reflecting all the latest changes and features from the provided app-jsx immersive.

Glamour by Sarah - Professional Makeup Artist Portfolio
Welcome to the official portfolio website for Glamour by Sarah, a professional makeup artist. This platform showcases Sarah's stunning work, provides information about her services, and offers an easy way for clients to get in touch.

✨ Features
Responsive Design: Looks great on desktops, tablets, and mobile devices.

Dynamic Portfolio Slider: A beautiful, auto-playing image carousel to showcase Sarah's best work, with smooth transitions and subtle animations.

About Section: Detailed information about Sarah's background, philosophy, and experience.

Video Gallery: Dedicated section for showcasing video content (tutorials, behind-the-scenes, etc.).

Mixed Gallery: A section for a combination of images and videos.

Services Section: Clearly outlines the various makeup services offered.

Testimonials: Displays client feedback and reviews.

Sticky Header Navigation: Easy access to specific sections (About, Video Gallery, Mixed Gallery, Services) with active link highlighting. Clicking the brand name navigates to the Portfolio section.

Smooth Scroll Navigation: Seamless scrolling to sections when header or footer links are clicked.

Prominent WhatsApp Contact: A floating, animated WhatsApp button for instant client communication, using a proper WhatsApp icon.

Stylish Footer: Contains brand information, quick links (matching main navigation sections), and contact details.

Custom Animations: Subtle animations using Tailwind CSS for an enhanced user experience.

🛠️ Technologies Used
This project is built with modern web technologies:

React.js: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Lucide React: A beautiful, customizable, and lightweight icon library for React components (used for general icons in Header/Footer).

React Icons: Provides a wide collection of popular icons (e.g., Font Awesome) as React components (specifically used for the WhatsApp icon).

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You need to have Node.js and npm (Node Package Manager) or Yarn installed on your system.

Node.js: Download & Install Node.js (comes with npm)

Yarn (Optional): If you prefer Yarn over npm, you can install it globally:

Bash

npm install --global yarn
Installation
Clone the repository:

Bash

git clone <your-repository-url>
cd <your-project-folder-name>
(Replace <your-repository-url> with the actual URL of your Git repository and <your-project-folder-name> with the name you want for your project folder.)

Install dependencies:
Navigate into the cloned project directory and install the required packages.

Bash

npm install
# or if you use Yarn
# yarn install
Note: Ensure react-icons is installed: npm install react-icons --save

Place your images and videos:
Your PortfolioPage and VideoGalleryPage/MixedGalleryPage currently expect local assets to be in src/assets/image/ and src/assets/video/.
Important: Create these folder structures and place your actual .jpg image files and .mp4 video files there. Ensure the filenames match exactly what's listed in the respective page components (e.g., 1.jpg, 4.mp4). For external URLs, no action is needed.

Update WhatsApp Number:
Open src/App.jsx and update the whatsappNumber variable with Sarah's actual WhatsApp number, including the country code.

JavaScript

const whatsappNumber = "YOUR_WHATSAPP_NUMBER_WITH_COUNTRY_CODE"; // e.g., "919876543210"
🏃 Running the Project
Once the installation is complete, you can run the development server:

Bash

npm start
# or if you use Yarn
# yarn start
This will open the application in your default web browser at http://localhost:3000. The page will automatically reload if you make any edits.

📂 Project Structure
glamour-by-sarah/
├── public/                 # Public assets (e.g., index.html, favicon)
│   └── assets/
│       ├── image/          # Your portfolio images go here (e.g., 1.jpg, 2.jpg)
│       └── video/          # Your video files go here (e.g., 4.mp4)
├── src/
│   ├── App.jsx             # Main application component, handles routing and layout
│   ├── index.css           # Global CSS and Tailwind directives
│   ├── main.jsx            # React entry point
│   ├── components/
│   │   ├── Header.jsx      # Navigation bar component
│   │   └── Footer.jsx      # Footer component
│   └── pages/
│       ├── AboutPage.jsx   # About Me section
│       ├── ServicesPage.jsx # Services offered section
│       ├── PortfolioPage.jsx # Main portfolio image slider
│       ├── TestimonialsPage.jsx # Client testimonials section
│       ├── VideoGalleryPage.jsx # Video gallery section
│       └── MixedGalleryPage.jsx # Mixed media gallery (images/videos)
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # Project dependencies and scripts
└── README.md               # This file
🎨 Styling
This project uses Tailwind CSS. You can customize the styling by modifying tailwind.config.js or directly editing the Tailwind classes within your JSX components.

Note on Custom Animation:
The pulse-slow animation keyframes are currently in a <style> block directly within App.jsx. For better maintainability, it is highly recommended to move these keyframes to your global CSS file (like src/index.css) if you have one.

Example for src/index.css:

CSS

/* src/index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Keyframes for WhatsApp icon animation */
@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 3s infinite ease-in-out;
}
🤝 Contributing
If you have suggestions for improvements or encounter any issues, feel free to open an issue or submit a pull request.

📄 License
This project is open source and available under the MIT License.

🙏 Acknowledgements
React

Tailwind CSS

Lucide React

React Icons

Anmol Panchal for development.