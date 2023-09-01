import Link from "next/link";

const BillCard = ({ bill }) => {
  return (
    <div>
      <Link
        href={`/bills/${bill.bill_id}`}
        className="font-medium underline transition-all duration-300 text-sky-700 hover:text-sky-500"
      >
        <h3 className="text-xl">{bill.title}</h3>
      </Link>
      {bill.last_action && <p className="mt-2 text-sm">{bill.last_action}</p>}
      {bill.last_action_date && (
        <p className="text-sm mt-1.5">
          <strong>Latest action date:</strong> {bill.last_action_date}
        </p>
      )}
    </div>
  );
};

export default BillCard;
