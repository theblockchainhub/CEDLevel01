pragma solidity ^0.4.18;

contract Escrow {
  address buyer;
  address seller;
  address arbiter;
  uint amount;

  function Escrow(address _seller, address _arbiter, uint _amount) public {
    // In this simple example, the person sending money is the buyer and sets up the initial contract
    buyer = msg.sender;
    seller = _seller;
    arbiter = _arbiter;
    amount = _amount;
  }

  function payoutSeller() public returns (bool) {
      require(msg.sender == buyer || msg.sender == arbiter);
      // new function transfer instead of send used here to transfer to the seller
      seller.transfer(this.balance);
      return true;
  }

  function payoutSeller2() public returns (bool) {
      if (msg.sender != buyer || msg.sender != arbiter) {
          revert();
      } else {
           seller.transfer(this.balance);
           return true;
      }
  }

 function refundBuyer() public returns (bool) {
     require(msg.sender == seller || msg.sender == arbiter);
      // new function transfer instead of send used here to transfer to the seller
      buyer.transfer(this.balance);
      return true;
 }
    // if a function is going to be able to accept ether, is has to be payable
    function fund() payable public returns (bool) {
        require(msg.value == amount && msg.sender == buyer);
        return true;
    }
}
 