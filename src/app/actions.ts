'use server';

import { VertexAI } from '@google-cloud/vertexai';

export async function getFunFactsAction(animal: string) {
  const vertex = new VertexAI({
    project: process.env.NEXT_GOOGLE_PROJECT_ID,
    location: 'us-central1',
  });
  console.log('Using credentials from:', process.env.NEXT_GOOGLE_KEY_FILE);


  const model = vertex.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  const prompt = `Give me 10 fun facts about ${animal || 'dog'}. 
Return JSON array like ['fact 1', 'fact 2']. No markdown or backticks.`;

  const response = await model.generateContent(prompt);

  if (!response.response.candidates) {
    throw new Error('No response candidates from Gemini.');
  }

  const text = response.response.candidates[0].content.parts[0].text;
  const factArray = JSON.parse(text || '[]');
  return factArray;
}
