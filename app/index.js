'use strict'

const yeoman = require('yeoman-generator')
const kebab = require('lodash.kebabcase')

module.exports =
  class extends yeoman.Base {
    constructor (a, b) {
      super(a, b)
    }
    init () {
      return this.prompt([{
        name: 'projectName',
        message: 'What do you want to name your project?',
        default: this.appname.replace(/\s/g, '-'),
        filter: x => kebab(x)
      }, {
        name: 'githubUsername',
        message: 'What is your GitHub username?',
        store: true,
        validate: x => x.length > 0 ? true : 'You have to provide a username'
      }]).then(props => {
        const tpl = {
          projectName: props.projectName,
          githubUsername: props.githubUsername,
          name: this.user.git.name(),
          email: this.user.git.email()
        }

        const mv = (from, to) => {
          this.fs.move(this.destinationPath(from), this.destinationPath(to))
        }

        this.fs.copyTpl([
          `${this.templatePath()}/**`,
        ], this.destinationPath(), tpl)

        mv('editorconfig', '.editorconfig')
        mv('gitignore', '.gitignore')
        mv('_package.json', 'package.json')
      })
    }
    git () {
      this.spawnCommandSync('git', ['init'])
    }
    install () {
      this.installDependencies({ bower: false })
    }
}