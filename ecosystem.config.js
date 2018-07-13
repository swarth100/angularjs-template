module.exports = {
  apps: [{
    name: '<app-name>',
    script: './server.js'
  }],
  deploy: {
    dev: {
      user: '<username>',
      host: '<host-ip>',
      key: '<path-to-ssh-key>',
      ref: 'origin/dev',
      repo: '<repo-url>',
      path: '<deployment-path>',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
