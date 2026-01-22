
export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
export type ImageSize = "1K" | "2K" | "4K";

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  model: string;
}

export interface AppSettings {
  model: 'gemini-2.5-flash-image' | 'gemini-3-pro-image-preview';
  aspectRatio: AspectRatio;
  imageSize: ImageSize;
  useGoogleSearch: boolean;
}
