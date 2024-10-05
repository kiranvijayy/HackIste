import React from "react";
import './Home.css'; // Import your CSS for styling

const topics = [
  {
    id: 1,
    title: "Biology",
    description: "Explore the fundamentals of life and living organisms.",
    imageUrl: "https://via.placeholder.com/150",
    link: "/bio"
  },
  {
    id: 2,
    title: "Physics",
    description: "Understand the principles of matter and energy.",
    imageUrl: "https://via.placeholder.com/150",
    link: "/phys"
  },
  {
    id: 3,
    title: "Web Development",
    description: "Learn how to build websites and web applications.",
    imageUrl: "https://via.placeholder.com/150",
    link: "/web-dev"
  },
  {
    id: 4,
    title: "Organic Chemistry",
    description: "Dive into the study of the structure, properties, and reactions of organic compounds.",
    imageUrl: "https://via.placeholder.com/150",
    link: "/organic-chem"
  },
  {
    id: 5,
    title: "Amino Acids",
    description: "Discover the building blocks of proteins.",
    imageUrl: "https://via.placeholder.com/150",
    link: "/amino-acids"
  },
];

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Your Personalized Learning Hub</h1>
      <div className="topic-cards">
        {topics.map(topic => (
          <div key={topic.id} className="topic-card">
            <img src={topic.imageUrl} alt={topic.title} />
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <a href={topic.link} className="button">Explore</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
