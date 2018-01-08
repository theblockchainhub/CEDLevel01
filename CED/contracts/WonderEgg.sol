pragma solidity ^0.4.18;

import "./WonderToken.sol";

contract WonderEgg is WonderToken{
    
  struct WonderStruct {
    address addr;
    uint256 id;
    uint256 wprice;
    uint256 idName;
    uint256 Description;
  } 

    WonderStruct[] public WonderStructArray;
    WonderStruct public wonder;

    mapping (address => WonderStruct) wonders;
    address[] public wonderAddressArray;
    
    uint256 public wonderID =0 ;

    event wonderInfo(
        address addr,
        uint256 id,
        uint256 wprice,
        uint256 idName,
        uint256 Description
    ) ;
    
    function WonderEgg() WonderToken(21000000,"WonderCoin","WDR") payable public {
        owner = msg.sender;
    }
    
    function setWonderStruct(address _address, uint256 _wprice, uint256 _idName, uint256 _Description) public {

        wonder = wonders[_address];
        wonderID += 1;
        wonder.addr = _address;
        wonder.id = wonderID;
        wonder.wprice = _wprice;
        wonder.idName = _idName;
        wonder.Description = _Description;
        
        wonderAddressArray.push(_address) -1;
        
        WonderStructArray.push(wonder) -1;
        wonderInfo(_address,wonderID, _wprice, _idName, _Description) ;
        
    }

    function getWonderStructs() view public returns (address[]) {
            return (wonderAddressArray); 
    }

    function getWonderStructByID(uint256 i) view public returns (address, uint256 , uint256 , uint256 , uint256) {
      return (WonderStructArray[i].addr,WonderStructArray[i].id, WonderStructArray[i].wprice, WonderStructArray[i].idName, WonderStructArray[i].Description);
    }

    function getWonderStructByAddress(uint256 i, address ins) view public returns (address, uint256 , uint256 , uint256 , uint256) {

        if (ins == WonderStructArray[i].addr){
            return (WonderStructArray[i].addr,WonderStructArray[i].id, WonderStructArray[i].wprice, WonderStructArray[i].idName, WonderStructArray[i].Description);
        }
        
    }


    function getlastWonderStruct() view public returns (address, uint256 , uint256 , uint256 , uint256) {
            return (wonder.addr,wonder.id,wonder.wprice,wonder.idName,wonder.Description  );
    }

    function countWonderStructs() view public returns (uint256) {
        return wonderAddressArray.length;
    }
    
}