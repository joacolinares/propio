// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract POI {
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
    }

}