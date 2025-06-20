import axios from 'axios'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz1 from './Quiz1';


// Pass your data (categories + domains) as the `data` prop
const Home = () => {
    let data = {
    "category": [
        {
            "_id": "6853ab00db8c0db3982915d4",
            "label": "4 MONTHS",
            "ageInMonths": 4,
            "description": "from 0 to 4 months",
            "isActive": true,
            "__v": 0
        },
        {
            "_id": "6853ab2adb8c0db3982915d6",
            "label": "6 MONTHS",
            "ageInMonths": 6,
            "description": "from 4 to 6 months",
            "isActive": true,
            "__v": 0
        },
        {
            "_id": "6853ab3fdb8c0db3982915d8",
            "label": "9 MONTHS",
            "ageInMonths": 9,
            "description": "from 6 to 9 months",
            "isActive": true,
            "__v": 0
        }
    ],
    "domains": [
        {
            "_id": "6853aba9db8c0db3982915da",
            "domainNumber": 1,
            "domainName": "Eye contact",
            "description": "Measures the child's ability to initiate and maintain eye contact.",
            "ageCategories": [
                "6853ab00db8c0db3982915d4"
            ],
            "questions": [],
            "__v": 0
        },
        {
            "_id": "6853abcddb8c0db3982915dc",
            "domainNumber": 2,
            "domainName": "SOCIAL SMILE",
            "description": "Measures the child's ability to smile and react.",
            "ageCategories": [
                "6853ab00db8c0db3982915d4"
            ],
            "questions": [],
            "__v": 0
        },
        {
            "_id": "6853ac19db8c0db3982915e0",
            "domainNumber": 3,
            "domainName": "Vocalising sounds/ Cooing",
            "description": "Measures the child's ability to light , individuals and grab attention.",
            "ageCategories": [
                "6853ab00db8c0db3982915d4"
            ],
            "questions": [],
            "__v": 0
        },
        {
            "_id": "6853ac44db8c0db3982915e2",
            "domainNumber": 4,
            "domainName": "Head control",
            "description": "Measures the child's ability to look above and around.",
            "ageCategories": [
                "6853ab00db8c0db3982915d4"
            ],
            "questions": [],
            "__v": 0
        },
        {
            "_id": "6853ad1ddb8c0db3982915e4",
            "domainNumber": 5,
            "domainName": "Rolling over",
            "description": "Measures the child's ability The child is able to roll independently",
            "ageCategories": [
                "6853ab2adb8c0db3982915d6"
            ],
            "questions": [],
            "__v": 0
        },
        {
            "_id": "6853ad72db8c0db3982915e6",
            "domainNumber": 6,
            "domainName": "Communication",
            "description": "Measures the child's ability to imitate words",
            "ageCategories": [
                "6853ab3fdb8c0db3982915d8"
            ],
            "questions": [],
            "__v": 0
        }
    ]
}
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleDomainClick = (domainId) => {
    navigate(`/quiz/${domainId}`);
  };

  // Filter domains based on selected category
  const filteredDomains = data.domains.filter((domain) =>
    domain.ageCategories.includes(selectedCategoryId)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Age Category</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {data.category.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategorySelect(cat._id)}
            style={{
              padding: "10px 20px",
              backgroundColor: selectedCategoryId === cat._id ? "#007bff" : "#e0e0e0",
              color: selectedCategoryId === cat._id ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {selectedCategoryId && (
        <div>
          <h3>Available Domains</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {filteredDomains.map((domain) => (
              <li
                key={domain._id}
                onClick={() => handleDomainClick(domain._id)}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "#f9f9f9"
                }}
              >
                <strong>{domain.domainName}</strong>
                <br />
                <small>{domain.description}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Quiz1/>
    </div>
  );
};

export default Home