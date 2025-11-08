module.exports = {
  apps: [
    {
      name: "lab_manager_API",
      script: "./app.js",
      watch: true,
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
