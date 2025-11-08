module.exports = {
  apps: [
    {
      name: "lab_manager_API",
      script: "./src/app.js",
      watch: true,
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
