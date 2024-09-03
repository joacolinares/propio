// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Members3.sol";
import "./Account.sol";

contract POI2 is Initializable, AccessControlUpgradeable, UUPSUpgradeable, OwnableUpgradeable {

    MembershipContract3 public membershipContract;
    Account public accountContract;

    bytes32 constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct infoWallet {
        address wallet;
        uint256 percentage;
    }

    struct PersonalData {
        string encryptedEmail;
        string encryptedName;
        string encryptedUsername;
        string encryptedPhoneNumber;
        string encryptedCountry;
        string encryptedGender;
        string encryptedDateOfBirth;
        string imageLink;
        string fbLink;
        string igLink;
        string youtubeLink;
        string tikTokLink;
        string wspLink;
        string bio;
    }


    mapping(address => PersonalData) public personalDataMap; //Informacion de la persona
    mapping(address => bool) public userRegister;//Verifica si esta registrado
    mapping(string => bool) public usedEmails; // Almacena emails usados
    mapping(string => bool) public usedNames; // Almacena nombres usados
    mapping(string => bool) public usedUsernames; // Almacena nombres de usuario usados
    mapping(string => bool) public usedPhoneNumbers; // Almacena números de teléfono usados


    function initialize(address _accountContract, address _memberContract) public initializer {
        __AccessControl_init();
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        _grantRole(ADMIN_ROLE, msg.sender);

        accountContract = Account(_accountContract);
        membershipContract = MembershipContract3(_memberContract);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}


    function setAccountContract(address _accountContract) public onlyRole(ADMIN_ROLE) {
        accountContract = Account(_accountContract);
    }

    function setMemberContract(address _memberContract) public onlyRole(ADMIN_ROLE) {
        membershipContract = MembershipContract3(_memberContract);
    }


    function storeInfo(string memory _encryptedEmail, string memory _encryptedName,string memory _encryptedUsername,
    string memory _encryptedPhoneNumber, string memory _encryptedCountry,
    string memory _encryptedGender, string memory _encryptedDateOfBirth) external 
    {
        require(!usedEmails[_encryptedEmail], "Email already used");
        require(!usedNames[_encryptedName], "Name already used");
        require(!usedUsernames[_encryptedUsername], "Username already used");
        require(!usedPhoneNumbers[_encryptedPhoneNumber], "Phone number already used");
   
            personalDataMap[msg.sender].encryptedEmail = _encryptedEmail; 
            personalDataMap[msg.sender].encryptedName = _encryptedName;
            personalDataMap[msg.sender].encryptedUsername = _encryptedUsername;
            personalDataMap[msg.sender].encryptedPhoneNumber = _encryptedPhoneNumber;
            personalDataMap[msg.sender].encryptedCountry = _encryptedCountry;
            personalDataMap[msg.sender].encryptedGender = _encryptedGender;
            personalDataMap[msg.sender].encryptedDateOfBirth = _encryptedDateOfBirth;

            usedEmails[_encryptedEmail] = true;
            usedNames[_encryptedName] = true;
            usedUsernames[_encryptedUsername] = true;
            usedPhoneNumbers[_encryptedPhoneNumber] = true;

            userRegister[msg.sender] = true;

            emit PersonalInfoStored(msg.sender);
        
    }


    function updateInfo(
        string memory _encryptedEmail, 
        string memory _encryptedName,
        string memory _encryptedPhoneNumber, 
        string memory _encryptedCountry,
        string memory _encryptedGender, 
        string memory _encryptedDateOfBirth,
        string memory _encryptedFbLink,
        string memory _encryptedIgLink,
        string memory _encryptedYoutubeLink,
        string memory _encryptedTikTokLink,
        string memory _encryptedWspLink,
        string memory _encryptedBio
    ) external {
        require(userRegister[msg.sender], "Debes estar registrado");

        // Verifica que los nuevos datos no estén usados, a menos que sean iguales a los actuales
        if (keccak256(bytes(_encryptedEmail)) != keccak256(bytes(personalDataMap[msg.sender].encryptedEmail))) {
            require(!usedEmails[_encryptedEmail], "Email already used");
            usedEmails[_encryptedEmail] = true;
            usedEmails[personalDataMap[msg.sender].encryptedEmail] = false;
        }
        
        if (keccak256(bytes(_encryptedName)) != keccak256(bytes(personalDataMap[msg.sender].encryptedName))) {
            require(!usedNames[_encryptedName], "Name already used");
            usedNames[_encryptedName] = true;
            usedNames[personalDataMap[msg.sender].encryptedName] = false;
        }

        if (keccak256(bytes(_encryptedPhoneNumber)) != keccak256(bytes(personalDataMap[msg.sender].encryptedPhoneNumber))) {
            require(!usedPhoneNumbers[_encryptedPhoneNumber], "Phone number already used");
            usedPhoneNumbers[_encryptedPhoneNumber] = true;
            usedPhoneNumbers[personalDataMap[msg.sender].encryptedPhoneNumber] = false;
        }

        // Actualiza los datos en el mapping
        personalDataMap[msg.sender].encryptedEmail = _encryptedEmail; 
        personalDataMap[msg.sender].encryptedName = _encryptedName;
        personalDataMap[msg.sender].encryptedPhoneNumber = _encryptedPhoneNumber;
        personalDataMap[msg.sender].encryptedCountry = _encryptedCountry;
        personalDataMap[msg.sender].encryptedGender = _encryptedGender;
        personalDataMap[msg.sender].encryptedDateOfBirth = _encryptedDateOfBirth;

        personalDataMap[msg.sender].fbLink = _encryptedFbLink; 
        personalDataMap[msg.sender].igLink = _encryptedIgLink;
        personalDataMap[msg.sender].youtubeLink = _encryptedYoutubeLink;
        personalDataMap[msg.sender].tikTokLink = _encryptedTikTokLink;
        personalDataMap[msg.sender].wspLink = _encryptedWspLink;
        personalDataMap[msg.sender].bio = _encryptedBio;

        emit PersonalInfoUpdated(msg.sender);
    }



    function changeWallet(address _newWallet) external {
        require(userRegister[msg.sender], "Debes estar registrado");
        require(!userRegister[_newWallet], "La nueva wallet ya esta registrada");
        
        accountContract.transferAllAccounts(msg.sender, _newWallet);
        
        // Mueve la información personal a la nueva wallet
        personalDataMap[_newWallet] = personalDataMap[msg.sender];
        
        // Borra la información de la wallet antigua
        delete personalDataMap[msg.sender];
        
        // Actualiza el registro del usuario, pone a la anterior wallet como sin registrada y la nueva como registrada
        userRegister[_newWallet] = true;
        userRegister[msg.sender] = false;

        emit WalletChanged(msg.sender, _newWallet);
    }

    function updateImageLink(string memory _imageLink) external {
        require(userRegister[msg.sender], "Debes estar registrado");
        personalDataMap[msg.sender].imageLink = _imageLink;

        emit ImageLinkUpdated(msg.sender, _imageLink);
    }


    event AccountContractSet(address indexed accountContract);
    event MemberContractSet(address indexed memberContract);
    event PersonalInfoStored(address indexed user);
    event PersonalInfoUpdated(address indexed user);
    event WalletChanged(address indexed oldWallet, address indexed newWallet);
    event ImageLinkUpdated(address indexed user, string imageLink);


}