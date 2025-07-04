// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "hero-arena",          // give it a stable name
      script: "./build/index.js",
      exec_mode: "fork",
      instances: 1,                // single process
      watch: false,                // don’t auto-reload on file changes

      /** Graceful rolling deploy */
      wait_ready: true,            // new proc waits for “ready”
      listen_timeout: 5000,        // PM2 kills it if not ready in 5 s
      kill_timeout: 5000,          // time to let the old proc die
      shutdown_with_message: true, // send “shutdown” msg for cleanup
    },
  ],
};
