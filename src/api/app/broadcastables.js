export default {
  Nets: {
    create: {},
    stop: {data: 'id'},
    reopen: {data: 'id'}
  },
  NetTypes: {
    create: {}
  },
  Checkins: {
    create: {data: 'netId'},
    delete: {data: 'netId'}
  }
}
