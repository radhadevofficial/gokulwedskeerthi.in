module.exports = {
  apps: [
    {
      name: 'gokulwedskeerthi',
      script: 'npm',
      args: 'start',
      cwd: '/home/gokulwedskeerthi/htdocs/gokulwedskeerthi.in',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: 3010,
      },
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
}
