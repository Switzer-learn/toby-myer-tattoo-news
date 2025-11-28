import { getConfig } from "@/app/lib/db/config";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const config = await getConfig();

  return <HeaderClient config={config} />;
}
