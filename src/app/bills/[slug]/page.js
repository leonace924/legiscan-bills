import { notFound } from "next/navigation";

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

  console.log(bill);

  return (
    <div className="text-gray-800">
      {bill.bill_number && (
        <p className="mb-2">
          <strong className="font-medium text-red-700">Bill Number: </strong>{" "}
          {bill.bill_number}
        </p>
      )}
      <h1 className="mb-4 text-2xl font-medium text-sky-800">{bill.title}</h1>
      {bill.description && <p className="mb-6">{bill.description}</p>}
      {bill.state && (
        <p className="mb-2">
          <strong className="font-medium text-sky-700">State: </strong>{" "}
          {bill.state}
        </p>
      )}
      {bill.bill_type && (
        <p className="mb-2">
          <strong className="font-medium text-sky-700">Bill Type: </strong>{" "}
          {bill.bill_type}
        </p>
      )}
      {bill.status && (
        <p className="mb-2">
          <strong className="font-medium text-sky-700">Bill Status: </strong>{" "}
          {bill.status} ({bill.status_date})
        </p>
      )}
      <p className="mb-2">
        <strong className="font-medium text-sky-700">Completed : </strong>{" "}
        {bill.completed}
      </p>
    </div>
  );
}
