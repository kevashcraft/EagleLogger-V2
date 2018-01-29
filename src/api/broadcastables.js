export default {
  Chat: {
    create: {data: 'netId'}
  },
  Nets: {
    create: {},
    stop: {data: 'id'},
    reopen: {data: 'id'}
  },
  NetTypes: {
    create: {},
    update: {}
  },
  Checkins: {
    create: {data: 'netId'},
    delete: {data: 'netId'}
  }
}
