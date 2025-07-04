module.exports = {
  apps: [{
    name: "hero-arena",
    script: "./build/index.js",
    time: true,
    watch: false,
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "production",
      PORT: process.env.PORT || 2567
    }
  }]
}