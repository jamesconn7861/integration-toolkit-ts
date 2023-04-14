interface AppSettings {
  user: string;
  theme: string;
  showCellCount: boolean;
  highlightDuplicates: {
    activeColumn: number;
  };
}

export type { AppSettings };
