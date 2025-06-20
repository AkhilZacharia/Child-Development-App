
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Button from '@mui/material/Button';

// Domain name mapping
const domainMap = {
  "6853aba9db8c0db3982915da": "eyecontact",
  "6853abcddb8c0db3982915dc": "socialsmile",
  "6853ac19db8c0db3982915e0": "vocalisingsounds",
  "6853ac44db8c0db3982915e2": "headcontrol"
};



const Quiz1 = () => {

var [data,setData] = useState([])
useEffect(()=>{
  axios.get('http://localhost:3000/questions/6853ab00db8c0db3982915d4').then((res)=>{
     setData(res.data)
  })
},[])

  const [responses, setResponses] = useState({});

  const handleAnswer = (questionId, domainId, score) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: { score, domainId }
    }));
  };

  const handleSubmit = () => {
    const domainScores = {};

    Object.values(responses).forEach(({ domainId, score }) => {
      const key = domainMap[domainId];
      if (key) {
        domainScores[key] = (domainScores[key] || 0) + score;
      }
    });

    console.log("Final Score:", domainScores);
    axios.post('http://localhost:3000/answer/fourmonths',domainScores).then((res)=>{
        console.log(res.data);
        

        alert(res.data.message);
    })
    
  };

  return (
    <div>
      <h2>Child Development</h2>
      {data.map((item) => (
        <div key={item._id} style={{ marginBottom: "20px" }}>
          <p><strong>{item.question}</strong></p>
          {item.answers.map((ans, index) => {
            const label = Object.keys(ans)[0];
            const score = ans[label];
            return (
              <label key={index} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={item._id}
                  value={score}
                  onChange={() => handleAnswer(item._id, item.domain_id, score)}
                />
                {label}
              </label>
            );
          })}
        </div>
      ))}

<Button onClick={handleSubmit} style={{ backgroundColor: "#00bfa5", color: "#fff", padding: "12px 32px", borderRadius: "30px", boxShadow: "0 4px 20px rgba(0, 191, 165, 0.5)", textTransform: "none" }}>
  Submit
</Button>
    </div>
  );
};

export default Quiz1;
