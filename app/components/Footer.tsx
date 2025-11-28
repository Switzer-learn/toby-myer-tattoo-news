import { getConfig } from "@/app/lib/db/config";
import FooterClient from "./FooterClient";

export default async function Footer() {
    const config = await getConfig();

    return <FooterClient config={config} />;
}
