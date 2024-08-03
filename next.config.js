module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/u/**',
        },
        {
            protocol: 'https',
            hostname: 'source.boringavatars.com',
            port: '',
            pathname: '/marble/**',
        },
        {
          protocol: 'https',
          hostname: 'github.githubassets.com',
          port: '',
          pathname: '/favicons/**',
        },
      ],
    },
  }