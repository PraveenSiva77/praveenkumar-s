// src/components/ProfileDisplay.jsx
import React, { useEffect, useState } from "react";
import {ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { ProfileInfo } from "./Data";

const ProfileDisplay = () => {
  const [profile, setProfile] = useState({
    name: '',
    description: `${ProfileInfo.find(info => info.title === "Description 1")?.info}`,
    role: `${ProfileInfo.find(info => info.title === "Role")?.info}`,
    socialMedia: {
      whatsapp: '',
      linkedin: '',
      instagram: '',
      github: ''
    },
    imageUrl: ''
  });

  useEffect(() => {
    const profileRef = ref(db, 'profiles/profileID');
    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-text-light">{profile.name == '' ? ProfileInfo.find(info => info.title === "Name")?.info : profile.name}</h1>
      <p>{profile.description}</p>
      <p><strong>Role:</strong> {profile.role}</p>

      <h3>Social Media</h3>
      <ul>
        <li>WhatsApp: {profile.socialMedia.whatsapp}</li>
        <li>LinkedIn: <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">{profile.socialMedia.linkedin}</a></li>
        <li>Instagram: <a href={profile.socialMedia.instagram} target="_blank" rel="noopener noreferrer">{profile.socialMedia.instagram}</a></li>
        <li>GitHub: <a href={profile.socialMedia.github} target="_blank" rel="noopener noreferrer">{profile.socialMedia.github}</a></li>
      </ul>

      {profile.imageUrl && <img src={profile.imageUrl} alt={`${profile.name}'s profile`} />}
    </div>
  );
};

export default ProfileDisplay;
