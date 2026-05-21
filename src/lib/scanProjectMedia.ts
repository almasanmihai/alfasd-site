export type ProjectMedia = {
  cover: string;
  gallery: string[];
};

export function resolveProjectMedia(data: {
  mediaFolder?: string;
  cover?: string;
  gallery?: string[];
}): ProjectMedia {
  return {
    cover: data.cover ?? '',
    gallery: data.gallery ?? []
  };
}