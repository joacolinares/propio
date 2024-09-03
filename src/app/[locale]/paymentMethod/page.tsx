import Image from "next/image";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import creditCard from "@/assets/imgs/credit-Card-01.png";
import PaymentMethodCreditCard from "./component/PaymentMethodCreditCard";

const TransactionsPage = async () => {
  return (
    <div className="page-transactions pb-[96px] bg-gradient-to-t from-[#0E0E33] to-[#39307B] h-dvh text-white">
      <div className="container-up py-4 pl-7">
        <Image src={LogoPeq} alt="logo" width={28} height={24} />
      </div>
      <Image
        src={creditCard}
        alt="logo"
        width={300}
        height={300}
        className="mx-auto mt-6"
      />
      <PaymentMethodCreditCard />
    </div>
  );
};

export default TransactionsPage;
