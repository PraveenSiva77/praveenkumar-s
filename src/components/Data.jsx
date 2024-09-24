import { FaInstagram, FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import Profile_Image from '../assets/Profile-Image.jpg';

// Resume Link
import Resume from '../assets/Praveenkumar_S_DL_AI_Dev_Resume.pdf';

// Filters - Experiences & Education
import { MdWorkspacePremium } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";

// Journey Logos
import SoC_logo from '../assets/Journey_Images/SoC_Logo.png';
import ADEPT_Logo from '../assets/Journey_Images/ADEPT_Logo.png';
import CodSoft_Logo from '../assets/Journey_Images/CodSoft_Logo.png';
import TBT_Logo from '../assets/Journey_Images/TBT_Logo.png';
import SHHSS_Logo from '../assets/Journey_Images/SHHSS_Logo.png';
import KCE_Logo from '../assets/Journey_Images/KCE_Logo.png';

// Team Profiles
import Praveen_Img from '../assets/Team/Praveenkumar_S.jpg';
import Sibi_img from '../assets/Team/Sibi_Siddharth_S.jpg';
import Srini_img from '../assets/Team/Srinivasan_R.jpg';
import Surya_Img from '../assets/Team/Surya_B.jpg';
import Arivu_Img from '../assets/Team/Arivumani_A.jpg';
import Uma_Img from '../assets/Team/Uma_Maheswari_P.jpg'


// Project Thumbnails
import DeepVision from '../assets/Project/Deep-Vision-Thumbnail.png';
import Varunah from '../assets/Project/Varunah 2k24 Thumbnail.png';
import RoyalsConnect from '../assets/Project/Royals-Web-Thumbnail.png';
import AudioSearch from '../assets/Project/Audio-Search-Thumbnail.png';
import EcommerceWebsite from '../assets/Project/Ecommerce Website Thumnail.png';
import ChatSoC from '../assets/Project/Chat SoC Thumbnail.png';
import DeepFake from '../assets/Project/DeepFake-Detection-Thumbnail.png';

// Skills SVG
import {
  HtmlLogo,
  CssLogo,
  JavascriptLogo,
  ReactLogo,
  TailwindLogo,
  BootstrapLogo,
} from "../assets/SVG/Logos";

import {
  FirebaseLogo,
  PostgreSQLLogo,
  MongoDBLogo,
  FlaskLogo,
  NodeJsLogo,
  PythonLogo,
} from "../assets/SVG/Logos";

import {
  AlgorithmLogo,
  PandasLogo,
  APILogo,
  PyTorchLogo,
  TensorFlowLogo,
  NumpyLogo,
} from "../assets/SVG/Logos";

import {
  VsCodeLogo,
  XdLogo,
  FigmaLogo,
  GithubLogo,
  GitLogo,
  CanvaLogo,
} from "../assets/SVG/Logos";




// Header Link Data
export const HeaderData = [
    {name: "Home", to:"home"},
    {name: "About", to:"about"},
    {name: "Skills", to:"skills"},
    {name: "Services", to:"services"},
    {name: "Journey", to:"journey"},
    {name: "Projects", to:"projects"},
]

// Contact Button
export const LetsTalk = {name: "Let's talk", to:"#contact"}

// Social Media Icons
export const SocialIcons = [
  { name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/__mr.unique.77__?igsh=MWpsbWIyczZobTR4bg==" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, link: "https://linkedin.com/in/praveensiva77" },
  { name: "Github", icon: <FaGithub />, link: "https://github.com/PraveenSiva77" },
  { name: "Whatsapp", icon: <FaWhatsapp />, link: "https://api.whatsapp.com/send?phone=+916381299183&text=Hello, More information!" },

];

// Links
export const myLinks = [
  {
    id: 1,
    link: "https://www.instagram.com/__mr.unique.77__?igsh=MWpsbWIyczZobTR4bg==",
    title: "Instagram",
  },
  {
    id: 2,
    link: "https://api.whatsapp.com/send?phone=+916381299183&text=Hello, More information!",
    title: "Whatsapp",
  },
  {
    id: 3,
    link: "https://linkedin.com/in/praveensiva77",
    title: "Linkedin",
  },
  {
    id: 4,
    link: "https://github.com/PraveenSiva77",
    title: "Github",
  },
];

// Profile Image
export const ProfileImage = [
    {name:"Praveen Siva", image: Profile_Image}
]

// Profile Info.
export const ProfileInfo = [
  {title:"Name", info: "Praveenkumar S"},
  {title:"Role", info: "Python Developer"},
  {title:"Description 1", info: "I am a B.Tech student specializing in Artificial Intelligence and Data Science at Kathir College of Engineering. With a deep passion for Machine Learning, Web Development, and Deep Learning, I am dedicated to harnessing technology to tackle complex challenges. My commitment to continuous learning and problem-solving drives me to stay updated with the latest industry trends and advancements."},
  {title:"Description 2", info: "I'm a Python developer specializing in AI, Machine Learning, Deep Learning, and Front-end developer. With a strong focus on crafting intelligent algorithms and user-friendly interfaces, I bring a blend of technical expertise and creative problem-solving skills to projects."},

]

// Resume Link
export const ResumeLink = [
  {name:"https://drive.google.com/file/d/16tlfnzNwKT5T9xoPPdrmDVsQaUVwSMU1/view", image: Resume}
]

// Skills Info
export const skills_data = [
  { name: "HTML", icon: <HtmlLogo />, domain: "Frontend" },
  { name: "CSS", icon: <CssLogo />, domain: "Frontend" },
  { name: "JavaScript", icon: <JavascriptLogo />, domain: "Frontend" },
  { name: "React", icon: <ReactLogo />, domain: "Frontend" },
  { name: "Bootstrap", icon: <BootstrapLogo />, domain: "Frontend" },
  { name: "Tailwind", icon: <TailwindLogo />, domain: "Frontend" },

  { name: "Python", icon: <PythonLogo />, domain: "Backend" },
  { name: "Node.Js", icon: <NodeJsLogo />, domain: "Backend" },
  { name: "Flask", icon: <FlaskLogo />, domain: "Backend" },
  { name: "MongoDB", icon: <MongoDBLogo />, domain: "Backend" },
  { name: "PostgreSQL", icon: <PostgreSQLLogo />, domain: "Backend" },
  { name: "Firebase", icon: <FirebaseLogo />, domain: "Backend" },

  { name: "Tensorflow", icon: <TensorFlowLogo />, domain: "AI/ML" },
  { name: "Pytorch", icon: <PyTorchLogo />, domain: "AI/ML" },
  { name: "Numpy", icon: <NumpyLogo />, domain: "AI/ML" },
  { name: "Pandas", icon: <PandasLogo />, domain: "AI/ML" },
  { name: "Algorithms", icon: <AlgorithmLogo />, domain: "AI/ML" },

  { name: "VS Code", icon: <VsCodeLogo />, domain: "Others" },
  { name: "Figma", icon: <FigmaLogo />, domain: "Others" },
  { name: "Git", icon: <GitLogo />, domain: "Others" },
  { name: "GitHub", icon: <GithubLogo />, domain: "Others" },
  { name: "Canva", icon: <CanvaLogo />, domain: "Others" },
  { name: "Adobe XD", icon: <XdLogo />, domain: "Others" },
  
];


// Services Offered by Me
export const ServicesData = [
  {
    title: "AI/ML Solutions",
    icon: <AlgorithmLogo/>,
    description: "Service with more than 2 years of Experience. Providing Quality work to clients and Companies.",
    points:[
      "Developing AI Models.",
      "Machine Learning Projects.",
      "Deep Learning Projects.",
    ]
  },

  {
    title: "Web Development",
    icon: <ReactLogo/>,
    description: "Service with more than 2 years of Experience. Providing Quality work to clients and Companies.",
    points:[
      "Devloping User Interface.",
      "Web page devlopmemt.",
      "Responsive Web Design",
    ]
  },

  {
    title: "UI/UX Designing",
    icon: <FigmaLogo/>,
    description: "Service with more than 2 years of Experience. Providing Quality work to clients and Companies.",
    points:[
      "Devloping User Interface.",
      "Prototyping with Figma.",
      "Creating Brand logos.",
    ]
  },

];

export const JourneyType = [
  {name:"Experience", icon: <MdWorkspacePremium/>},
  {name:"Education", icon: <FaGraduationCap/>},
];


// Journey of Me
export const JourneyData =[
  {
    title: "Squad of Creators",
    image: SoC_logo,
    role: "Python & Web Developer",
    duration: "May 2022 - Present",
    type: "Experience",
  },

  {
    title: "ADEPT - Association",
    image: ADEPT_Logo,
    role: "Coding Club",
    duration: "May 2022 - Sep 2024",
    type: "Experience",
  },

  {
    title: "Codsoft",
    image: CodSoft_Logo,
    role: "Data Science Intern",
    duration: "Dec 2023 - Jan 2024",
    type: "Experience",
  },
  
  {
    title: "Three Baboons Technology",
    image: TBT_Logo,
    role: "Frontend Developer",
    duration: "Jul 2023 - Aug 2023",
    type: "Experience",
  },

  {
    title: "Kathir College of Engineering",
    image: KCE_Logo,
    role: "B.tech AI & Data Science",
    duration: "Nov 2021 - Present",
    type: "Education",
  },

  {
    title: "Sacred Heart Hr. Sec. School",
    image: SHHSS_Logo,
    role: "+2/HSE",
    duration: "Jun 2020 - Mar 2021",
    type: "Education",
  },

];


// Project Data
export const ProjectData = [

  {
    title: "Deep Fake Detection",
    image: DeepFake, 
    duration: "Aug 2024 - Present",
    status: "Working",
    type: "Deep Learning",
    tags: "CNN, LSTM, GAN, ReactJS, Flask, Tensorflow, PyTorch, OpenCV",
    description: "Deep Fake Detection is an AI-driven project designed to detect and combat manipulated media, focusing on distinguishing real content from AI-generated deep fakes. By leveraging advanced machine learning techniques and cutting-edge image analysis algorithms, the project aims to identify and mitigate the risks posed by deep fake videos and images. This technology is essential for maintaining the authenticity of digital media and combating misinformation in areas such as media, security, and social networks.",
    githubLink:"https://github.com/saisurya7860/SIH--FACEINTUIT",
    demoLink: "https://faceintuit.netlify.app/",
    role: "Python & Web Developer",
    members: [
      {
        name: "Praveenkumar S",
        image: Praveen_Img,
        role: "ML & Web Developer",
      },
      {
        name: "Sibi Siddharth S",
        image: Sibi_img,
        role: "ML & Web Developer", 
      },
      {
        name: "Srinivasan R",
        image: Srini_img,
        role: "AI/ML Developer",  
      },
      {
        name: "Arivumani A",
        image: Arivu_Img,
        role: "ML Developer", 
      },
      {
        name: "Surya B",
        image: Surya_Img,
        role: "Web Developer", 
      },
    ],
  },


  {
    title: "Audio Search",
    image: AudioSearch, 
    duration: "Jul 2024 - Aug 2024",
    status: "Completed",
    type: "Deep Learning",
    tags: "AudioSearch, MachineLearning, ReactJS, Python, AudioTagging, LanceDB, ESC50Dataset",
    description: "The Similar Audio Search project is an innovative solution designed to find audio clips similar to a given sound using cutting-edge technology. By leveraging the ESC-50 dataset and the AudioTagging model from panns_inference, the system generates unique audio embeddings stored in LanceDB, a database built for efficient large-scale vector data handling. This enables fast and accurate search results. The React-based frontend allows users to input audio samples and retrieve the top 5 similar clips, complete with playback and category details. Ideal for music recommendation systems and sound identification applications, this project seamlessly integrates React, Python, and LanceDB for an interactive and efficient audio search experience.",
    githubLink:"https://github.com/PraveenSiva77/",
    demoLink: null,
    role: "Python & Web Developer",
    members: [
      {
        name: "Praveenkumar S",
        image: Praveen_Img,
        role: "ML & Web Developer", 
      },
      {
        name: "Uma Maheswari P",
        image: Uma_Img,
        role: "ML Developer",
      },
      {
        name: "Surya B",
        image: Surya_Img,
        role: "ML & Web Developer",
      },
    ],
  },


  {
    title: "Royal Connect",
    image: RoyalsConnect, 
    duration: "Jun 2024 - Jul 2024",
    status: "Completed",
    type: "Web Development",
    tags: "HTML, CSS, JavaScript, ReactJS, React Bootstrap, Figma, Responsive",
    description: "RoyalConnect2k24 is the official website for the Rotaract Club of Coimbatore Royals, developed with a focus on delivering a responsive and engaging user experience. Built using ReactJS, HTML, CSS, JavaScript, and React Bootstrap, the site ensures seamless functionality across all devices. The UI design, created with Figma, highlights a modern and visually cohesive interface, enhancing user interaction. RoyalConnect2k24 serves as a central hub for club members and events, providing information, updates, and a platform for community engagement.",
    githubLink:"https://github.com/sibisiddharth8/RoyalConnect2k24.git",
    demoLink: "https://sibisiddharth8.github.io/RoyalConnect2k24/",
    role: "Web Developer",
    members: [
      {
        name: "Praveenkumar S",
        image: Praveen_Img,
        role: "Web Developer", 
      },
      {
        name: "Sibi Siddharth S",
        image: Sibi_img,
        role: "Web Developer", 
      },
    ],
  },


  {
    title: "Deep Vision",
    image: DeepVision, 
    duration: "Apr 2024 - May 2024",
    status: "Completed",
    type: "Deep Learning",
    tags: "Python, TensorFlow, Keras, ESRGAN, GAN, HTML, CSS, Flask",
    description: "VisionSoC is an advanced image upscaling model developed with Enhanced Super Resolution Generative Adversarial Networks (ESRGAN), built using Python alongside TensorFlow and Keras. This innovative solution enhances low-resolution images with stunning detail and clarity, making it ideal for applications such as digital photography, medical imaging, and video processing. The comprehensive web-based application, crafted using HTML, CSS, and JavaScript, is seamlessly integrated with a Flask backend, ensuring a smooth user experience across platforms. VisionSoC represents a cutting-edge approach to image enhancement technology.",
    githubLink:"https://github.com/sibisiddharth8/VisionSoC.git",
    demoLink: null,
    role: "Python & Frontend Developer",
    members: [
      {
        name: "Praveenkumar S",
        image: Praveen_Img,
        role: "ML & Web Developer", 
      },
      {
        name: "Sibi Siddharth S",
        image: Sibi_img,
        role: "ML & Web Developer",
      },
      {
        name: "Srinivasan R",
        image: Srini_img,
        role: "AI/ML Developer", 
      },
      {
        name: "Surya B",
        image: Surya_Img,
        role: "ML Developer", 
      },
      {
        name: "Arivumani A",
        image: Arivu_Img,
        role: "Data Analyst", 
      },
    ],
  },


  {
    title: "Varunah 2k24",
    image: Varunah, 
    duration: "Feb 2024 - Mar 2024",
    status: "Completed",
    type: "Web",
    tags: "HTML, CSS, JavaScript, Bootstrap, Google Forms, Canva, UI/UX Designing",
    description: "Varunah2k24 is the official website for Kathir College of Engineering's prestigious national-level technical symposium. Developed with a focus on performance and responsiveness, the website was built using HTML, CSS, JavaScript, Bootstrap, and Ajax to ensure seamless functionality on both desktop and mobile platforms. Along with the website, event posters and designs were crafted using Canva, providing a cohesive visual identity. Varunah2k24 is an essential platform for event registrations, schedules, and updates, enhancing the overall user experience for participants.",
    githubLink:"https://github.com/sibisiddharth08/varunahkce.git",
    demoLink: "https://varunahkce.netlify.app/",
    role: "Frontend Developer",
    members: [
      {
        name: "Praveenkumar S",
        image: Praveen_Img,
        role: "Web Developer",
      },
      {
        name: "Sibi Siddharth S",
        image: Sibi_img,
        role: "Web Developer",
      },
    ],
  },


  {
    title: "Chat SoC",
    image: ChatSoC, 
    duration: "Mar 2023 - May 2023",
    status: "Completed",
    type: "Machine Learning",
    tags: "Machine Learning, HTML, CSS, NLP, Artificial Intelligence, Chatbot, Open AI",
    description: "ChatSoC is an advanced AI-powered chatbot leveraging OpenAI's API in Python to provide a comprehensive interactive experience. Equipped with cutting-edge features like text-to-voice output, voice-to-text input, a secure QR login mechanism utilizing OpenCV, AI image generation through DALL-E, and the ability to download YouTube videos and reference Wikipedia content, ChatSoC stands as an innovative tool for dynamic user engagement. This versatile chatbot caters to a variety of use cases, from educational tools to interactive customer support systems.",
    githubLink:"https://github.com/sibisiddharth8/ChatSoC.git",
    demoLink: null,
    role: "Python & Web Developer",
    members: [
      {
        name: "Praveenkumar S",
        image: Praveen_Img,
        role: "ML & Web Developer", 
      },
      {
        name: "Sibi Siddharth S",
        image: Sibi_img,
        role: "ML & Web Developer",
      },
      {
        name: "Srinivasan R",
        image: Srini_img,
        role: "AI/ML Developer", 
      },
      {
        name: "Surya B",
        image: Surya_Img,
        role: "Documentation", 
      },
      {
        name: "Arivumani A",
        image: Arivu_Img,
        role: "Testing", 
      },
    ],
  },

];


