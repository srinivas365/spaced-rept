export default {
  signin: '/api/auth/signin',
  logout: '/api/logout',
  metadata: {
    get: {
      all: '/api/metadata',
    }
  },
  submission: {
    get: {
      all: '/api/submissions/all',
    },
    set: {
      one: '/api/submissions/insert'
    },
    update: {
      one: '/api/submissions/update'
    }
  },
}