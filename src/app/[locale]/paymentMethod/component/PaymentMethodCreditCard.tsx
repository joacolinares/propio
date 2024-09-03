"use client";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  amountPay?: number;
  linkBtnPay?: string;
};

const PaymentMethodCreditCard = ({ amountPay, linkBtnPay }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditOwner, setCreditOwner] = useState("");
  const [dateExpiry, setDateExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const getCreditCardNumber = (e: any) => {
    const currentValue = e.target.value;
    setCreditCardNumber(currentValue);
  };

  const getDateExpiry = (e: any) => {
    const currentValue = e.target.value;
    setDateExpiry(currentValue);
  };

  const getCvv = (e: any) => {
    const currentValue = e.target.value;
    setCvv(currentValue);
  };

  const getCreditOwner = (e: any) => {
    const currentValue = e.target.value;
    setCreditOwner(currentValue);
  };

  function formatCreditCardNumber(cardNumber: string) {
    // Remove non-numeric characters
    cardNumber = cardNumber.replace(/[^0-9]/g, "");

    // Add hyphens every 4 digits
    const formattedCardNumber = [];
    for (let i = 0; i < cardNumber.length; i += 4) {
      formattedCardNumber.push(cardNumber.slice(i, i + 4));
    }

    // Join the formatted digits with hyphens
    return formattedCardNumber.join("-");
  }

  function formatExpiry(cardNumber: string) {
    // Remove non-numeric characters
    cardNumber = cardNumber.replace(/[^0-9]/g, "");

    // Add hyphens every 4 digits
    const formattedCardNumber = [];
    for (let i = 0; i < cardNumber.length; i += 2) {
      formattedCardNumber.push(cardNumber.slice(i, i + 2));
    }

    // Join the formatted digits with hyphens
    return formattedCardNumber.join("/");
  }

  const buttonProceedToPay = () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 6000);

    if (linkBtnPay) {
      router.push(linkBtnPay);
    } else {
      router.push("/accountLogin");
    }
  };

  return (
    <div className="my-6">
      <div className="container-infoWallets">
        <div className="infoWallets">
          <div className="flex justify-between text-[24px] mb-6">
            <b>{t("Payment")}</b>
            <div>
              <b>${amountPay ? amountPay : 30}</b>
              <b className="text-[14px]">.00</b>
            </div>
          </div>
        </div>
        <div>
          <div className="container-input relative mb-4">
            <label className="text-[14px] font-bold">
              {t("Credit card number")}
            </label>
            <input
              type="text"
              className="rounded-[10px] p-4 bg-[#ffffff1a] w-full mt-1 font-bold"
              value={formatCreditCardNumber(creditCardNumber)}
              onChange={(e) => getCreditCardNumber(e)}
              placeholder="xxxx-xxxx-xxxx-8014"
              maxLength={19}
            />
          </div>

          <div className="container-input relative mb-4">
            <label className="text-[14px] font-bold">
              {t("Card holder name")}
            </label>
            <input
              type="text"
              className="rounded-[10px] p-4 bg-[#ffffff1a] w-full mt-1 font-bold"
              value={creditOwner}
              onChange={(e) => getCreditOwner(e)}
              placeholder="Jose Smith"
            />
          </div>

          <div className="flex space-x-3 w-full">
            <div className="w-1/2">
              <label className="text-[14px] font-bold">{t("Expiry")}</label>
              <input
                type="text"
                className="rounded-[10px] p-4 bg-[#ffffff1a] w-full mt-1 font-bold"
                value={formatExpiry(dateExpiry)}
                onChange={(e) => getDateExpiry(e)}
                maxLength={5}
                placeholder="08/25"
              />
            </div>
            <div className="w-1/2">
              <label className="text-[14px] font-bold">CVV</label>
              <input
                type="text"
                className="rounded-[10px] p-4 bg-[#ffffff1a] w-full mt-1 font-bold"
                value={cvv}
                onChange={(e) => getCvv(e)}
                maxLength={3}
                placeholder="XXX"
              />
            </div>
          </div>
        </div>
        <ButtonPrimary
          text={t("Proceed to Pay")}
          classname={"mt-6"}
          onClickFn={buttonProceedToPay}
        />
        <ModalComponent
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg"
        >
          {isProcessing ? (
            <div className="w-full h-full flex flex-col items-center justify-center px-16">
              <div>
                <Image
                  src={ProcessingIcon}
                  alt="processing"
                  width={60}
                  height={60}
                />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                {t("Processing your Request")}
              </p>
            </div>
          ) : isDeclined ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image
                  src={RechazedIcon}
                  alt="Decline"
                  width={60}
                  height={60}
                />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                {t("Failed Transfer")}
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image
                  src={CheckDone}
                  alt="Check done"
                  width={60}
                  height={60}
                />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                {t("Done")}
              </p>
            </div>
          )}
        </ModalComponent>
      </div>
    </div>
  );
};

export default PaymentMethodCreditCard;
