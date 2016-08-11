/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load package config
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        expr: true,
        sub: true,
        node: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true,
          requirejs: true,
        }
      },
      conf: [
        "Gruntfile.js",
        "bower.json",
        "package.json",
      ],
      pym: {
        options: {
          browser: true,
          predef: ['define']
        },
        src: "src/**/*.js",
      }
    },
    jsdoc: {
      api: {
        src: "<%= jshint.pym.src %>",
        options: {
          destination: "api"
        }
      }
    },
    replace: {
      loader: {
        options: {
          patterns: [{
            match: 'defaultPymUrl',
            replacement: '<%= pkg.defaultPymUrl %>'
          }]
        },
        files: [
          {expand: true, flatten: true, src: ['src/pym-loader.js'], dest: 'build/'}
        ]
      }
    },
    preprocess:  {
      options: {
        context : {
          // Comment if we want autoinit to be stripped out
          AUTOINIT: true
        }
      },
      pym : {
        src : 'src/pym.js',
        dest : 'build/pym.js'
      },
    },
    concat: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        pym: {
          src: ['build/pym.js'],
          dest: 'dist/pym-v<%= pkg.version %>.js'
        },
        loader: {
          src: ['build/pym-loader.js'],
          dest: 'dist/pym-loader-v<%= pkg.version %>.js'
        },

    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      pym: {
        files: {
          'dist/p.v<%= pkg.version[0] %>.m.js': ['dist/pym-v<%= pkg.version %>.js']
        }
      },
      loader: {
        files: {
          'dist/pl.v<%= pkg.version[0] %>.m.js': ['dist/pym-loader-v<%= pkg.version %>.js']
        }
      }
    },
    watch: {
      karma: {
        files: ["src/**/*.js", "test/**/*.js"],
        tasks: ["karma:unit:run"] //NOTE the :run flag
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-karma');

  // Default task.
  grunt.registerTask("default", ["jshint", "replace", "preprocess", "concat", "uglify", "jsdoc"]);
};
