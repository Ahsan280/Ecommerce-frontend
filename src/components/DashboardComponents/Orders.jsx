import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

const Orders = () => {
  const { user } = useAuthContext();
  const api = useAxios();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get(`order/get-orders/${user._id}`);
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);
  //   console.log(orders);
  if (orders.length < 1) {
    return (
      <div className="h-[60vh] pt-20 text-center text-2xl">
        <p>No orders found.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 ">
      {orders.map((order) => {
        return (
          <div className="bg-purple-500 rounded-md text-white p-5">
            <div className="flex justify-between">
              <h2>Order ID: {order._id}</h2>
              <p>Total Price: {order.totalPrice}</p>
              <p>Payment Status: {order.paymentStatus}</p>
            </div>
            <p>Items:</p>
            <ul>
              {order.items.map((item) => (
                <li>
                  {item.cartItem?.product?.name} - Quantity:{" "}
                  {item.cartItem?.quantity}{" "}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
