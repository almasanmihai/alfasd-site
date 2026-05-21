import portfolio from '../data/portfolio-media.json';

export type ProjectMedia = { cover: string; gallery: string[] };

export function resolveProjectMedia(data: {
  mediaFolder?: string;
  cover?: string;
  gallery?: string[];
}): ProjectMedia {
  if (data.mediaFolder?.trim()) {
    const key = data.mediaFolder.trim();
    const fromJson = (portfolio as any)[key];

    if (fromJson) {
      return fromJson;
    }
  }

  return {
    cover: data.cover?.trim() ?? '',
    gallery: data.gallery ?? []
  };
}