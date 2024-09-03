import LayoutClient from "@/app/components/layouts/LayoutClient";

interface Props {
  children: React.ReactNode;
}

export default async function LoggedInLayout({ children }: Props) {
  return (
    <>
      <LayoutClient>{children}</LayoutClient>
    </>
  );
}
