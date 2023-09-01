"use client";

import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import BillCard from "./bill-card";
import { Button, TextInput } from "@/components/atom";
import { IconArrowLeft, IconArrowRight } from "@/components/atom/icons";

const API_KEY = process.env.NEXT_PUBLIC_LEGISCAN_API_KEY;
const STATE = process.env.NEXT_PUBLIC_LEGISCAN_STATE || "GA"; // Georgia State Code

const BillsList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (data) => {
    setSearchQuery(data.search);
    fetchBills(data.search);
  };

  const handlePageChange = (event) => {
    setPage(event.selected);
  };

  const fetchBills = async (searchQuery, page) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.legiscan.com/?key=${API_KEY}&op=getSearch&state=${STATE}&query=${searchQuery}&page=${
          page + 1
        }`
      );
      const data = await response.json();
      setBills(Object.values(data?.searchresult)?.slice(0, -1));
      setTotalPage(data?.searchresult?.summary?.page_total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") return;
    fetchBills(searchQuery, page);
  }, [searchQuery, page]);

  return (
    <div>
      <form
        className="flex items-center justify-center gap-4 mb-8 lg:mb-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          name="search"
          placeholder="Write text..."
          register={register}
          validation={{ required: true }}
          errors={errors?.search}
        />
        <Button>Search</Button>
      </form>

      {isLoading ? (
        <div className="fixed flex items-center justify-center w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-black/30">
          <PuffLoader />
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-y-12">
            {bills?.map((bill, index) => (
              <li key={index}>
                <BillCard bill={bill} />
              </li>
            ))}
          </ul>

          {totalPage > 1 && (
            <div className="legiscan-pagination">
              <ReactPaginate
                previousLabel={<IconArrowLeft />}
                nextLabel={<IconArrowRight />}
                breakLabel="..."
                pageCount={totalPage}
                pageRangeDisplayed={4}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={page}
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BillsList;
