'use server';
/**
 * @fileOverview A Genkit flow for overlaying an official Argentine national team kit onto a user's photo.
 *
 * - transformPhotoWithKit - A function that handles the AI kit transformation process.
 * - AiKitTransformationInput - The input type for the transformPhotoWithKit function.
 * - AiKitTransformationOutput - The return type for the transformPhotoWithKit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiKitTransformationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AiKitTransformationInput = z.infer<typeof AiKitTransformationInputSchema>;

const AiKitTransformationOutputSchema = z.object({
  transformedPhotoDataUri: z
    .string()
    .describe('The transformed photo with the Argentine national team kit overlaid, as a data URI.'),
});
export type AiKitTransformationOutput = z.infer<typeof AiKitTransformationOutputSchema>;

export async function transformPhotoWithKit(
  input: AiKitTransformationInput
): Promise<AiKitTransformationOutput> {
  return aiKitTransformationFlow(input);
}

const aiKitTransformationFlow = ai.defineFlow(
  {
    name: 'aiKitTransformationFlow',
    inputSchema: AiKitTransformationInputSchema,
    outputSchema: AiKitTransformationOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image', // Using the image-to-image model
      prompt: [
        {
          text: `Overlay an official Argentine national team football kit onto the person in this photo.
                 Ensure the facial identity and likeness of the person are perfectly preserved.
                 The kit should fit naturally and realistically on the body, considering folds and lighting.
                 Do not alter the face, hair, or background significantly. Make it look like the person is wearing the kit.`,
        },
        { media: { url: input.photoDataUri } }, // Pass the input photo as media
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Required for image generation with this model
      },
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate transformed image.');
    }

    return {
      transformedPhotoDataUri: media.url,
    };
  }
);
