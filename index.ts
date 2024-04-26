#! usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// initialize user balance and pin code
let myBalance = 5000;
let myPin = 1234;

// print welcome message
console.log(chalk.blue("\n \tWelcome to Code with Waleed - ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your PIN Code: ")
    }
])
if (pinAnswer.pin === myPin){
    console.log(chalk.green("\nPin is Correct, Login Successfully!\n"));
    // console.log(`Current Account Balance is ${myBalance}`)

    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ])
    if(operationAnswer.operation === "Withdraw Amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a Withdrawl Method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [500, 1000, 2000, 3000, 4000, 5000]

                }
            ])
            if(fastCashAns.fastCash > myBalance){
                console.log(chalk.red("Insufficiant Balance!"));
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }

        else if(withdrawAns.withdrawMethod ==="Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to Withdraw:"
                }
            ])
            if (amountAns.amount > myBalance){
                console.log(chalk.red("Insufficiant Balance"))
            }
            else{
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`your Remaining Balance is ${myBalance}`)
            }
        }
        
    }
    else if(operationAnswer.operation === "Check Balance"){
        console.log(`Your Account Balance is ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect! Try Again."));
}

