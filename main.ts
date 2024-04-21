#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import Choice from "inquirer/lib/objects/choice.js";

let todolist:string [] = [];
let condition:boolean = true

console.log( chalk.magentaBright.bold ("\n\t  <<==  Welcome to RIZA_SHAKEEL todo list  ==>> \n"));

let main = async () => {
    while (condition) {
        let option = await inquirer.prompt(
            [
                {
                    name : "choice",
                    type : "list",
                    message : chalk.blueBright("Select an option you want to do:"),
                    choices : ["Add Task","Delete Task","Update Task","View TODO List","EXIT"],  
                }
            ]
        )
        if(option.choice === "Add Task"){
              await addtask()
        }
         else if (option.choice === "Delete Task"){
              await deletetask()
         }
         else if (option.choice === "Update Task"){
            await updatetask()
         }
        else if (option.choice === "View TODO List"){
               await viewtask()
        }
        else if (option.choice === "EXIT"){
            condition = false
        }
    }
};

//function to add new task

let addtask = async () => {
    let newtask = await inquirer.prompt(
        [
            {
                name : "task",
                type : "input",
                message : chalk.blueBright("Enter your new task:")           
            }
        ]
    )
    todolist.push(newtask.task);
    console.log(chalk.yellowBright(`\n\t ${newtask.task} Added task SUCCESSFULLY in TODO list `))  
};

//function to view todo list tasks

let viewtask = async () => {
    console.log(chalk.greenBright.italic("\n\t Your TODO LIst \n"))
    todolist.forEach((task, index) => {
        console.log(`${index + 1} : ${task}`)
    })
};

//fumction to delete a task from list

let deletetask = async () => {
    await viewtask()
    let taskindex = await inquirer.prompt(
        [
            {
                name : "index",
                type : "number",
                message : (chalk.blueBright("Enter the index number of the task you want to delete"))
            }
        ]
    )

    let deletetask = todolist.splice(taskindex.index -1, 1)
    console.log(chalk.yellowBright(`\n\t${deletetask} This task has been deleted SUCCESSFULLY from your TODO List\n`))
};

//function to update a task

let updatetask = async () => {
    await viewtask ()
    let update_task_index = await inquirer.prompt(
        [
            {
                name : "index",
                type : "number",
                message : (chalk.blueBright("Enter the index number of the task you want to UPDATE:"))

            },
            {
                name : "new_task",
                type : "input",
                message : (chalk.blueBright("Now the new task name:"))
            }
        ]
    );
       todolist [update_task_index.index -1]  = update_task_index.new_task
       console.log(chalk.yellowBright(`\n\t Task add index number ${update_task_index.index} Updated SUCCESSFULLY {for updated list check option : "View TODO List"}`))
};
main();



