import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Card, CardContent, RadioGroup, FormControlLabel, Radio, Stack, Divider} from "@mui/material";
import axios from "axios";

const AssessmentPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [responses, setResponses] = useState({});
  const [ageCategories,setAgeCategory]=useState([]);
  const [domains,setDomains]=useState([]);
  const [questions,setQuestions]=useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/get/category').then((res)=>{
        setAgeCategory(res.data)
    })
  },[])

  const getQuestions = (age)=>{
    axios.get(`http://localhost:3000/get/domain_questions/${age}`).then((res)=>{
        setDomains(res.data.domains);
        setQuestions(res.data.questions);
        console.log(domains);
        
  })
}

  // Filter relevant domains for selected age
  const filteredDomains = domains.filter((domain) =>
    domain.ageCategories.includes(selectedCategory)
  );

  // Group questions by domain
  const getQuestionsByDomain = (domainId) =>
    questions.filter(
      (q) =>
        q.domain_id === domainId &&
        q.age_category_id === selectedCategory &&
        q.status === true
    );

  const handleAnswerChange = (questionId, score) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: score
    }));
  };

  const groupResponsesByDomain = () => {
  const result = {};

  questions.forEach((question) => {
    const domain = domains.find(d => d._id === question.domain_id);
    const domainKey = domain?.domainName?.toLowerCase().replace(/\s+/g, "");

    const score = responses[question._id];

    if (domainKey && score) {
      result[domainKey] = (result[domainKey] || 0) + parseInt(score);
    }
  });

  return result;
};


const handleSubmit = (cat) => {
  const grouped = groupResponsesByDomain();
//   console.log("Final grouped response:", grouped);
if(cat == '6853ab00db8c0db3982915d4'){
    axios.post('http://localhost:3000/answer/fourmonths',grouped).then((res)=>{
        console.log(res.data);
        alert(res.data.message);
    })

}else if (cat == '6853ab2adb8c0db3982915d6') {
    axios.post('http://localhost:3000/answer/sixmonths',grouped).then((res)=>{
        console.log(grouped);
        alert(res.data.message);
    })
}else{
        alert(" ");
    }
};

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Developmental Assessment
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
        {ageCategories.map((cat) => (
          <Button
            key={cat._id}
            variant={selectedCategory === cat._id ? "contained" : "outlined"}
            color={selectedCategory === cat._id ? "secondary" : "primary"}
            onClick={() => {
              setSelectedCategory(cat._id);
              getQuestions(cat._id);
              setResponses({});
            }}
            sx={{
              textTransform: "none",
              borderRadius: "8px"
            }}
          >
            {cat.label}
          </Button>
        ))}
      </Stack>

      {selectedCategory ? (
        <Stack spacing={4}>
          {filteredDomains.map((domain) => {
            const domainQuestions = getQuestionsByDomain(domain._id);
            if (domainQuestions.length === 0) return null;

            return (
              <Card key={domain._id} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {domain.domainName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {domain.description}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  {domainQuestions.map((q) => (
                    <Box key={q._id} mb={3}>
                      <Typography variant="subtitle1" mb={1}>
                        {q.question}
                      </Typography>
                      <RadioGroup
                        row
                        name={q._id}
                        value={responses[q._id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(q._id, Number(e.target.value))
                        }
                      >
                        {q.answers.map((ans, i) => {
                          const label = Object.keys(ans)[0];
                          const value = ans[label];
                          return (
                            <FormControlLabel
                              key={i}
                              value={value}
                              control={<Radio />}
                              label={label}
                            />
                          );
                        })}
                      </RadioGroup>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            );
          })}

          <Box textAlign="center" mt={4}>
            <Button
              onClick={() => handleSubmit(selectedCategory)}
              variant="contained"
              size="large"
              sx={{
                borderRadius: "30px",
                px: 5,
                py: 1.5,
                textTransform: "none",
                backgroundColor: "#00b894",
                ":hover": {
                  backgroundColor: "#019874"
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      ) : (
        <Typography align="center" color="text.secondary">
          Please select an age category to begin.
        </Typography>
      )}
    </Box>
  );
};

export default AssessmentPage;
