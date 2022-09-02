const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", () => {
    let simpleStorageFactory, simpleStorage;
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should update when we call store", async () => {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should add person", async () => {
        const expectedName = "Person";
        const expectedNumber = "1";
        const transactionResponse = await simpleStorage.addPerson(expectedName, expectedNumber);
        await transactionResponse.wait(1);

        const { name, favoriteNumber } = await simpleStorage.people(0);
        assert.equal(name, expectedName);
        assert.equal(favoriteNumber, expectedNumber);
    });
});