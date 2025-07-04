module.exports = {
  apps: [
    {
      name: "hero-arena",
      script: "./build/index.js",
      exec_mode: "fork",
      instances: 1,

      // 🔽   key lines
      listen_timeout: 1000,   // wait 1 s for old proc to free the port
      kill_timeout: 1000,
      shutdown_with_message: true,
    },
  ],
};
