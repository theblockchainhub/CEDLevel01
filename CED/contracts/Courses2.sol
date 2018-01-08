pragma solidity ^0.4.18;

contract Owned {
   address owner;
    
   function Owned() public {
       owner =msg.sender;
   }
    
   modifier onlyOwner {
       require(owner == msg.sender);
       _;
   }
}

contract Courses is Owned{
    
  struct Instructor {
    uint age;
    bytes16 fName;
    bytes16 lName;
  } 

    mapping (address => Instructor) instructors;
    address[] public instructorAccts;

    event instructorInfo(
        uint age,
        bytes16 fName,
        bytes16 lName
    ) ;
    
    function setInstructor(address _address, uint _age, bytes16 _fName, bytes16 _lName) onlyOwner public {
        var instructor = instructors[_address];

        instructor.age = _age;
        instructor.fName = _fName;
        instructor.lName = _lName;
        
        instructorAccts.push(_address) -1;
        
        instructorInfo(_age, _fName, _lName) ;
        
    }

    function getInstructors() view public returns (address[]) {
        return instructorAccts;
    }

    function getInstructor(address ins) view public returns (uint, bytes16, bytes16) {
        return (instructors[ins].age, instructors[ins].fName, instructors[ins].lName);
    }

    function countInstructors() view public returns (uint) {
        return instructorAccts.length;
    }
    
}