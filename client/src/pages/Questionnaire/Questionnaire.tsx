import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { isUserAllowed } from "../../utils/isAuth.js";

const Questionnaire = () => {
  const navigate = useNavigate();
  const canContinue = isUserAllowed();

  if (!canContinue) {
    navigate("/get-pet/register");
  }

  const userId = useSelector((state) => state.user.userId);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    role: "",
    location: "",
    availabilityFrom: "",
    availabilityTo: "",
    hourlyRate: "",
  });

  const questions = [
    {
      question: "Are you Adopter or Dog-sitter?",
      field: "role",
      type: "dropdown",
      options: ["Dog-sitter", "Adopter"],
    },
    {
      question: "Which region are you located in?",
      field: "location",
      type: "dropdown",
      options: ["Central District", "Southern District", "Northern District"],
    },
    {
      question: "What is your availability? (From - To)",
      field: "availability",
      type: "range",
    },
    {
      question: "What is your hourly rate?",
      field: "hourlyRate",
      type: "number",
    },
  ];

  const handleAnswer = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (answers.role === "Adopter") {
        // Skip to dashboard if role is "Adopter"
        navigate("/get-pet/dashboard");
        return;
      }
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitData = async () => {
    const url = `http://localhost:3000/users/${userId}/role/sitter`;
    const payload = {
      location: answers.location,
      availabilityFrom: answers.availabilityFrom,
      availabilityTo: answers.availabilityTo,
      hourlyRate: parseInt(answers.hourlyRate, 10),
    };

    try {
      const response = await axios.put(url, payload);
      console.log("Response:", response.data);
      navigate("/get-pet/dashboard");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting your data. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Progress Dots */}
      <div className="flex space-x-2 mb-6">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentStep ? "bg-chosenYellow" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      {/* Question Content */}
      <div className="text-center w-full max-w-md bg-white p-6 rounded">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Before we jump right in
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          {questions[currentStep].question}
        </p>

        {/* Render Input Based on Question Type */}
        {questions[currentStep].type === "dropdown" && (
          <select
            required
            className="border border-gray-300 rounded p-2 w-full"
            onChange={(e) =>
              handleAnswer(questions[currentStep].field, e.target.value)
            }
            value={answers[questions[currentStep].field] || ""}
          >
            <option value="">Select an option</option>
            {questions[currentStep].options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {questions[currentStep].type === "range" && (
          <div className="flex space-x-4">
            <input
              required
              type="text"
              className="border border-gray-300 rounded p-2 w-1/2"
              placeholder="From (e.g., 0800)"
              maxLength={4} // Limit input to 4 characters
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) {
                  handleAnswer("availabilityFrom", value);
                }
              }}
              value={answers.availabilityFrom}
            />
            <input
              required
              type="text"
              className="border border-gray-300 rounded p-2 w-1/2"
              placeholder="To (e.g., 1800)"
              maxLength={4} // Limit input to 4 characters
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) {
                  handleAnswer("availabilityTo", value);
                }
              }}
              value={answers.availabilityTo}
            />
          </div>
        )}

        {questions[currentStep].type === "number" && (
          <input
            type="number"
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Hourly rate"
            onChange={(e) =>
              handleAnswer(questions[currentStep].field, e.target.value)
            }
            value={answers[questions[currentStep].field]}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className={`px-4 py-2 rounded ${
              currentStep === 0 ?
                "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          {currentStep < questions.length - 1 ?
            <button
              className="w-[6em] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleNext}
            >
              Next
            </button>
          : <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={submitData}
            >
              Submit
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
