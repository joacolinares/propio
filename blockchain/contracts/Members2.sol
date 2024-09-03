// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
contract MembershipContract2 is Ownable {
        IERC20 USDT;
    constructor(address _usdtAddress){ //Ownable(msg.sender)
        USDT = IERC20(_usdtAddress);
    }

    struct Membership {
        string membershipTitle;      //Nombre de la membresia
        uint256 membershipAmount;    //Valor de la membresia
        uint256 actualMemberships;   //Cantidad actual de miembros 
        uint256 maxMemberships;      //Cantidad maxima de miembros
        uint256 actualDate;          //Fecha actual
        uint256 timelimitMembership; //Tiempo limite de venta
        uint256 expirationMembership;//Tiempo de la membresia
        uint256 minInv;
        uint256 maxInv;
        bool fee;
        uint256 amountFee;
    }
    //MEMBRESIAS
    Membership[] public memberships; //Array de membresias
    mapping(address => uint256) public actualMembershipNumber; //Key = wallet de usuario value = numero de membresia

    //PORCENTAJES
    uint256 public sponsorSplit; //Variable general para el porcentaje de sponsor
    uint256 public bonusSplit;  //Variable general para el porcentaje de bonus
    uint256 public leadershipSplit; //Variable general para el porcentaje de leadershipSplit
    
    //BONUSSPLIT
    mapping(address => uint256) public bonusSplitMoneyAcumulation; //Cantidad de dinero para el bonus se va almacenando el total de cada compra en la wallet de sponsor
    address[] public bonusSplitMoneyWallets; //Wallets de sponsor que estan participando
    uint256 startTime; //Tiempo de inicio de bonus
    uint256 endTime; //Tiempo final de bonus
    address[3] public topWallets; //Top 3 wallets con mas referidos 
    uint256 public bonusSplitAcumulation; //Se acumala el dinero y luego se reparte entre las topWallets
    mapping(address => bool) public agregado; 
    
    //PARTNERSHIPS
    uint256 public maximoPartnerships; //Cantidad maxima de partenerShips con setMaximoPartnerships() se modifica
    mapping(address => uint256) public  leadershipSplitAcumulationArray; //Cantidad de dinero grupal
    uint256 public leadershipSplitAcumulation; //Se acumula el dinero y luego se reparte entre leadershipSplitAcumulationArray 
    mapping(address => address) public leadershipSplitPartners; //Se guarda el partner de cada persona para luego ir recorriendolo
    uint256 public leadershipSplitLevels = 20;  //Profundidad de grupo
    address[] public partnerShips; //Se guardan en un array los miembros de partnerShips
    mapping(address => bool) public partnerShipsAgregado; //Cuando un usuario cumple se le pone en true para no ser agregado dos veces 
    mapping(address => uint256) public sponsorSplitAcumulationPartnerShip;//Se acumula el dineor que tus referidos pusieron
    uint256 public minMembershipAmount;
    uint256 public minLeadershipSplitAcumulationArray;
    uint256 public minSponsorSplitAcumulationPartnerShip;


    //SPONSOR
    mapping(address => uint256) public sponsorSplitAcumulation; //Se guarda el dinero que fuiste generando por la gente que te refirio
    uint256[] public sponsorLevels;

    //DATOS FRONT END
    mapping(address => uint256) public claims;
    mapping(address => uint256) public team;
    
    //BONUS Y RANGOS
    mapping(address => uint256) public  treeAmount; //Cantidad de dinero grupal
    mapping(address => uint256) public  cantDirect; //Cantidad de dinero grupal



    struct infoLevel {
        uint256 amountMoney;
        uint256 amount;
    }


    // Función para definir los porcentajes para cada area
    function setSplits(uint256 _sponsorSplit, uint256 _bonusSplit, uint256 _leadershipSplit) public onlyOwner  {
        require(_sponsorSplit + _bonusSplit  + _leadershipSplit <= 1000, "1000 Percentage");
        sponsorSplit = _sponsorSplit;
        bonusSplit = _bonusSplit; 
        leadershipSplit = _leadershipSplit; 
    }

    //Funcion para crear Membresia
    function createMembership(string memory _membershipTitle, uint256 _membershipAmount, uint256 _maxMemberships,
    uint256 _timelimitMembership, uint256 _expirationMembership, uint256 _minInv, uint256 _maxInv, bool _fee, uint256 _amountFee
    ) public onlyOwner{
            memberships.push(Membership(_membershipTitle,_membershipAmount,0,_maxMemberships, block.timestamp,block.timestamp +  (_timelimitMembership * 1 days), block.timestamp + (_expirationMembership * 1 days),
            _minInv, _maxInv, _fee, _amountFee));
    }

    // Función para comprar una membresía:
    function buyMembership(uint256 _membershipId, address _sponsor) public  {
        Membership storage membership = memberships[_membershipId]; //Agarra la membresia actual
        require(membership.maxMemberships == 0 || membership.actualMemberships <= membership.maxMemberships, "Membership limit reached"); //Verifica cantidad
        require(block.timestamp <= membership.timelimitMembership || membership.timelimitMembership == 0, "Membership sale expired"); //Verifica tiempo
        require(block.timestamp <= membership.expirationMembership, "Membership end"); //Verifica expiracion
        require(_sponsor != msg.sender, "sponsor dif own address"); //Verifica expiracion
        if(_sponsor != 0x0000000000000000000000000000000000000123){
            require(leadershipSplitPartners[_sponsor] != address(0), "sponsor dont have membership"); //Verifica expiracion
        }
        

    //    totalStaked[msg.sender] += membership.membershipAmount;
        
        actualMembershipNumber[msg.sender] = _membershipId; //Setea al usuario el id de membresia
        membership.actualMemberships++; //Suma 1 en la cantidad de gente
        uint256 sponsorAmount = (membership.membershipAmount * sponsorSplit) / 1000; //0btiene el porcentaje para el sponsor
        sponsorSplitAcumulationPartnerShip[_sponsor] += membership.membershipAmount; //Acumula para el sponsor la cantidad invertida
        leadershipSplitPartners[msg.sender] = _sponsor; //Setea el referido para la wallet actual 
        sponsorSplitAcumulation[_sponsor] += sponsorAmount; //Le aumenta al sponsor sponsorAmount
        bonusSplitAcumulation += (membership.membershipAmount * bonusSplit) / 1000; //Obtiene el porcentaje para bonus
        leadershipSplitAcumulation += (membership.membershipAmount * leadershipSplit) / 1000; //Acumula porcentaje para leadershipSplit
        uint256  negativeAmount; //Variable para acumular todo lo enviado a los diferentes equipos, ej: Mkt, dev etc...
        for (uint i = 0; i < partnerShipSplit.length; i++) {  //Recorre el array de equpos y envia la parte asignada a cada uno y aumenta nevativeAmount
            require(USDT.transferFrom(msg.sender,partnerShipSplit[i].wallet, (membership.membershipAmount * partnerShipSplit[i].percentage)/1000), "USDT transfer failed");
            negativeAmount += (membership.membershipAmount * partnerShipSplit[i].percentage)/1000;
        } 
        if(block.timestamp > startTime && block.timestamp < endTime){ //Si el tiempo esta entre startTime y endTime acumula la cantidad invertida por el usuario al sponsor y agrega al sponsor en el array
            bonusSplitMoneyAcumulation[_sponsor] += membership.membershipAmount;
            bonusSplitMoneyWallets.push(_sponsor);
        }//POSIBILIDAD DE BORRARLO

        //LeaderShipSplit
        address  sponsors = _sponsor; //Va recorriendo los sponsor y agregando lo invertido
        for (uint x = 0; x < leadershipSplitLevels; x++) {
            if(sponsors != address(0)){
                if(x == 0){
                    console.log(sponsors);
                    require(USDT.transferFrom(msg.sender,sponsors, (membership.membershipAmount * 20) /100), "USDT transfer failed");
                    negativeAmount += (membership.membershipAmount * 20) /100;
                    treeAmount[sponsors] += membership.membershipAmount;
                    cantDirect[sponsors] ++;
                }else if(x == 1 ){
                    require(cantDirect[sponsors] >= 2);
                    console.log(x); 
                    console.log(sponsors);
                    require(USDT.transferFrom(msg.sender,sponsors, (membership.membershipAmount * 5) /100), "USDT transfer failed");
                    negativeAmount += (membership.membershipAmount * 5) /100;
                    treeAmount[sponsors] += membership.membershipAmount;
                }else if(x == 2){
                    require(cantDirect[sponsors] >= 3);
                    console.log(x);
                    console.log(sponsors);
                    require(USDT.transferFrom(msg.sender,sponsors, (membership.membershipAmount * 3) /100), "USDT transfer failed");
                    negativeAmount += (membership.membershipAmount * 3) /100;
                    treeAmount[sponsors] += membership.membershipAmount;
                }else if(x == 3){
                    require(cantDirect[sponsors] >= 4);
                    console.log(x);
                    console.log(sponsors);
                    require(USDT.transferFrom(msg.sender,sponsors, (membership.membershipAmount * 2) /100), "USDT transfer failed");
                    negativeAmount += (membership.membershipAmount * 2) /100;
                    treeAmount[sponsors] += membership.membershipAmount;
                }else if(x == 4){
                    require(cantDirect[sponsors] >= 5);
                    console.log(x);
                    require(USDT.transferFrom(msg.sender,sponsors, (membership.membershipAmount * 2) /100), "USDT transfer failed");
                    negativeAmount += (membership.membershipAmount * 2) /100;
                    treeAmount[sponsors] += membership.membershipAmount;
                }else if(x >= 5 || x <= 16){
                    require(cantDirect[sponsors] >= 16);
                    require(USDT.transferFrom(msg.sender,sponsors, (membership.membershipAmount * 1) /100), "USDT transfer failed");
                    negativeAmount += (membership.membershipAmount * 1) /100;
                    treeAmount[sponsors] += membership.membershipAmount;
                }else if(x >= 15 || x <= 19){
                    require(USDT.transferFrom(msg.sender,sponsors, (membership.membershipAmount * 5) /1000), "USDT transfer failed");
                    negativeAmount += (membership.membershipAmount * 5) /1000;
                    treeAmount[sponsors] += membership.membershipAmount;
                }
                sponsors = leadershipSplitPartners[sponsors];
            }
        } 
        require(USDT.transferFrom(msg.sender,address(this), membership.membershipAmount - negativeAmount), "USDT transfer failed"); //Envia el pago del usuario al contrato restandole lo enviado a los equipos
    }

    //Setea maxima cantidad de partnerShips
    function setMaximoPartnerships(uint256 _maximo) public onlyOwner {
        maximoPartnerships = _maximo;
    }

    function setLeadershipSplitLevels(uint256 _newLevels) public onlyOwner() {
        leadershipSplitLevels = _newLevels;
    }

    //Finaliza bonusSplit, envia el dinero, setea todas las wallets en 0 y borra el array
    function endBonusSplit() public onlyOwner {
        //Iteramos entre todas las wallets
        for (uint i = 0; i < bonusSplitMoneyWallets.length; i++) {
            // Iteramos sobre las top wallets
           if(!agregado[bonusSplitMoneyWallets[i]]) {for (uint x = 0; x < topWallets.length; x++) {
                // Si no hay ninguna top wallet se agrega
                if (topWallets[x] == address(0)) {
                    topWallets[x] = bonusSplitMoneyWallets[i];
                    agregado[bonusSplitMoneyWallets[i]] = true;
                    break;
                }
                //Si la actual es mayor a la que esta en la posicion de wallets se desplaza la otra
                if (bonusSplitMoneyAcumulation[bonusSplitMoneyWallets[i]] > bonusSplitMoneyAcumulation[topWallets[x]]) {
                    for (uint y = topWallets.length - 1; y > x; y--) {
                        topWallets[y] = topWallets[y - 1];
                    }
                    agregado[bonusSplitMoneyWallets[i]] = true;
                    topWallets[x] = bonusSplitMoneyWallets[i];
                    break;
                }
            }}
        }
        //Tranfiere dinero
        for (uint c = 0; c < topWallets.length; c++) {
            require(USDT.transfer(topWallets[c], bonusSplitAcumulation / topWallets.length), "USDT transfer failed");
        }    
        //DEBO PONER EN 0 A TODOS TOPWALLETS


        //Pone en 0 a todos
        for (uint j = 0; j < bonusSplitMoneyWallets.length; j++) {
            bonusSplitMoneyAcumulation[bonusSplitMoneyWallets[j]] = 0;
        }  
        //Borra los participantes
        delete bonusSplitMoneyWallets;
    }

    function setMins(uint256 _minMembershipAmount, uint256 _minLeadershipSplitAcumulationArray, uint256 _minSponsorSplitAcumulationPartnerShip)public onlyOwner(){
        minMembershipAmount = _minMembershipAmount;
        minLeadershipSplitAcumulationArray = _minLeadershipSplitAcumulationArray;
        minSponsorSplitAcumulationPartnerShip = _minSponsorSplitAcumulationPartnerShip;
    }



    //Envia dinero a todos los partnerships
    function sendLeadershipSplit() public onlyOwner() { 
       for (uint i = 0; i < partnerShips.length; i++) {
            require(USDT.transfer(partnerShips[i], leadershipSplitAcumulation / partnerShips.length), "USDT transfer failed");
        }  
    }
    
    struct infoWallet {
        address wallet;
        uint256 percentage;
    }
    infoWallet[] public partnerShipSplit;
    uint256 public totalPercentage;

    //Añade equipo como el de marketing o devs
    function addPartnerShipSplit(address _wallet, uint256 _percentage) public {
        uint256 SBLPercentage = sponsorSplit + bonusSplit + leadershipSplit;
        require((SBLPercentage + totalPercentage  + _percentage) <= 1000, "1000 Percentage");
        totalPercentage += _percentage;
        partnerShipSplit.push(infoWallet(_wallet, _percentage));
    }

}
