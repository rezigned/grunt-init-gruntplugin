###
{%= name %}
{%= homepage %}

Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
###

'use strict'

module.exports = (grunt)->

  # Please see the Grunt documentation for more information regarding task
  # creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('{%= short_name %}', '{%= description %}', ()->
    # Merge task-specific and/or target-specific options with these defaults.
    options = @options(
      punctuation: '.',
      separator: ', '
    )

    # Iterate over all specified file groups.
    @files.forEach((f)->

      # Concat specified files.
      src = f.src.filter((filepath)->
        # Warn on and remove invalid source files (if nonull was set).
        if !grunt.file.exists(filepath)
          grunt.log.warn('Source file "' + filepath + '" not found.')
          return false
        else
          return true

      ).map((filepath)->
        # Read file source.
        return grunt.file.read(filepath)
      ).join(grunt.util.normalizelf(options.separator))

      # Handle options.
      src += options.punctuation

      # Write the destination file.
      grunt.file.write f.dest, src

      # Print a success message.
      grunt.log.writeln 'File "' + f.dest + '" created.'
    )
  )