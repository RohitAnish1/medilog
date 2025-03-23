// // Import modules from the Google Generative AI SDK
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Use a relative path instead of alias to import your Firebase function
// import { saveFlashcard } from "./lib/firebase.ts"; // Adjust the path if needed

// // Directly input your Gemini API key here:
// const GEMINI_API_KEY = "AIzaSyCY02V5Nou91pZ9OyMF4dSq-rMJN0PMC2g";

// // Configure Gemini API using your API key
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// // Function to summarize text
// export async function summarizeText(text) {
//   console.log(">>> Starting text summarization process...");

//   try {
//     // Log the text to be summarized
//     console.log(">>> Text to summarize:", text);

//     // Retrieve the generative model (ensure the model name is correct)
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     console.log(">>> Model successfully loaded:", model);

//     // Generate content using the specified model
//     console.log(">>> Sending text to Generative AI model...");
//     const response = await model.generateContent({
//       contents: [
//         { role: "user", parts: [{ text: `Summarize in 5-7 words:\n\n${text}` }] },
//       ],
//     });

//     console.log(">>> API response received:", response);

//     // Safely extract the summary from the API response
//     const summary =
//       response?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "No summary available.";
//     console.log(">>> Extracted summary:", summary);

//     // Format the summary into a structured object (suitable for Firestore or other databases)
//     const formattedSummary = {
//       id: new Date().getTime().toString(), // Unique ID using timestamp
//       title: `Summary of ${text.split(" ")[0]}`, // Use the first word of the text for the title
//       content: summary,
//       category: "Summary",
//       date: new Date().toISOString(),
//     };
//     console.log(">>> Formatted summary object:", formattedSummary);

//     // Save the summary to Firebase using the `saveFlashcard` function
//     console.log(">>> Saving formatted summary to Firebase...");
//     await saveFlashcard(
//       formattedSummary.title,
//       formattedSummary.content,
//       formattedSummary.category
//     );
//     console.log(">>> Summary successfully saved to Firebase.");

//     // Return the summary object (useful for display in the UI or further processing)
//     return formattedSummary;
//   } catch (error) {
//     // Log the error details for debugging
//     console.error(">>> An error occurred during summarization:", error.message);
//     console.error(">>> Full error details:", error.stack);
//     throw error;
//   } finally {
//     console.log(">>> Summarization process complete.");
//   }
// }

// // Example text to summarize
// (async () => {
//   try {
//     const result = await summarizeText(
//       "MediLog is an innovative app for managing medical records and integrating flashcards for education."
//     );
//     console.log(">>> Summary result:", result);
//   } catch (err) {
//     console.error(">>> Failed to summarize text:", err.message);
//   }
// })();
// Import modules from the Google Generative AI SDK
// Import modules from the Google Generative AI SDK
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Use a relative path instead of alias to import your Firebase function
// import { saveFlashcard } from "./lib/firebase.ts"; // Adjust the path if needed

// // Directly input your Gemini API key here:
// const GEMINI_API_KEY = "AIzaSyAXBibfzvW9ZixCsIzlekXQ75QofPfwhO8";

// // Configure Gemini API using your API key
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// // Function to summarize text (always returns an object)
// export async function summarizeText(text) {
//   console.log(">>> Starting text summarization process...");

//   try {
//     // Log the text to be summarized
//     console.log(">>> Text to summarize:", text);

//     // Retrieve the generative model (ensure the model name is correct)
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     console.log(">>> Model successfully loaded:", model);

//     // Generate content using the specified model
//     console.log(">>> Sending text to Generative AI model...");
//     const response = await model.generateContent({
//       contents: [
//         { role: "user", parts: [{ text: `Provide a concise summary of the following:\n\n${text}` }] },
//       ],
//     });

//     console.log(">>> Full API response:", JSON.stringify(response, null, 2));

//     // Safely extract the summary from the API response
//     // const summary =
//     //   response?.candidates?.[0]?.content?.parts?.[0]?.text ||
//     //   "No summary available.";

//     // console.log(">>> Extracted summary:", summary);
//     // Safely extract the summary from the API response
// const summary = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

// if (!summary || summary.trim() === "") {
//   console.warn(">>> Warning: No summary generated by the AI model.");
//   return {
//     id: new Date().getTime().toString(),
//     title: "Summary Unavailable",
//     content: "The AI model could not generate a summary.",
//     category: "Summary",
//     date: new Date().toISOString(),
//   };
// }

// console.log(">>> Extracted summary:", summary);


//     // Always format the summary into a structured object
//     const formattedSummary = {
//       id: new Date().getTime().toString(), // Unique ID using timestamp
//       title: `Summary of ${text.split(" ")[0]}`, // Use the first word of the text for the title
//       content: summary, // This will be either the extracted summary or the fallback string
//       category: "Summary",
//       date: new Date().toISOString(),
//     };

//     console.log(">>> Formatted summary object:", formattedSummary);

//     // Save the summary to Firebase using the `saveFlashcard` function
//     console.log(">>> Saving formatted summary to Firebase...");
//     await saveFlashcard(
//       formattedSummary.title,
//       formattedSummary.content,
//       formattedSummary.category
//     );
//     console.log(">>> Summary successfully saved to Firebase.");

//     // Return the summary object (useful for display in the UI or further processing)
//     return formattedSummary;
//   } catch (error) {
//     // Log the error details for debugging
//     console.error(">>> An error occurred during summarization:", error.message);
//     console.error(">>> Full error details:", error.stack);
//     throw error;
//   } finally {
//     console.log(">>> Summarization process complete.");
//   }
// }

// // Example text to summarize
// (async () => {
//   try {
//     const result = await summarizeText(
//       "Students are the backbone of the future, constantly learning, growing, and adapting to new challenges. Whether in elementary school, high school, or university, they develop critical thinking skills, discipline, and resilience through their studies. Balancing academics, extracurricular activities, and social life can be demanding, but it also shapes them into well-rounded individuals. With the rise of digital learning tools and online education, students now have more resources than ever to enhance their knowledge and skills. Success in education requires dedication, curiosity, and a willingness to learn from both successes and failures.MediLog is an innovative app for managing medical records and integrating flashcards for education."
//     );
//     console.log(">>> Summary result:", result);
//   } catch (err) {
//     console.error(">>> Failed to summarize text:", err.message);
//   }
// })();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveFlashcard } from "./lib/firebase.ts"; // Adjust the path if needed

// Use environment variables for API key management
const GEMINI_API_KEY = "AIzaSyAXBibfzvW9ZixCsIzlekXQ75QofPfwhO8";

// Configure Gemini API using your API key
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Function to summarize text (always returns an object)
export async function summarizeText(text) {
  console.log(">>> Starting text summarization process...");

  try {
    // Log the text to be summarized
    console.log(">>> Text to summarize:", text);

    // Retrieve the generative model (ensure the model name is correct)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log(">>> Model successfully loaded:", model);

    // Generate content using the specified model
    console.log(">>> Sending text to Generative AI model...");
    const response = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: `Provide a concise summary of the following:\n\n${text}` }] },
      ],
    });

    console.log(">>> Full API response:", JSON.stringify(response, null, 2));

    // Safely extract the summary from the API response
    const summary = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary || summary.trim() === "") {
      console.warn(">>> Warning: No summary generated by the AI model.");
      return {
        id: new Date().getTime().toString(),
        title: "Summary Unavailable",
        content: "The AI model could not generate a summary.",
        category: "Summary",
        date: new Date().toISOString(),
      };
    }

    console.log(">>> Extracted summary:", summary);

    // Format the summary into a structured object
    const formattedSummary = {
      id: new Date().getTime().toString(), // Unique ID using timestamp
      title: `Summary of ${text.split(" ")[0]}`, // Use the first word of the text for the title
      content: summary, // This will be either the extracted summary or the fallback string
      category: "Summary",
      date: new Date().toISOString(),
    };

    console.log(">>> Formatted summary object:", formattedSummary);

    // Save the summary to Firebase using the `saveFlashcard` function
    console.log(">>> Saving formatted summary to Firebase...");
    await saveFlashcard(
      formattedSummary.title,
      formattedSummary.content,
      formattedSummary.category
    );
    console.log(">>> Summary successfully saved to Firebase.");

    // Return the summary object (useful for display in the UI or further processing)
    return formattedSummary;
  } catch (error) {
    // Log the error details for debugging
    console.error(">>> An error occurred during summarization:", error.message);
    console.error(">>> Full error details:", error.stack);
    throw error;
  } finally {
    console.log(">>> Summarization process complete.");
  }
}

// Example text to summarize
(async () => {
  try {
    const result = await summarizeText(
      "Students are the backbone of the future, constantly learning, growing, and adapting to new challenges. Whether in elementary school, high school, or university, they develop critical thinking skills, discipline, and resilience through their studies. Balancing academics, extracurricular activities, and social life can be demanding, but it also shapes them into well-rounded individuals. With the rise of digital learning tools and online education, students now have more resources than ever to enhance their knowledge and skills. Success in education requires dedication, curiosity, and a willingness to learn from both successes and failures.MediLog is an innovative app for managing medical records and integrating flashcards for education."
    );
    console.log(">>> Summary result:", result);
  } catch (err) {
    console.error(">>> Failed to summarize text:", err.message);
  }
})();
