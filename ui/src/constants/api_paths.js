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
      summary: '/api/submissions/summary',
      progress: '/api/weekly_progress',
    },
    set: {
      one: '/api/submissions/insert'
    },
    update: {
      one: '/api/submissions/update'
    }
  },
}