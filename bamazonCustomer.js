var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // displayProducts();
    startShopping();
});

// displayProducts = function() {
//     connection.query('SELECT * FROM products', function(err, res) {
//         for (var i=0; i < res.length; i++) {
//             console.log("[" +res[i].item_id + "]", "[" + res[i].product_name + "]", "[" + res[i].department_name + "]", "[" + res[i].price + "]", "[" + res[i].stock_quantity + "]\n");
//         }
//         startShopping(res);
//     });
// }

// startShopping = function(res) {
//     inquirer
//      .prompt ([
//          {
//              type: "input",
//              name: "choice",
//              message: "Welcome! What would you like to get today? [Type 'q' to quit]"
//          }
//     ]).then(function(answer) {
//         var correct = false;
//         if (answer.choice == "q") {
//             connection.end();
//         }
//         for (var i=0; i<res.length; i++){
//             if (res[i].product_name == answer.choice) {
//                 correct = true;
//                 var product = answer.choice;
//                 var id = i;
//                 inquirer.prompt ([
//                     {
//                     type: "input",
//                     name: "quantity",
//                     message: "How many would you like to buy?",
//                     validate: function(value) {
//                         if (isNaN(value) == false) {
//                             return true;
//                         }
//                         return false;
//                     }
//                 }
//                 ]).then(function(answer) {
//                     if ((res[id].stock_quantity-answer.quantity)>0){
//                     connection.query("UPDATE products SET stock_quantity= '" + (res[id].stock_quantity - answer.quantity) + "'WHERE product_name= '" + product + "'", function() {
//                         console.log("You have bought " + answer.quantity + product);
//                         displayProducts();
//                     })
//                 } else {
//                     console.log("Item does not exsist. Please select an item on the list.");
//                     startShopping(res);
//                 }
//                 })
//             }
//             if (i == res.length && correct == false) {
//                 console.log("You typed an invalid selection. Try again.");
//                 startShopping(res);
//             }
//         }
//     })
// }

startShopping = function () {
    connection.query("SELECT * FROM products", function (err, res) {

        inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function () {
                var choiceArr = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArr.push(res[i].product_name);
                }
                return choiceArr;
            },
            message: "What would you like to buy? [Type q to quit]"
        }])
            .then(function (answer) {
                var correct = false;
                if (answer.choice === "q") {
                    connection.end();
                }
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        correct = true;
                        var product = answer.choice;
                        var id = i;
                        inquirer.prompt([{
                            name: "quantity",
                            type: "input",
                            message: "How many would you like to buy?",
                            validate: function (value) {
                                if (isNaN(value) === false) {
                                    return true;
                                }
                                return false;
                            }
                        }])
                            .then(function (answer) {
                                if ((res[id].stock_quantity - answer.quantity) > 0) {
                                    connection.query("UPDATE products SET stock_quantity= " + res[id].stock_quantity - answer.quantity + "WHERE product_name= " + product + "", function () {
                                        console.log("You have bought " + answer.quantity + " " + product);
                                        startShopping();
                                    });
                                } else {
                                    console.log("The item does not exist. Please select and an item on the list.");
                                    startShopping();
                                }
                            })
                    }
                    if (i == res.length && correct == false) {
                        console.log("You typed an invalid selection. Try again.");
                        startShopping();
                    }
                }

            })
    })
}
