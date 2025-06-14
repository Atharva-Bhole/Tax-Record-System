// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaxSystem{
    address public treasury;
    constructor(){
        treasury = msg.sender;
    }

    struct TaxPayer{
        string name;
        string pan;
        bool isRegistered;
        uint totalTaxPaid;
        uint[] paymentIds;
    }

    struct Payment{
        uint amount;
        uint timestamp;
        address taxpayer;
    }

    struct Allocation{
        string department;
        string project;
        uint amount;
        uint paymentId;
    }

    mapping(address => TaxPayer) private taxpayers;
    Payment[] public payments;
    Allocation[] public allocations;

    modifier onlyTreasury(){
        require(msg.sender == treasury, "Only treasury can call this function");
        _;
    }

    modifier onlyRegistered(){
        require(taxpayers[msg.sender].isRegistered, "You must be a registered taxpayer");
        _;
    }


    event Registered(address taxpayer, string name, string pan);
    event TaxPaid(address taxpayer, uint amount, uint paymentId);
    event FundsAllocated(string department, string project, uint amount, uint paymentId);

    function register(string memory _name, string memory _pan) external{
        require(!taxpayers[msg.sender].isRegistered, "You are already registered");
        taxpayers[msg.sender] = TaxPayer({
            name: _name,
            pan: _pan,
            isRegistered: true,
            totalTaxPaid: 0,
            paymentIds: new uint[](0)
        });
        emit Registered(msg.sender, _name, _pan);
    }

    function payTax(uint _amount) external payable onlyRegistered{
        require(msg.value > 0, "Payment must be greater than zero");

        Payment memory payment = Payment({
            amount: _amount,
            timestamp: block.timestamp,
            taxpayer: msg.sender
        });

        payments.push(payment);
        uint paymentId = payments.length - 1;

        taxpayers[msg.sender].totalTaxPaid += _amount;
        taxpayers[msg.sender].paymentIds.push(paymentId);

        emit TaxPaid(msg.sender, _amount, paymentId);
    }

    function allocateFunds(
        uint paymentId,
        string memory _department,
        string memory _project,
        uint _amount
    ) external onlyTreasury {
        require(paymentId < payments.length, "Invalid payment ID.");
        require(_amount <= payments[paymentId].amount, "Allocation exceeds payment.");

        Allocation memory alloc = Allocation({
            department: _department,
            project: _project,
            amount: _amount,
            paymentId: paymentId
        });

        allocations.push(alloc);
        emit FundsAllocated(_department, _project, _amount, paymentId);
    }

    function getPaymentCount() external view returns (uint) {
        return payments.length;
    }

    function getAllocationCount() external view returns (uint) {
        return allocations.length;
    }

    function getTaxPayer(address user) external view returns (
        string memory name,
        string memory pan,
        bool isRegistered,
        uint totalTaxPaid,
        uint[] memory paymentIds
    ) {
        TaxPayer storage tp = taxpayers[user];
        return (tp.name, tp.pan, tp.isRegistered, tp.totalTaxPaid, tp.paymentIds);
    }

    function getUserAllocations(address user) external view returns (Allocation[] memory) {
        uint count = 0;

        // First count how many allocations belong to the user
        for (uint i = 0; i < allocations.length; i++) {
            if (payments[allocations[i].paymentId].taxpayer == user) {
                count++;
            }
        }

        Allocation[] memory result = new Allocation[](count);
        uint j = 0;

        for (uint i = 0; i < allocations.length; i++) {
            if (payments[allocations[i].paymentId].taxpayer == user) {
                result[j] = allocations[i];
                j++;
            }
        }

        return result;
    }

    function withdraw(address payable to, uint amount) external onlyTreasury {
        require(amount <= address(this).balance, "Insufficient contract balance");
        to.transfer(amount);
    }

    // Fallback to prevent direct ETH send
    receive() external payable {
        revert("Please use payTax()");
    }
}