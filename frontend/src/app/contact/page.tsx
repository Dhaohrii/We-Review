// pages/contact.tsx
'use client';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './contact.module.css'; // Adjust path as per your project

const ContactPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Your EmailJS service details
    const serviceID = 'service_592y71a';
    const templateID = 'template_chpx86t';
    const userID = 'dtawJTjENY7Gw6Edd';

    // Prepare template parameters
    const templateParams = {
      from_name: `${firstName} ${lastName}`,
      from_email: email,
      to_name: "Banzour", // Replace with the recipient's name or email
      message: description
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
            // Clear form fields after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setDescription('');
        // Optionally handle success feedback to the user
      }, (error) => {
        console.error('Failed to send email:', error);
        // Optionally handle error feedback to the user
      });


  };

  return (
    <div className={styles.formContainer}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
