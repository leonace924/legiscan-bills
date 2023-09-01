import { notFound } from "next/navigation";
import Bill from "@/components/bill";

export const dynamicParams = false;

const API_KEY = process.env.NEXT_PUBLIC_LEGISCAN_API_KEY;

const getPageData = async (params) => {
  const response = await fetch(
    `https://api.legiscan.com/?key=${API_KEY}&op=getBill&id=${params?.slug}`
  );
  const page = await response.json();

  if (!page) {
    return null;
  }

  return page;
};

export const generateMetadata = async ({ params }) => {
  const page = await getPageData(params);

  if (!page) {
    return {};
  }

  return {
    title: page.bill.title,
    description: page.bill.description,
  };
};

export default async function BillPage({ params }) {
  const page = await getPageData(params);

  if (!page) {
    notFound();
  }

  const { bill } = page;

  return <Bill bill={bill} />;
}
