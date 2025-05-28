/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { VertexAI } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({
  keyFile: process.env.GOOGLE_KEY_FILE, 
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

export async function getFunFactsAction(animal: string) {
  const project = process.env.GOOGLE_PROJECT_ID;

  const vertex = new VertexAI({
    project,
    location: 'us-central1'
  });

  const model = vertex.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  const prompt = `Give me 10 fun facts about ${animal || 'dog'}. 
Return as JSON array like ['fact 1', 'fact 2']. No markdown or backticks.`;

  const response = await model.generateContent(prompt);

  if (!response.response.candidates) {
    throw new Error('No response candidates from Gemini.');
  }

  const text = response.response.candidates[0].content.parts[0].text;
  const factArray = JSON.parse(text || '[]');
  return factArray;
}
