import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'No Arcane Key detected in the environment' },
      { status: 500 }
    );
  }

  try {
    const { prompt, settings } = await req.json();

    const ai = new GoogleGenAI({ apiKey });

    const config: any = {
      imageConfig: {
        aspectRatio: settings.aspectRatio,
      },
    };

    if (settings.model === 'gemini-3-pro-image-preview') {
      config.imageConfig.imageSize = settings.imageSize;
    }

    const response = await ai.models.generateContent({
      model: settings.model,
      contents: [{ parts: [{ text: prompt }] }],
      config,
    });

    const part = response.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    );

    if (!part?.inlineData) {
      return NextResponse.json(
        { error: 'The ritual completed but no visual imagery was manifested.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: `data:image/png;base64,${part.inlineData.data}`,
    });
  } catch (err: any) {
    console.error('Gemini Ritual Error:', err);
    return NextResponse.json(
      { error: err.message || 'Unexpected ritual failure' },
      { status: 500 }
    );
  }
}
