export interface Tag {
  id?: string;
  name: string;
  color?: string; // hex color
}

export interface Note {
  id?: string;
  title: string;
  content: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
  tags?: Tag[];
  archived?: boolean;
  pinned?: boolean;
}
