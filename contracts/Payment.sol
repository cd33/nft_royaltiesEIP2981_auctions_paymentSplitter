// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

/**
* @dev Contract to share all income between two addresses
* ["0x58165C46208501443eB8a0DbF40799534790176f", "0xe61764c28a6dD0742fE7230D5547902F6475e9BF"]
* [50, 50]
*/
contract Payment is PaymentSplitter {
    constructor (address[] memory _payees, uint256[] memory _shares) PaymentSplitter(_payees, _shares) payable {}
}