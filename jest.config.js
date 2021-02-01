module.exports = {
  roots: ['.'],
  moduleDirectories: ['node_modules', 'components', 'lib', 'pages', 'test'],
  moduleNameMapper: {
    '@/test/(.*)': ['<rootDir>/test/$1'],
    '@/components/(.*)': ['<rootDir>/components/$1'],
    '@/pages/(.*)': ['<rootDir>/pages/$1'],
    '@/styles/(.*)': ['<rootDir>/styles/$1'],
    '@/images/(.*)': ['<rootDir>/public/images/$1'],
    '@/icons/(.*)': ['<rootDir>/public/icons/$1'],
    '@/api/(.*)': ['<rootDir>/lib/api/$1'],
    '@/context/(.*)': ['<rootDir>/lib/context/$1']
  }
};
