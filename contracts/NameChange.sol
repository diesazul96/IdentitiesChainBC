pragma solidity ^0.5.0;

contract NameChange{
	string name;
	constructor(string memory initialname) public {
		name = initialname;
	}
	function showName() public view returns(string memory ) {
		return name;
	}	
	function changename(string memory  newname)public { 
		name = newname;
    }
}
