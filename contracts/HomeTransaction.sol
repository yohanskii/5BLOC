// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HomeTransaction {
    

    enum ContractState {
        ToSell,
        NotToSell
    }

    ContractState public contractState = ContractState.NotToSell;

    
    
    address payable public seller;
    address payable public buyer;
    address payable public owner;


    string public homeAddress;
    string public picture;
    string public city;
    uint public realtorFee;
    uint public price;
    uint public nbTransaction;
    uint public tokenId;

    uint public deposit;
    
    

    constructor(
        string memory _address,
        string memory _picture,
        string memory _city,
        uint _realtorFee,
        uint _price,
        address payable _seller,
        address payable _owner,
        uint _tokenId
    ) public {
        
        seller = _seller;
        homeAddress = _address;
        picture = _picture;
        city = _city;
        price = _price;
        realtorFee = _realtorFee;
        owner = _owner;
        nbTransaction = 0;
        tokenId = _tokenId;
    }

    function sellerToSell() public payable {
        require(seller == msg.sender);

        require(contractState == ContractState.NotToSell);

        contractState = ContractState.ToSell;
    }
    function sellerNotToSell() public payable {
        require(seller == msg.sender);

        require(contractState == ContractState.ToSell);

        contractState = ContractState.NotToSell;
    }

    function buyerFinalizeTransaction() public payable {


        require(contractState == ContractState.ToSell);
       
        // require(msg.value == _price); ça marche pas la putain de sa ....

        deposit = msg.value;
        
        uint fee = deposit * (realtorFee / 100);
        
        owner.transfer(fee);
        seller.transfer(deposit-fee);
        contractState = ContractState.NotToSell;  
        nbTransaction = nbTransaction + 1;
        seller = msg.sender; 
        

    }
}
