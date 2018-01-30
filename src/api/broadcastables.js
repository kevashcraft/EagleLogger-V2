export default {
  Chat: {
    create: {data: 'netId'}
  },
  Nets: {
    create: {},
    delete: {},
    stop: {data: 'id'},
    reopen: {data: 'id'}
  },
  NetTypes: {
    create: {},
    delete: {},
    update: {}
  },
  Checkins: {
    create: {data: 'netId'},
    delete: {data: 'netId'}
  }
}
