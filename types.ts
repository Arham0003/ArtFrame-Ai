
export interface Size {
  code: string;
  label: string;
  width: number | null;
  height: number | null;
  description: string;
  popular: boolean;
}

export interface SizeCategory {
  category: string;
  icon: string;
  sizes: Size[];
}

export interface StyleModifier {
  id: string;
  label: string;
  description: string;
}

export interface GeneratedImage {
  id: string;
  base64: string;
  prompt: string;
  style: string;
  size: Size;
}
