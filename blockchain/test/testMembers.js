// Importamos las librerías necesarias
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers')
// Definimos las variables globales para reutilización en las pruebas
let membershipContract;
let token;
let owner;
let user1;
let user2;
let user3;
let user4;
let user5;
let user6;
let user7;
let user8;
let user9;
let user10;
let user11;
let user12;
let user13;
let user14;
let user15;




// Inicializamos las variables globales antes de cada prueba
beforeEach(async () => {
  const Token = await ethers.getContractFactory("StoneToken");
   token = await Token.deploy()
  const tokenAdd =  await token.getAddress()
  const MembershipContract = await ethers.getContractFactory('MembershipContract2');
  const Poi = await ethers.getContractFactory('POI2');
  const Staking = await ethers.getContractFactory('Staking');
  membershipContract = await MembershipContract.deploy(tokenAdd);
  poi = await Poi.deploy(tokenAdd);
  [owner, user1, user2, user3, user4, user5, user6, user7, user8, user9,user10, user11, user12, user13, user14,user15,user16] = await ethers.getSigners();
  staking = await Staking.deploy(tokenAdd,membershipContract.getAddress(),user15.address,user16.address);
});

// Prueba para verificar la creación de membresías


/*
describe('createMembership', function () {
  it('should create a new membership', async function () {
    await membershipContract.createMembership('Gold Membership', 100, 100, 30, 365);
    const membership = await membershipContract.memberships(0);
    expect(membership.membershipTitle).to.equal('Gold Membership');
    expect(membership.membershipAmount).to.equal(100);
    expect(membership.maxMemberships).to.equal(100);
    const currentTime = Math.floor(Date.now() / 1000); // Obtener el tiempo actual en segundos
    const expectedTimelimit = BigInt(currentTime + (30 * 24 * 60 * 60)); // 30 días en segundos
    const expectedExpiration = BigInt(currentTime + (365 * 24 * 60 * 60)); // 365 días en segundos
    // Comparar solo los primeros 5 dígitos
    expect(BigInt(membership.timelimitMembership) / BigInt(100000)).to.equal(expectedTimelimit / BigInt(100000));
    expect(BigInt(membership.expirationMembership) / BigInt(100000)).to.equal(expectedExpiration / BigInt(100000));
  });
});
*/


/*
describe('buyMembership', function () {
  it('should allow a user to buy a membership', async function () {
    // Asumiendo que el usuario 1 tiene suficientes tokens USDT
    const amountToApprove = 200;
    await token.transfer(user1.address, amountToApprove); // Transferimos suficientes tokens USDT al usuario 1

    // Asumiendo que el contrato de membresía tiene al menos una membresía creada
    await membershipContract.createMembership('Gold Membership', 100, 100, 30, 365);

    const membersAddress = membershipContract.getAddress()
    // Asumiendo que el usuario 1 aprueba al contrato de membresía para gastar sus tokens USDT
    await token.connect(user1).approve(membersAddress, 200000);

    // El usuario 1 compra una membresía
    await membershipContract.connect(user1).buyMembership(0, owner.address);

    // Verificamos que el usuario 1 tenga la membresía
    const membershipId = await membershipContract.actualMembershipNumber(user1.address);
    expect(membershipId).to.equal(0);

    // Verificamos que el contrato registre la membresía comprada
    const membership = await membershipContract.memberships(0);
    expect(membership.actualMemberships).to.equal(1);
  });
});
*/



// Prueba para verificar la distribución de bonificaciones

/*
describe('bonusSplit', function () {
  it('should distribute bonuses to top wallets', async function () {
    // Asumiendo que el contrato de membresía tiene bonificaciones acumuladas
    const amountToSend = 20000000;
    await token.transfer(user4.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user5.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user6.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user7.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user8.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user9.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1

    await membershipContract.startBonusSplit(36000); // Iniciamos un bono de una hora

    // Asumiendo que el contrato de membresía tiene al menos una membresía creada
    await membershipContract.createMembership('Silver Membership', 100, 100, 30, 365);
    await membershipContract.createMembership('Gold Membership', 500, 100, 30, 365);
    await membershipContract.createMembership('Diamond Membership', 1000, 100, 30, 365);
    await membershipContract.setSplits(200,200,200);

    const membersAddress = membershipContract.getAddress()


    await token.connect(user4).approve(membersAddress, 20000000);
    await token.connect(user5).approve(membersAddress, 20000000);
    await token.connect(user6).approve(membersAddress, 20000000);
    await token.connect(user7).approve(membersAddress, 20000000);
    await token.connect(user8).approve(membersAddress, 20000000);
    await token.connect(user9).approve(membersAddress, 20000000);
 
    // Asumiendo que hay al menos una membresía comprada por un usuario
    await membershipContract.connect(user4).buyMembership(0, user1.address);
    await membershipContract.connect(user5).buyMembership(0, user1.address);
    await membershipContract.connect(user6).buyMembership(0, user1.address);
    await membershipContract.connect(user7).buyMembership(1, user2.address);
    await membershipContract.connect(user8).buyMembership(0, user2.address);
    await membershipContract.connect(user9).buyMembership(2, user3.address);

    // Asumiendo que el tiempo de bonificación ha expirado
    await ethers.provider.send('evm_increaseTime', [3601]); // Avanzamos el tiempo 1 segundo más allá del bono

    const bonusSplitAcumulation = await membershipContract.bonusSplitAcumulation()
    // Finalizamos el bono y distribuimos las bonificaciones
    const balanceAntes = await token.balanceOf(user3.address);
    await membershipContract.endBonusSplit();
    const balanceDespues = await token.balanceOf(user3.address);
  
   const top1 = await membershipContract.topWallets(0);
   const top2 = await membershipContract.topWallets(1);
   const top3 = await membershipContract.topWallets(2);



    expect(top1).to.equal(user3.address); //Que el top 1 sea el sponsor con mejor inversion
    expect(top2).to.equal(user2.address); //Que el top 2 sea el segundo sponsor con mejor inversion
    expect(top3).to.equal(user1.address); //Que el top 3 sea el tercer sponsor con mejor inversion
    expect(Number(balanceDespues)).to.equal(Math.floor(Number(balanceAntes) + Number(bonusSplitAcumulation) / 3)); //Que se le reparta 1/3 del total de bonusSplitAcumulation

  });
});
*/

// Prueba para verificar la distribución de bonificaciones
/*
describe('checkLeadershipSplit', function () {
  it('Comprobar que se agregue al leaderShip', async function () {
    // Asumiendo que el contrato de membresía tiene bonificaciones acumuladas
    const amountToSend = 20000000;
    await token.transfer(user1.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user4.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user5.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user6.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user7.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user8.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user9.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1

    await membershipContract.startBonusSplit(36000); // Iniciamos un bono de una hora

    // Asumiendo que el contrato de membresía tiene al menos una membresía creada
    await membershipContract.setMins(1000,10000,5000);
    await membershipContract.createMembership('', 0, 0, 0, 0);
    await membershipContract.createMembership('Silver Membership', 2500, 100, 30, 365);
    await membershipContract.setSplits(200,200,200);
    const membersAddress = membershipContract.getAddress()

    await token.connect(user1).approve(membersAddress, 20000000);
    await token.connect(user4).approve(membersAddress, 20000000);
    await token.connect(user5).approve(membersAddress, 20000000);
    await token.connect(user6).approve(membersAddress, 20000000);
    await token.connect(user7).approve(membersAddress, 20000000);
    await token.connect(user8).approve(membersAddress, 20000000);
    await token.connect(user9).approve(membersAddress, 20000000);

    await membershipContract.connect(user1).buyMembership(1, "0x0000000000000000000000000000000000000000"); //Compra la primera membresia para tener mas de 1000
    await membershipContract.connect(user4).buyMembership(1, user1.address); //Acumula user1 2500 como partner
    await membershipContract.connect(user5).buyMembership(1, user1.address); //Acumula user1 2500 como partner
    await membershipContract.connect(user6).buyMembership(1, user5.address); //Acumula user1 2500 como grupo
    await membershipContract.connect(user7).buyMembership(1, user5.address); //Acumula user1 2500 como grupo
    await membershipContract.connect(user8).buyMembership(1, user5.address); //Acumula user1 2500 como grupo
    await membershipContract.connect(user9).buyMembership(1, user5.address); //Acumula user1 2500 como grupo
    
   const walletPartner = await membershipContract.partnerShips(0);

    expect(walletPartner).to.equal(user1.address); //Que la wallet partnerShip sea la address1

  });
});
*/

// Prueba para verificar la distribución de bonificaciones

/*
describe('checkLeadershipSplit', function () {
  it('Comprobar que se agregue al leaderShip y se envie dinero1', async function () {
    // Asumiendo que el contrato de membresía tiene bonificaciones acumuladas
    const amountToSend = 20000000;
    await token.transfer(user1.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user4.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user5.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user6.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user7.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user8.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user9.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1

    await membershipContract.startBonusSplit(36000); // Iniciamos un bono de una hora

    // Asumiendo que el contrato de membresía tiene al menos una membresía creada
    await membershipContract.setMins(1000,10000,5000);
    await membershipContract.createMembership('', 0, 0, 0, 0);
    await membershipContract.createMembership('Silver Membership', 2500, 100, 30, 365);
    await membershipContract.setSplits(200,200,200);
    const membersAddress = membershipContract.getAddress()

    await token.connect(user1).approve(membersAddress, 20000000);
    await token.connect(user4).approve(membersAddress, 20000000);
    await token.connect(user5).approve(membersAddress, 20000000);
    await token.connect(user6).approve(membersAddress, 20000000);
    await token.connect(user7).approve(membersAddress, 20000000);
    await token.connect(user8).approve(membersAddress, 20000000);
    await token.connect(user9).approve(membersAddress, 20000000);

    await membershipContract.connect(user1).buyMembership(1, "0x0000000000000000000000000000000000000000"); //Compra la primera membresia para tener mas de 1000
    await membershipContract.connect(user4).buyMembership(1, user1.address); //Acumula user1 2500 como partner
    await membershipContract.connect(user5).buyMembership(1, user1.address); //Acumula user1 2500 como partner
    await membershipContract.connect(user6).buyMembership(1, user5.address); //Acumula user1 2500 como grupo
    await membershipContract.connect(user7).buyMembership(1, user5.address); //Acumula user1 2500 como grupo
    await membershipContract.connect(user8).buyMembership(1, user5.address); //Acumula user1 2500 como grupo
    await membershipContract.connect(user9).buyMembership(1, user5.address); //Acumula user1 2500 como grupo
    
    const walletPartner = await membershipContract.partnerShips(0);
    
    expect(walletPartner).to.equal(user1.address); //Que la wallet partnerShip sea la address1
    
    
    const balanceAntes = await token.balanceOf(user1.address);
    const leadershipSplitAcumulation = await membershipContract.leadershipSplitAcumulation();
    await membershipContract.sendLeadershipSplit(); //Acumula user1 2500 como grupo
    const balanceDespues = await token.balanceOf(user1.address);

     expect(balanceDespues).to.equal(balanceAntes + leadershipSplitAcumulation); //Que la wallet partnerShip sea la address1
  });
});
*/

// Más pruebas pueden agregarse según sea necesario

// Prueba ganancias de sponsor

/*
describe('checkLeadershipSplit', function () {
  it('Comprobar que se agregue al leaderShip y se envie dinero', async function () {

    const amountToSend = 20000000;
    await token.transfer(user1.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user4.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user5.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user6.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1

    await membershipContract.startBonusSplit(36000); // Iniciamos un bono de una hora

    // Asumiendo que el contrato de membresía tiene al menos una membresía creada
    await membershipContract.setMins(1000,10000,5000);
    await membershipContract.setSponsorLevels(1000);
    await membershipContract.createMembership('', 0, 0, 0, 0);
    await membershipContract.createMembership('Silver Membership', 2500, 100, 30, 365);
    await membershipContract.setSplits(200,200,200);
    const membersAddress = membershipContract.getAddress()

    await token.connect(user1).approve(membersAddress, 20000000);
    await token.connect(user4).approve(membersAddress, 20000000);
    await token.connect(user5).approve(membersAddress, 20000000);
    await token.connect(user6).approve(membersAddress, 20000000);

    await membershipContract.connect(user1).buyMembership(1, user4.address); //Acumula user1 2500 como partner
    await membershipContract.connect(user4).buyMembership(1, user1.address); //Acumula user1 2500 como partner
    await membershipContract.connect(user5).buyMembership(1, user1.address); //Acumula user1 2500 como partner
    await membershipContract.connect(user6).buyMembership(1, user1.address); //Acumula user1 2500 como grupo
    
    const balanceAntes = await token.balanceOf(user1.address);
    const getRewards = await membershipContract.sponsorSplitAcumulation(user1.address); //Acumula user1 2500 como partner
    await membershipContract.connect(user1).getRewards();
    const balanceDespues = await token.balanceOf(user1.address);

     expect(balanceDespues).to.equal(balanceAntes + getRewards); //Que la wallet partnerShip sea la address1
  });
});
/*

/*
describe('addPartnerShipSplit', function () {
  it('Comprobar que se agregue al Partners y se envie dinero', async function () {

    const amountToSend = 20000000;
    await token.transfer(user1.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user2.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1
    await token.transfer(user3.address, amountToSend); // Transferimos suficientes tokens USDT al usuario 1

    // Asumiendo que el contrato de membresía tiene al menos una membresía creada
    await membershipContract.createMembership('', 0, 0, 0, 0);
    await membershipContract.createMembership('Silver Membership', 1000, 100, 30, 365);
    await membershipContract.setSplits(200,200,200);
    const membersAddress = membershipContract.getAddress()
    
    await token.connect(user1).approve(membersAddress, 20000000);
    await token.connect(user2).approve(membersAddress, 20000000);
    await token.connect(user3).approve(membersAddress, 20000000);
    
    await membershipContract.addPartnerShipSplit(user5.address,100); //Digamos que user5 es dev, los devs se quedarian con un 10%
    await membershipContract.addPartnerShipSplit(user6.address,150); //Digamos que usr6 es MKT, se quedarian con un 15%


    const balanceAntes = await token.balanceOf(user5.address);
    const balanceAntes2 = await token.balanceOf(user6.address);
    await membershipContract.connect(user1).buyMembership(1, user4.address);
    await membershipContract.connect(user2).buyMembership(1, user4.address);
    await membershipContract.connect(user3).buyMembership(1, user4.address); 
    
    const balanceDespues = await token.balanceOf(user5.address);
    const balanceDespues2 = await token.balanceOf(user6.address);
    const  porcentaje = await membershipContract.partnerShipSplit(0);
    const  porcentaje2 = await membershipContract.partnerShipSplit(1);
     expect(Number(balanceDespues)).to.equal(Number(balanceAntes) + (((1000 * Number(porcentaje[1]))/1000) * 3)); //Que el total de wallet dev sea igual a el 10% de 3000
     expect(Number(balanceDespues2)).to.equal(Number(balanceAntes2) + (((1000 * Number(porcentaje2[1]))/1000) * 3)); //Que el total de wallet dev sea igual a el 10% de 3000
  });
});
*/

// Prueba para verificar la creación de membresías
/*
describe('Bonus', function () {
  it('Envio de dinero a diferentes niveles de bonus', async function () {
    
    //Address del contrato
    const membersAddress = membershipContract.getAddress()

    //Transferimos fondos a las wallets
    await token.transfer(user1.address, 100000); 
    await token.transfer(user2.address, 150000); 
    await token.transfer(user3.address, 105000); 
    await token.transfer(user4.address, 200000); 
    await token.transfer(user5.address, 200000); 

    await token.connect(user1).approve(membersAddress, 200000);
    await token.connect(user2).approve(membersAddress, 200000);
    await token.connect(user3).approve(membersAddress, 200000);
    await token.connect(user4).approve(membersAddress, 200000);
    await token.connect(user5).approve(membersAddress, 200000);

    //Creamos membresias
    await membershipContract.createMembership('', 0, 0, 0, 0);
    await membershipContract.createMembership('Silver Membership', 1000, 0, 30, 365);

    await membershipContract.setSplits(245,255,200); //Sponsor = 24.5% Bonus = 25.5% Leadershipsplit = 20%
    await membershipContract.setSponsorLevels(333);// Ponemos que se lleva el 33% el frontal
    await membershipContract.setSponsorLevels(333);// Ponemos que se lleva el 33% el frontal
    await membershipContract.setSponsorLevels(333);// Ponemos que se lleva el 33% el frontal


    await membershipContract.connect(user1).buyMembership(1, "0x0000000000000000000000000000000000000000"); 

    await membershipContract.connect(user2).buyMembership(1, user1.address); 

    await membershipContract.connect(user3).buyMembership(1, user2.address); 

    await membershipContract.connect(user4).buyMembership(1, user3.address); 


    const sponsorSplitAcumulation = await membershipContract.sponsorSplitAcumulation(user1); 
 
    const balanceAntesSponsorSplit = await token.balanceOf(user1.address);
    const balanceAntesSponsorSplit1 = await token.balanceOf(user2.address);
    const balanceAntesSponsorSplit2 = await token.balanceOf(user3.address);
 
    await membershipContract.connect(user3).getRewards(); 
 
    const balanceDespuesSponsorSplit = await token.balanceOf(user1.address);
    const balanceDespuesSponsorSplit1 = await token.balanceOf(user2.address);
    const balanceDespuesSponsorSplit2 = await token.balanceOf(user3.address);
 

    expect(Number(balanceDespuesSponsorSplit)).to.equal(Number(balanceAntesSponsorSplit) + (Math.floor(Number(sponsorSplitAcumulation) / 3)));
    expect(Number(balanceDespuesSponsorSplit1)).to.equal(Number(balanceAntesSponsorSplit1) + (Math.floor(Number(sponsorSplitAcumulation) / 3)));
    expect(Number(balanceDespuesSponsorSplit2)).to.equal(Number(balanceAntesSponsorSplit2) + (Math.floor(Number(sponsorSplitAcumulation) / 3)));

  });
});
*/





/*
describe('Prueba general completa', function () {
  it('Probando una simulacion', async function () {
    
    //Address del contrato
    const membersAddress = membershipContract.getAddress()

    //Transferimos fondos a las wallets
    await token.transfer(user1.address, 200000); 
    await token.transfer(user2.address, 200000); 
    await token.transfer(user3.address, 200000); 
    await token.transfer(user4.address, 200000); 
    await token.transfer(user5.address, 200000); 
    await token.transfer(user6.address, 200000); 
    await token.transfer(user7.address, 200000); 
    await token.transfer(user8.address, 200000); 
    await token.transfer(user9.address, 200000); 
    await token.transfer(user10.address, 200000); 
    await token.transfer(user11.address, 200000); 
    await token.transfer(user12.address, 200000); 

    //Aprovamos los gatos
    await token.connect(user1).approve(membersAddress, 200000);
    await token.connect(user2).approve(membersAddress, 200000);
    await token.connect(user3).approve(membersAddress, 200000);
    await token.connect(user4).approve(membersAddress, 200000);
    await token.connect(user5).approve(membersAddress, 200000);
    await token.connect(user6).approve(membersAddress, 200000);
    await token.connect(user7).approve(membersAddress, 200000);
    await token.connect(user8).approve(membersAddress, 200000);
    await token.connect(user9).approve(membersAddress, 200000);
    await token.connect(user10).approve(membersAddress, 200000);
    await token.connect(user11).approve(membersAddress, 200000);
    await token.connect(user12).approve(membersAddress, 200000);

    //Creamos membresias
    await membershipContract.createMembership('', 0, 0, 0, 0);
    await membershipContract.createMembership('Silver Membership', 1000, 0, 30, 365);
    await membershipContract.createMembership('Gold Membership', 2500, 0, 30, 365);
    await membershipContract.createMembership('Diamond Membership', 5000, 0, 30, 365);
    await membershipContract.createMembership('Premium Membership', 10000, 0, 30, 365);

    //Seteos
    await membershipContract.setSplits(245,255,200); //Sponsor = 24.5% Bonus = 25.5% Leadershipsplit = 20%
    await membershipContract.setMaximoPartnerships(4); //Maximo 4 partners
    await membershipContract.setMins(2000,12500,1500); //Personal >= 2000 Frontal >= 7500 Grupal Personal >= 12500
    await membershipContract.startBonusSplit(9999); //Iniciar bonus y que dure 9999 segundos
    await membershipContract.addPartnerShipSplit(user13.address,100); //Equipo dev 10%
    await membershipContract.addPartnerShipSplit(user14.address,100); //Equipo mkt 10%
    await membershipContract.addPartnerShipSplit(user15.address,100); //Equipo administradores 10%
    await membershipContract.setSponsorLevels(1000);// Ponemos que se lleva el 100% el frontal

    const personal = async(numeroUser,wallet) =>{
      console.log("Personal")
      const actualMembershipNumber = await membershipContract.actualMembershipNumber(wallet);
      const memberships = await membershipContract.memberships(Number(actualMembershipNumber));
      const sponsorSplitAcumulation = await membershipContract.sponsorSplitAcumulation(wallet);
      const leadershipSplitAcumulationArray = await membershipContract.leadershipSplitAcumulationArray(wallet);
      const bonusSplitMoneyAcumulation = await membershipContract.bonusSplitMoneyAcumulation(wallet);
      console.log("User"+numeroUser+": Personal: "+memberships[1]+", Frontal(personal): "+sponsorSplitAcumulation+" Grupal: "+leadershipSplitAcumulationArray+"")
      console.log("Total acumulado para top: " + bonusSplitMoneyAcumulation)
    }


    const general = async() =>{
      console.log("General")
      const bonusSplitAcumulation = await membershipContract.bonusSplitAcumulation();
      const leadershipSplitAcumulation = await membershipContract.leadershipSplitAcumulation();
      console.log("Bonus Vault(general): " + bonusSplitAcumulation)
      console.log("LeaderShip Vault(general): " + leadershipSplitAcumulation)
    }

    //Nivel 0
    await membershipContract.connect(user1).buyMembership(2, "0x0000000000000000000000000000000000000000"); 
    console.log("Pago: 2500")




    //Nivel 1
    await membershipContract.connect(user2).buyMembership(2, user1.address); 
    console.log("Pago: 2500, refiriendo al user1")
    await membershipContract.connect(user3).buyMembership(3, user1.address); 
    console.log("Pago: 5000, refiriendo al user1")

   await  personal(1,user1.address)
   await  general()
  


    //Nivel 2
    await membershipContract.connect(user4).buyMembership(1, user2.address); 
    console.log("Pago: 1000, refiriendo al user2")
    await membershipContract.connect(user5).buyMembership(1, user2.address); 
    console.log("Pago: 1000, refiriendo al user2")
    await membershipContract.connect(user6).buyMembership(2, user3.address); 
    console.log("Pago: 2500, refiriendo al user3")
    await membershipContract.connect(user7).buyMembership(3, user3.address); 
    console.log("Pago: 5000, refiriendo al user3")
    await membershipContract.connect(user8).buyMembership(1, user3.address); 
    console.log("Pago: 1000, refiriendo al user3")
    await membershipContract.connect(user9).buyMembership(3, user3.address); 
    console.log("Pago: 5000, refiriendo al user3")


    //Nivel 3
    await membershipContract.connect(user10).buyMembership(4, user4.address); 
    console.log("Pago: 10000, refiriendo al user4")
    await membershipContract.connect(user11).buyMembership(4, user4.address); 
    console.log("Pago: 10000, refiriendo al user4")
    await membershipContract.connect(user12).buyMembership(4, user4.address); 
    console.log("Pago: 10000, refiriendo al user4")


    console.log("////////")
    await  personal(1,user1.address)
    console.log("////////")
    await  personal(2,user2.address)
    console.log("//////////")
    await  personal(3,user3.address)
    console.log("////////")
    await  personal(4,user4.address)
    console.log("//////////")
    await  personal(5,user5.address)
    console.log("////////")
    await  personal(6,user6.address)
    console.log("//////////")
    await  personal(7,user7.address)
    console.log("////////")
    await  personal(8,user8.address)
    console.log("//////////")
    await  personal(9,user9.address)
    console.log("//////////")
    await  personal(10,user10.address)
    console.log("////////")
    await  personal(11,user11.address)
    console.log("//////////")
    await  personal(12,user12.address)
    console.log("////////")
    await  general()
    console.log("//////////")

    //Total invertido 55.500usd
    //Vault Bonus = 14151 Correcto
    //LeaderShip Bonus = 11100 Correcto
  
   console.log("Enviamos dinero a todos los sponsors")

   const balanceAntes = await token.balanceOf(user4.address);
   const balanceAntes1 = await token.balanceOf(user3.address);
   const balanceAntes2 = await token.balanceOf(user1.address);
   await membershipContract.endBonusSplit(); 
   const balanceDespues = await token.balanceOf(user4.address);
   const balanceDespues1 = await token.balanceOf(user3.address);
   const balanceDespues2 = await token.balanceOf(user1.address);

   const top1 = await membershipContract.topWallets(0); 
   const top2 = await membershipContract.topWallets(1); 
   const top3 = await membershipContract.topWallets(2); 

   const bonusSplitAcumulation = await membershipContract.bonusSplitAcumulation();

   console.log("La wallet user4(",user4.address,") es la que mas dinero tiene  como sponsor: " + top1 + "Tenia un balance de: "+balanceAntes+ " Si le sumamos"+bonusSplitAcumulation+  "/3 nos quedaria total: "+balanceDespues)
   console.log("La wallet user3(",user3.address,") es la segunda que mas dinero tiene  como sponsor: " + top2+ "Tenia un balance de: "+balanceAntes1+ " Si le sumamos"+bonusSplitAcumulation+  "/3 nos quedaria total: "+balanceDespues1)
   console.log("La wallet user1(",user1.address,") es la tercera que mas dinero tiene  como sponsor: " + top3+ "Tenia un balance de: "+balanceAntes2+ " Si le sumamos"+bonusSplitAcumulation+  "/3 nos quedaria total: "+balanceDespues2)
   console.log("////")
  


   const sponsorSplitAcumulation = await membershipContract.sponsorSplitAcumulation(user1); 
   const sponsorSplitAcumulation1 = await membershipContract.sponsorSplitAcumulation(user2); 
   const sponsorSplitAcumulation2 = await membershipContract.sponsorSplitAcumulation(user3); 
   const sponsorSplitAcumulation3 = await membershipContract.sponsorSplitAcumulation(user4); 

   const balanceAntesSponsorSplit = await token.balanceOf(user1.address);
   const balanceAntesSponsorSplit1 = await token.balanceOf(user2.address);
   const balanceAntesSponsorSplit2 = await token.balanceOf(user3.address);
   const balanceAntesSponsorSplit3 = await token.balanceOf(user4.address);

   await membershipContract.connect(user1).getRewards(); 
   await membershipContract.connect(user2).getRewards(); 
   await membershipContract.connect(user3).getRewards(); 
   await membershipContract.connect(user4).getRewards(); 

   const balanceDespuesSponsorSplit = await token.balanceOf(user1.address);
   const balanceDespuesSponsorSplit1 = await token.balanceOf(user2.address);
   const balanceDespuesSponsorSplit2 = await token.balanceOf(user3.address);
   const balanceDespuesSponsorSplit3 = await token.balanceOf(user4.address);


   console.log("Balance antes: "+balanceAntesSponsorSplit+" Balance despues sumandole "+ sponsorSplitAcumulation+ " Total: "+balanceDespuesSponsorSplit)
   console.log("Balance antes: "+balanceAntesSponsorSplit1+" Balance despues sumandole "+ sponsorSplitAcumulation1+ " Total: "+balanceDespuesSponsorSplit1)
   console.log("Balance antes: "+balanceAntesSponsorSplit2+" Balance despues sumandole "+ sponsorSplitAcumulation2+ " Total: "+balanceDespuesSponsorSplit2)
   console.log("Balance antes: "+balanceAntesSponsorSplit3+" Balance despues sumandole "+ sponsorSplitAcumulation3+ " Total: "+balanceDespuesSponsorSplit3)

   const partnerShips = await membershipContract.partnerShips(0); 
   const partnerShips1 = await membershipContract.partnerShips(1); 



   console.log(user1.address)
   console.log(user2.address)
      const actualMembershipNumber = await membershipContract.actualMembershipNumber(user1.address);
      const memberships = await membershipContract.memberships(Number(actualMembershipNumber));
      const actualMembershipNumber1 = await membershipContract.actualMembershipNumber(user2.address);
      const memberships1 = await membershipContract.memberships(Number(actualMembershipNumber1));
      const leadershipSplitAcumulationArray = await membershipContract.leadershipSplitAcumulationArray(user1.address);
      const leadershipSplitAcumulationArray1 = await membershipContract.leadershipSplitAcumulationArray(user2.address);
      const sponsorSplitAcumulationPartnerShip = await membershipContract.sponsorSplitAcumulationPartnerShip(user2.address);
      const sponsorSplitAcumulationPartnerShip1 = await membershipContract.sponsorSplitAcumulationPartnerShip(user2.address);

   console.log("User1 tiene en personal: "+memberships+" como sponsor: "+ sponsorSplitAcumulationPartnerShip +" como grupo" + leadershipSplitAcumulationArray)
   console.log("User2 tiene en personal: "+memberships1+" como sponsor: "+ sponsorSplitAcumulationPartnerShip1 +" como grupo" + leadershipSplitAcumulationArray1)

    console.log("Los que tienen partnership serian user1 y user2 ya que son los unicos que cumplen los requisitos")



   const balanceAntessendLeadershipSplit = await token.balanceOf(user1.address);
   const balanceAntessendLeadershipSplit1 = await token.balanceOf(user2.address);
   await membershipContract.sendLeadershipSplit();
   const balanceDespuessendLeadershipSplit = await token.balanceOf(user1.address);
   const balanceDespuessendLeadershipSplit1 = await token.balanceOf(user2.address);


    console.log("Balance de user1 antes " + balanceAntessendLeadershipSplit,"Despues: " + balanceDespuessendLeadershipSplit,"Cuenta: " +  balanceAntessendLeadershipSplit +" +leadershipSplitAcumulation"+ " / 2 (cantidad de leaders)")
    console.log("Balance de user2 antes " + balanceAntessendLeadershipSplit1,"Despues: " + balanceDespuessendLeadershipSplit1,"Cuenta: " +  balanceAntessendLeadershipSplit1 + "+ leadershipSplitAcumulation / 2 (cantidad de leaders)")



    const balanceDev = await token.balanceOf(user13.address);
    const balanceMkt = await token.balanceOf(user14.address);
    const balanceAdmin = await token.balanceOf(user15.address);

    console.log("Balance wallet dev: ",   Number(balanceDev))
    console.log("Balance wallet mkt: ",   Number(balanceMkt))
    console.log("Balance wallet Admin: ", Number(balanceAdmin))
    console.log("El 10% del total ingresado el cual es 555000usd")






  });
});
*/











///////////PRUEBA GENERAL////////

/*
describe('Prueba general completa Aleatoria', function () {
  it('Probando una simulacion aleatoria', async function () {
    const membersAddress = membershipContract.getAddress();
    let users = [];
    const cantUsers  = 500
    const cantidadTokensA = 20000
    const cantidadTokensB = 150000
    for (let i = 0; i < cantUsers; i++) {
      const randomAmount = Math.floor(Math.random() * (cantidadTokensB - cantidadTokensA + 1)) + cantidadTokensA;
      const userWallet = ethers.Wallet.createRandom().connect(ethers.provider);
      users.push(userWallet);
      await token.transfer(userWallet.address, randomAmount); 
      console.log("Dinero transferido a Wallet",i, " ",randomAmount)
      await ethers.provider.send("hardhat_setBalance", [
        userWallet.address,
        "0x56BC75E2D63100000", // 100 ETH
    ]);
      const userSigner = new ethers.Wallet(userWallet.privateKey, ethers.provider);
      await token.connect(userSigner).approve(membersAddress, 20000000);
    }

    await membershipContract.createMembership('', 0, 0, 0, 0);
    await membershipContract.createMembership('Silver Membership', 1000, 0, 30, 365);
    await membershipContract.createMembership('Gold Membership', 2500, 0, 30, 365);
    await membershipContract.createMembership('Diamond Membership', 5000, 0, 30, 365);
    await membershipContract.createMembership('Premium Membership', 10000, 0, 30, 365);

    await membershipContract.setSplits(245,255,200); //Sponsor = 24.5% Bonus = 25.5% Leadershipsplit = 20%
    await membershipContract.setMaximoPartnerships(4); //Maximo 4 partners
    await membershipContract.setMins(2000,12500,1500); //Personal >= 2000 Frontal >= 1500 Grupal Personal >= 12500
    await membershipContract.startBonusSplit(9999); //Iniciar bonus y que dure 9999 segundos
    await membershipContract.addPartnerShipSplit(user13.address,100); //Equipo dev 10%
    await membershipContract.addPartnerShipSplit(user14.address,100); //Equipo mkt 10%
    await membershipContract.addPartnerShipSplit(user15.address,100); //Equipo administradores 10%
    await membershipContract.setSponsorLevels(1000);// Ponemos que se lleva el 100% el frontal



    const personal = async(numeroUser,wallet) =>{
      console.log("Personal")
      const actualMembershipNumber = await membershipContract.actualMembershipNumber(wallet);
      const memberships = await membershipContract.memberships(Number(actualMembershipNumber));
      const sponsorSplitAcumulation = await membershipContract.sponsorSplitAcumulation(wallet);
      const leadershipSplitAcumulationArray = await membershipContract.leadershipSplitAcumulationArray(wallet);
      const bonusSplitMoneyAcumulation = await membershipContract.bonusSplitMoneyAcumulation(wallet);
      console.log("User"+numeroUser+": Personal: "+memberships[1]+", Frontal(personal): "+sponsorSplitAcumulation+" Grupal: "+leadershipSplitAcumulationArray+"")
      console.log("Total acumulado para top: " + bonusSplitMoneyAcumulation)
    }


    const general = async() =>{
      console.log("General")
      const bonusSplitAcumulation = await membershipContract.bonusSplitAcumulation();
      const leadershipSplitAcumulation = await membershipContract.leadershipSplitAcumulation();
      console.log("Bonus Vault(general): " + bonusSplitAcumulation)
      console.log("LeaderShip Vault(general): " + leadershipSplitAcumulation)
    }


  
    let acumulador = 1
    let acumuladorMas = 0

    for (let i = 0; i < users.length; i++) {
     
      if(i == 0)
    {
      await membershipContract.connect(users[i]).buyMembership(1, "0x0000000000000000000000000000000000000000");
      console.log("Wallet 0 compro refiriendo a wallet 0x000")
    }
    else
      {  
        if(i == 1 || i == 2 || i ==3){
          let membershipType;
          const randomNumber = Math.floor(Math.random() * 10) + 1;
          if (randomNumber <= 4) {
            membershipType = 1;
          } else if (randomNumber <= 7) {
            membershipType = 2;
          } else if (randomNumber <= 9) {
            membershipType = 3;
          }else if (randomNumber <= 10) {
            membershipType = 4;
          }
          await membershipContract.connect(users[i]).buyMembership(membershipType, users[0].address);
          console.log("Wallet "+i+" compro la membresia "+ membershipType +" refiriendo a wallet 0")
        }else{
          if(acumuladorMas == 3){
            acumuladorMas = 0
            acumulador++
          }
          acumuladorMas = acumuladorMas +1

          let membershipType;
          const randomNumber = Math.floor(Math.random() * 10) + 1;
          if (randomNumber <= 4) {
            membershipType = 1;
          } else if (randomNumber <= 7) {
            membershipType = 2;
          } else if (randomNumber <= 9) {
            membershipType = 3;
          }else if (randomNumber <= 10) {
            membershipType = 4;
          }
          await membershipContract.connect(users[i]).buyMembership(membershipType, users[acumulador].address);
          console.log("wallet "+i+" Compro la membresia "+ membershipType +" referido por: wallet "+acumulador )
        }
      }
    }

    for (let i = 0; i < users.length; i++) {
      console.log("//////////")
      await  personal(i,users[i].address)
      const leadershipSplitAcumulationArray = await membershipContract.leadershipSplitAcumulationArray(users[i].address);
      console.log(leadershipSplitAcumulationArray)
      console.log("////////")
    }
    console.log("//////////")
    await  general()
    console.log("//////////")





    const bonusSplitAcumulation = await membershipContract.bonusSplitAcumulation();
    console.log("//////Division del Bonus/////////")
    console.log("Total a dividir entre 3: ", bonusSplitAcumulation, ". Para sacar el resultado se debe agarrar la transferencia restarle al compra de la membresia y sumarle esto lo del Bonus")
    await membershipContract.endBonusSplit(); 
    const top1 = await membershipContract.topWallets(0); 
    const top2 = await membershipContract.topWallets(1); 
    const top3 = await membershipContract.topWallets(2); 

    for (let i = 0; i < users.length; i++) {
      if(users[i].address == top1){
        const balanceDespues = await token.balanceOf(users[i].address);
        console.log("Balance actual: ",balanceDespues, " En Wallet ",i)
      }
    }

    for (let i = 0; i < users.length; i++) {
      if(users[i].address == top2){
        const balanceDespues = await token.balanceOf(users[i].address);
        console.log("Balance actual: ",balanceDespues, " En Wallet ",i)
      }
    }

    for (let i = 0; i < users.length; i++) {
      if(users[i].address == top3){
        const balanceDespues = await token.balanceOf(users[i].address);
        console.log("Balance actual: ",balanceDespues, " En Wallet ",i)
      }
    }
 
    console.log("////Division despues de getRewards() (sponsor)/////////")

    for (let i = 0; i < users.length; i++) {
      const sponsorSplitAcumulation = await membershipContract.sponsorSplitAcumulation(users[i]); 
      const balanceAntesSponsorSplit = await token.balanceOf(users[i].address);
      await membershipContract.connect(users[i]).getRewards(); 
      const balanceDespuesSponsorSplit = await token.balanceOf(users[i].address);
      console.log("La Wallet ",i,"con un balance de ",balanceAntesSponsorSplit,"tiene para reclamar un total de",sponsorSplitAcumulation, ", le quedaria un total de: ",balanceDespuesSponsorSplit)
    }

    console.log("////Division leadership/////////")

    let cumplen = []
    let cumplenBalances = []

    for (let i = 0; i < users.length; i++) {
      const cumple = await membershipContract.partnerShipsAgregado(users[i].address); 
      if (cumple) {
        console.log("Si cumple", i)
        cumplen.push(i)
        const balanceAntessendLeadershipSplit = await token.balanceOf(users[i].address);
        cumplenBalances.push(balanceAntessendLeadershipSplit)
      }
    }
    await membershipContract.sendLeadershipSplit();
    const leadershipSplitAcumulation = await membershipContract.leadershipSplitAcumulation();
    for (let i = 0; i < cumplen.length; i++) {
      const balanceDespuessendLeadershipSplit = await token.balanceOf(users[cumplen[i]].address);
       console.log("Balance de Wallet"+i+" antes " + cumplenBalances[i]," Despues: " + balanceDespuessendLeadershipSplit," Cuenta: ", cumplenBalances[i], " + ",leadershipSplitAcumulation, " / ",cumplen.length)
    }
   
 

    const balanceDev = await token.balanceOf(user13.address);
    const balanceMkt = await token.balanceOf(user14.address);
    const balanceAdmin = await token.balanceOf(user15.address);

    console.log("Balance wallet dev: ",   Number(balanceDev))
    console.log("Balance wallet mkt: ",   Number(balanceMkt))
    console.log("Balance wallet Admin: ", Number(balanceAdmin))


  });
});

*/





///PRUEBA CONEXCION A FRONT END///////



// Prueba para verificar la creación de membresías
describe('FRONT END', function () {
  it('Envio de dinero a diferentes niveles de bonus', async function () {
    
    //Address del contrato
    const membersAddress = membershipContract.getAddress()
    const poiAddress = poi.getAddress()
    const stakingAddress = staking.getAddress()

    //Transferimos fondos a las wallets
    await token.transfer(user1.address, 100000); 
    await token.transfer(user2.address, 150000); 
    await token.transfer(user3.address, 105000); 
    await token.transfer(user4.address, 200000); 
    await token.transfer(user5.address, 200000); 
    await token.transfer(user6.address, 200000); 

    await token.connect(user1).approve(membersAddress, 200000);
    await token.connect(user2).approve(membersAddress, 200000);
    await token.connect(user3).approve(membersAddress, 200000);
    await token.connect(user4).approve(membersAddress, 200000);
    await token.connect(user5).approve(membersAddress, 200000);
    await token.connect(user6).approve(membersAddress, 200000);

    //Creamos membresias
    await membershipContract.createMembership('', 0, 0, 0, 0,500,100,true,100);
    await membershipContract.createMembership('Silver Membership', 1000, 0, 30, 365,100,500,false,0);
    await membershipContract.createMembership('Gold Membership', 1000, 0, 30, 365,100,500,true,100);
    await membershipContract.setSplits(245,255,200); //Sponsor = 24.5% Bonus = 25.5% Leadershipsplit = 20%
   // await membershipContract.setSponsorLevels(1000);// Ponemos que se lleva el 33% el frontal


  console.log("Address user1",user1.address)
  console.log("Address user1",user2.address)

  
   const balance010 = await token.balanceOf(user1.address);
   console.log("Compra 1")
   await membershipContract.connect(user1).buyMembership(1, "0x0000000000000000000000000000000000000123"); 
   const balance01 = await token.balanceOf(user1.address);

   console.log("Compra 2")
   await membershipContract.connect(user2).buyMembership(1, user1.address); 
   const balance02 = await token.balanceOf(user1.address);
   
   console.log("Compra 3")
   await membershipContract.connect(user3).buyMembership(1, user2.address); 
   const balance03 = await token.balanceOf(user1.address);
   console.log("Compra 4")
   await membershipContract.connect(user4).buyMembership(1, user1.address); 
   const balance04 = await token.balanceOf(user1.address);
   console.log("Compra 5")
   await membershipContract.connect(user5).buyMembership(1, user3.address); 
   const balance05 = await token.balanceOf(user1.address);
   //Regalias
   console.log("Regalias")
   console.log(balance010)
   console.log(balance01)
   console.log(balance02)
   console.log(balance03)
   console.log(balance04)
   console.log(balance05)
   console.log("///")


  //Arbol
   const treeAmount = await membershipContract.treeAmount(user1.address);
   console.log(treeAmount)





    const team = await membershipContract.team(user1.address);
    const sponsorSplitAcumulation = await membershipContract.sponsorSplitAcumulation(user1.address);
    const claims = await membershipContract.claims(user1.address);
  //  const levelOne = await membershipContract.levelOne(user1.address);
  //  const levelTwo = await membershipContract.levelTwo(user1.address);
  //  const levelThree = await membershipContract.levelThree(user1.address);
  //  const levelFour = await membershipContract.levelFour(user1.address);
    
    console.log(team)
    console.log(sponsorSplitAcumulation)
    console.log(claims)
  //  console.log(levelOne)
  //  console.log(levelTwo)
  //  console.log(levelThree)
  //  console.log(levelFour)
    
    
  //  await membershipContract.connect(user1).getRewards(); 
    const claimsDespues = await membershipContract.claims(user1.address);
    console.log(claimsDespues)



    //POI


   
    await poi.setAdminWallets(user10.address,500);
    await poi.setAdminWallets(user11.address,230);
    await poi.setAdminWallets(user12.address,270);
    await token.connect(user1).approve(poiAddress, 1000);

    const balance10 = await token.balanceOf(user10.address);
    const balance11 = await token.balanceOf(user11.address);
    const balance12 = await token.balanceOf(user12.address);
    console.log(balance10)
    console.log(balance11)
    console.log(balance12)
    await poi.connect(user1).storeInfo("asd","asd","asd","asd","asd","asd","asd");

    const balance102 = await token.balanceOf(user10.address); //PUNTO 2
    const balance112 = await token.balanceOf(user11.address);
    const balance122 = await token.balanceOf(user12.address);
    console.log(balance102)
    console.log(balance112)
    console.log(balance122)


    await token.connect(user2).approve(stakingAddress, 1000);
    await token.connect(user3).approve(stakingAddress, 1000);


    const balance15 = await token.balanceOf(user15.address);
    const balance16 = await token.balanceOf(user16.address);
    console.log(balance15)
    console.log(balance16)
   // await staking.connect(user2).stakingMembership(150); 
   // await staking.connect(user3).stakingMembership(150); 
    const balance152 = await token.balanceOf(user15.address);
    const balance162 = await token.balanceOf(user16.address);
    console.log(balance152)
    console.log(balance162)




   // const sponsorSplitAcumulation = await membershipContract.sponsorSplitAcumulation(user1); 
 
  //  const balanceAntesSponsorSplit = await token.balanceOf(user1.address);
  //  const balanceAntesSponsorSplit1 = await token.balanceOf(user2.address);
  //  const balanceAntesSponsorSplit2 = await token.balanceOf(user3.address);
 
 
  //  const balanceDespuesSponsorSplit = await token.balanceOf(user1.address);
  //  const balanceDespuesSponsorSplit1 = await token.balanceOf(user2.address);
  //  const balanceDespuesSponsorSplit2 = await token.balanceOf(user3.address);
 

  //  expect(Number(balanceDespuesSponsorSplit)).to.equal(Number(balanceAntesSponsorSplit) + (Math.floor(Number(sponsorSplitAcumulation) / 3)));
  //  expect(Number(balanceDespuesSponsorSplit1)).to.equal(Number(balanceAntesSponsorSplit1) + (Math.floor(Number(sponsorSplitAcumulation) / 3)));
  //  expect(Number(balanceDespuesSponsorSplit2)).to.equal(Number(balanceAntesSponsorSplit2) + (Math.floor(Number(sponsorSplitAcumulation) / 3)));




  });
});