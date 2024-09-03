// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Members3.sol";
import "./Account.sol";
import "./Poi2.sol";

contract StakingV3 is Initializable, AccessControlUpgradeable, UUPSUpgradeable, OwnableUpgradeable {
    IERC20 public usdt;
    MembershipContract3 public membershipContract;
    address public treasuryAddress;
    Account public accountContract;
    POI2 public poiContract;
    bytes32 constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 idAccount;
        address wallet;
    }

    mapping(address => Stake[]) public stakes;
    mapping(address => uint256) public totalStaked;
    mapping(uint256 => uint256) public userStakes;

    event Staked(uint256 indexed nftUse, uint256 amount, uint256 index);

    function initialize(IERC20 _usdt, address _treasuryAddress, address _memberContract,address _accountContract, address _poiAddress) public initializer { //Inicializa, da el rol de admiin, setea los contratos
        __AccessControl_init();
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        _grantRole(ADMIN_ROLE, msg.sender);
        usdt = IERC20(_usdt);
        treasuryAddress = _treasuryAddress;
        membershipContract = MembershipContract3(_memberContract);
        accountContract = Account(_accountContract);
        poiContract = POI2(_poiAddress);
    }
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}


    function setUsdtContract(address _usdt) public onlyRole(ADMIN_ROLE) {
        usdt = IERC20(_usdt);
    }

    function setTreasuryContract(address _treasury) public onlyRole(ADMIN_ROLE) {
        treasuryAddress = _treasury;
    }

    function setMembershipContract(address _memberContract) public onlyRole(ADMIN_ROLE) {
        membershipContract = MembershipContract3(_memberContract);
    }

    function setAccountContract(address _accountContract) public onlyRole(ADMIN_ROLE) {
        accountContract = Account(_accountContract);
    }

    function setPoiContract(address _poiAddress) public onlyRole(ADMIN_ROLE) {
        poiContract = POI2(_poiAddress);
    }

    function stake(        
        uint128 _amount,
        uint256 _nftUse,
        uint256 _index
        ) external {
        
        MembershipContract3.InfoOfMembershipsBuy memory info = membershipContract.getInfoOfMembership(_nftUse, _index);
        MembershipContract3.Membership memory membership = membershipContract.getMembership(info.memberId);

        uint256 totalStakedActualAddAmount = info.staked + _amount;
        require(_amount > 0, "Amount must be greater than 0");
        require(membershipContract.haveMembership(_nftUse), "Requiere una membresia");
        require(totalStakedActualAddAmount <= membership.maxInv, "El total stakeado + el total a stakear debe ser menor que el maximo stake de la persona"); //Checkea que la cantidad que desea stakear sea igual o menor que el maximo sumado de todas sus membresias
        require(_amount >= membership.minInv, "El total stakeado debe ser mayor al minimo"); //Checkea que la cantidad que desea stakear sea igual o menor que el maximo sumado de todas sus membresias
        require(block.timestamp <= info.expire, "Expiro tu membresia, compra una nueva"); //Checkea que la cantidad que desea stakear sea igual o menor que el maximo sumado de todas sus membresias
        require(poiContract.userRegister(accountContract.ownerOf(_nftUse)),"Debe estar registrado"); //Debe estar registrado
        require(accountContract.ownerOf(_nftUse) == msg.sender ,"Debe ser el dueno del NFT"); //Verifica dueño

        membershipContract.updateStake(_nftUse,_index,_amount);
        accountContract.updateStaked(_nftUse,_amount);
        userStakes[_nftUse] += _amount;
        TVL += _amount;

        if(membership.fee){

            //Reparto extra como membresia
            uint256 sponsors = membershipContract.leadershipSplitPartners(_nftUse);
            uint x = 0;
            uint256 finalAmount = (_amount * membership.amountFee)/1000;
            uint256  negativeAmount;
            // Dentro del bucle while en tu contrato StakingV3
            while (true) {
                if (x == 0) {
                    emit UpdateTotalDirect(sponsors, finalAmount);
                    emit UpdateDirectVol(sponsors, finalAmount, _nftUse);
                    membershipContract.updateDirects(sponsors);
                    accountContract.updateTotalDirect(sponsors, finalAmount); 
                    accountContract.updateDirectVol(sponsors, finalAmount, _nftUse); 
                } else {
                    emit UpdateTotalGlobal(sponsors, finalAmount);
                    emit UpdateGlobalVol(sponsors, finalAmount, x, _nftUse);
                    accountContract.updateTotalGlobal(sponsors, finalAmount); 
                    accountContract.updateGlobalVol(sponsors, finalAmount, x, _nftUse); 
                }
                if (sponsors == 0) {
                    (uint256 levelPercentage, , ) = membershipContract.levelRules(x);
                    uint256 percentage = (finalAmount * levelPercentage) / 10000;
                    negativeAmount += percentage;
                    rewards[sponsors] += percentage;
                    //require(USDT.transferFrom(_wallet, accountContract.ownerOf(sponsors), percentage), "USDT transfer failed"); NO SE TRANSIFERE SINO SE RETIRA
                    require(usdt.transferFrom(msg.sender, address(this), percentage), "USDT transfer failed");
                    emit UpdateProfit(sponsors, x, percentage);
                    accountContract.updateProfit(sponsors, x, percentage); 
                    break;
                }
                (uint256 minDirects, uint256 minRank, ) = membershipContract.levelRules(x);
                if (accountContract.getDirectVolCount(sponsors) >= minDirects || accountContract.getRank(sponsors) >= minRank) { // Verifica que cumpla con el mínimo de directos o rango
                    (uint256 percentage, , ) = membershipContract.levelRules(x);
                    percentage = (finalAmount * percentage) / 10000;
                    // Revisa si tiene membresía y si puede recibir ganancias
                    bool canReceiveEarnings = membershipContract.checkWallet(sponsors);
                    if (canReceiveEarnings) {
                        negativeAmount += percentage;
                        rewards[sponsors] += percentage;
                        //require(USDT.transferFrom(_wallet, accountContract.ownerOf(sponsors), percentage), "USDT transfer failed"); NO SE TRANSFIERE SINO SE RETIRA
                        require(usdt.transferFrom(msg.sender, address(this), percentage), "USDT transfer failed");
                        emit UpdateProfit(sponsors, x, percentage);
                        accountContract.updateProfit(sponsors, x, percentage);  
                    }
                } else {
                    uint y = x; 
                    uint256 sponsorsTemp = sponsors;
                    while (true) {
                        if (sponsorsTemp == 0) {
                            (uint256 levelPercentage, , ) = membershipContract.levelRules(y);
                            uint256 percentage = (finalAmount * levelPercentage) / 10000;
                            negativeAmount += percentage;
                            rewards[sponsorsTemp] += percentage;
                            //require(USDT.transferFrom(_wallet, accountContract.ownerOf(sponsorsTemp), percentage), "USDT transfer failed"); NO SE TRANSFIERE SINO SE RETIRA
                            require(usdt.transferFrom(msg.sender, address(this), percentage), "USDT transfer failed");
                            emit UpdateProfit(sponsorsTemp, x, percentage);
                            emit UpdateMissedProfit(sponsors, x, percentage);
                            emit UpdatePayedProfit(sponsorsTemp, x, percentage);
                            accountContract.updateProfit(sponsorsTemp, x, percentage);
                            accountContract.updateMissedProfit(sponsors, x, percentage); 
                            accountContract.updatePayedProfit(sponsorsTemp, x, percentage); 
                            break;
                        }
                        (uint256 minDirects, uint256 minRank, ) = membershipContract.levelRules(y);
                        if (accountContract.getDirectVolCount(sponsorsTemp) >= minDirects || accountContract.getRank(sponsorsTemp) >= minRank) {
                            (uint256 percentage, , ) = membershipContract.levelRules(y);
                            percentage = (finalAmount * percentage) / 10000;
                            bool canReceiveEarnings = membershipContract.checkWallet(sponsorsTemp);
                            if (canReceiveEarnings) {
                                negativeAmount += percentage;
                                rewards[sponsorsTemp] += percentage;
                                //require(USDT.transferFrom(_wallet, accountContract.ownerOf(sponsorsTemp), percentage), "USDT transfer failed"); NO SE TRANSFIERE SINO SE RETIRA
                                require(usdt.transferFrom(msg.sender, address(this), percentage), "USDT transfer failed");
                                emit UpdateProfit(sponsorsTemp, x, percentage);
                                emit UpdateMissedProfit(sponsors, x, percentage);
                                emit UpdatePayedProfit(sponsorsTemp, x, percentage);
                                accountContract.updateProfit(sponsorsTemp, x, percentage);
                                accountContract.updateMissedProfit(sponsors, x, percentage);
                                accountContract.updatePayedProfit(sponsorsTemp, x, percentage);
                                break;
                            }
                        }
                        sponsorsTemp = membershipContract.leadershipSplitPartners(sponsorsTemp);
                    }
                }
                sponsors = membershipContract.leadershipSplitPartners(sponsors);
                x++;
            }
            partnerShipRewards += (finalAmount - negativeAmount);
           //  for (uint i = 0; i < membershipContract.getPartnerShipSplitLength(); i++) {  //Recorre el array de equpos y envia la parte asignada a cada uno y aumenta nevativeAmount
           //     (address wallet, uint256 percentage) = membershipContract.partnerShipSplit(i);
           //     require(usdt.transferFrom(msg.sender, wallet, ((finalAmount - negativeAmount) * percentage) / 1000), "USDT transfer failed");
           //  } 
            require(usdt.transferFrom(msg.sender, treasuryAddress, _amount), "USDT transfer failed");
        }else{
            usdt.transferFrom(msg.sender, treasuryAddress, _amount);
        }
        stakes[msg.sender].push(Stake({
            amount: _amount,
            startTime: block.timestamp,
            idAccount: _nftUse,
            wallet: msg.sender
        }));
        
        totalStaked[msg.sender] += _amount;
        
        emit Staked(_nftUse, _amount, _index);
    }

    function getUserStakes(address _user) external view returns (Stake[] memory) {
        return stakes[_user];
    }

/////////////////

    event UpdateTotalDirect(uint256 indexed _tokenId, uint256 _directVol);
    event UpdateTotalGlobal(uint256 indexed _tokenId, uint256 _directVol);
    event UpdateDirectVol(uint256 indexed _tokenId, uint256 _directVol, uint256 _referredTokenId);
    event UpdateGlobalVol(uint256 indexed _tokenId, uint256 _globalVol, uint256 _level, uint256 _referredTokenId);
    event UpdateProfit(uint256 indexed _tokenId, uint256 _level, uint256 _amount);
    event UpdateMissedProfit(uint256 indexed _tokenId, uint256 _level, uint256 _amount);
    event UpdatePayedProfit(uint256 indexed _tokenId, uint256 _level, uint256 _amount);


    //MAPPING RETIRO
    mapping(uint256 => uint256) public rewards;

    function claimStakingReward(uint256 _nftUse) public {
        require(accountContract.ownerOf(_nftUse) == msg.sender ,"Not the owner"); //Verifica expiracion
        emit RewardClaimed(_nftUse, rewards[_nftUse]);
        require(usdt.transfer(msg.sender, rewards[_nftUse]), "USDT transfer failed");
        totalPayedRewards[_nftUse] += rewards[_nftUse];
        rewards[_nftUse] = 0;
    }

    //Info usuario
    mapping(uint256 => uint256) public directs;
    mapping(uint256 => uint256) public rank;
    uint256 public partnerShipRewards;
    address public partnerShip;

    function setPartnerShip(address _wallet) public onlyRole(ADMIN_ROLE) {
        partnerShip = _wallet;
    }

    function claimRewardPartnerShip(uint256 _nftUse) public {
        require(msg.sender == partnerShip, "You are not the PartnerShip"); 
        emit PartnerShipRewardClaimed(partnerShipRewards);
        require(usdt.transfer(msg.sender, partnerShipRewards), "USDT transfer failed");
        partnerShipRewards = 0;
    }

    event RewardClaimed(uint256 indexed nftUse, uint256 amountClaimed);
    event PartnerShipRewardClaimed(uint256 amountClaimed);

    mapping(uint256 => uint256) public totalPayedRewards;
    uint256 public TVL;

}
