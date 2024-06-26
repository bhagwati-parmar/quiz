#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

const apiLink :string ="https://opentdb.com/api.php?amount=6&category=9&difficulty=easy&type=multiple";

let fetchData = async (data:string) => {
    let fetchQuiz : any = await fetch(data);
    let response = await fetchQuiz.json();
    return response.results;
};

let data = await fetchData(apiLink);

let startQuiz = async() => {
    let score:number = 0 ;
    //for username
    let name = await inquirer.prompt({
        name:"fname",
        type:"input",
        message:"what is your Name?",
    });

    for(let i = 1 ; i <= 5 ; i++ ){
        let answer = [...data[i].incorrect_answers,data[i].correct_answer];

        let ans = await inquirer.prompt({
            name:"quiz",
            type:"list",
            message:data[i].question,
            choices:answer.map((val:any) => val),
        });

        if(ans.quiz== data[i].correct_answer){
            ++score;
            console.log(chalk.bold.italic.blue('Correct'));
         } 
         else{
        console.log(`correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`);
    }
    }

    console.log(`dear ${chalk.green.bold(name.fname)},your score is :${chalk.red.bold(score)}out of ${chalk.red.red("5")}`);
};

startQuiz();