import React, { useState } from 'react'

const Form1 = () => {
    const [ageCategory, setAgeCategory] = useState('');
const [domainName, setDomainName] = useState('');
const [questions, setQuestions] = useState([
{ text: '', maxScore: '', suspectDelay: '', confirmDelay: '', remarks: '' },
]);

const ageCategories = [
'4 Months',
'6 Months',
'9 Months',
];


const handleQuestionChange = (index, field, value) => {
const updated = [...questions];
updated[index][field] = value;
setQuestions(updated);
};

const addQuestion = () => {
setQuestions([
...questions,
{ text: '', maxScore: '', suspectDelay: '', confirmDelay: '', remarks: '' },
]);
};

// const handleSubmit = (e) => {
// e.preventDefault();

// const payload = {
//   ageCategory,
//   domain: domainName,
//   questions,
// };

// console.log('Submitting form data:', payload);

// // You can send this payload to your backend via fetch or axios
// // Example:
// // axios.post('/api/agecategory', payload)
// };
  return (
    <div>
            <div>
      <label className="block text-sm font-medium mb-1">Age Category</label>
      <select
        value={ageCategory}
        onChange={(e) => setAgeCategory(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
        required
      >
        <option value="">-- Select Age Category --</option>
        {ageCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Domain Name</label>
      <input
        type="text"
        value={domainName}
        onChange={(e) => setDomainName(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="e.g. Gross Motor Skills"
        required
      />
    </div>

    <div>
      <h3 className="text-lg font-medium mb-2">Questions</h3>
      {questions.map((q, index) => (
        <div key={index} className="mb-4 border p-4 rounded-xl bg-gray-50 space-y-3">
          <input
            type="text"
            value={q.text}
            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
            placeholder="Question text"
            className="w-full border rounded px-3 py-2"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={q.maxScore}
              onChange={(e) => handleQuestionChange(index, 'maxScore', e.target.value)}
              placeholder="Max Score"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              value={q.suspectDelay}
              onChange={(e) => handleQuestionChange(index, 'suspectDelay', e.target.value)}
              placeholder="Suspect Delay"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              value={q.confirmDelay}
              onChange={(e) => handleQuestionChange(index, 'confirmDelay', e.target.value)}
              placeholder="Confirm Delay"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              value={q.remarks}
              onChange={(e) => handleQuestionChange(index, 'remarks', e.target.value)}
              placeholder="Remarks"
              className="border rounded px-3 py-2 col-span-2"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addQuestion}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Question
      </button>
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700"
    >
      Submit
    </button>
</div>

  )
}

export default Form1