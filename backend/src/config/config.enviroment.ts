
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    HOST: process.env.HOST,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});