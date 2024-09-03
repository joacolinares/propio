// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract POI2 is Ownable {

    IERC20 USDT;
    struct infoWallet {
        address wallet;
        uint256 percentage;
    }
    uint256 public porcentaje;
    infoWallet[] public walletAdmins;
    constructor(address _usdtAddress) { //Ownable(msg.sender)
        USDT = IERC20(_usdtAddress);
    }

    struct PersonalData {
        string encryptedEmail;
        string encryptedName;
        string encryptedUsername;
        string encryptedPhoneNumber;
        string encryptedCountry;
        string encryptedGender;
        string encryptedDateOfBirth;
    }

    mapping(address => PersonalData) public personalDataMap;

    function setAdminWallets(address _wallet, uint256 _percentage) public onlyOwner {
        require((porcentaje  + _percentage) <= 1000, "1000 Percentage");
        walletAdmins.push(infoWallet(_wallet, _percentage));
        porcentaje += _percentage;
    }

    function storeInfo(string memory _encryptedEmail, string memory _encryptedName,string memory _encryptedUsername,
    string memory _encryptedPhoneNumber, string memory _encryptedCountry,
    string memory _encryptedGender, string memory _encryptedDateOfBirth) external 
    {
        personalDataMap[msg.sender].encryptedEmail = _encryptedEmail;
        personalDataMap[msg.sender].encryptedName = _encryptedName;
        personalDataMap[msg.sender].encryptedUsername = _encryptedUsername;
        personalDataMap[msg.sender].encryptedPhoneNumber = _encryptedPhoneNumber;
        personalDataMap[msg.sender].encryptedCountry = _encryptedCountry;
        personalDataMap[msg.sender].encryptedGender = _encryptedGender;
        personalDataMap[msg.sender].encryptedDateOfBirth = _encryptedDateOfBirth;

        for (uint256 i = 0; i < walletAdmins.length; i++) {
            uint256 amount = (100 * walletAdmins[i].percentage) / 1000;
            require(USDT.transferFrom(msg.sender, walletAdmins[i].wallet, amount));
        }

    }
   
}