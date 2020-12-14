describe 'CalculateDistance component', ->
  c = null
  origin = null
  destination = null
  distance = null
  loader = null
  before (done) ->
    loader = new noflo.ComponentLoader baseDir
    done()
  beforeEach (done) ->
    @timeout 4000
    loader.load 'math/CalculateDistance', (err, instance) ->
      return done err if err
      c = instance
      origin = noflo.internalSocket.createSocket()
      destination = noflo.internalSocket.createSocket()
      distance = noflo.internalSocket.createSocket()
      c.inPorts.origin.attach origin
      c.inPorts.destination.attach destination
      c.outPorts.distance.attach distance
      done()
    return

  describe 'on calculating', ->
    it 'should return correct distance', (done) ->
      distance.on 'data', (data) ->
        chai.expect(data.toPrecision(2)).to.equal '1.4'
        done()
      origin.send
        x: 0
        y: 0
      destination.send
        x: 1
        y: 1
