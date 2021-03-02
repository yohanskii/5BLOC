// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./HomeTransaction.sol";

contract Factory {
  address payable owner;
  HomeTransaction[] contracts;

  constructor() public {
        //le mec qui deploie est proprietaire du smart contract
        owner = msg.sender;
  }
  
  function create(
        string memory _address,
        string memory _picture,
        string memory _city,
        uint _realtorFee,
        uint _price
        ) public returns(HomeTransaction homeTransaction)  {
          
    homeTransaction = new HomeTransaction(
      _address,
      _picture,
      _city,
      _realtorFee,
      _price,
      msg.sender,
      owner,
      contracts.length+1
      );
    contracts.push(homeTransaction);
  }

  function getInstance(uint index) public view returns (HomeTransaction instance) {
    require(index < contracts.length, "index out of range");

    instance = contracts[index];
  }

  function getInstances() public view returns (HomeTransaction[] memory instances) {
    instances = contracts;
  }

  function getInstanceCount() public view returns (uint count) {
    count = contracts.length;
  }


  function kill() public {
    require(msg.sender == owner);
    selfdestruct(owner);
  }
}
