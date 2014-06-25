jsfuse = require('../index')
expect = require('chai').expect

describe 'jsfuse', ->
  it 'simple', ->
    eval jsfuse('fixtures/simple/index.js')
    expect(global._output).eql 'ok'

  it 'simple, bare', ->
    eval jsfuse('fixtures/simple/index.js', bare: true)
    expect(global._output).eql 'ok'

  it 'wrapped in a wrapper', ->
    js = jsfuse('fixtures/simple/index.js')
    expect(js).match /^\(function\(\)\{/
    expect(js).match /\}\(\)\)$/

  it 'bare: true', ->
    js = jsfuse('fixtures/simple/index.js', bare: true)
    expect(js).not.match /^\(function\(\)\{/
    expect(js).not.match /\}\(\)\)$/

  it 'in directories', ->
    eval jsfuse('fixtures/in_directories/index.js')
    expect(global._output).eql 'ok'

  it 'in directories, bare', ->
    eval jsfuse('fixtures/in_directories/index.js', bare: true)
    expect(global._output).eql 'ok'

  it 'in directories 2', ->
    eval jsfuse('fixtures/in_directories_2/index.js')
    expect(global._output).eql 'ok'

  it 'in directories 2, bare', ->
    eval jsfuse('fixtures/in_directories_2/index.js', bare: true)
    expect(global._output).eql 'ok'


