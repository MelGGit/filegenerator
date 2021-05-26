const writeFile = require('./writeFile')
const inquirer = require('inquirer')

const template = {
  component: {
    fileType: '',
    fileString: name =>
      `import styled from 'styled-components/macro'
    
  export default function ${name} () {
      return <div>${name}</div>
  }
        `,
  },

  spec: {
    fileType: '.spec',
    fileString: name =>
      `import {render, screen} from '@testing-library/react'
import ${name} from './${name}'
  
describe('${name}', () => {
    it('renders', () => {
        render(<${name} />)
        expect(screen.getByText('${name}')).toBeInTheDocument()
    })
})
      `,
  },

  stories: {
    fileType: '.stories',
    fileString: name =>
      `
import ${name} from './${name}'
export default {
    title: '${name}',
    component: ${name}
}
  
const Template = args => <${name} {...args} />
  
export const Default = Template.bind({})
Default.args = {}
      `,
  },
}

const questions = [
  {
    type: 'input',
    name: 'names',
    message:
      'Which functions and files would you like to create? \n Please seperate by comma.',
  },
  {
    type: 'checkbox',
    name: 'files',
    message: 'Please select a fill type. Select all with a.',
    choices: [{ name: 'component' }, { name: 'spec' }, { name: 'stories' }],
    validate(answer) {
      if (answer.length < 1) {
        return 'You must choose at least one file type.'
      }
      return true
    },
  },
]

inquirer.prompt(questions).then(answers => {
  const namesArr = answers['names'].split(',').map(name => name.trim())
  const filesArr = answers['files']

  namesArr.forEach(name => {
    filesArr.forEach(file => {
      writeFile(
        name.replace(/^./, name[0].toUpperCase()), // ersten Buchstabe groß schreiben
        template[file].fileType,
        template[file].fileString(name.replace(/^./, name[0].toUpperCase()))
      )
    })
  })
})
