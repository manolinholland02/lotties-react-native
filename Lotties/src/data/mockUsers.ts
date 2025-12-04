export type MockUser = {
  email: string;
  password: string;
};

export const mockUsers: MockUser[] = [
  { email: "user1@example.com", password: "password123" },
  { email: "user2@example.com", password: "letmein!" },
  { email: "demo@lotties.app", password: "demo1234" },
];
