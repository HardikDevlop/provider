import Order from "../models/Order.js";

// Utility: Generate a random 4-digit code
function generate4DigitCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Create order (if you use this endpoint)
export const createOrder = async (req, res) => {
  try {
    const { services, totalPrice } = req.body;

    const newOrder = new Order({
      user: req.user.id,
      services,
      totalPrice,
      status: "Confirmed",
      requestStatus: "Pending",
      createdAt: new Date(),
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Create Order Error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// Place order (with codes)
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId, paymentType } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items to place order" });

    // Generate 2 different codes
    const happyCode = generate4DigitCode();
    let completeCode = generate4DigitCode();
    while (completeCode === happyCode) completeCode = generate4DigitCode();

    if (paymentType === "post") {
      // Allow order creation without paymentId
      const newOrder = new Order({
        user: req.userId,
        items,
        totalAmount,
        address: { ...address },
        status: "Pending",
        requestStatus: "Pending",
        paymentType: "post",
        createdAt: new Date(),
        happyCode,
        completeCode,
      });
      await newOrder.save();
      return res.status(201).json({ message: "Order placed successfully. Admin will process it shortly.", order: newOrder });
    }

    const newOrder = new Order({
      user: req.userId,
      items,
      totalAmount,
      address: { ...address },
      paymentId,
      status: "Confirmed",
      requestStatus: "Pending",
      happyCode,
      completeCode,
      createdAt: new Date(),
    });

    await newOrder.save();
    return res.status(201).json({ message: "Order placed successfully. Admin will process it shortly.", order: newOrder });
  } catch (err) {
    console.error("❌ placeOrder error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
  
};

// Get orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Fetch Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user.id && order.user.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    order.status = "Cancelled";
    await order.save();
    res.status(200).json({ message: "Order cancelled" });
  } catch (err) {
    console.error("❌ Cancel Order Error:", err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch all orders error:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// Change order time slot (admin can use this; no partner reassignment)
export const changeOrderTimeSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { timeSlot } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!order.address) {
      return res.status(400).json({ message: "Order address missing" });
    }

    order.address.timeSlot = timeSlot;
    await order.save();

    res.status(200).json({ message: "Time slot updated.", order });
  } catch (err) {
    console.error("Error in changeOrderTimeSlot:", err);
    res.status(500).json({ message: "Failed to update time slot" });
  }
};