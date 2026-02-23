import api from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { error: toastError } = useToast();

  const { user } = useSelector((s) => s.user);
  const { selectedCoupon } = useSelector((s) => s.coupon);

  const [form, setForm] = useState({
    tableNumber: localStorage.getItem("tableNumber") || "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
    paymentMethod: "cash",
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // CREATE ORDER API
  const createOrderApi = async () => {
    const res = await api.post("/orders/place", {
      ...form,
      couponCode: selectedCoupon?.couponCode ?? null,
    });
    return res.data;
  };

  // VERIFY PAYMENT API
  const verifyPaymentApi = async (payload) => {
    const res = await api.post("/orders/verify-payment", payload);
    return res.data;
  };

  // CHECKOUT HANDLER
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!form.tableNumber?.trim()) {
      toastError("Table Number Required", "Please enter your table number to continue checkout.");
      return;
    }

    try {
      const result = await createOrderApi();
      const orderId = result?.order?._id;

      if (!orderId) {
        alert("Order creation failed");
        return;
      }

      // CASH PAYMENT
      if (form.paymentMethod === "cash") {
        navigate(`/order-success/${orderId}`);
        return;
      }

      // RAZORPAY PAYMENT 
      const options = {
        key: result.razorpayOrder.key,
        amount: result.razorpayOrder.amount,
        currency: result.razorpayOrder.currency,
        order_id: result.razorpayOrder.id,
        name: "Restaurant Order",
        description: "Table Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await verifyPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              navigate(`/order-success/${orderId}`);
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            alert("Payment verification error");
          }
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
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  // LOAD RAZORPAY SCRIPT
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  //  AUTO FILL USER
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        customerName: user.name ?? "",
        customerEmail: user.email ?? "",
        customerPhone: user.phone ?? "",
      }));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-card-bg rounded-3xl shadow-lg p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Checkout</h2>
          <p className="text-sm text-text-muted">
            Please fill details to place your order
          </p>
        </div>

        <div className="space-y-4">
          <input
            name="tableNumber"
            placeholder="Table Number"
            value={form.tableNumber}
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

        {selectedCoupon && (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-xl">
            Coupon <b>{selectedCoupon.couponCode}</b> applied 🎉
          </div>
        )}

        <button
          onClick={handleCheckout}
          className="w-full py-3 rounded-2xl bg-brand-main text-black font-semibold
                     hover:opacity-90 active:scale-[0.98] transition"
        >
          {form.paymentMethod === "cash"
            ? "Place Order"
            : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
