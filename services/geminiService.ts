import { GoogleGenAI } from "@google/genai";
import type { ResumeData } from "../types";

// IMPORTANT: Do NOT configure the API key here.
// It is expected to be set in the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Generates a professional summary based on the entire resume data.
 * @param resumeData The user's complete resume data.
 * @returns A professionally written summary string.
 */
export async function generateSummaryWithAI(resumeData: ResumeData): Promise<string> {
  const model = "gemini-2.5-flash";
  const prompt = `
    You are an expert career coach and resume writer.
    Based on the following resume data, write a compelling and concise professional summary (2-4 sentences).
    Highlight the key skills and years of experience to attract recruiters.

    Resume Data:
    - Experience: ${resumeData.experience.map(e => `${e.jobTitle} at ${e.company}`).join(', ')}
    - Key Skills: ${resumeData.skills.map(s => s.name).join(', ')}

    Generate the summary now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API call failed for summary generation:", error);
    throw new Error("Failed to communicate with the AI for summary generation.");
  }
}


/**
 * Rewrites a job description to be more impactful.
 * @param description The original job description text.
 * @returns An improved, professionally written job description.
 */
export async function improveDescriptionWithAI(description: string): Promise<string> {
  const model = "gemini-2.5-flash";
  const prompt = `
    You are an expert resume writer.
    Rewrite the following job description bullet points to be more impactful and professional.
    Focus on using strong action verbs, quantifying results where possible, and using professional language.
    Ensure each distinct point remains on a new line, starting with a '•' character.

    Original Description:
    ---
    ${description}
    ---

    Rewrite the description now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API call failed for description improvement:", error);
    throw new Error("Failed to communicate with the AI for description improvement.");
  }
}

/**
 * Provides suggestions for tailoring a resume to a specific job description.
 * @param resumeData The user's resume data.
 * @param jobDescription The job description to tailor for.
 * @returns A string containing suggestions.
 */
export async function getTailoringSuggestions(resumeData: ResumeData, jobDescription: string): Promise<string> {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are an expert resume reviewer and career coach. Your task is to help a user tailor their resume for a specific job opening.
      Analyze the user's resume data and the provided job description.
      Provide a list of actionable suggestions for improvement. Focus on:
      1. Rewriting the Professional Summary to align with the job's key requirements.
      2. Optimizing the bullet points in the Experience section to use keywords from the job description and highlight relevant achievements.

      Format your response clearly using Markdown-style headings (e.g., ### Summary Suggestions) and bullet points.

      Job Description:
      ---
      ${jobDescription}
      ---

      User's Resume:
      ---
      Summary: ${resumeData.personalInfo.summary}
      Experience:
      ${resumeData.experience.map(e => `Job: ${e.jobTitle}\nDescription:\n${e.description}`).join('\n\n')}
      ---
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini API call failed for tailoring suggestions:", error);
        throw new Error("Failed to get AI suggestions.");
    }
}

/**
 * Generates potential interview questions based on the resume.
 * @param resumeData The user's resume data.
 * @returns A string of formatted interview questions.
 */
export async function generateInterviewQuestions(resumeData: ResumeData): Promise<string> {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are a senior hiring manager preparing for an interview. Based on the following resume, generate a list of 10-15 potential interview questions.
      Include a mix of behavioral questions ("Tell me about a time when..."), technical questions relevant to the skills listed, and questions about their specific experiences and projects.

      Resume Data:
      ---
      Primary Role: ${resumeData.experience[0]?.jobTitle || 'Applicant'}
      Experience: ${resumeData.experience.map(e => `${e.jobTitle} at ${e.company}`).join(', ')}
      Skills: ${resumeData.skills.map(s => s.name).join(', ')}
      Projects: ${resumeData.portfolio.map(p => p.projectName).join(', ')}
      ---

      Generate the list of questions now, formatted as a numbered list.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini API call failed for interview questions:", error);
        throw new Error("Failed to generate interview questions.");
    }
}