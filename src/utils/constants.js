const config = {
  url: import.meta.env.VITE_FIREBASE_BASE_URL,
  capacity: 30,
};

console.log("API Key Check:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("URL Check:", import.meta.env.VITE_FIREBASE_BASE_URL);

export default config;
