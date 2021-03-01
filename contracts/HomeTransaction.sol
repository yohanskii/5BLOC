// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HomeTransaction {
    

    enum ContractState {
        ToSell,
        NotToSell
    }

    ContractState public contractState = ContractState.NotToSell;

    
    // Roles acting on contract
    address payable public seller;
    address payable public buyer;
    address payable public owner;

    // Contract details
    string public homeAddress;
    string public picture;
    string public city;
    uint public realtorFee;
    uint public price;
    uint public nbTransaction;

    uint public deposit;
    
    

    constructor(
        string memory _address,
        string memory _picture,
        string memory _city,
        uint _realtorFee,
        uint _price,
        address payable _seller,
        address payable _owner
    ) public {
        
        seller = _seller;
        homeAddress = _address;
        picture = _picture;
        city = _city;
        price = _price;
        realtorFee = _realtorFee;
        owner = _owner;
        nbTransaction = 0;
    }

    function sellerToSell() public payable {
        require(seller == msg.sender, "Only seller can sign contract");

        require(contractState == ContractState.NotToSell, "Wrong contract state");

        contractState = ContractState.ToSell;
    }
    function sellerNotToSell() public payable {
        require(seller == msg.sender, "Only seller can sign contract");

        require(contractState == ContractState.ToSell, "Wrong contract state");

        contractState = ContractState.NotToSell;
    }

    function setCity(string memory _city) public payable {
        require(seller == msg.sender, "Only seller can sign contract");
        this.city = _city;
    }

    function buyerFinalizeTransaction() public payable {
        // require(buyer == msg.sender, "Only buyer can finalize transaction");

        require(contractState == ContractState.ToSell, "Wrong contract state");

        require(msg.value == price, "Pay the exact price");

        // deposit = msg.value;
        
        // uint fee = deposit * (realtorFee / 100);
        
        // owner.transfer(fee);
      
        seller.transfer(msg.value);
        contractState = ContractState.NotToSell;  
        seller = msg.sender; 
        nbTransaction++;

    }
}
