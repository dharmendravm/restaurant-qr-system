import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderByIdAdmin } from "@/features/admin-orders/adminOrderSlice";

const OrderDetailsAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector(
    (state) => state.adminOrders
  );
  const order = orderDetails.order

  useEffect(() => {
    dispatch(getOrderByIdAdmin(id));
  }, [id, dispatch]);

  if (loading) return <p>Loading order details...</p>;
  if (error)
    return (
      <p className="text-red-500">
        {error}
      </p>
    );

  if (!order) return null;

  return (
    <div className="p-6 space-y-6">
      {console.log(order)}
      <h1 className="text-2xl font-semibold">Order Details</h1>

      {/* Order Info */}
      <div className="bg-card-bg p-4 rounded shadow text-text-main">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Status:</strong> {order.orderStatus}
        </p>
        <p>
          <strong>Payment:</strong> {order.paymentStatus}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* User Info */}
      <div className="bg-card-bg p-4 rounded shadow text-text-main">
        <h2 className="font-semibold mb-2">Customer</h2>
        <p>{order.customerName}</p>
        <p>{order.customerEmail}</p>
        <p>{order.customerPhone ?? "No mobail found"}</p>
      </div>

      {/* Items */}
      <div className="bg-card-bg text-text-main p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Items</h2>

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Item</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-right">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-right mt-4 font-semibold">
          Total: ₹{order.finalAmount}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsAdmin;
