// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IMembershipContract {
    function actualMembershipNumber(address) external view returns (uint256);
    
    function memberships(uint256) external view returns (
        string memory membershipTitle,
        uint256 membershipAmount,
        uint256 actualMemberships,
        uint256 maxMemberships,
        uint256 actualDate,
        uint256 timelimitMembership,
        uint256 expirationMembership,
        uint256 minInv,
        uint256 maxInv,
        bool fee,
        uint256 amountFee
    );
}

contract Staking is Ownable {

    IERC20 public USDT;
    IMembershipContract public membershipContract;
    address public vaultWallet;
    address public feeWallet;
    mapping(address => uint256) public stakingAmount;

    constructor(address _usdtAddress, address _membersAddress, address _vault, address _fee) { 
        USDT = IERC20(_usdtAddress);
        membershipContract = IMembershipContract(_membersAddress);
        vaultWallet = _vault;
        feeWallet = _fee;
    }

    function stakingMembership(uint256 _amount) public {
        // Obtener el ID de membresía del usuario
        uint256 membershipId = membershipContract.actualMembershipNumber(msg.sender);
        // Obtener los detalles de la membresía
        (
            ,,
            ,
            ,
            ,
            ,
            ,
            uint256 minInv,
            uint256 maxInv,
            bool fee,
            uint256 amountFee
            
        ) = membershipContract.memberships(membershipId);

        require(_amount >= minInv, "Amount is less than the minimum investment");
        require(_amount <= maxInv, "Amount exceeds the maximum investment");
        if(fee){
            require(USDT.transferFrom(msg.sender,feeWallet, (_amount * amountFee)/1000), "USDT fee transfer failed");
            require(USDT.transferFrom(msg.sender, vaultWallet, _amount), "USDT transfer failed");
        }else{
            require(USDT.transferFrom(msg.sender, vaultWallet, _amount), "USDT transfer failed");
        }

        stakingAmount[msg.sender] += _amount;
    }
}
