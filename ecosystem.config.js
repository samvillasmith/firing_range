module.exports = {
  apps: [
    {
      name: "hero-arena",
      script: "./build/index.js",
      exec_mode: "fork",
      instances: 1,

      /** graceful rolling deploy */
      wait_ready: true,
      listen_timeout: 8000,
      kill_timeout: 8000,
      shutdown_with_message: true,
    },
  ],
};
