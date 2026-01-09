import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "@/store/orderSlice";

const BADGE_UI = {
  neutral: "bg-card-bg text-text-main border-border",
  muted: "bg-card-bg text-text-muted border-border",
  accent: "bg-card-bg text-text-accent border-border",
  primary: "bg-brand-main text-white border-brand-main",
  success: "bg-success text-white border-success",
  danger: "bg-danger text-white border-danger",
};

const Badge = ({ tone = "neutral", children }) => (
  <span
    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-sm ${BADGE_UI[tone]}`}
  >
    {children}
  </span>
);

const Row = ({ label, children }) => (
  <p className="flex items-center gap-2">
    <span className="font-medium">{label}:</span>
    {children}
  </p>
);

const CenteredText = ({ text, error }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <p className={`font-medium ${error ? "text-danger" : "text-text-muted"}`}>
      {text}
    </p>
  </div>
);

const OrderSuccess = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((s) => s.order);

  useEffect(() => {
    if (orderId) dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

  if (loading) return <CenteredText text="Fetching your order…" />;
  if (error) return <CenteredText text={error} error />;
  if (!order) return <CenteredText text="Order not found." />;

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-card-bg rounded-xl shadow-md text-text-main">
      <h1 className="text-2xl font-semibold text-admin mb-4">
        🎉 Order Placed Successfully
      </h1>

      <div className="space-y-3">
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

        <Row label="Payment Method">
          {order.paymentMethod === "cash" && <Badge>Cash</Badge>}
          {order.paymentMethod === "razorpay" && (
            <Badge tone="primary">Razorpay</Badge>
          )}
        </Row>

        <Row label="Payment">
          {order.paymentStatus === "pending" && (
            <Badge tone="accent">Payment Pending</Badge>
          )}
          {order.paymentStatus === "success" && (
            <Badge tone="success">Paid</Badge>
          )}
          {order.paymentStatus === "failed" && (
            <Badge tone="danger">Payment Failed</Badge>
          )}
          {order.paymentStatus === "refund" && (
            <Badge tone="muted">Refunded</Badge>
          )}
        </Row>

        <Row label="Total Amount">
          <Badge tone="primary">₹ {order.finalAmount}</Badge>
        </Row>
      </div>

      <div className="flex justify-center items-center">
        {" "}
<Link
  to={`/orders/${order._id}`}
  className="
    inline-flex items-center justify-center
    mt-6
    px-6 py-3
    rounded-xl
    font-semibold text-sm
    bg-muted-bg text-app-bg
    shadow-lg shadow-muted-bg/10
    transition-all duration-300 ease-out
    hover:-translate-y-0.5 hover:shadow-xl hover:shadow-muted-bg/20
    active:translate-y-0 active:shadow-md
    focus:outline-none focus-visible:ring-2 focus-visible:ring-muted-bg/10
  "
>
  View full order →
</Link>

      </div>
    </div>
  );
};

export default OrderSuccess;
