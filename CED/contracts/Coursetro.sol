pragma solidity ^0.4.18;

contract Coursetro {
    
   string fName;
   uint256 age;
   
   function setInstructor(string _fName, uint256 _age) public returns (string, uint256) {
       fName = _fName;
       age = _age;
       return (fName, age);
   }
   
   function getInstructor() public constant returns (string, uint256) {
       return (fName, age);
   }
    
}