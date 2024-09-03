import LayoutClient from "@/app/[locale]/connectYourWallet/layout";

interface Props {
  children: React.ReactNode;
}
const layout = ({ children }: Props) => {
  return <LayoutClient>{children}</LayoutClient>;
};

export default layout;
