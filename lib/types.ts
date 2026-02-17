export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface IIcon {
  collection: string;
  icon: string;
  size: IconSize;
}

export interface IProject {
  title: string;
  description: string;
  previewImage: string;
  tags: string[];
  repo: string;
  deploy?: string;
  wip?: boolean;
}

export interface IAchievement {
  _id: string;
  xp: number;
}

export interface ITierResult {
  tier: number;
  type?: string;
  fps?: number;
  gpu?: string;
  [key: string]: unknown;
}

