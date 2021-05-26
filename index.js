const writeFile = require('./writeFile')
const readline = require('readline')
const inquirer = require('inquirer')

const questions = [
  {
    type: 'input',
    name: 'file',
    message:
      'Which functions and files would you like to create? \n Please seperate by comma.',
  },
]

inquirer.prompt(questions).then(answers => {
  answers['file']
    .split(',')
    .map(file => file.trim())
    .forEach(file => writeFile(file))
})
