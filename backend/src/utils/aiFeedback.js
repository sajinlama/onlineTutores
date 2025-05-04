import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAIFeedback = async (progressData, subject) => {
  console.log("the select subject",subject)
  try {
    // Ensure progressData is an array
    const progress = Array.isArray(progressData) ? progressData : [progressData];
    
    // Identify weak chapters (those with less than 50% correct answers)
    const weakChapters = progress
      .filter(item => item.percentage < 50)
      .map(item => item.chapterName);
    
    // Get all chapter names
    const allChapters = progress.map(item => item.chapterName);
    
    // Create prompt for Gemini
    const promptData = {
      subject,
      chapterData: progress.map(item => ({
        name: item.chapterName || "Unknown Chapter",
        correctAnswers: item.correctAnswers || 0,
        wrongAnswers: item.wrongAnswers || 0,
        percentage: item.percentage || 0,
        level: item.level || "Unknown Level"
      })),
      weakChapters,
      allChapters
    };

    const prompt = `
      You are an educational AI assistant. Analyze this student performance data in ${subject} and provide feedback.
      
      Performance data:
      ${JSON.stringify(promptData.chapterData, null, 2)}
      
      Chapters with low performance (below 50%):
      ${JSON.stringify(weakChapters, null, 2)}
      
      All chapters attempted:
      ${JSON.stringify(allChapters, null, 2)}
      
      Provide response as JSON with:
      {
        "overallPerformance": "2-3 sentence assessment including which chapters the student is weak in",
        "chaptersToFocusOn": ["array", "of", "chapters", "to", "focus", "on"],
        "personalizedSuggestions": "numbered list of 3-5 suggestions that are tailored to the weak chapters"
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Could not parse AI response as JSON");
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]);
    
    // Ensure the response includes weak chapters if they exist
    if (weakChapters.length > 0 && !parsedResponse.overallPerformance.toLowerCase().includes("weak")) {
      parsedResponse.overallPerformance += ` You should focus on improving in ${weakChapters.join(", ")} as these are areas where you're facing difficulties.`;
    }
    
    return parsedResponse;
    
  } catch (error) {
    console.error("Error generating AI feedback:", error);
    
    // Get weak chapters even in fallback scenario
    const weakChapters = Array.isArray(progressData) 
      ? progressData
          .filter(item => (item.percentage || 0) < 50)
          .map(item => item.chapterName || "Unknown Chapter")
      : [];
    
    // Improved fallback feedback that mentions weak chapters
    return {
      overallPerformance: weakChapters.length > 0 
        ? `We're analyzing your performance. You need to focus on improving in ${weakChapters.join(", ")} as you showed difficulty in these areas.`
        : "We're analyzing your performance. Review your incorrect answers to improve your understanding.",
      chaptersToFocusOn: weakChapters.length > 0 ? weakChapters : 
        (progressData.chapterName ? [progressData.chapterName] : []),
      personalizedSuggestions: "1. Review concepts in your weak chapters\n2. Practice similar problems\n3. Ask for help on difficult concepts\n4. Use additional resources to strengthen your understanding"
    };
  }
};