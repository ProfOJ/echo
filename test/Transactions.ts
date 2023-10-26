import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("TransactionContract", function () {
    async function deployTransactionContractFixture() {
        const TransactionContract = await ethers.getContractFactory("TransactionContract");
        const transactionContract = await TransactionContract.deploy();
        return { transactionContract };
    }

    it("Should add a transaction", async function () {
        const { transactionContract } = await loadFixture(deployTransactionContractFixture);
        await transactionContract.add_transaction(1635200000, 123, 'USD', 100, 'credit', 10, 'some data', 1, 1);
        const transactions = await transactionContract.read_all_transactions();
        expect(transactions.length).to.equal(1);
        expect(transactions[0].user_id).to.equal(123);
    });

    it("Should fetch transactions by user_id", async function () {
        const { transactionContract } = await loadFixture(deployTransactionContractFixture);
        await transactionContract.add_transaction(1635200000, 123, 'USD', 100, 'credit', 10, 'some data', 1, 1);
        await transactionContract.add_transaction(1635300000, 123, 'USD', 200, 'debit', 20, 'some other data', 2, 1);

        const userTransactions = await transactionContract.fetch_transactions_by_user_id(123);
        expect(userTransactions.length).to.equal(2);
        expect(userTransactions[0].user_id).to.equal(123);
        expect(userTransactions[1].user_id).to.equal(123);
    });

    it("Should fetch all transactions", async function () {
        const { transactionContract } = await loadFixture(deployTransactionContractFixture);
        await transactionContract.add_transaction(1635200000, 123, 'USD', 100, 'credit', 10, 'some data', 1, 1);
        await transactionContract.add_transaction(1635300000, 456, 'EUR', 200, 'debit', 20, 'some other data', 2, 1);
        const allTransactions = await transactionContract.read_all_transactions();
        expect(allTransactions.length).to.equal(2);
    });
});
