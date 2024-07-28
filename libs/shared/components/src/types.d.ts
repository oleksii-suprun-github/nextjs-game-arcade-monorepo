type BaseEntry = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  userId?: string;
  content?: string;
};

type UserEntry = BaseEntry & {
  clerkId: string;
  email: string;
};

type JournalEntry = BaseEntry & {
  entryId: string;
};

type UserLocale = 'en' | 'de';
