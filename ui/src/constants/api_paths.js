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
      summary: '/api/submissions/summary'
    },
    set: {
      one: '/api/submissions/insert'
    },
    update: {
      one: '/api/submissions/update'
    }
  },
}