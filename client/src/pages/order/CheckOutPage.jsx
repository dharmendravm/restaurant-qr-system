import api from "@/lib/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const { user } = useSelector((s) => s.user);
  const { selectedCoupon } = useSelector((s) => s.coupon);

  const [form, setForm] = useState({
    tableNumber: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
    paymentMethod: "cash",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const result = await getOrderApi();

      const orderId = result?.order._id;

      if (form.paymentMethod === "cash" && !orderId) {
        console.error("Order ID missing");
        return;
      }
      if (form.paymentMethod === "cash") {
        navigate(`/order-success/${orderId}`);
      } else {
        const options = {
          key: result.razorpayOrder.key,
          amount: result.razorpayOrder.amount,
          order_id: result.razorpayOrder.id,
          currency: result.razorpayOrder.currency,
          name: result.order.customerName,
          handler: function (response) {
            console.log(response);
            alert(`Payment ID: ${response.razorpay_payment_id}`);
          },

          prefill: {
            name: result.order.customerName,
            email: result.order.customerEmail,
            contact: result.order.customerPhone,
          },
          theme: {
            color: "#1591EA",
          },
        };

        const razorpay = new window.Razorpay(options);
        console.log(razorpay);
        razorpay.open();

        console.log(result);
        console.log(options);

        // navigate(`/payment/${orderId}`);
      }
    } catch (error) {
      console.log("Order Failed", error);
    }
  };

  const getOrderApi = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const sessionToken = localStorage.getItem("sessionToken");
      const headers = {};

      if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
      if (sessionToken) headers["x-session-token"] = sessionToken;

      const res = await api.post(
        "orders/place",
        {
          ...form,
          couponCode: selectedCoupon?.couponCode ?? null,
        },
        { headers }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        customerName: user.name ?? "",
        customerEmail: user.email ?? "",
        customerPhone: user.phone ?? "",
      }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-card-bg rounded-3xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Checkout</h2>
          <p className="text-sm text-text-muted">
            Please fill details to place your order
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            name="tableNumber"
            placeholder="Table Number"
            onChange={onChange}
            className="input input-bordered w-full rounded-xl"
            required
          />

          <input
            name="customerName"
            placeholder="Full Name"
            value={form.customerName}
            onChange={onChange}
            className="input input-bordered w-full rounded-xl"
          />

          <input
            name="customerEmail"
            placeholder="Email Address"
            value={form.customerEmail}
            onChange={onChange}
            className="input input-bordered w-full rounded-xl"
          />

          <input
            name="customerPhone"
            placeholder="Phone Number"
            value={form.customerPhone}
            onChange={onChange}
            className="input input-bordered w-full rounded-xl"
          />

          <textarea
            name="notes"
            placeholder="Any special instructions?"
            onChange={onChange}
            className="textarea textarea-bordered w-full rounded-xl"
          />
        </div>

        {/* Payment */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Payment Method</p>
          <select
            name="paymentMethod"
            onChange={onChange}
            className="select select-bordered w-full rounded-xl"
          >
            <option value="cash">💵 Cash</option>
            <option value="razorpay">💳 Online (Razorpay)</option>
          </select>
        </div>

        {/* Coupon info */}

        {selectedCoupon && (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-xl">
            Coupon <b>{selectedCoupon?.couponCode}</b> applied 🎉
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleCheckout}
          className="w-full py-3 rounded-2xl bg-brand-main text-black font-semibold
                     hover:opacity-90 active:scale-[0.98] transition"
        >
          {form.paymentMethod === "cash" ? "Place Order" : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
