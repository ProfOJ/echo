// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionContract {
    struct Transaction {
        uint timestamp;
        uint user_id;
        string currency;
        uint amount;
        string mode;
        uint source_habit_score;
        string others;
        uint product_id;
        uint product_sub_id;
    }

    Transaction[] public transactions;

    function add_transaction(uint _timestamp, uint _user_id, string memory _currency, uint _amount, string memory _mode, uint _source_habit_score, string memory _others, uint _product_id, uint _product_sub_id) public {
        Transaction memory newTransaction = Transaction(_timestamp, _user_id, _currency, _amount, _mode, _source_habit_score, _others, _product_id, _product_sub_id);
        transactions.push(newTransaction);
    }

    function read_all_transactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    function fetch_transactions_by_user_id(uint _user_id) public view returns (Transaction[] memory) {
        uint count = 0;
        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].user_id == _user_id) {
                count++;
            }
        }
        
        Transaction[] memory userTransactions = new Transaction[](count);
        uint index = 0;
        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].user_id == _user_id) {
                userTransactions[index] = transactions[i];
                index++;
            }
        }
        return userTransactions;
    }
}
