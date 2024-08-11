import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import displayBDTCurrency from "../helpers/displayCurrency";
import moment from "moment";
import Audio, { Bars, ThreeCircles, ThreeDots } from "react-loader-spinner";

const AllOrder = () => {
  const [data, setData] = useState([]); // To store fetched data
  const [loading, setLoading] = useState(true); // To indicate loading state

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.error) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setData(Array.isArray(responseData.data) ? responseData.data : []); // Ensure data is an array
      console.log("admin panel order  list", responseData);
    } catch (error) {
      console.error("Error fetching order details:", error);
      // Handle error state if needed
    } finally {
      setLoading(false); // Set loading to false after data fetch is complete
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="h-[calc(100vh-190px)] overflow-y-scroll p-4 bg-gray-50">
      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-xl font-semibold text-gray-700">No Orders available</p>
      ) : (
        <div className="w-full">
          {data.map((order) => (
            <div key={order._id} className="mb-6 p-4 bg-white shadow-md rounded-lg">
              <p className="font-bold text-2xl mb-2">{moment(order.createdAt).format("LL")}</p>
              <div className="border border-gray-300 rounded-lg">
                <div className="flex flex-col lg:flex-row gap-4 p-4">
                  <div className="flex-1 grid gap-4">
                    {order.productDetails?.map((product) => (
                      <div
                        key={product._id}
                        className="flex gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                          <img
                            src={product.productId.productImage[0]}
                            className="object-scale-down h-full w-full hover:scale-110 transition-all mix-blend-multiply rounded"
                            alt={product.productId.productName}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-lg mb-1 text-gray-800">
                            {product.productId.productName}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="text-lg text-red-600">
                              {displayBDTCurrency(product.productId.price)}
                            </div>
                            <p className="text-gray-600 text-base">Quantity: {product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t border-gray-300">
                  <div className="font-semibold text-lg text-gray-800">
                    Buyer E-mail: <span className="text-gray-600">{order.email}</span>
                  </div>
                  <div className="bg-green-500 text-black font-semibold text-lg p-2 rounded-lg">
                    Total Amount: {displayBDTCurrency(order.totalAmount)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrder;
