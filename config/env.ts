export const env = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  socketBaseUrl: process.env.NEXT_PUBLIC_SOCKET_BASE_URL,
  reduxPersistKey: process.env.NEXT_PUBLIC_REDUX_PERSIST_KEY,
  nodeEnv: process.env.NODE_ENV,
} as const;