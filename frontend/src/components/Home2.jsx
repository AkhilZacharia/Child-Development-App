// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   ChakraProvider,
//   Box,
//   Button,
//   VStack,
//   Heading,
//   Text,
//   RadioGroup,
//   Stack,
//   Radio,
//   useToast,
//   Spinner,
// } from "@chakra-ui/react";

// const Home2 = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [domains, setDomains] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [responses, setResponses] = useState({});
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("/api/categories"); // <-- Update with your real endpoint
//         setCategories(res.data);
//       } catch (err) {
//         console.error(err);
//         toast({
//           title: "Error",
//           description: "Failed to load categories",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch domains/questions when a category is selected
//   const fetchDomainAndQuestions = async (categoryId) => {
//     try {
//       setLoading(true);
//       setResponses({});
//       const res = await axios.get(`/api/domains/${categoryId}`); // <-- Update with your real endpoint
//       setDomains(res.data.domains);
//       setQuestions(res.data.questions);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//       toast({
//         title: "Error",
//         description: "Failed to load domains/questions",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleAnswer = (questionId, score) => {
//     setResponses((prev) => ({
//       ...prev,
//       [questionId]: score,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       // Transform questions -> domain names and scores
//       const result = {};
//       questions.forEach((q) => {
//         const domain = domains.find((d) => d._id === q.domain_id);
//         const key = domain?.domainName?.toLowerCase().replace(/\s+/g, "");
//         if (key && responses[q._id]) {
//           result[key] = (result[key] || 0) + parseInt(responses[q._id]);
//         }
//       });

//       await axios.post("/api/responses", result); // <-- Update with your POST endpoint
//       toast({
//         title: "Success",
//         description: "Responses submitted successfully",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       console.log("Submitted Scores:", result);
//     } catch (err) {
//       console.error(err);
//       toast({
//         title: "Error",
//         description: "Submission failed",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <ChakraProvider>
//       <Box p={6} maxW="800px" mx="auto">
//         <Heading textAlign="center" mb={6}>Child Development Assessment</Heading>

//         {/* Categories */}
//         <VStack spacing={3} mb={6}>
//           {categories.map((cat) => (
//             <Button
//               key={cat._id}
//               colorScheme={selectedCategoryId === cat._id ? "blue" : "gray"}
//               onClick={() => {
//                 setSelectedCategoryId(cat._id);
//                 fetchDomainAndQuestions(cat._id);
//               }}
//               width="100%"
//             >
//               {cat.label}
//             </Button>
//           ))}
//         </VStack>

//         {/* Domains & Questions */}
//         {loading ? (
//           <Box textAlign="center" py={10}><Spinner size="xl" /></Box>
//         ) : (
//           <>
//             {domains.map((domain) => (
//               <Box key={domain._id} mb={8} p={4} borderWidth="1px" borderRadius="lg">
//                 <Heading fontSize="xl" mb={3}>{domain.domainName}</Heading>
//                 <Text fontSize="sm" color="gray.600" mb={4}>{domain.description}</Text>

//                 {questions
//                   .filter((q) => q.domain_id === domain._id)
//                   .map((q) => (
//                     <Box key={q._id} mb={5}>
//                       <Text fontWeight="medium">{q.question}</Text>
//                       <RadioGroup
//                         onChange={(val) => handleAnswer(q._id, val)}
//                         value={responses[q._id] || ""}
//                       >
//                         <Stack direction="row" mt={2}>
//                           {q.answers.map((ansObj, index) => {
//                             const [label, score] = Object.entries(ansObj)[0];
//                             return (
//                               <Radio key={index} value={score.toString()}>{label}</Radio>
//                             );
//                           })}
//                         </Stack>
//                       </RadioGroup>
//                     </Box>
//                   ))}
//               </Box>
//             ))}
//             {domains.length > 0 && (
//               <Box textAlign="center">
//                 <Button
//                   colorScheme="teal"
//                   size="lg"
//                   onClick={handleSubmit}
//                   isDisabled={Object.keys(responses).length === 0}
//                 >
//                   Submit
//                 </Button>
//               </Box>
//             )}
//           </>
//         )}
//       </Box>
//     </ChakraProvider>
//   );
// };

// export default Home2;
