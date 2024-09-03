import { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Register - Defily",
};

export default async function RegisterLayout({ children }: Props) {
  return <>{children}</>;
}
