import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "@/store/orderSlice";

const BADGE_UI = {
  neutral: "bg-card-bg text-text-main border border-border",
  muted: "bg-card-bg text-text-muted border border-border",
  accent: "bg-card-bg text-text-accent border border-border",
  primary: "bg-brand-main text-white",
  success: "bg-success text-white",
  danger: "bg-danger text-white",
};

const Badge = ({ tone = "neutral", children }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${BADGE_UI[tone]}`}
  >
    {children}
  </span>
);

const Row = ({ label, children }) => (
  <div className="flex justify-between items-center">
    <span className="text-text-muted">{label}</span>
    <span className="font-medium">{children}</span>
  </div>
);

const CenteredText = ({ text }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <p className="text-text-muted font-medium">{text}</p>
  </div>
);

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((s) => s.order);

  useEffect(() => {
    if (orderId) dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

  if (loading) return <CenteredText text="Loading order details…" />;
  if (error) return <CenteredText text={error} />;
  if (!order) return <CenteredText text="Order not found." />;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 space-y-6 text-text-main">
      <div className="bg-card-bg rounded-xl shadow p-6 space-y-3">
        <h1 className="text-xl font-semibold">Order Details</h1>

        <Row label="Order Number">{order.orderNumber}</Row>

        <Row label="Order Status">
          {order.orderStatus === "pending" && (
            <Badge tone="accent">Pending</Badge>
          )}
          {order.orderStatus === "preparing" && <Badge>Preparing</Badge>}
          {order.orderStatus === "ready" && <Badge tone="primary">Ready</Badge>}
          {order.orderStatus === "served" && <Badge tone="muted">Served</Badge>}
          {order.orderStatus === "cancelled" && (
            <Badge tone="danger">Cancelled</Badge>
          )}
        </Row>

        <Row label="Payment">
          {order.paymentStatus === "pending" && (
            <Badge tone="accent">Pending</Badge>
          )}
          {order.paymentStatus === "success" && (
            <Badge tone="success">Paid</Badge>
          )}
          {order.paymentStatus === "failed" && (
            <Badge tone="danger">Failed</Badge>
          )}
          {order.paymentStatus === "refund" && (
            <Badge tone="muted">Refunded</Badge>
          )}
        </Row>

        <Row label="Payment Method">
          {order.paymentMethod === "cash" && <Badge>Cash</Badge>}
          {order.paymentMethod === "razorpay" && (
            <Badge tone="primary">Razorpay</Badge>
          )}
        </Row>

        <Row label="Table Number">#{order.tableNumber}</Row>
      </div>

      <div className="bg-card-bg rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Items</h2>

        <div className="divide-y divide-border">
          {order.items.map((item) => (
            <div key={item._id} className="flex justify-between py-3">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-text-muted">
                  ₹ {item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-medium">₹ {item.subTotal}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card-bg rounded-xl shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold">Bill Summary</h2>

        <Row label="Subtotal">₹ {order.subTotal}</Row>
        <Row label="Discount">− ₹ {order.discountAmount}</Row>

        <div className="border-t border-border pt-3 flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <Badge tone="primary">₹ {order.finalAmount}</Badge>
        </div>
      </div>

      {(order.customerName || order.customerPhone) && (
        <div className="bg-card-bg rounded-xl shadow p-6 space-y-2">
          <h2 className="text-lg font-semibold">Customer Info</h2>
          <Row label="Name">{order.customerName}</Row>
          <Row label="Phone">{order.customerPhone}</Row>
          <Row label="Email">{order.customerEmail}</Row>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
