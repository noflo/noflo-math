module.exports = ->
  # Project configuration
  @initConfig
    pkg: @file.readJSON 'package.json'

    # CoffeeScript compilation
    coffee:
      spec:
        options:
          bare: true
        expand: true
        cwd: 'spec'
        src: ['**.coffee']
        dest: 'spec'
        ext: '.js'

    # Browser build of NoFlo
    noflo_browser:
      build:
        files:
          'browser/noflo-math.js': ['package.json']

    # JavaScript minification for the browser
    uglify:
      options:
        report: 'min'
      noflo:
        files:
          './browser/noflo-math.min.js': ['./browser/noflo-math.js']

    # Automated recompilation and testing when developing
    watch:
      files: ['spec/*.coffee', 'components/*.coffee']
      tasks: ['test']

    # BDD tests on Node.js
    mochaTest:
      nodejs:
        src: ['spec/*.coffee']
        options:
          reporter: 'spec'
          require: 'coffee-script/register'
          grep: process.env.TESTS

    # Generate runner.html
    noflo_browser_mocha:
      all:
        options:
          scripts: ["../browser/<%=pkg.name%>.js"]
        files:
          'spec/runner.html': ['spec/*.js']

    # BDD tests on browser
    mocha_phantomjs:
      options:
        output: 'spec/result.xml'
        reporter: 'spec'
        failWithOutput: true
      all: ['spec/runner.html']

    # Coding standards
    coffeelint:
      components: ['components/*.coffee']

  # Grunt plugins used for building
  @loadNpmTasks 'grunt-noflo-browser'
  @loadNpmTasks 'grunt-contrib-coffee'
  @loadNpmTasks 'grunt-contrib-uglify'

  # Grunt plugins used for testing
  @loadNpmTasks 'grunt-contrib-watch'
  @loadNpmTasks 'grunt-mocha-test'
  @loadNpmTasks 'grunt-mocha-phantomjs'
  @loadNpmTasks 'grunt-coffeelint'

  # Our local tasks
  @registerTask 'build', 'Build NoFlo for the chosen target platform', (target = 'all') =>
    if target is 'all' or target is 'browser'
      @task.run 'noflo_browser'
      @task.run 'uglify'

  @registerTask 'test', 'Build NoFlo and run automated tests', (target = 'all') =>
    @task.run 'coffeelint'
    if target is 'all' or target is 'nodejs'
      @task.run 'mochaTest'
    if target is 'all' or target is 'browser'
      @task.run 'noflo_browser'
      @task.run 'coffee'
      @task.run 'noflo_browser_mocha'
      @task.run 'mocha_phantomjs'

  @registerTask 'default', ['test']
