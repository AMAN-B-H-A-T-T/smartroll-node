export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'subject-empty': [0, 'always'],
    'type-empty': [0, 'always'],
    'custom-rule': [2, 'never'],
  },
  plugins: [
    {
      rules: {
        'custom-rule': ({ header }) => {
          const allowedTypes = [
            'feat:',
            'fix:',
            'build:',
            'chore:',
            'docs:',
            'refactor:',
          ]
          const splittedHeader = header.split(' ')
          const regexPattern = /\[CTMAR-(\d+)\]/

          const regexMatch = splittedHeader[0].trim().match(regexPattern)
          if (!regexMatch) {
            return [
              false,
              'Please add proper jira ticket number [CTMAR-<number>]',
            ]
          } else if (!allowedTypes.includes(`${splittedHeader[1].trim()}`)) {
            return [false, `Type should one of the ${allowedTypes.join(',')}`]
          } else {
            return [true, 'its done']
          }
        },
      },
    },
  ],
}
