module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@repo/crossword-core': '../../packages/crossword-core',
          '@repo/ui': '../../packages/ui',
          // 필요에 따라 추가
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};