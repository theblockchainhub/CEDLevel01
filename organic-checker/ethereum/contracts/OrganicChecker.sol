pragma solidity ^0.4.22;

contract OrganicChecker {
    address public owner = msg.sender;

    struct Supplier {
        string name;
        string licenseNumber;
        string email;
        string phone;
        bool isCertified;
        bool isLabVerified;
    }

    mapping (address => Supplier) suppliers;
    address[] public supplierList;

    // Create a supplier. The booleans isCertified and isLabVerified will be set
    // to false by default when a new supplier is created 
    function setSupplier(address _address, string _name, string _licenseNumber, string _email, string _phone) public {
        suppliers[_address].name = _name;
        suppliers[_address].licenseNumber = _licenseNumber;
        suppliers[_address].email = _email;
        suppliers[_address].phone = _phone;

        supplierList.push(_address) - 1;
    }

    // Returns an array of all supplier's addresses
    function getAllSuppliers() view public returns(address[]) {
        return supplierList;
    }

    // Returns a supplier's information when its address is given as an argument
    function getSupplierByAddress(address _address) view public returns (string, string, string, string, bool, bool) {
        return (suppliers[_address].name, suppliers[_address].licenseNumber, suppliers[_address].email, suppliers[_address].phone, suppliers[_address].isCertified, suppliers[_address].isLabVerified);
    }

    // Returns the number of suppliers in the supplierList array
    function countSuppliers() view public returns (uint) {
        return supplierList.length;
    }

    // This function is used by the admin. Only the creator of the contract is permitted to invoke this function
    // Will update the booleans of the supplier whose address is supplied as the argument
    function updateSupplier(address _address, bool _isCertified, bool _isLabVerified) public {
        require(msg.sender == owner);
        suppliers[_address].isCertified = _isCertified;
        suppliers[_address].isLabVerified = _isLabVerified;
    }
}