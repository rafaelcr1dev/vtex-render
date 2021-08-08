module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (message) => {
      const regex = /^Release\ [0-9]*\.[0-9]*\.[0-9]*\n*?$/g

      return regex.test(message)
    }
  ]
};
