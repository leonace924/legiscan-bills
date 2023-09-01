"use client";

import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@/components/atom/icons";

const Bill = ({ bill }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="text-gray-800">
      <button
        className="inline-flex items-center gap-2 mb-6 transition duration-300 hover:text-sky-500"
        onClick={handleGoBack}
      >
        <div className="flex items-center w-2">
          <IconArrowLeft />
        </div>
        Back
      </button>

      {bill.bill_number && (
        <p className="mb-2">
          <strong className="font-medium text-red-700">Bill Number: </strong>{" "}
          {bill.bill_number}
        </p>
      )}

      <h1 className="mb-2 text-2xl font-medium text-sky-800">{bill.title}</h1>
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
};

export default Bill;
