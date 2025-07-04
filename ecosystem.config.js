module.exports = {
  apps: [
    {
      name: "hero-arena",
      script: "build/index.js",
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 2567
      }
    }
  ]
};
