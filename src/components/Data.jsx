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


