#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import {createSpinner} from 'nanospinner'
import * as fs from 'fs'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import createDirectoryProject from './createDirectoryProject.js'
const CURR_DIR = process.cwd()

const __dirname = dirname(fileURLToPath(import.meta.url))

const CHOICES = fs.readdirSync(`${__dirname}/templates`)

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms)) 

async function Welcome() {
    const projectNameRainbow = chalkAnimation.rainbow(
        'Welcome to Nestjs Project Generator \n'
    )

    await sleep()
    projectNameRainbow.stop()
}

await Welcome()

const QUESTIONS = [
    {
        name: 'project-choices',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name :',
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
            else 
                return 'Project name may only include letters, numbers, underscores and hashed.';
        }
    }
]

inquirer.prompt(QUESTIONS).then( answers => {
    const projectChoices = answers['project-choices'],
        projectName = answers['project-name'],
        templatePath = `${__dirname}/templates/${projectChoices}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    createDirectoryProject(templatePath,projectName)


    
})


// chalkAnimation.rainbow("hi Fuck")


// let projectName ;

// const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms)) 

// async function Welcome() {
//     const projectNameRainbow = chalkAnimation.rainbow(
//         'Welcome to Nestjs Project Generator \n'
//     )

//     await sleep()
//     projectNameRainbow.stop()


//     console.log(`
//         ${chalk.bgBlueBright("Whats Your Project Name?")}
//     `)
// }

// await Welcome()

// async function askProjectName() {
//     const answers = await inquirer.prompt({
//         name: 'Project Name',
//         type: 'input',
//         message: 'Whats Your Project Name?',
//         default() {
//             return 'Project'
//         }
//     })
//     projectName = answers['Project Name']
    
// }

// await askProjectName()